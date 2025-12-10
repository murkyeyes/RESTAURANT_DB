-- SQL Server Full Database Script with Data
-- File: restaurantdb_full_sqlserver.sql
-- Converted from MySQL dump

USE master;
GO

-- Drop database if exists
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'restaurantdb')
BEGIN
    ALTER DATABASE restaurantdb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE restaurantdb;
END
GO

-- Create database
CREATE DATABASE restaurantdb;
GO

USE restaurantdb;
GO

-- =============================================
-- CREATE TABLES
-- =============================================

-- Table: staff
CREATE TABLE staff (
    Staff_ID INT PRIMARY KEY,
    Full_name NVARCHAR(100) NOT NULL,
    Position NVARCHAR(50) NOT NULL
);

-- Table: customer
CREATE TABLE customer (
    Customer_ID INT PRIMARY KEY,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Full_Name NVARCHAR(100) NOT NULL
);

-- Table: phonenumber
CREATE TABLE phonenumber (
    Customer_ID INT NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    PRIMARY KEY (Customer_ID, PhoneNumber),
    FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID)
);

-- Table: membership
CREATE TABLE membership (
    Member_ID INT PRIMARY KEY,
    Customer_ID INT NOT NULL UNIQUE,
    Register_date DATE NOT NULL,
    Total_points INT NOT NULL DEFAULT 0,
    Member_rank NVARCHAR(20) NOT NULL CHECK (Member_rank IN ('Silver', 'Gold', 'Platinum')),
    FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID)
);

-- Table: restaurant_table
CREATE TABLE restaurant_table (
    Table_ID INT PRIMARY KEY,
    Type NVARCHAR(50) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Staff_ID INT NOT NULL,
    FOREIGN KEY (Staff_ID) REFERENCES staff(Staff_ID)
);

-- Table: [order] (order is a reserved word in SQL Server)
CREATE TABLE [order] (
    Order_ID INT PRIMARY KEY,
    Table_ID INT NOT NULL,
    Customer_ID INT NOT NULL,
    Staff_ID INT NOT NULL,
    Order_time DATETIME NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Total_price DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (Table_ID) REFERENCES restaurant_table(Table_ID),
    FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID),
    FOREIGN KEY (Staff_ID) REFERENCES staff(Staff_ID)
);

-- Table: menu_item
CREATE TABLE menu_item (
    Item_ID INT PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Item_type NVARCHAR(20) NOT NULL CHECK (Item_type IN ('DISH', 'INGREDIENT'))
);

-- Table: dish
CREATE TABLE dish (
    Dish_ID INT PRIMARY KEY,
    Dish_type NVARCHAR(50) NOT NULL,
    Prep_time INT NOT NULL,
    FOREIGN KEY (Dish_ID) REFERENCES menu_item(Item_ID)
);

-- Table: warehouse
CREATE TABLE warehouse (
    Warehouse_ID INT PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Supplier NVARCHAR(100) NOT NULL,
    Address NVARCHAR(200),
    Inventory_quantity INT NOT NULL
);

-- Table: ingredient
CREATE TABLE ingredient (
    Ingredient_ID INT PRIMARY KEY,
    Warehouse_ID INT NOT NULL,
    Quantity_in_stock DECIMAL(18,2) NOT NULL,
    Unit NVARCHAR(20) NOT NULL,
    Expiry_date DATE NOT NULL,
    FOREIGN KEY (Ingredient_ID) REFERENCES menu_item(Item_ID),
    FOREIGN KEY (Warehouse_ID) REFERENCES warehouse(Warehouse_ID)
);

-- Table: dish_ingredient
CREATE TABLE dish_ingredient (
    Dish_ID INT NOT NULL,
    Ingredient_ID INT NOT NULL,
    Quantity_used DECIMAL(18,2) NOT NULL,
    Unit NVARCHAR(20) NOT NULL,
    PRIMARY KEY (Dish_ID, Ingredient_ID),
    FOREIGN KEY (Dish_ID) REFERENCES dish(Dish_ID),
    FOREIGN KEY (Ingredient_ID) REFERENCES ingredient(Ingredient_ID)
);

