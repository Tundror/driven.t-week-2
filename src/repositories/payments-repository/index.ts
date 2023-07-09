import { prisma } from '@/config';
import { notFoundError, unauthorizedError } from '@/errors';
import { CreatePayment } from '@/protocols';

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

  const paymentRepository = {
    MakePayment
  }
  
  export default paymentRepository
