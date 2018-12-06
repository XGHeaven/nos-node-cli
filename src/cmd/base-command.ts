import chalk from 'chalk'
import yargs from 'yargs'
import { getConfig, NosCliConfig } from '../config'
import { Command } from '../redstone/Command'

export abstract class BaseCommand extends Command {
  private _config?: NosCliConfig
  get config(): NosCliConfig {
    return (this._config = this._config || getConfig())
  }

  handler(args: yargs.Arguments) {
    yargs.showHelp('error')
    console.log('Unknown command:', chalk.magenta(`${args.$0} ${args._.join(' ')}`))
    process.exit(1)
  }
}
