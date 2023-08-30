-- Make Sure you have uuid extension:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Main table: Person
CREATE TABLE Person (
    person_uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(10),
    registration_status VARCHAR(15) NOT NULL CHECK (
        registration_status IN ('Unregistered', 'Registered')
    ),
    UNIQUE (email),
    UNIQUE (phone_number)
);
-- Competitions table
CREATE TABLE Competitions (
    competition_uid UUID PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    prize_money MONEY NOT NULL CHECK (prize_money > '0'::MONEY)
);
-- Game updates table
CREATE TABLE GameUpdates (
    update_uuid UUID PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE NOT NULL
);
-- Product table
CREATE TABLE Products (
    product_uid UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price MONEY NOT NULL CHECK (price > '0'::MONEY),
    type VARCHAR(255) NOT NULL,
    description TEXT
);
-- Credit card table
CREATE TABLE CreditCards (
    card_number VARCHAR(19) PRIMARY KEY,
    -- Typically, card numbers are 16 digits, but can be up to 19.
    validity DATE NOT NULL,
    CVV INT NOT NULL,
    -- DO NOT store CVV for security reasons, This is illegal (Arye) For school project only
    owner_id UUID NOT NULL REFERENCES Person(person_uid)
);
-- Orders table
CREATE TABLE Orders (
    order_uid UUID PRIMARY KEY,
    user_uid UUID NOT NULL,
    purchase_date DATE NOT NULL
);
-- Sub table: UnregisteredUser
CREATE TABLE UnregisteredUser (
    person_uid UUID PRIMARY KEY REFERENCES Person(person_uid)
);
-- Sub table: RegisteredUser
CREATE TABLE RegisteredUser (
    person_uid UUID PRIMARY KEY REFERENCES Person(person_uid),
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    RegistrationDate DATE,
    UNIQUE (Username)
);
CREATE TABLE PersonCompetitions (
    person_competition_uid UUID PRIMARY KEY,
    person_uid UUID NOT NULL REFERENCES Person(person_uid),
    competition_uid UUID NOT NULL REFERENCES Competitions(competition_uid),
    UNIQUE (person_uid, competition_uid) -- This ensures that a person can't be registered in the same competition more than once
);
CREATE TABLE OrderProducts (
    order_product_uid UUID PRIMARY KEY,
    order_uid UUID NOT NULL REFERENCES Orders(order_uid),
    product_uid UUID NOT NULL REFERENCES Products(product_uid),
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE (order_uid, product_uid) -- This ensures that a product isn't listed multiple times in the same order
);
-- Payment table
CREATE TABLE Payments (
    order_uid UUID PRIMARY KEY REFERENCES Orders(order_uid),
    card_number VARCHAR(19) NOT NULL REFERENCES CreditCards(card_number),
    price MONEY NOT NULL CHECK (price > '0'::MONEY),
    payment_date DATE NOT NULL
);
CREATE TABLE Contact (
    contact_uid uuid PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL
);
-- Inserting data into Person
INSERT INTO Person (
        person_uid,
        name,
        email,
        phone_number,
        registration_status
    )
VALUES (
        uuid_generate_v4(),
        'John Doe',
        'john.doe@example.com',
        '+1234567890',
        'Registered'
    ),
    (
        uuid_generate_v4(),
        'Jane Smith',
        'jane.smith@example.com',
        '+0987654321',
        'Unregistered'
    ),
    (
        uuid_generate_v4(),
        'Ella White',
        'ella.white@example.com',
        '+1122334455',
        'Registered'
    ),
    (
        uuid_generate_v4(),
        'Lucas Green',
        'lucas.green@example.com',
        '+2233445566',
        'Unregistered'
    ),
    (
        uuid_generate_v4(),
        'Emily Brown',
        'emily.brown@example.com',
        '+3344556677',
        'Registered'
    );
-- Inserting data into Competitions
INSERT INTO Competitions (
        competition_uid,
        game_name,
        start_date,
        end_date,
        prize_money
    )
VALUES (
        uuid_generate_v4(),
        'Space Invaders',
        '2023-08-01',
        '2023-08-31',
        500.00
    ),
    (
        uuid_generate_v4(),
        'Pac-Man',
        '2023-09-01',
        '2023-09-30',
        600.00
    ),
    (
        uuid_generate_v4(),
        'Tetris',
        '2023-07-01',
        '2023-07-31',
        400.00
    ),
    (
        uuid_generate_v4(),
        'Mario Bros',
        '2023-10-01',
        '2023-10-31',
        700.00
    ),
    (
        uuid_generate_v4(),
        'Zelda',
        '2023-06-01',
        '2023-06-30',
        800.00
    );
