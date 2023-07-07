import { authenticateToken } from '@/middlewares';
import { TicketStatus } from '@prisma/client';
import { Router } from 'express';

const paymentsRouter = Router()

paymentsRouter.get("/", authenticateToken, )
paymentsRouter.post("/", authenticateToken, )

export { paymentsRouter }

