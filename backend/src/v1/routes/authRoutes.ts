import { Router, Request, Response } from "express";
import {
  createUserController,
  loginController,
  logoutController,
  refreshTokenController,
} from "../../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/signup", createUserController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

authRouter.post("/refresh-token", refreshTokenController);

// expenseRouter.get("/:userId/:month/:year", getExpensesForMonthAndYearController);

// expenseRouter.post("/create", createExpenseController);

// expenseRouter.put("/update", updateExpenseController);

// expenseRouter.delete("/delete", deleteExpenseController);

export default authRouter;
