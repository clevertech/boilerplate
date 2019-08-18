import express from "express"
import installPostgraphile from './middleware/installPostgraphile'

const app = express()

installPostgraphile(app)

export default app
