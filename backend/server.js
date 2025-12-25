import express from 'express'
import notesRouter from './routes/route.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.resolve()

// CORS for development
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: "http://localhost:5173",
    }))
}

// Body parser
app.use(express.json())

// Rate limiter
app.use(rateLimiter)

// API routes
app.use("/api/notes", notesRouter)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    // SPA fallback route
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

// Connect to DB and start server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})
