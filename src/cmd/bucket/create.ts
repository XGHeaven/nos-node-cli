import { BucketAcl } from '@xgheaven/nos-node-sdk'
import * as yargs from 'yargs'
import { BucketBaseCommand } from './bucket-base-command'

export class BucketCreateCommand extends BucketBaseCommand {
  command = 'create <name>'
  describe = 'Create a Bucket'

  builder(args: yargs.Argv): yargs.Argv {
    this.addBucketPosional(args)
    return super.builder(args).option('public', {
      type: 'boolean',
      describe: 'create as public bucket',
      default: false,
    })
  }

  async handler(args: yargs.Arguments) {
    await this.client.putBucket({
      bucket: args.name,
      acl: args.public ? BucketAcl.PUBLISH : BucketAcl.PRIVATE,
    })
  }
}
