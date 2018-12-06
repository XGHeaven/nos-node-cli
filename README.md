# NOS-CLI

NOS 对象存储工具，帮助你在终端下轻松管理对象、桶，提供友好的交互方式。

> NOS 是什么？他是网易推出的一款对象存储服务，[简介](https://www.163yun.com/product/nos)

本工具由强力支持：[@xgheaven/nos-node-sdk](https://github.com/XGHeaven/nos-node-sdk)

<span style="font-size: 10px">弱弱的表示，NOS 现在暂未国际化，所以以下都是中文文档</span>

## 安装

```bash
npm install @xgheaven/nos-cli -g
# or
yarn global add @xgheaven/nos-cli
```

`nos-cli` 就可以安装到全局了

## Why So 好用

- 操作简洁直观
- 支持多用户切换

## 使用

输入 `nos-cli --help` 可以查看完成命令

```
nos-cli <command>

Commands:
  nos-cli object            Manage Object
  nos-cli bucket            Manage Bucket
  nos-cli account           Manage Account
  nos-cli login             Login Account same as `account login`
  nos-cli put <file> [key]  Put a file/folder same as `object put`
  nos-cli get <key>         Get a file content same as `object get`

Options:
  --version           Show version number                              [boolean]
  --accessKey, -K     NOS AccessKey                                     [string]
  --accessSecret, -S  NOS AccessSecret                                  [string]
  --endpoint, -e      NOS Endpoint                                      [string]
  --bucket, -b        NOS Bucket                                        [string]
  --account, -a       Account, default is "default" account
                                                   [string] [default: "default"]
  -h, --help          Show help                                        [boolean]
```

### 基本使用介绍

了解下面的原则，一定程度上会降低你的使用成本。

1. 配置文件默认存储在 `$HOME/.nosrc`，强迫症人士卸载 cli 之后删除这个文件即可
2. 多用户系统，每个用户有自己独立的 key/secret/endpoint/defaultBucket，通过 `--account` 参数指定
3. 通常有 `--accessKey` `--accessSecret` `--endpoint` 这个三个全局参数，
   在任意命令下，都可以使用这三个参数指定你要使用的账户和端口，对于 Object 的操作，`--bucket` 也是必须的。
   你可以通过将这几个参数存储到用户中来简化参数，当然也可以在使用的时候覆盖用户的配置
4. 如果你使用过 docker CLI，那么你会对命令结构比较熟悉。
5. 虽然文档使用中文，但是 Cli 还是使用英文，部分结果会有中文输出。因为部分数据从服务器返回的数据里面是中文。
6. 并不完全按照 Linux 的工作形式，即使无出错，也可能会打印一些提示信息。这一点和七牛的 [qrsctl](https://developer.qiniu.com/kodo/tools/1300/qrsctl#10) 不太一致。
   但是保证操作成功，退出码一定为 0。再说命令行是给人用的，不做的好看点怎么可以呢 (^\_^)

### 自动补全

> 暂时不支持 zsh/fish

```bash
nos-cli completion >> ~/.bashrc # 生成补全脚本

source ~/.bashrc
# or 重启终端
```

### 账户

首先设置账户，当然你也可以跳过这一节不设置账户，而是在执行命令的时候手动指定必要的参数。

```bash
nos-cli account login\
    --accessKey your-access-key\ # required
    --accessSecret your-access-secret\ # required
    --endpoint http://nos-eastchina1.126.net\ # optional
    --bucket nos-cli # optional

# 默认情况下使用的是 default 账户，你可以通过 --account 指定账户

# 你可以使用简写的参数，可以查看 `--help`
nos-cli account login\
    -K your-key -S your-secret
    -e http://nos-eastchina1.126.net -b nos-cli
    --account user1

nos-cli login xxxx blahblah # account login 的缩写指令

nos-cli account list # 列出所有的账号
nos-cli account logout user1 # 如果不指定 account 用的是默认账号
```

### 文件管理

```
nos-cli object

Manage Object

Commands:
  nos-cli object put <file> [key]  Put a object to bucket
  nos-cli object get <key>         Get a object content, default output stdout
  nos-cli object delete <key..>    Delete a object
  nos-cli object info <key>        Get a object info/metadata

Options:
  --version           Show version number                              [boolean]
  --accessKey, -K     NOS AccessKey                                     [string]
  --accessSecret, -S  NOS AccessSecret                                  [string]
  --endpoint, -e      NOS Endpoint                                      [string]
  --bucket, -b        NOS Bucket                                        [string]
  --account, -a       Account, default is "default" account
                                                   [string] [default: "default"]
  -h, --help          Show help                                        [boolean]
```

#### 上传文件

```bash
# 使用默认账号，如果不指定 `object-key.jpg` 那么默认是本地文件名
nos-cli object put current-file.jpg object-key.jpg

# 你也可以上传一个文件夹到桶根目录，不写 `/` 也是接受的
nos-cli object put current-folder/ /
```

#### 下载文件

```bash
# 默认输出到 stdout
nos-cli object get object-key.jpg

# 通过 `-o` `--output` 参数指定输出文件
nos-cli object get object-key.jpg -o ~/object.jpg
```

#### 其他命令

```bash
# 删除文件
nos-cli object delete object-key.jpg

# 查看文件信息和元数据
nos-cli object info object-key.jpg
```

更多命令请查看 `--help` 帮助文档

### 桶管理

```
nos-cli bucket

Manage Bucket

Commands:
  nos-cli bucket list           List all buckets
  nos-cli bucket create <name>  Create a Bucket
  nos-cli bucket delete <name>  Delete a Bucket

Options:
  --version           Show version number                              [boolean]
  --accessKey, -K     NOS AccessKey                                     [string]
  --accessSecret, -S  NOS AccessSecret                                  [string]
  --endpoint, -e      NOS Endpoint                                      [string]
  --bucket, -b        NOS Bucket                                        [string]
  --account, -a       Account, default is "default" account
                                                   [string] [default: "default"]
  -h, --help          Show help                                        [boolean]
```

```bash
# 如果不添加 `--public` 默认是私有
nos-cli bucket create bucket-name --public

nos-cli bucket delete bucket-name
```

## 帮助

如果您有任何的意见和建议，都可以通过 issue 的方式提出来。感谢您的使用
