import express from 'express'
import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'
import path from 'path'

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'))
const app = express()

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(5001, () => {
  console.log(`Swagger App running at http://localhost:5001`)
})
