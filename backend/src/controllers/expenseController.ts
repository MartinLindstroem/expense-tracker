import { Request, Response, NextFunction } from "express";
import {
  getAllUserExpenses,
  getExpensesFromYear,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import logger from "../logger/logger";

export const getAllExpensesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllUserExpenses(req.body.user.userId);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    next(error);
  }
};

export const getExpensesFromYearController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getExpensesFromYear(req.body.user.userId, req.params.year);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    next(error);
  }
};

export const getExpensesForMonthAndYearController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(200)
      .json(
        `Get all expenses for ${req.params.month} ${req.params.year} for user ${req.params.userId}`
      );
  } catch (error) {
    next(error);
  }
};

export const createExpenseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createExpense(
      req.body.user.userId,
      req.body.name,
      req.body.amount,
      req.body.notes,
      req.body.date,
      req.body.category
    );

    res.status(201).json({ data: "Expense created" });
  } catch (error: any) {
    next(error);
  }
};

export const updateExpenseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.user.userId;
    const result = await updateExpense(
      req.body.name,
      req.body.amount,
      req.body.notes,
      req.body.date,
      req.body.category,
      req.body.id,
      userId
    );

    if (result === true) {
      res.status(200).json({ data: "Expense updated" });
    } else {
      res.status(404).json({ data: "Expense not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteExpenseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.user.userId;

    const result = await deleteExpense(req.body.id, userId);

    if (result === true) {
      res.status(200).json({ data: "Expense deleted" });
    } else {
      res.status(404).json({ data: "Expense not found" });
    }
  } catch (error) {
    next(error);
  }
};
