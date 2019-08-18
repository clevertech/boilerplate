// splitting this file out from app.js to make it easier to use supertest
import app from "./app"

app.listen(process.env.PORT)

