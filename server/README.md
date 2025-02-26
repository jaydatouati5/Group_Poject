# Server API Documentation

This document provides a comprehensive overview of the server-side models and APIs for the application.

## Models

### User Model

The User model represents a registered user in the system.

**Attributes:**

*   `firstName` (String, required): The first name of the user.
*   `lastName` (String, required): The last name of the user.
*   `birthdate` (Date, required): The birthdate of the user.
*   `phoneNumber` (String, required): The phone number of the user (Format: 8 digits).
*   `address1` (String, required): The primary address of the user.
*   `address2` (String, optional): The secondary address of the user.
*   `email` (String, required): The email address of the user. Must be a valid email format.
*   `password` (String, required): The password of the user. Must be at least 8 characters long.
*   `confirmPassword` (Virtual): A virtual field for password confirmation during registration.

### Admin Model

The Admin model represents an administrator user in the system.

**Attributes:**

*   `firstName` (String, required): The first name of the admin.
*   `lastName` (String, required): The last name of the admin.
*   `email` (String, required): The email address of the admin. Must be a valid email format.
*   `password` (String, required): The password of the admin. Must be at least 8 characters long.
*   `confirmPassword` (Virtual): A virtual field for password confirmation during registration.

### Flower Model

The Flower model represents a flower product in the system.

**Attributes:**

*   `title` (String, required): The title of the flower.
*   `image_url` (String, required): The URL of the flower's image.
*   `description` (String, optional): A description of the flower.
*   `categorie` (String, optional): The category of the flower.
*   `price` (Number, required): The price of the flower.
*   `stock` (Number, required): The stock quantity of the flower.

### Order Model

The Order model represents an order placed by a user.

**Attributes:**

*   `total` (Number, required): The total amount of the order.
*   `status` (String, enum): The status of the order (Delivered, Pending, Canceled, Not Purchased). Default: Pending.
*   `flowers` (Array): An array of objects representing the flowers in the order.
    *   `flowerId` (ObjectId, ref: 'Flower', required): The ID of the flower.
    *   `quantity` (Number, required): The quantity of the flower in the order.
*   `user` (ObjectId, ref: 'User', required): The ID of the user who placed the order.

## APIs

### User APIs

*   `POST /api/register`: Registers a new user.
    *   **Request Body:** User object with all required attributes.
    *   **Response:** Success message and user object.
*   `POST /api/login`: Logs in an existing user.
    *   **Request Body:** `email` and `password`.
    *   **Response:** Success message and user object with token.
*   `GET /api/logout`: Logs out the current user. Requires authentication.
    *   **Response:** Success message.
*   `PUT /api/users/:id`: Updates an existing user. Requires authentication.
    *   **Request Body:** User object with updated attributes.
    *   **Response:** Updated user object.
*    `GET /api/checkAuth`: Checks if the user is authenticated.
    *   **Response:** verified status and user object.

### Admin APIs

*   `POST /api/admin/register`: Registers a new admin.
    *   **Request Body:** Admin object with all required attributes.
    *   **Response:** Success message and admin object.
*   `POST /api/admin/login`: Logs in an existing admin.
    *   **Request Body:** `email` and `password`.
    *   **Response:** Success message and admin object with token.
*   `GET /api/admin/logout`: Logs out the current admin. Requires authentication.
    *   **Response:** Success message.
*   `PUT /api/admin/admins/:id`: Updates an existing admin. Requires authentication.
    *   **Request Body:** Admin object with updated attributes.
    *   **Response:** Updated admin object.
*    `GET /api/checkAuth`: Checks if the admin is authenticated.
    *   **Response:** verified status and admin object.

### Flower APIs

*   `POST /api/flowers`: Creates a new flower. Requires authentication.
    *   **Request Body:** Flower object with all required attributes.
    *   **Response:** Created flower object.
*   `GET /api/flowers`: Retrieves all flowers.
    *   **Response:** Array of flower objects.
*   `GET /api/flowers/:id`: Retrieves a specific flower by ID.
    *   **Response:** Flower object.
*   `PUT /api/flowers/:id`: Updates an existing flower. Requires authentication.
    *   **Request Body:** Flower object with updated attributes.
    *   **Response:** Updated flower object.
*   `DELETE /api/flowers/:id`: Deletes a flower. Requires authentication.
    *   **Response:** Success message.
*   `POST /api/flowers/addToCart`: Adds a flower to the user's cart (creates or updates an order).
    *   **Request Body:** `flowerId` and `quantity`.
    *   **Response:** Updated order object.
*   `GET /api/flowers/popular`: Retrieves the most popular flower (most purchased).
    *   **Response:** Flower object and quantity.

### Order APIs

*   `POST /api/orders`: Creates a new order. Requires authentication.
    *   **Request Body:** Order object with all required attributes.
    *   **Response:** Created order object.
*   `GET /api/orders`: Retrieves all orders for the authenticated user (or all orders for admin). Requires authentication.
    *   **Response:** Array of order objects.
*   `DELETE /api/orders/:id`: Deletes an order. Requires authentication.
    *   **Response:** Success message.
*   `POST /api/orders/decrease`: Decreases the quantity of a product in an order. Requires authentication.
    *   **Request Body:** `orderId`, `flowerId`, and `quantity`.
    *   **Response:** Updated order object.
*   `POST /api/orders/increase`: Increases the quantity of a product in an order. Requires authentication.
    *   **Request Body:** `orderId`, `flowerId`, and `quantity`.
    *   **Response:** Updated order object.
*   `PUT /api/orders/purchase/:id`: Purchases an order (sets status to Pending and updates product stock). Requires authentication.
    *   **Response:** Updated order object.
*   `PUT /api/orders/cancel/:id`: Cancels an order (sets status to Canceled and replenishes product stock). Requires authentication.
    *   **Response:** Updated order object.
*   `PUT /api/orders/deliver/:id`: Delivers an order (sets status to Delivered). Requires authentication.
    *   **Response:** Updated order object.
*   `GET /api/orders/active`: Retrieves all active orders (status: Not Purchased). Requires authentication.
    *   **Response:** Array of order objects.
