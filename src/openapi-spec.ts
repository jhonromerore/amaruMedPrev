// Copyright Andres Grijalva 2020. All Rights Reserved.
// Node module: amarumed
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { ApplicationConfig } from '@loopback/core'
import { Application } from './application'

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost'
    }
  }
  const outFile = process.argv[2] ?? ''
  const app = new Application(config)
  await app.boot()
  await app.exportOpenApiSpec(outFile)
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err)
  process.exit(1)
})
