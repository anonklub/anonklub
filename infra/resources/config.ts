import { Config } from '@pulumi/pulumi'
import { readFileSync } from 'fs'

const config = new Config()

const sshPubKeyPath = config.require('sshPubKeyPath')

export const publicKey = readFileSync(sshPubKeyPath, 'utf8')
console.log({ publicKey, sshPubKeyPath })