-- Table: orderitem
CREATE TABLE orderitem (
    Order_ID INT NOT NULL,
    Dish_ID INT NOT NULL,
    Quantity INT NOT NULL,
    Unit_price DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Item_note NVARCHAR(200),
    PRIMARY KEY (Order_ID, Dish_ID),
    FOREIGN KEY (Order_ID) REFERENCES [order](Order_ID),
    FOREIGN KEY (Dish_ID) REFERENCES dish(Dish_ID)
);

-- Table: bill
CREATE TABLE bill (
    Bill_ID INT PRIMARY KEY,
    Order_ID INT NOT NULL UNIQUE,
    Member_ID INT,
    Bill_time DATETIME NOT NULL,
    Discount DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    Total_amount DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (Order_ID) REFERENCES [order](Order_ID),
    FOREIGN KEY (Member_ID) REFERENCES membership(Member_ID)
);

-- Table: feedback
CREATE TABLE feedback (
    Feedback_ID INT PRIMARY KEY,
    Bill_ID INT NOT NULL,
    Customer_ID INT NOT NULL,
    Feedback_date DATETIME NOT NULL,
    Comment NVARCHAR(300),
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    FOREIGN KEY (Bill_ID) REFERENCES bill(Bill_ID),
    FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID)
);

-- Table: dish_feedback
CREATE TABLE dish_feedback (
    Feedback_ID INT PRIMARY KEY,
    Dish_ID INT NOT NULL,
    Rating_dish INT NOT NULL CHECK (Rating_dish BETWEEN 1 AND 5),
    Comment_dish NVARCHAR(300),
    FOREIGN KEY (Feedback_ID) REFERENCES feedback(Feedback_ID),
    FOREIGN KEY (Dish_ID) REFERENCES dish(Dish_ID)
);

-- Table: staff_feedback
CREATE TABLE staff_feedback (
    Feedback_ID INT PRIMARY KEY,
    Staff_ID INT NOT NULL,
    Rating_staff INT NOT NULL CHECK (Rating_staff BETWEEN 1 AND 5),
    Comment_staff NVARCHAR(300),
    FOREIGN KEY (Feedback_ID) REFERENCES feedback(Feedback_ID),
    FOREIGN KEY (Staff_ID) REFERENCES staff(Staff_ID)
);

-- Table: table_reservation
CREATE TABLE table_reservation (
    Reservation_ID INT PRIMARY KEY,
    Reservation_time DATETIME NOT NULL,
    Customer_ID INT NOT NULL,
    Table_ID INT NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES customer(Customer_ID),
    FOREIGN KEY (Table_ID) REFERENCES restaurant_table(Table_ID)
);

-- Table: staff_supervision
CREATE TABLE staff_supervision (
    Employee_ID INT PRIMARY KEY,
    Supervisor_ID INT NOT NULL,
    FOREIGN KEY (Employee_ID) REFERENCES staff(Staff_ID),
    FOREIGN KEY (Supervisor_ID) REFERENCES staff(Staff_ID)
);

-- Table: audit_log
CREATE TABLE audit_log (
    Log_ID INT PRIMARY KEY,
    User_ID INT NOT NULL,
    User_role NVARCHAR(50) NOT NULL,
    Action NVARCHAR(100) NOT NULL,
    Timestamp DATETIME NOT NULL,
    Error_message NVARCHAR(200),
    Status NVARCHAR(50) NOT NULL,
    Target_ID NVARCHAR(50),
    Target_entity NVARCHAR(50),
    Old_value NVARCHAR(200),
    New_value NVARCHAR(200),
    FOREIGN KEY (User_ID) REFERENCES staff(Staff_ID)
);

