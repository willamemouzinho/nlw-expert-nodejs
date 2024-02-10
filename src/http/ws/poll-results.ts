import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'
import { redis } from '../../lib/redis'
import { SocketStream } from '@fastify/websocket'
import { voting } from '../../utils/voting-pub-sub'

export async function pollResults(server: FastifyInstance) {
  server.get(
    '/polls/:pollId/results',
    { websocket: true },
    (connection: SocketStream, request: FastifyRequest) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })
      const { pollId } = getPollParams.parse(request.params)

      try {
        voting.subscribe(pollId, (message) => {
          connection.socket.send(JSON.stringify(message))
        })
      } catch (error) {
        console.log(error)
      }
    }
  )
}
