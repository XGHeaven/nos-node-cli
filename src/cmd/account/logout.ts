import * as yargs from 'yargs'
import { setConfig } from '../../config'
import { BaseCommand } from '../base-command'

export class AccountLogoutCommand extends BaseCommand {
  command = 'logout'
  describe = 'Logout a account'

  handler(args: yargs.Arguments): void {
    const config = this.config
    delete config.accounts[args.account]
    setConfig(config)
  }
}
