import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function createPoll(server: FastifyInstance) {
  server.post(
    '/polls',
    async (request: FastifyRequest, response: FastifyReply) => {
      const createPollBody = z.object({
        title: z.string(),
        options: z.array(z.string()),
      })
      const { title, options } = createPollBody.parse(request.body)

      try {
        const poll = await prisma.poll.create({
          data: {
            title,
            options: {
              createMany: {
                data: options.map((option) => ({
                  title: option,
                })),
              },
            },
          },
        })

        return response.code(201).send({ pollId: poll.id })
      } catch (error) {
        return response.code(500).send({ message: 'Internal server error' })
      }
    }
  )
}
