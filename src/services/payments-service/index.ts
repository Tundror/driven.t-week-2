import { CreatePayment } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";

export async function MakePayment (body: CreatePayment, userId: number){
    const result = await paymentRepository.MakePayment(body, userId)
    return result
}

export async function GetPayment (ticketId: number, userId: number){
    const ticket = await paymentRepository.getPayment(ticketId, userId)
    return ticket
}

const paymentService = {
    MakePayment,
    GetPayment
}

export default paymentService