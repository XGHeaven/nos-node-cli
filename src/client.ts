import { NosClient, PutObjectFileOptions } from '@xgheaven/nos-node-sdk'
import * as fs from 'fs'
import * as os from 'os'

export async function uploadFile(client: NosClient, param: PutObjectFileOptions) {
  const stat = fs.statSync(param.file)

  if (stat.size > 16 * 1024 * 1024) {
    // 如果文件大于 16M，那么就分片上传
    return await client.putBigObject({
      ...param,
      parallel: os.cpus().length,
    })
  }

  return await client.putObject(param)
}
