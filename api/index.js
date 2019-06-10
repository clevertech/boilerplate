import express from "express"
import { postgraphile } from "postgraphile"

const app = express()

app.use(postgraphile(process.env.DATABASE_URL))

app.listen(process.env.PORT)

