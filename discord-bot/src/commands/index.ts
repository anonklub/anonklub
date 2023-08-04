import { _Command } from './_Command'
import { CommandName } from './interface'
import { ProveCommand } from './ProveCommand'
import { VerifyCommand } from './VerifyCommand'

export const commands: Map<CommandName, _Command> = new Map([
  [CommandName.Verify, new VerifyCommand()],
  [CommandName.Prove, new ProveCommand()],
])

export { CommandName }
