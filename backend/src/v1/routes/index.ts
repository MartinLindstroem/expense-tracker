import { Router, Request, Response } from "express";

const v1Router: Router = Router();

v1Router.get("/healthz", async (req: Request, res: Response) => {
    res.status(200).json("Server is up!");
});

export default v1Router;
