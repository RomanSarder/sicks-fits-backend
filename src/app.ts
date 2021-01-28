import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { server } from './server'

type DecodedUserToken = {
    userId: number,
    iat: number
};

server.express.use(cookieParser())

server.express.use((req, res, next) => {
    const { token } = req.cookies;

    try {
        if (token && token !== null) {
            const decoded: DecodedUserToken = jwt.verify(token, process.env.APP_SECRET as string) as DecodedUserToken;
            req.userId = decoded.userId;
        }
    } catch (e) {
        console.log('invalid token', e.message)
    } finally {
        next()
    }
})

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