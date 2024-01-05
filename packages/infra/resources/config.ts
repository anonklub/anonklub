import { Config } from '@pulumi/pulumi'
import { readFileSync } from 'fs'

const config = new Config()

const sshPubKeyName = config.require('sshPubKeyName')
const sshPubKeyPath = `${process.env.HOME}/.ssh/${sshPubKeyName}.pub`

export const publicKey = readFileSync(sshPubKeyPath, 'utf8').trim()
