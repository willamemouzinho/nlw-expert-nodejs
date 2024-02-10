import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'
import { redis } from '../../lib/redis'

export async function getPoll(server: FastifyInstance) {
  server.get(
    '/polls/:pollId',
    async (request: FastifyRequest, response: FastifyReply) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      })
      const { pollId } = getPollParams.parse(request.params)

      try {
        const poll = await prisma.poll.findUnique({
          where: {
            id: pollId,
          },
          include: {
            options: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        })

        if (!poll)
          return response.code(400).send({ message: 'Poll not found.' })

        const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')
        const votes = result.reduce((obj, line, index) => {
          if (index % 2 === 0) {
            const score = Number(result[index + 1])
            Object.assign(obj, { [line]: score })
          }

          return obj
        }, {} as Record<string, number>)

        return response.code(200).send({
          poll: {
            id: poll.id,
            title: poll.title,
            options: poll.options.map((option) => ({
              id: option.id,
              title: option.title,
              score: option.id in votes ? votes[option.id] : 0,
            })),
          },
        })
      } catch (error) {
        return response.code(500).send({ message: 'Internal server error.' })
      }
    }
  )
}
