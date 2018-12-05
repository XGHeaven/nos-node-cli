import { PutObjectFileOptions } from '@xgheaven/nos-node-sdk'
import fs from 'fs'
import ora from 'ora'
import * as path from 'path'
import * as yargs from 'yargs'
import { Arguments } from 'yargs'
import { uploadFile } from '../../client'
import { isFolder } from '../../utils'
import { ClientBaseCommand } from '../client-base-command'
import { ObjectBaseCommand } from './object-base-command'

export class ObjectPutCommand extends ObjectBaseCommand {
  command = 'put <file> [key]'
  describe = 'Put a object to bucket'

  builder(args: yargs.Argv): yargs.Argv {
    this.addKeyPositional(args)
    return super.builder(args).positional('file', {
      type: 'string',
      describe: 'file/folder to upload',
    })
  }

  async handler(args: Arguments) {
    const client = this.client

    const calcFilesSpinner = ora()

    const key = args.key || ''
    const localPath = path.resolve(process.cwd(), args.file)
    const filesParams: PutObjectFileOptions[] = []

    async function calcFile(folder: string, prefix = '') {
      const stat = await fs.promises.stat(folder)
      if (!stat.isDirectory()) {
        filesParams.push({
          file: folder,
          objectKey: prefix,
        })
        calcFilesSpinner.text = `Calc Files(${filesParams.length})`
        return
      }

      const listFiles = await fs.promises.readdir(folder)

      for (const file of listFiles) {
        await calcFile(path.join(folder, file), path.join(prefix, file))
      }
    }

    if (isFolder(localPath)) {
      calcFilesSpinner.start('Calc files(0)')
      try {
        await calcFile(localPath, key)
        calcFilesSpinner.succeed(`Done! Found ${filesParams.length} files`)
      } catch (e) {
        calcFilesSpinner.fail(`Calc files failed, please retry again`)
        return
      }
    } else {
      filesParams.push({
        objectKey: key || path.basename(localPath),
        file: localPath,
      })
    }

    const spinner = ora('Uploading').start()
    let uploaded = 0

    try {
      for (const fileParam of filesParams) {
        spinner.text = `Uploading(${uploaded++}/${filesParams.length}) "${path.relative(
          process.cwd(),
          fileParam.file,
        )}" -> "${fileParam.objectKey}"`
        await uploadFile(client, fileParam)
      }
      spinner.succeed(`Uploaded ${uploaded} files`)
    } catch (e) {
      spinner.fail(`Uploaded error(${uploaded}/${filesParams.length})`)
      console.error(e.message)
    }
  }
}
