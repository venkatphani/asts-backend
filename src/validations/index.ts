import { validateInput } from "./input"
import { NextFunction } from "express";
import { Request, Response } from 'express';

export const validationMiddleware = (items: string[], key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, isValid } = validateInput(req[key], items);
      if (!isValid) {
        return res.status(400).json({ error: errors, success: false });
      }
      return next();
    } catch (error) {
      console.trace("validationMiddleware internal error", error);
      return res.status(500).json({ error: error, success: false });
    }
  };
};