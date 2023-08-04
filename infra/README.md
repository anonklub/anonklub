# Infra

Typescript pulumi project to manage proving server infrastructure on AWS.

## Deploy

1. Ensure aws credentials are set in `~/.aws/credentials`
2. Check config in `Pulumi.dev.yaml` (especially key pair `~/.ssh/sshPubKeyName(.pub)` needs to be defined)
3. Update stack and deploy new changes: `pulumi up -y`
4. Copy `.zkey` file to remote server: `pnpm copyzkey`
