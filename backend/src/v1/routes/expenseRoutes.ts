import { Router, Request, Response } from "express";
import {
  getAllExpensesController,
  getExpensesFromYearController,
  getExpensesForMonthAndYearController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
} from "../../controllers/expenseController";
import authMiddleware from "../../middlewares/authMiddleware";

const expenseRouter: Router = Router();

expenseRouter.get("/", authMiddleware, getAllExpensesController);

expenseRouter.get("/:year", authMiddleware, getExpensesFromYearController);

expenseRouter.get("/:userId/:month/:year", authMiddleware, getExpensesForMonthAndYearController);

expenseRouter.post("/create", authMiddleware, createExpenseController);

expenseRouter.put("/update", authMiddleware, updateExpenseController);

expenseRouter.delete("/delete", authMiddleware, deleteExpenseController);

export default expenseRouter;
