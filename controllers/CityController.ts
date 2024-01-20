import { Request, Response } from "express";

export function getCity(re: Request, res: Response) {
    return res.status(200).json({data: "getCity setup function"});
};