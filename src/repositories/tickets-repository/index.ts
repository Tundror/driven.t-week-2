import { prisma } from '@/config';
import { TicketType } from '@/protocols';

export async function getTicketsTypes(){
    const tickets = await prisma.ticketType.findMany()
    return tickets
}

const ticketsRepository = {
    getTicketsTypes
}

export default ticketsRepository