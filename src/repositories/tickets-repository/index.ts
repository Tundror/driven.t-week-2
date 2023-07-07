import { prisma } from '@/config';
import { TicketData, TicketType } from '@/protocols';

export async function getTicketsTypes(){
    const tickets = await prisma.ticketType.findMany()
    return tickets
}

export async function getTicket(userId: number){
    const ticket = await prisma.ticket.findFirst({
      where: {
        Enrollment: {
          userId: userId,
        },
      },
      include: {
        TicketType: true,
        Enrollment: true,
      },
    });
  
    if (!ticket) {
      return null;
    }
  
    const {
      id,
      status,
      ticketTypeId,
      enrollmentId,
      createdAt,
      updatedAt,
      TicketType,
    } = ticket;
  
    const ticketData: TicketData = {
      id,
      status,
      ticketTypeId,
      enrollmentId,
      TicketType: {
        id: TicketType.id,
        name: TicketType.name,
        price: TicketType.price,
        isRemote: TicketType.isRemote,
        includesHotel: TicketType.includesHotel,
        createdAt: TicketType.createdAt,
        updatedAt: TicketType.updatedAt,
      },
      createdAt,
      updatedAt,
    };
  
    return ticketData;
  }

const ticketsRepository = {
    getTicketsTypes,
    getTicket
}

export default ticketsRepository