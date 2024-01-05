#!/usr/bin/env node

import { cli } from './Cli'

cli.run().catch((err) => {
  console.error(err)
  process.exit(1)
})
