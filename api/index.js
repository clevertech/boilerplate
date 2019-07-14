import express from "express"
import { postgraphile } from "postgraphile"

const app = express()

console.log(process.env)
const db = process.env.DATABASE_URL
const schemas = process.env.POSTGRAPHILE_SCHEMAS
const options = process.env.POSTGRAPHILE_OPTIONS

app.use(postgraphile(db, schemas, options))

app.listen(process.env.PORT)

