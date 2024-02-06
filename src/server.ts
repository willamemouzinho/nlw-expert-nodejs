import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";

import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

const server = fastify();

server.register(fastifyCookie, {
  secret: "nlw-expert-lkahsdfkfcehfi7x4x47rny43x4",
  hook: "onRequest",
});

server.register(createPoll);
server.register(getPoll);
server.register(voteOnPoll);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
