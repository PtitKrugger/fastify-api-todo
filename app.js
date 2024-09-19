import Fastify from "fastify";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "./functions/todos.js";

const fastify = Fastify({
    logger: false
})

fastify.get('/todos', async (request, reply) => {
    const id = parseInt(request.query.id, 10);

    if (id) {
        reply.send(await getTodo(id))
    }
    else {
        reply.send(await getTodos());
    }
})

fastify.post('/todos', async (request, reply) => {
    reply.send(await createTodo(request.body));
})

fastify.put('/todos', async (request, reply) => {
    reply.send(await updateTodo(parseInt(request.query.id, 10), request.body));
})

fastify.delete('/todos', async (request, reply) => {
    await deleteTodo(parseInt(request.query.id, 10));
    reply.code(204);
})

fastify.listen({port: 3000}, (err, address) => {
    if (err) throw err
})