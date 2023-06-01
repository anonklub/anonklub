import { ec2 } from '@pulumi/aws'
import { readFileSync } from 'fs'
import { join } from 'path'
import { ami } from '../ami'
import { sshKey } from '../ssh-key'

const Name = 'anonklub-prove-api'
const userData = readFileSync(join(__dirname, 'user-data.sh'), 'utf8')

export const web = new ec2.Instance(Name, {
  ami: ami.then((ami) => ami.id),
  associatePublicIpAddress: true,
  instanceType: 't3.2xlarge',
  keyName: sshKey.keyName,
  rootBlockDevice: { volumeSize: 16, volumeType: 'gp3' },
  subnetId: 'subnet-0817be1b2160793b5',
  tags: { Name },
  userData,
  vpcSecurityGroupIds: ['sg-0aea3cbb15e30a921'],
})
