import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema } from "joi"

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error) {
            const erros = validation.error.details.map((detail) => detail.message)
            return res.status(422).send(erros)
        }
        next()
    }

}