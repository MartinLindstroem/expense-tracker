import { Router, Request, Response } from "express";
import {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../../controllers/categoryController";
import authMiddleware from "../../middlewares/authMiddleware";

const categoryRouter: Router = Router();

categoryRouter.get("/", authMiddleware, getCategoriesController);

categoryRouter.post("/create", authMiddleware, createCategoryController);

categoryRouter.put("/update", authMiddleware, updateCategoryController);

categoryRouter.delete("/delete", authMiddleware, deleteCategoryController);

export default categoryRouter;
