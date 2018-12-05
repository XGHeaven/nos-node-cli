import { createWriteStream, ensureFile } from 'fs-extra'
import * as path from 'path'
import * as yargs from 'yargs'
import { Arguments } from 'yargs'
import { ObjectBaseCommand } from './object-base-command'

export class ObjectGetCommand extends ObjectBaseCommand {
  command = 'get <key>'
  describe = 'Get a object content, default output stdout'

  builder(args: yargs.Argv): yargs.Argv {
    this.addKeyPositional(args)
    return super.builder(args).option('output', {
      alias: 'o',
      type: 'string',
      describe: 'Output file',
    })
  }

  async handler(args: Arguments) {
    const client = this.client

    const { key, output } = args

    const stream = await client.getObject({
      objectKey: key,
      encode: 'stream',
    })

    if (output) {
      // output to file
      const outputPath = path.resolve(process.cwd(), output)
      await ensureFile(outputPath)
      stream.pipe(createWriteStream(outputPath))
    } else {
      stream.pipe(process.stdout)
    }
  }
}
