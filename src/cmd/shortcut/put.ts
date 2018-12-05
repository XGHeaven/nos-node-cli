import { ObjectPutCommand } from '../object/put'

export class ShortcutPutCommand extends ObjectPutCommand {
  describe = 'Put a file/folder same as `object put`'
}
