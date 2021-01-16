import { server } from './server'

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