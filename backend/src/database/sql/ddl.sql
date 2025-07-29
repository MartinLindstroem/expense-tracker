-- CREATE DATABASE expense_tracker;

\c expense_tracker_dev

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(80) NOT NULL,
    created DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    user_id INTEGER,
    CONSTRAINT user_id
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS expenses(
    expense_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expense_name VARCHAR(50) NOT NULL,
    expense_amount INTEGER NOT NULL,
    expense_notes VARCHAR(200),
    expense_date DATE NOT NULL,
    expense_category INT NOT NULL,
    CONSTRAINT expense_category
      FOREIGN KEY(expense_category) 
      REFERENCES categories(category_id),
    CONSTRAINT user_id
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);

INSERT INTO users (user_id, email, username, password_hash, created) VALUES ('1', 'admin@admin.com', 'admin', '$2y$10$fa2ml1f3e5h4Ag/zp5pU.uGZzpW39OmpdgKNqgxraIabCMO3QD322', '2022-08-13');