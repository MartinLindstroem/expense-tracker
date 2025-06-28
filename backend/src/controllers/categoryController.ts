import { Request, Response, NextFunction } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import logger from "../logger/logger";

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getCategories(req.body.user.userId);

    res.status(200).json({ data: result.rows });
    logger.info("Categories retrieved successfully", { service: "category-service" });
  } catch (error: any) {
    logger.error("Error retrieving categories", {
      service: "category-service",
      error: error.message,
    });
    next(error);
  }
};

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createCategory(req.body.user.userId, req.body.categoryName);
    res.status(201).json({ status: 201, message: "Category successfully created" });
    logger.info("Category created successfully", { service: "category-service" });
  } catch (error: any) {
    logger.error("Error creating category", { service: "category-service", error: error.message });
    next(error);
  }
};

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateCategory(req.body.categoryId, req.body.newCategoryName, req.body.user.userId);
    res.status(201).json({ status: 201, message: "Category successfully updated" });
    logger.info("Category updated successfully", { service: "category-service" });
  } catch (error: any) {
    logger.error("Error updating category", { service: "category-service", error: error.message });
    next(error);
  }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteCategory(req.body.categoryId, req.body.user.userId);
    res.status(200).json({ status: 200, message: "Category successfully deleted" });
    logger.info("Category deleted successfully", { service: "category-service" });
  } catch (error: any) {
    logger.error("Error deleting category", { service: "category-service", error: error.message });
    next(error);
  }
};
