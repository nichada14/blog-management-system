import express from 'express'
import authRoutes from './routes/auth.routes'
import blogRoutes from './routes/blog.routes'
import commentRoutes from './routes/comment.routes'
import cors from 'cors'  

const app = express()

app.use(cors())    
app.use(express.json())

// Mount routes for each feature
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/comments', commentRoutes)

export default app
