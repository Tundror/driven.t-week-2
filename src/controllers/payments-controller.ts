import { Request, Response } from 'express';
import { CreatePayment } from '@/protocols';
import paymentService from '@/services/payments-service';
import httpStatus from 'http-status';

interface AuthenticatedRequest extends Request {
    userId?: number;
  }

export async function createPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { ticketId, cardData } = req.body;
    const body = req.body as CreatePayment
    const userId = req.userId as number
    if (!ticketId || !cardData) {
      res.status(400).json({ error: 'Missing ticketId or cardData in the request body.' });
      return;
    }

    const payment = await paymentService.MakePayment(body, userId)
    res.status(httpStatus.OK).send(payment)
}
