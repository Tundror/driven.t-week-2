import { CreatePayment } from "@/protocols";
import paymentRepository from "@/repositories/payments-repository";

export async function MakePayment (body: CreatePayment, userId: number){
    const result = await paymentRepository.MakePayment(body, userId)
    return result
}

const paymentService = {
    MakePayment
}

export default paymentService