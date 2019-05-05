import { dotenv } from "dotenv"
import express from "express"
import { postgraphile } from "postgraphile"

dotenv.config()
const app = express()

app.use(postgrahpile(process.env.DATABASE_URL))

app.listen(process.env.PORT)

