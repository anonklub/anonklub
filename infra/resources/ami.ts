import { ec2 } from '@pulumi/aws'

export const ami = ec2.getAmi({
  filters: [
    {
      name: 'name',
      values: ['ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*'],
    },
    {
      name: 'virtualization-type',
      values: ['hvm'],
    },
  ],
  mostRecent: true,
  owners: ['amazon'],
})
