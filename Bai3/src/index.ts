import express from 'express'
import 'dotenv/config'
import router from './routes'

const app = express()
const HOST = process.env.HOST || 3000

app.use(express.json()) // for parsing application/json
router(app)

app.listen(HOST, () => {
    console.log(`Server is running on port http://localhost:${HOST}`)
})
