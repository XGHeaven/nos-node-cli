import yargs from 'yargs'
import { AccountCommand } from './cmd/account'
import { BucketCommand } from './cmd/bucket'
import { ObjectCommand } from './cmd/object'
import { ShortcutGetCommand } from './cmd/shortcut/get'
import { ShortcutLoginCommand } from './cmd/shortcut/login'
import { ShortcutPutCommand } from './cmd/shortcut/put'
import { BIN_NAME } from './constant'
import './redstone/overwrite'

const argv = yargs
  .option('accessKey', {
    alias: ['K'],
    description: 'NOS AccessKey',
    type: 'string',
  })
  .option('accessSecret', {
    alias: ['S'],
    description: 'NOS AccessSecret',
    type: 'string',
  })
  .option('endpoint', {
    alias: 'e',
    type: 'string',
    description: 'NOS Endpoint',
  })
  .option('bucket', {
    alias: 'b',
    type: 'string',
    description: 'NOS Bucket',
  })
  .option('account', {
    alias: 'a',
    type: 'string',
    description: 'Account, default is "default" account',
    default: 'default',
  })
  .command(new ObjectCommand())
  .command(new BucketCommand())
  .command(new AccountCommand())
  .command(new ShortcutLoginCommand())
  .command(new ShortcutPutCommand())
  .command(new ShortcutGetCommand())
  .alias('h', 'help')
  .completion()
  .scriptName(BIN_NAME)
  .demandCommand().argv
