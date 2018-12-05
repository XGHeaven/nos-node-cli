import * as fs from 'fs'

export function isFolder(folder: string): boolean {
  try {
    return fs.statSync(folder).isDirectory()
  } catch (e) {
    return false
  }
}
