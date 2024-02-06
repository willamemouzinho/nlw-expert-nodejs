import { randomUUID } from "node:crypto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function voteOnPoll(server: FastifyInstance) {
  server.post(
    "/polls/:pollId/votes",
    async (request: FastifyRequest, response: FastifyReply) => {
      const createVoteParams = z.object({
        pollId: z.string().uuid(),
      });
      const createVoteBody = z.object({
        pollOptionId: z.string().uuid(),
      });
      const { pollId } = createVoteParams.parse(request.params);
      const { pollOptionId } = createVoteBody.parse(request.body);

      let { sessionId } = request.cookies;

      if (sessionId) {
        const userPreviousVoteOnPoll = await prisma.vote.findUnique({
          where: {
            sessionId_pollId: {
              sessionId,
              pollId,
            },
          },
        });

        if (
          userPreviousVoteOnPoll &&
          userPreviousVoteOnPoll.pollOptionId !== pollOptionId
        ) {
          await prisma.vote.delete({
            where: {
              id: userPreviousVoteOnPoll.id,
            },
          });
        } else if (userPreviousVoteOnPoll) {
          return response
            .code(400)
            .send({ message: "You already voted on this poll." });
        }
      }

      if (!sessionId) {
        sessionId = randomUUID();
        response.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          signed: true,
          httpOnly: true,
        });
      }

      try {
        await prisma.vote.create({
          data: {
            sessionId,
            pollId,
            pollOptionId,
          },
        });

        return response.code(201).send({ message: "Vote successfuly" });
      } catch (error) {
        return response.code(500).send({ message: "Internal server error" });
      }
    }
  );
}
