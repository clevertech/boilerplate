import express from "express"
import { executeDbQuery } from './helpers/db'
import installPostgraphile from './middleware/installPostgraphile'

const app = express()

installPostgraphile(app, { executeDbQuery })

app.listen(process.env.PORT)

