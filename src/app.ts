import { server } from './server'

server.start({ port: 4000 }, ({ port }) => {
    console.log(
        `Server started, listening on port ${port}.`
    )
})