import ticketService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

interface AuthenticatedRequest extends Request {
    userId?: number;
  }

export async function getTicketsTypes(req: Request, res: Response){
    const tickets = await ticketService.getTicketsTypes()
    res.status(httpStatus.OK).send(tickets)
}

export async function getTicket(req: AuthenticatedRequest, res: Response){
    const userId = req.userId
    const ticket = await ticketService.getTicket(userId)
    res.status(httpStatus.OK).send(ticket)
}
