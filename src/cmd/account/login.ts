import { pick } from 'lodash'
import { Arguments, Argv } from 'yargs'
import { NosCliAccount, setConfig } from '../../config'
import { BaseCommand } from '../base-command'

export class AccountLoginCommand extends BaseCommand {
  command = 'login'
  describe = 'Login with AccessKey and AccessSecret'

  builder(args: Argv) {
    return args.demandOption(['accessKey', 'accessSecret'])
  }

  handler(args: Arguments): void {
    const config = this.config

    const account: NosCliAccount = pick(args, ['accessKey', 'accessSecret', 'endpoint'])
    const name = args.account
    config.accounts[name] = account

    setConfig(config)
  }
}
