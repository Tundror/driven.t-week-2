import { prisma } from '@/config';
import { notFoundError, unauthorizedError } from '@/errors';
import { CreatePayment, PaymentData } from '@/protocols';

export async function MakePayment(body: CreatePayment, userId: number){
    const {ticketId} = body
    const ticket = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
        include: {
          Enrollment: true,
          TicketType: true
        },
      });

  if (!ticket) {
    throw notFoundError()
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const paymentResult = await prisma.payment.create({
    data:{
        ticketId: ticketId,
        value: ticket.TicketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.toString().slice(-4), 
    }
  })

  await prisma.ticket.update({
    where:{
        id: ticketId
    },
    data: {
        status: "PAID",
    }

  })

    return paymentResult
  }

  export async function getPayment(ticketId: number, userId: number){
    const ticket = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
        include: {
          Enrollment: true,
          TicketType: true
        },
      });

  if (!ticket) {
    throw notFoundError()
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await prisma.payment.findFirst({
    where: {
        ticketId: ticketId
    }
  })

  return payment
  }

  const paymentRepository = {
    MakePayment,
    getPayment
  }
  
  export default paymentRepository
