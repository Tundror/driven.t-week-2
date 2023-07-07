import ticketsRepository from "@/repositories/tickets-repository"
import { TicketNotFoundError } from "./errors"

export async function getTicketsTypes(){
    const tickets = await ticketsRepository.getTicketsTypes()
    if(tickets.length == 0) return []
    return tickets
}

export async function getTicket(userId: number){
    const ticket = await ticketsRepository.getTicket(userId)
    console.log(ticket)
    if(ticket == null) throw TicketNotFoundError()
    return ticket
}

const ticketService = {
    getTicketsTypes,
    getTicket
}
export default ticketService