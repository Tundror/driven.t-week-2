import { prisma } from '@/config';
import { ticketTypeIdNotFound } from '@/errors/ticket-type-id-not-found';
import { userNotEnrolledError } from '@/errors/user-not-enrolled-error';
import { TicketData } from '@/protocols';

export async function getTicketsTypes() {
  const tickets = await prisma.ticketType.findMany()
  return tickets
}

export async function getTicket(userId: number) {
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

export async function postTicket(ticketTypeId: number, userId:number) {
  if (!ticketTypeId) {
    throw ticketTypeIdNotFound()
  }
  
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId
    },
  });

  if (!enrollment) {
    throw userNotEnrolledError()
  }

  const newTicket = await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollment.id,
    },
    include: {
      TicketType: true,
    },
  });

  const {
    id,
    status,
    ticketTypeId: typeId,
    enrollmentId,
    createdAt,
    updatedAt,
    TicketType,
  } = newTicket;

  const ticketData: TicketData = {
    id,
    status,
    ticketTypeId: typeId,
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
  getTicket,
  postTicket
}

export default ticketsRepository