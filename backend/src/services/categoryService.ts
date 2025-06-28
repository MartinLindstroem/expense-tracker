import { pool } from "../config/db";
import { HttpException } from "../utils/customError";

export const getCategories = async (userId: string) => {
  const categories = await pool.query(
    ` SELECT category_id as id, category_name as name FROM categories WHERE (user_id=$1) or (user_id is null)`,
    [userId]
  );

  return categories;
};

export const createCategory = async (userId: string, categoryName: string) => {
  if (categoryName.length === 0) {
    throw new HttpException(400, "Invalid data given");
  }
  await pool.query(`INSERT INTO categories (category_name, user_id) VALUES ($1, $2)`, [
    categoryName,
    userId,
  ]);
};

export const updateCategory = async (
  categoryId: string,
  newCategoryName: string,
  userId: string
) => {
  if (isNaN(parseInt(categoryId)) || isNaN(parseInt(userId)) || newCategoryName.length === 0) {
    throw new HttpException(400, "Invalid data given");
  }

  await pool.query(
    `UPDATE categories SET category_name=$1 WHERE category_id = $2 AND user_id = $3`,
    [newCategoryName, categoryId, userId]
  );
};

export const deleteCategory = async (categoryId: string, userId: string) => {
  if (isNaN(parseInt(categoryId)) || isNaN(parseInt(userId))) {
    throw new HttpException(400, "Invalid data given");
  }

  await pool.query(`DELETE FROM categories WHERE category_id = $1 AND user_id = $2`, [
    categoryId,
    userId,
  ]);
};
