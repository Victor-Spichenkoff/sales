import express, { static as static_ } from "express"
import cors from "cors"
import mainRouter from "./routes"
import { configDotenv } from "dotenv"
import fileupload from "express-fileupload"  
import passport from "passport"
import { bearerStrategy } from "./lib/passport-bearer"
import { jwtStrategy } from "./lib/passport-jwt"
import { localStrategy } from "./lib/passport-local"

const app = express()
configDotenv()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(fileupload())
app.use(static_(__dirname + "../public"))
app.use(static_("../public/assets/images"))


//login
passport.use(localStrategy)
// passport.use(bearerStrategy)
passport.use(jwtStrategy)

//router
app.use(mainRouter)


const port = process.env.PORT || 2006

app.listen(port, ()=> console.log(`Runnig on: http://localhost:${port}`))