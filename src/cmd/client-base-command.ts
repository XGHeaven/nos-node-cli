import { NosClient, NosClientOptions } from '@xgheaven/nos-node-sdk'
import chalk from 'chalk'
import { BIN_NAME } from '../constant'
import { BaseCommand } from './base-command'

export abstract class ClientBaseCommand extends BaseCommand {
  get client(): NosClient {
    if (this._client) {
      return this._client
    }

    const { config, args } = this
    const account = config.accounts[args.account]

    if (!account) {
      this.panic(`Cannot found account '${args.account}', please try again`)
    }

    const nosClientOptions: Partial<NosClientOptions> = {
      accessKey: args.accessKey || account.accessKey,
      accessSecret: args.accessSecret || account.accessSecret,
      endpoint: args.endpoint || account.endpoint,
      defaultBucket: args.bucket || account.defaultBucket,
    }

    if (this.isValidNosClientOption(nosClientOptions)) {
      return (this._client = new NosClient(nosClientOptions))
    } else {
      // 如果检查失败，会直接退出程序，不可能到这里的，这里只是为了跳过错误检查
      return (null as any) as NosClient
    }
  }
  protected _checkBucket = true
  private _client?: NosClient

  protected isValidNosClientOption(options: Partial<NosClientOptions>): options is NosClientOptions {
    if (!options.accessKey || !options.accessSecret) {
      console.error('Please special AccessKey or AccessSecret by run follow command')
      console.error(chalk.yellow(`  ${BIN_NAME} account accessKey accessSecret`))
      this.panic()
    }

    if (!options.endpoint) {
      console.error(`Please special endpoint by add ${chalk.blue('--endpoint/-e')} option or run follow command`)
      console.error('to set default global endpoint')
      console.error(chalk.green(`  ${BIN_NAME} account accessKey accessSecret --endpoint your-endpoint`))
      this.panic()
    } else {
      const { endpoint } = options
      if (!endpoint.startsWith('http')) {
        console.warn(chalk.yellow(`Warning: No protocol found in "${endpoint}", "http" protocol added automatic`))
        options.endpoint = `http://${endpoint}`
      }
    }

    if (this._checkBucket && !options.defaultBucket) {
      console.error(`Please special bucket by add ${chalk.blue('--bucket/-b')} option or run follow command`)
      console.error('to set default global endpoint')
      console.error(chalk.green(`  ${BIN_NAME} account accessKey accessSecret --defaultBucket your-bucket`))
      this.panic()
    }

    return true
  }
}
