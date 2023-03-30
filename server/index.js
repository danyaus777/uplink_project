const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')

const PORT = process.env.PORT || 3000

app.use(express.json())

const upload = multer({storage:multer.memoryStorage()})

const router = require('./routes/router.js')
app.use('', router)

app.listen(PORT, ()=> console.log("Сервер запущен на порту" + PORT))