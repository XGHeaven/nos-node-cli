import { Argv } from 'yargs'
import { BaseCommand } from '../base-command'
import { AccountListCommand } from './list'
import { AccountLoginCommand } from './login'
import { AccountLogoutCommand } from './logout'

export class AccountCommand extends BaseCommand {
  command = 'account'
  describe = 'Manage Account'

  builder(args: Argv) {
    return args
      .demandCommand()
      .command(new AccountListCommand())
      .command(new AccountLoginCommand())
      .command(new AccountLogoutCommand())
  }
}
