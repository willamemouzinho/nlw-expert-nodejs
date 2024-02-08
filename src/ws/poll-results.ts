import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { redis } from '../lib/redis'
import { SocketStream } from '@fastify/websocket'

export async function pollResults(server: FastifyInstance) {
  server.get('/polls/:pollId/results', { websocket: true }, (connection) => {
    console.log('chegueii')
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
    connection.socket.on('message', (message: string) => {
      connection.socket.send('you sent ' + message)
    })
    //   const { pollId } = getPollParams.parse(request.params)
  })
}
// request: FastifyRequest,
// response: FastifyReply

// try {
//   connection.socket.on('message', (message) => {
//     connection.socket.send('you sent ' + message)
//   })
// } catch (error) {
//   return response.code(500).send({ message: 'Internal server error' })
// }
