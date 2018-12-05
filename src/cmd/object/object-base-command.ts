import { Argv } from 'yargs'
import { ClientBaseCommand } from '../client-base-command'

export abstract class ObjectBaseCommand extends ClientBaseCommand {
  protected addKeyPositional(args: Argv) {
    return args.positional('key', {
      type: 'string',
      describe: 'Object Key',
    })
  }
}
