import { ApplicationError } from '@/protocols';

export function TicketNotFoundError(): ApplicationError {
  return {
    name: 'TicketNotFoundError',
    message: 'Ticket not found',
  };
}
