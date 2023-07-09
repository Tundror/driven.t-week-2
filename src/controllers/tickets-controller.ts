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
    const userId = req.userId as number
    const ticket = await ticketService.getTicket(userId)
    res.status(httpStatus.OK).send(ticket)
}

export async function postTicket(req: AuthenticatedRequest, res: Response){
    const ticketTypeId = req.body.ticketTypeId as number
    const userId = req.userId as number
    const result = await ticketService.postTicket(ticketTypeId, userId)
    res.status(httpStatus.CREATED).send(result)
}
