import { Arguments, Argv, CommandModule } from 'yargs'

export abstract class Command {
  abstract command: string
  aliases?: string | string[]
  describe: string = ''

  protected args!: Arguments

  builder(args: Argv): Argv {
    return args
  }

  handler(args: Arguments): any {
    return
  }

  panic(msg: string = '', code: number = 1) {
    msg = msg.trim()
    if (msg) {
      console.error(msg)
    }
    process.exit(code)
  }

  done(msg: string = '') {
    msg = msg.trim()
    if (msg) {
      console.log(msg)
    }
    process.exit(0)
  }
}
