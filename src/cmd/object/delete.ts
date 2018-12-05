import jsome from 'jsome'
import ora = require('ora')
import * as yargs from 'yargs'
import { ObjectBaseCommand } from './object-base-command'

export class ObjectDeleteCommand extends ObjectBaseCommand {
  command = 'delete <key..>'
  describe = 'Delete a object'

  builder(args: yargs.Argv): yargs.Argv {
    this.addKeyPositional(args)
    return super.builder(args).positional('key', {
      type: 'string',
      describe: 'Object keys',
    })
  }

  async handler(args: yargs.Arguments) {
    const keys: string[] = args.key
    const client = this.client

    const ret = await client.deleteMultiObject({
      objectKeys: keys,
    })

    if (!ret.length) {
      ora().succeed('Delete success!')
    } else {
      ora().fail('Delete failed')
      jsome(ret)
    }
  }
}
