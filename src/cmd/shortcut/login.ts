import { AccountLoginCommand } from '../account/login'

export class ShortcutLoginCommand extends AccountLoginCommand {
  describe = 'Login Account same as `account login`'
}
