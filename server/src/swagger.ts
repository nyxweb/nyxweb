import express from 'express'
import yaml from 'js-yaml'
import swaggerUI from 'swagger-ui-express'
import { readFileSync } from 'fs'
import { join } from 'path'

export const schema = yaml.load(readFileSync(join(__dirname, '../openapi.yaml'), 'utf8')) as swaggerUI.JsonObject

const app = express()

app.use('/', swaggerUI.serve, swaggerUI.setup(schema))

app.listen(5001, () => {
  console.log(`Swagger App running at http://localhost:5001`)
})
