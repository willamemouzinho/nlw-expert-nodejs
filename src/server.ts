import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from '@fastify/websocket'

import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-results'

const server = fastify()

server.register(fastifyCookie, {
  secret: 'nlw-expert-lkahsdfkfcehfi7x4x47rny43x4',
  hook: 'onRequest',
})
server.register(fastifyWebsocket)

server.register(createPoll)
server.register(getPoll)
server.register(voteOnPoll)

server.register(pollResults)

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
