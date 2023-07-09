import { getTicket, getTicketsTypes, postTicket } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router()

ticketsRouter.get("/types", authenticateToken, getTicketsTypes)
ticketsRouter.get("/", authenticateToken, getTicket)
ticketsRouter.post("/", authenticateToken, postTicket)

export { ticketsRouter }