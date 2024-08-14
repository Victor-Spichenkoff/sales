import express from "express"
import cors from "cors"
import mainRouter from "./routes"

const app = express()

//basic middlwares
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//router
app.use(mainRouter)


const port = process.env.PORT || 2006

app.listen(port, ()=> console.log(`Runnig on: http://localhost:${port}`))