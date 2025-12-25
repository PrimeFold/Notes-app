import express from 'express'
import notesRouter from './routes/route.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import cors from 'cors'

dotenv.config()
 



const app = express()


app.use(cors({
    origin: "http://localhost:5173", // This should be the URL of your frontend application
})) 

app.use(express.json()) //this middleware will parse the json files..




//the middlewares we're using..
app.use(rateLimiter)



app.use("/api/notes",notesRouter)


//this is our simple custom middleware
//app.use((req,res,next)=>{
//   console.log("We have received a new req")
//    next()
//})

const port = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server started on : ",port)
    })
})



