#!/usr/bin/env node

import { cli } from './Cli/index.js'

cli.run().catch((err) => {
  console.error(err)
  process.exit(1)
})
