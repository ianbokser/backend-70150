import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import authRouter from "./routes/auth.router.js"
import userRouter from "./routes/user.router.js"
import cookieParser from 'cookie-parser'
import { initializePassport } from './config/passport.config.js'
import cartRouter from './routes/carts.router.js'
import productsRouter from './routes/products.router.js'
import mocksRouter from './routes/mocks.router.js'
import { __dirname } from './utils/path.js'
import { initMongoDB } from './db/dbMongo.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { info } from './docs/info.js'


const port = 8080
const app = express()

const specs = swaggerJSDoc(info)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())


mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/carts/', cartRouter)
app.use('/api/products/', productsRouter)
app.use('/api/products/', mocksRouter)

initMongoDB()



app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})