GO

-- =============================================
-- INSERT DATA
-- =============================================

-- Insert staff
INSERT INTO staff (Staff_ID, Full_name, Position) VALUES
(1, N'Nguyen Van A', N'Waiter'),
(2, N'Tran Thi B', N'Waiter'),
(3, N'Le Van C', N'Cashier'),
(4, N'Pham Thi D', N'Manager'),
(5, N'Hoang Van E', N'Chef'),
(6, N'Do Thi F', N'Assistant Chef');

-- Insert customer
INSERT INTO customer (Customer_ID, Email, Full_Name) VALUES
(1, 'alice@example.com', 'Alice Nguyen'),
(2, 'bob@example.com', 'Bob Tran'),
(3, 'carol@example.com', 'Carol Pham'),
(4, 'david@example.com', 'David Le'),
(5, 'eva@example.com', 'Eva Do'),
(6, 'frank@example.com', 'Frank Vo');

-- Insert phonenumber
INSERT INTO phonenumber (Customer_ID, PhoneNumber) VALUES
(1, '0901000001'),
(1, '0901000002'),
(2, '0902000001'),
(3, '0903000001'),
(4, '0904000001'),
(5, '0905000001'),
(6, '0906000001');

-- Insert membership
INSERT INTO membership (Member_ID, Customer_ID, Register_date, Total_points, Member_rank) VALUES
(101, 1, '2024-01-10', 120, 'Silver'),
(102, 2, '2024-02-15', 350, 'Gold'),
(103, 3, '2024-03-20', 800, 'Platinum'),
(104, 4, '2024-04-10', 90, 'Silver'),
(105, 5, '2024-05-05', 450, 'Gold'),
(106, 6, '2024-06-01', 1000, 'Platinum');

-- Insert restaurant_table
INSERT INTO restaurant_table (Table_ID, Type, Status, Staff_ID) VALUES
(1, N'2 nguoi', N'Trong', 1),
(2, N'4 nguoi', N'Trong', 1),
(3, N'4 nguoi', N'Dang dung', 2),
(4, N'6 nguoi', N'Trong', 2),
(5, N'2 nguoi', N'Dat truoc', 1),
(6, N'VIP', N'Trong', 4);

-- Insert menu_item
INSERT INTO menu_item (Item_ID, Name, Category, Price, Item_type) VALUES
(1, N'Pho bo', N'Mon chinh', 50000.00, 'DISH'),
(2, N'Bun cha', N'Mon chinh', 45000.00, 'DISH'),
(3, N'Ca phe sua', N'Do uong', 30000.00, 'DISH'),
(4, N'Tra dao', N'Do uong', 35000.00, 'DISH'),
(5, N'Kem trai cay', N'Trang mieng', 40000.00, 'DISH'),
(6, N'Nuoc ep cam', N'Do uong', 32000.00, 'DISH'),
(11, N'Banh pho', N'Nguyen lieu', 10000.00, 'INGREDIENT'),
(12, N'Thit bo', N'Nguyen lieu', 30000.00, 'INGREDIENT'),
(13, N'Bun tuoi', N'Nguyen lieu', 8000.00, 'INGREDIENT'),
(14, N'Ca phe bot', N'Nguyen lieu', 15000.00, 'INGREDIENT'),
(15, N'Sua dac', N'Nguyen lieu', 12000.00, 'INGREDIENT'),
(16, N'Cam tuoi', N'Nguyen lieu', 20000.00, 'INGREDIENT');

-- Insert dish
INSERT INTO dish (Dish_ID, Dish_type, Prep_time) VALUES
(1, N'Mon nuoc', 15),
(2, N'Mon nuong', 20),
(3, N'Do uong', 5),
(4, N'Do uong', 7),
(5, N'Trang mieng', 10),
(6, N'Do uong', 6);

