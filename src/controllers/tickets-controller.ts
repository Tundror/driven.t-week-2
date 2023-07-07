import ticketService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res: Response){
    const tickets = await ticketService.getTicketsTypes()
    res.status(httpStatus.OK).send(tickets)
}