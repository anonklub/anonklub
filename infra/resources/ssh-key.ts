import { ec2 } from '@pulumi/aws'
import { publicKey } from './config'

export const sshKey = new ec2.KeyPair('anonklub-devops', {
  keyName: 'anonklub-devops',
  publicKey,
})
