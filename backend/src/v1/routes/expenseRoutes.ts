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

expenseRouter.get("/:userId/:month/:year", getExpensesForMonthAndYearController);

expenseRouter.post("/create", authMiddleware, createExpenseController);

expenseRouter.put("/update", updateExpenseController);

expenseRouter.delete("/delete", deleteExpenseController);

export default expenseRouter;
