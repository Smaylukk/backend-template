import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ status: error.status, message: error.message })
  }

  return res.status(500).json({ message: `Непередбачувана помилка - ${error}` })
}
