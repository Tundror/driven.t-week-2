import ticketsRepository from "@/repositories/tickets-repository"

export async function getTicketsTypes(){
    const tickets = await ticketsRepository.getTicketsTypes()
    if(tickets.length == 0) return []
    return tickets
}

const ticketService = {
    getTicketsTypes
}
export default ticketService