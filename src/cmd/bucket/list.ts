import jsome from 'jsome'
import * as yargs from 'yargs'
import { BucketBaseCommand } from './bucket-base-command'

export class BucketListCommand extends BucketBaseCommand {
  command = 'list'
  describe = 'List all buckets'

  handler(args: yargs.Arguments): void {
    const client = this.client
    client.listBucket().then(({ items }) => {
      jsome(items)
    })
  }
}
