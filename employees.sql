CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender CHAR(1) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    email VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive', 'terminated') NOT NULL,
    hired_on DATE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
