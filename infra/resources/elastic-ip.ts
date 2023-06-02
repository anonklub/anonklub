import { ec2 } from '@pulumi/aws'
import { ec2Instance } from './ec2-instance'

export const elasticIp = new ec2.Eip('eip', {
  instance: ec2Instance.id,
  vpc: true,
})
