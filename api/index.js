import express from "express"
import { postgraphile } from "postgraphile"

const app = express()

app.use(postgrahpile(process.env.DATABASE_URL))

app.listen(process.env.PORT)

