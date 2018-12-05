import { Argv } from 'yargs'
import { ClientBaseCommand } from '../client-base-command'
import { ObjectDeleteCommand } from './delete'
import { ObjectGetCommand } from './get'
import { ObjectInfoCommand } from './info'
import { ObjectPutCommand } from './put'

export class ObjectCommand extends ClientBaseCommand {
  command = 'object'
  describe = 'Manage Object'

  builder(args: Argv) {
    return args
      .command(new ObjectPutCommand())
      .command(new ObjectGetCommand())
      .command(new ObjectDeleteCommand())
      .command(new ObjectInfoCommand())
  }
}
