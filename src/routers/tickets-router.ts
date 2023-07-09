import { getTicket, getTicketsTypes, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { validateSchema } from '@/middlewares/validateSchema-middleware';
import { createTicketSchema } from '@/schemas/ticket-schemas';
import { Router } from 'express';

const ticketsRouter = Router()

ticketsRouter.get("/types", authenticateToken, getTicketsTypes)
ticketsRouter.get("/", authenticateToken, getTicket)
ticketsRouter.post("/", authenticateToken, validateBody(createTicketSchema), postTicket)

export { ticketsRouter }