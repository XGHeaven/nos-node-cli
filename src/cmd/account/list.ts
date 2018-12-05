import jsome from 'jsome'
import * as yargs from 'yargs'
import { BaseCommand } from '../base-command'

export class AccountListCommand extends BaseCommand {
  command = 'list'
  describe = 'List all logon account'

  handler(args: yargs.Arguments): void {
    jsome(this.config.accounts)
  }
}
