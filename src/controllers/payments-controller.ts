import { Request, Response } from 'express';
import { CreatePayment } from '@/protocols';
import paymentService from '@/services/payments-service';
import httpStatus from 'http-status';

interface AuthenticatedRequest extends Request {
    userId?: number;
  }

export async function createPayment(req: AuthenticatedRequest, res: Response){
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

export async function getPayment(req: AuthenticatedRequest, res: Response){
    const userId = req.userId as number
    const ticketId = req.query.ticketId as string
    const parsedTicketId = parseInt(ticketId)

    if (!ticketId || isNaN(parsedTicketId)) {
        res.status(400).json({ error: 'Invalid ticketId.' });
        return;
      }
    
    const payment = await paymentService.GetPayment(parsedTicketId, userId)
    res.status(httpStatus.OK).send(payment)
}