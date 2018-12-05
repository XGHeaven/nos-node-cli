import chalk from 'chalk'
import yargs, { Argv, CommandModule } from 'yargs'
import { Command } from './Command'

declare module 'yargs' {
  interface Argv {
    command(commander: Command): Argv
  }
}

const innerYargs = yargs.help()
const originCommand = yargs.command as Function

innerYargs.command = yargs.command = function MonkeyPatchCommand(this: Argv, ...argu: any[]) {
  if (argu[0] instanceof Command) {
    const cmd = argu[0]
    const commandModule: CommandModule = {
      command: cmd.command,
      describe: cmd.describe,
      aliases: cmd.aliases,
      builder: cmd.builder.bind(cmd),
      handler: (args) => {
        cmd.args = args
        Promise.resolve(cmd.handler.call(cmd, args)).catch((e) => {
          console.error('❌ ', chalk.red(e.toString()))
        })
      },
    }

    return originCommand.call(this, commandModule)
  }

  return originCommand.apply(this, argu)
}.bind(innerYargs)
