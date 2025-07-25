// Copyright Andres Grijalva 2020. All Rights Reserved.
// Node module: amarumed
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

require('dotenv').config()
import fs from 'fs'
import { ApplicationConfig } from './application'
import { Application } from './application'
import { SERVER } from './configs'
import { EMAIL } from './configs'
import { print } from './utils'

export * from './application'

export async function main(options: ApplicationConfig = {}) {
  const app = new Application(options)
  await app.boot()
  await app.start()

  const url = app.restServer.url
  console.clear()
  print.titlebox('The application is running')

  console.log(`\x1b[36m\tCLIENT:    \x1b[0m${url}`)
  console.log(`\x1b[36m\tAPI:       \x1b[0m${url}/api/explorer`)
  if (!EMAIL.isSupported()) {
    console.log(`\x1b[33m\tWARNING:   \x1b[0mEmail is not supported.`)
  }

  return app
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true
      }
    }
  }
  main(config).catch(err => {
    console.error('Cannot start the application.', err)
    process.exit(1)
  })
}

// create sandbox directory
if (!fs.existsSync(SERVER.sandbox)) {
  fs.mkdirSync(SERVER.sandbox)
}