-- Insert warehouse
INSERT INTO warehouse (Warehouse_ID, Name, Supplier, Address, Inventory_quantity) VALUES
(1, N'Kho chinh', N'NCC A', N'Quan 1', 1000),
(2, N'Kho lanh', N'NCC B', N'Quan 2', 500),
(3, N'Kho do kho', N'NCC C', N'Quan 3', 800),
(4, N'Kho tra cay', N'NCC D', N'Quan 4', 300),
(5, N'Kho do uong', N'NCC E', N'Quan 5', 600),
(6, N'Kho du phong', N'NCC F', N'Quan 6', 400);

-- Insert ingredient
INSERT INTO ingredient (Ingredient_ID, Warehouse_ID, Quantity_in_stock, Unit, Expiry_date) VALUES
(11, 1, 100.00, 'kg', '2026-01-01'),
(12, 2, 80.00, 'kg', '2025-12-31'),
(13, 1, 120.00, 'kg', '2025-11-30'),
(14, 3, 60.00, 'kg', '2026-03-01'),
(15, 3, 70.00, 'kg', '2026-02-01'),
(16, 4, 90.00, 'kg', '2026-04-01');

-- Insert dish_ingredient
INSERT INTO dish_ingredient (Dish_ID, Ingredient_ID, Quantity_used, Unit) VALUES
(1, 11, 0.10, 'kg'),
(1, 12, 0.20, 'kg'),
(2, 13, 0.15, 'kg'),
(3, 14, 0.05, 'kg'),
(3, 15, 0.03, 'kg'),
(6, 16, 0.20, 'kg');

-- Insert [order]
INSERT INTO [order] (Order_ID, Table_ID, Customer_ID, Staff_ID, Order_time, Status, Total_price) VALUES
(1, 1, 1, 1, '2025-12-05 18:05:00', N'Da thanh toan', 0.00),
(2, 3, 2, 2, '2025-12-05 19:00:00', N'Dang phuc vu', 0.00),
(3, 2, 3, 1, '2025-12-06 12:00:00', N'Dang phuc vu', 0.00),
(4, 4, 4, 2, '2025-12-06 20:00:00', N'Dang phuc vu', 0.00),
(5, 5, 5, 1, '2025-12-07 11:30:00', N'Da thanh toan', 0.00),
(6, 6, 6, 3, '2025-12-07 19:00:00', N'Da thanh toan', 0.00);

-- Insert orderitem
INSERT INTO orderitem (Order_ID, Dish_ID, Quantity, Unit_price, Status, Item_note) VALUES
(1, 1, 2, 50000.00, N'Hoan thanh', NULL),
(1, 3, 2, 30000.00, N'Hoan thanh', NULL),
(2, 2, 1, 45000.00, N'Dang lam', NULL),
(3, 4, 2, 35000.00, N'Dang lam', N'It da'),
(5, 5, 1, 40000.00, N'Hoan thanh', N'Them trai cay'),
(6, 6, 2, 32000.00, N'Hoan thanh', NULL);

-- Insert bill
INSERT INTO bill (Bill_ID, Order_ID, Member_ID, Bill_time, Discount, Total_amount) VALUES
(1, 1, 101, '2025-12-05 18:30:00', 10.00, 144000.00),
(2, 5, 102, '2025-12-07 11:50:00', 5.00, 38000.00),
(3, 3, 103, '2025-12-06 12:45:00', 0.00, 70000.00),
(4, 2, NULL, '2025-12-05 19:30:00', 0.00, 45000.00),
(5, 4, 104, '2025-12-06 20:45:00', 15.00, 90000.00),
(6, 6, 106, '2025-12-07 19:30:00', 20.00, 51200.00);

