import { Argv } from 'yargs'
import * as yargs from 'yargs'
import { ClientBaseCommand } from '../client-base-command'

export abstract class BucketBaseCommand extends ClientBaseCommand {
  protected _checkBucket = false

  builder(args: yargs.Argv): yargs.Argv {
    return super.builder(args).hide('bucket')
  }

  protected addBucketPosional(args: Argv) {
    return args.positional('name', {
      type: 'string',
      describe: 'Bucket Name',
    })
  }
}
