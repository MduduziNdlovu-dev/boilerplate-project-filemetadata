const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.static('public'))

// File Upload Config
const storage = multer.memoryStorage() // we don't need to store files permanently
const upload = multer({ storage: storage })

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

// POST /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
