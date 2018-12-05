import * as yargs from 'yargs'
import { ClientBaseCommand } from '../client-base-command'
import { BucketCreateCommand } from './create'
import { BucketDeleteCommand } from './delete'
import { BucketListCommand } from './list'

export class BucketCommand extends ClientBaseCommand {
  command = 'bucket'
  describe = 'Manage Bucket'

  builder(args: yargs.Argv): yargs.Argv {
    return super
      .builder(args)
      .demandCommand()
      .command(new BucketListCommand())
      .command(new BucketCreateCommand())
      .command(new BucketDeleteCommand())
  }
}