-- Inserting data into GameUpdates
INSERT INTO GameUpdates (
        update_uuid,
        game_name,
        description,
        release_date
    )
VALUES (
        uuid_generate_v4(),
        'Space Invaders',
        'Added new levels and power-ups',
        '2023-08-15'
    ),
    (
        uuid_generate_v4(),
        'Pac-Man',
        'Introduced ghost AI improvements',
        '2023-09-10'
    ),
    (
        uuid_generate_v4(),
        'Tetris',
        'New block designs and backgrounds',
        '2023-07-20'
    ),
    (
        uuid_generate_v4(),
        'Mario Bros',
        'New worlds and characters',
        '2023-10-10'
    ),
    (
        uuid_generate_v4(),
        'Zelda',
        'Major storyline update',
        '2023-06-15'
    );
-- Inserting data into Products
INSERT INTO Products (product_uid, name, price, type, description)
VALUES (
        uuid_generate_v4(),
        'Gaming Mouse',
        50.00,
        'Hardware',
        'Ergonomic gaming mouse with RGB lighting'
    ),
    (
        uuid_generate_v4(),
        'Space Invaders T-Shirt',
        20.00,
        'Apparel',
        'Cotton t-shirt with a Space Invaders print'
    ),
    (
        uuid_generate_v4(),
        'Gaming Keyboard',
        70.00,
        'Hardware',
        'Mechanical gaming keyboard with customizable keys'
    ),
    (
        uuid_generate_v4(),
        'Pac-Man Mug',
        10.00,
        'Merchandise',
        'A cool ceramic mug with Pac-Man design'
    ),
    (
        uuid_generate_v4(),
        'Zelda Poster',
        5.00,
        'Merchandise',
        'High quality print Zelda poster'
    );
-- Inserting data into CreditCards
INSERT INTO CreditCards (card_number, validity, CVV, owner_id)
VALUES (
        '1234567812345678',
        '2026-08-31',
        123,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        )
    ),
    (
        '2345678923456789',
        '2027-08-31',
        456,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        )
    ),
    (
        '3456789034567890',
        '2025-08-31',
        789,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        )
    );
-- Inserting data into Orders
INSERT INTO Orders (order_uid, user_uid, purchase_date)
VALUES (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        '2023-08-10'
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        '2023-08-12'
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        '2023-08-14'
    );
-- Inserting data into UnregisteredUser and RegisteredUser
INSERT INTO UnregisteredUser (person_uid)
VALUES (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Jane Smith'
        )
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Lucas Green'
        )
    );
INSERT INTO RegisteredUser (person_uid, Username, Password, RegistrationDate)
VALUES (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        'johnDoe123',
        'securePassword',
        '2023-08-01'
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        'ellaWhite456',
        'anotherPassword',
        '2023-08-03'
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        'emilyBrown789',
        'yetAnotherPassword',
        '2023-08-05'
    );
-- Inserting data into PersonCompetitions
INSERT INTO PersonCompetitions (
        person_competition_uid,
        person_uid,
        competition_uid
    )
VALUES (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Space Invaders'
        )
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Pac-Man'
        )
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Zelda'
        )
    );
-- Inserting data into OrderProducts
INSERT INTO OrderProducts (
        order_product_uid,
        order_uid,
        product_uid,
        quantity
    )
VALUES (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'John Doe'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Gaming Mouse'
        ),
        1
    ),
    (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Ella White'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Gaming Keyboard'
        ),
        1
    ),
    (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Emily Brown'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Zelda Poster'
        ),
        2
    );
-- Inserting data into Payments
INSERT INTO Payments (order_uid, card_number, price, payment_date)
VALUES (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'John Doe'
                )
        ),
        '1234567812345678',
        50.00,
        '2023-08-10'
    ),
    (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Ella White'
                )
        ),
        '2345678923456789',
        70.00,
        '2023-08-12'
    ),
    (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Emily Brown'
                )
        ),
        '3456789034567890',
        120.00,
        '2021-02-01'
    );