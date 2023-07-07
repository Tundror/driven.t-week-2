import { getTicketsTypes } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router()

ticketsRouter.get("/types", authenticateToken, getTicketsTypes)
ticketsRouter.get("/", authenticateToken, )
ticketsRouter.post("/", authenticateToken, )

export { ticketsRouter }