-- Insert feedback
INSERT INTO feedback (Feedback_ID, Bill_ID, Customer_ID, Feedback_date, Comment, Rating) VALUES
(1, 1, 1, '2025-12-05 19:00:00', N'Mon ngon, phuc vu tot', 5),
(2, 2, 5, '2025-12-07 12:10:00', N'Kem hoi ngot', 4),
(3, 3, 3, '2025-12-06 13:00:00', N'Doi hoi lau', 3),
(4, 4, 2, '2025-12-05 20:00:00', N'On, khong van de', 4),
(5, 5, 4, '2025-12-06 21:00:00', N'Khong hai long ve toc do phuc vu', 2),
(6, 6, 6, '2025-12-07 20:00:00', N'Trai nghiem tot, se quay lai', 5);

-- Insert dish_feedback
INSERT INTO dish_feedback (Feedback_ID, Dish_ID, Rating_dish, Comment_dish) VALUES
(1, 1, 5, N'Pho bo rat ngon'),
(2, 5, 4, N'Kem dep, hoi ngot'),
(3, 2, 3, N'Bun cha binh thuong'),
(4, 3, 4, N'Ca phe on'),
(5, 4, 4, N'Tra dao mat, ngon'),
(6, 6, 5, N'Nuoc ep cam tuoi, ngon');

-- Insert staff_feedback
INSERT INTO staff_feedback (Feedback_ID, Staff_ID, Rating_staff, Comment_staff) VALUES
(1, 1, 5, N'Nhan vien than thien'),
(2, 3, 4, N'Thanh toan nhanh'),
(3, 1, 3, N'Phuc vu cham vi dong'),
(4, 2, 4, N'On, khong van de'),
(5, 2, 2, N'Can cai thien thai do'),
(6, 3, 5, N'Tu van nhiet tinh');

-- Insert table_reservation
INSERT INTO table_reservation (Reservation_ID, Reservation_time, Customer_ID, Table_ID, Status) VALUES
(1, '2025-12-05 18:00:00', 1, 5, N'Da xac nhan'),
(2, '2025-12-06 19:00:00', 2, 4, N'Da xac nhan'),
(3, '2025-12-07 20:00:00', 3, 2, N'Cho xac nhan'),
(4, '2025-12-08 18:30:00', 4, 1, N'Da xac nhan'),
(5, '2025-12-09 19:30:00', 5, 3, N'Huy'),
(6, '2025-12-10 20:00:00', 6, 6, N'Da xac nhan');

-- Insert staff_supervision
INSERT INTO staff_supervision (Employee_ID, Supervisor_ID) VALUES
(1, 4),
(2, 4),
(3, 4),
(5, 4),
(6, 4),
(4, 6);

-- Insert audit_log
INSERT INTO audit_log (Log_ID, User_ID, User_role, Action, Timestamp, Error_message, Status, Target_ID, Target_entity, Old_value, New_value) VALUES
(1, 3, 'Cashier', N'Tao bill', '2025-12-05 18:30:00', NULL, N'Thanh cong', '1', 'Bill', NULL, 'Total=350000'),
(2, 1, 'Waiter', N'Tao order', '2025-12-05 18:05:00', NULL, N'Thanh cong', '1', 'Order', NULL, 'New order'),
(3, 1, 'Waiter', N'Cap nhat order', '2025-12-05 18:15:00', NULL, N'Thanh cong', '1', 'Order', '2 mon', '3 mon'),
(4, 2, 'Waiter', N'Tao order', '2025-12-05 19:00:00', NULL, N'Thanh cong', '2', 'Order', NULL, 'New order'),
(5, 3, 'Cashier', N'Loi thanh toan', '2025-12-05 19:10:00', N'Loi POS', N'Loi', '2', 'Bill', NULL, NULL),
(6, 4, 'Manager', N'Cap nhat menu', '2025-12-06 10:00:00', NULL, N'Thanh cong', '6', 'Menu', 'Gia cu=30000', 'Gia moi=32000');

GO

PRINT '========================================';
PRINT 'Database restaurantdb created successfully!';
PRINT 'Total tables: 19';
PRINT 'Sample data inserted.';
PRINT '========================================';
