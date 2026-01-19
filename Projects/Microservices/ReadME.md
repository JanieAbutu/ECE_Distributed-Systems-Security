# Microservices-Based Order Management System

This document describes the design and implementation of a microservices-based system using Node.js, Express, MongoDB, JWT authentication, and RabbitMQ.  
The system demonstrates both **synchronous (HTTP)** and **asynchronous (message-based)** communication between services.

---

## Services Overview

The system consists of three independent microservices:

- **Product Service**  
  Stores and manages product information.

- **Order Service**  
  Manages order creation and coordinates product validation.

- **Authentication Service**  
  Handles user registration and login using JWT.

---

## Architecture Overview

The architecture ensures **scalability, readability, and maintainability**. Each service follows the same internal structure:

- `models/` → Database schemas  
- `controllers/` → Business logic  
- `routes/` → HTTP endpoints  
- `middleware/` → Authentication or other middleware  
- `index.js` → Application entry point  

### Inter-Service Communication

- **Synchronous:** HTTP REST requests (blocking request-response)  
- **Asynchronous:** RabbitMQ message queues (non-blocking, decoupled)

---

## Project Structure

```text
project/
│
├── models/
│   ├─ Equipe.js              # Team schema
│   ├─ Player.js              # Player schema
│   └─ User.js                # User model for authentication
│
├── routes/
│   ├─ equipes.js             # Team routes
│   ├─ players.js             # Player routes
│   └─ auth.js                # Login/signup routes
│
├── controllers/
│   ├─ Equipe.js              # Team logic
│   ├─ playerController.js    # Player logic
│   └─ authController.js      # Login/signup logic
│
├── middleware/
│   └── auth.js               # JWT verification middleware
│
├── index.js                   # Entry point
└── package.json               # Dependencies

### Product Service
#### Purpose

- Stores product data

- Responds to product validation and retrieval requests

### Product Data Model

Field	Type	Description
id	ObjectId	Unique MongoDB identifier
name	String	Product name
description	String	Product description
price	Number	Product price
created_at	Date	Creation timestamp

### Order Service
### Purpose

- Creates and manages orders

- Communicates with Product Service to validate products

### Communication Modes

### Synchronous Mode

- Order Service sends an HTTP request to Product Service

- Order creation waits until product data is returned

### Asynchronous Mode

- Order Service sends product IDs to RabbitMQ

- Order request is accepted immediately

- Product processing happens in the background

####Authentication Service
Purpose

Handles user signup and login

Secures protected routes using JWT authentication

### Asynchronous Messaging (RabbitMQ)
- Producer (Order Service)
- Sends product IDs to the product_queue
- Does not wait for processing
- Consumer (Product Service)
- Listens to the product_queue
- Retrieves product data from MongoDB
- Acknowledges messages after processing

## Testing the System
### Tools Used

- Postman – API testing

- RabbitMQ Management UI – Queue monitoring

- MongoDB Compass – Database verification

## Final Notes

This project demonstrates a clear, modular microservices architecture using both blocking and non-blocking communication methods.
The documentation allows the system to be reproduced, tested, and validated step-by-step.