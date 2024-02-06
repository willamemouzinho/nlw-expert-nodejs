import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getPoll(server: FastifyInstance) {
  server.get(
    "/polls/:pollId",
    async (request: FastifyRequest, response: FastifyReply) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });
      const { pollId } = getPollParams.parse(request.params);

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
        });

        return response.code(200).send({ poll });
      } catch (error) {
        return response.code(500).send({ message: "Internal server error" });
      }
    }
  );
}
