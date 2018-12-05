import { prompt } from 'enquirer'
import ora = require('ora')
import * as yargs from 'yargs'
import { BucketBaseCommand } from './bucket-base-command'

export class BucketDeleteCommand extends BucketBaseCommand {
  command = 'delete <name>'
  describe = 'Delete a Bucket'

  builder(args: yargs.Argv): yargs.Argv {
    this.addBucketPosional(args)
    return super.builder(args).option('force', {
      type: 'boolean',
      alias: 'f',
      describe: 'Force to delete',
    })
  }

  async handler(args: yargs.Arguments) {
    const client = this.client
    const { name, force } = args

    const isExist = await client.isBucketExist({ bucket: name })
    if (!isExist) {
      ora().warn('Bucket not found')
      return
    }

    if (force) {
      let count = 0
      let done = false
      const spinner = ora().start('Cleaning...')

      do {
        const ret = await client.listObject({
          limit: 100,
          bucket: name,
        })
        count += ret.items.length
        done = !ret.isTruncated
        spinner.text = `Cleaning...(${count})`
        await client.deleteMultiObject({
          objectKeys: ret.items.map((obj) => obj.key),
          bucket: name,
        })
      } while (!done)

      spinner.succeed(`Cleaned(${count})`)
    }

    await client.deleteBucket({ bucket: name })
    ora().succeed('Delete success')
  }
}
