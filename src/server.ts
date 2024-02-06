import fastify from "fastify";
import { createPolls } from "./routes/create-polls";

const server = fastify();

server.register(createPolls);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
