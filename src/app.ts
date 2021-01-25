import cookieParser from 'cookie-parser'
import { server } from './server'

server.express.use(cookieParser())

server.start({ 
    port: 4444,
    cors: {
        origin: 'http://localhost:7777',
        credentials: true,
    },
}, ({ port }) => {
    console.log(
        `Server started, listening on port ${port}.`
    )
})