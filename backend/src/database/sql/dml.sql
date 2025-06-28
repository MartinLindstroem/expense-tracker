INSERT INTO categories (category_name) VALUES 
    ('Car'),
    ('Entertainment'),
    ('Clothing'),
    ('Takeout'),
    ('Rent'),
    ('Investment'),
    ('Transport'),
    ('Travel');

INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('1', 'Sushi', '220', '2024-07-13', '4');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('1', 'Netflix', '179', '2024-07-25', '2');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('1', 'Jeans', '799', '2024-07-16', '3');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('1', 'Car', '90000', '2021-12-16', '1');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('30', 'The Last of Us 2', '549', '2024-09-16', '2');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('30', 'Tires', '5000', '2023-12-11', '1');
INSERT INTO expenses(user_id, expense_name, expense_amount, expense_date, expense_category) VALUES ('30', 'Pension', '2000', '2024-09-26', '6');

SELECT e.expense_name, e.expense_amount, c.category_name as category, e.expense_date
FROM expenses e
JOIN categories c ON e.expense_category = c.category_id
WHERE e.user_id = '123'
AND e.expense_date BETWEEN '2024-09-01' AND '2024-09-30';