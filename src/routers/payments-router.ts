import { createPayment } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';
import { TicketStatus } from '@prisma/client';
import { Router } from 'express';

const paymentsRouter = Router()

paymentsRouter.get("/", authenticateToken, )
paymentsRouter.post("/process", authenticateToken, createPayment)

export { paymentsRouter }

