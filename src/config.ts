import { NosClientOptions } from '@xgheaven/nos-node-sdk'
import * as fs from 'fs'
import { homedir } from 'os'
import * as path from 'path'

const configPath = path.join(homedir(), '.nosrc')

const defaultConfig: NosCliConfig = {
  accounts: {},
}

export interface NosCliConfig {
  accounts: NosCliAccounts
}

/**
 * 账户是集合，集成了一个 client 所必须的元素，包括 key, secret, bucket, endpoint 参数
 */
export interface NosCliAccount extends Partial<NosClientOptions> {
  endpoint?: string
}

export interface NosCliAccounts {
  [name: string]: NosCliAccount
}

export function getConfig(): NosCliConfig {
  if (fs.existsSync(configPath)) {
    try {
      return Object.assign({}, defaultConfig, JSON.parse(fs.readFileSync(configPath, 'utf8')))
    } catch (e) {
      return Object.assign({}, defaultConfig)
    }
  }

  return Object.assign({}, defaultConfig)
}

export function setConfig(config: NosCliConfig) {
  return fs.writeFileSync(configPath, JSON.stringify(config))
}
