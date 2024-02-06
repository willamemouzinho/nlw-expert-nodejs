import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function createPolls(server: FastifyInstance) {
  server.post(
    "/polls",
    async (request: FastifyRequest, response: FastifyReply) => {
      const createPollBody = z.object({
        title: z.string(),
      });
      const { title } = createPollBody.parse(request.body);

      const poll = await prisma.poll.create({
        data: {
          title,
        },
      });

      return response.code(201).send({ pollId: poll.id });
    }
  );
}
