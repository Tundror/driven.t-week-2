import { CreatePayment } from '@/protocols';
import Joi from 'joi';

export const CreatePaymentSchema = Joi.object<CreatePayment>({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
      issuer: Joi.string().required(),
      number: Joi.number().required(),
      name: Joi.string().required(),
      expirationDate: Joi.string().required(),
      cvv: Joi.number().required(),
    }).required(),
});