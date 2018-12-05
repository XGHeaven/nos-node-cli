import jsome from 'jsome'
import * as yargs from 'yargs'
import { ObjectBaseCommand } from './object-base-command'

export class ObjectInfoCommand extends ObjectBaseCommand {
  command = 'info <key>'
  describe = 'Get a object info/metadata'

  builder(args: yargs.Argv): yargs.Argv {
    this.addKeyPositional(args)
    return super.builder(args)
  }

  async handler(args: yargs.Arguments) {
    const client = this.client
    const { key } = args

    const ret = await client.headObject({
      objectKey: key,
    })

    jsome(ret)
  }
}
