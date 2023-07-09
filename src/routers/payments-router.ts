import { createPayment, getPayment } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { validateSchema } from '@/middlewares/validateSchema-middleware';
import { CreatePaymentSchema } from '@/schemas/payments-schemas';
import { Router } from 'express';

const paymentsRouter = Router()

paymentsRouter.get("/", authenticateToken, getPayment)
paymentsRouter.post("/process", authenticateToken, validateBody(CreatePaymentSchema), createPayment)

export { paymentsRouter }

