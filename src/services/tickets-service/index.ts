import ticketsRepository from "@/repositories/tickets-repository"
import { TicketNotFoundError } from "./errors"

export async function getTicketsTypes(){
    const tickets = await ticketsRepository.getTicketsTypes()
    if(tickets.length == 0) return []
    return tickets
}

export async function getTicket(userId: number){
    const ticket = await ticketsRepository.getTicket(userId)
    if(ticket == null) throw TicketNotFoundError()
    return ticket
}

export async function postTicket(ticketTypeId: number, userId: number){
    const result = await ticketsRepository.postTicket(ticketTypeId, userId)

    return result
}

const ticketService = {
    getTicketsTypes,
    getTicket,
    postTicket
}
export default ticketService