# Finance Dashboard System (Backend)



A secure, role-based financial management API built with Node.js, Express, and MongoDB. This system is designed as a Private Enterprise Tool, prioritizing data integrity and strict access control over public accessibility.


## Overview
The Finance Dashboard Backend serves as the central engine for managing financial entries, user provisioning, and real-time analytics. Unlike public-facing apps, this system follows a Closed-Loop Security model where the first administrator is established via a root seed.js script, and subsequent users are provisioned manually by an Admin. This ensures a 100% verified user base.


## Key Architectural Highlights

**Service-Layer Pattern**: Complete separation of concerns between HTTP controllers and business logic (services).



**Closed-Loop Security**: Public registration is disabled. The system utilizes a root seed.js script to establish the first administrator.



**RBAC (Role-Based Access Control)**: Granular permissions for Admin, Analyst, and Viewer roles.



**Defensive Pagination**: Backend-enforced limits on record retrieval to ensure system stability and performance.





## Technical Decisions & Trade-offs

### 1. Security & Onboarding

**Decision**: Disabled POST /register.



**Reasoning**: To prevent unauthorized access and bot spam. In an enterprise context, users must be provisioned by an administrator.



**Trade-off**: Manual onboarding is required, but it ensures a 100% verified user base.



### 2. Reliability & Data Safety

**Soft Deletes**: Records are marked with isDeleted: true instead of being permanently removed. This preserves the financial audit trail for historical reporting.



**Input Sanitization**: All record creations use explicit field mapping rather than the spread operator to prevent Mass Assignment vulnerabilities.





### 3. Performance Stability

**Pagination**: Implemented a limitCap based on user roles (e.g., 100 for Analysts, 50 for Viewers) to prevent large database queries from exhausting server memory.



**Mongoose .lean()**: Used for read-heavy operations to bypass Mongoose document overhead and improve response times.





## API Endpoints

### Authentication

**POST /api/v1/auth/login** - Exchange credentials for a 30-day JWT.



### User Management (Admin Only)

**GET /api/v1/users** - List all users.



**POST /api/v1/users** - Create new Analyst/Viewer.



**PATCH /api/v1/users/:id** - Update user details or set status: "inactive".



### Financial Records

**POST /api/v1/records** - (Admin Only) Create a new transaction.



**GET /api/v1/records** - (Paginated) View personal records with filters for type and category.



**DELETE /api/v1/records/:id** - (Admin Only) Soft-delete a record.



### Dashboard

**GET /api/v1/dashboard/summary** - Aggregated totals. Viewers receive high-level totals; Analysts/Admins receive category breakdowns and recent trends.



## Setup & Installation

### 1.Clone the Repository: git clone <your-repo-url>



### 2.Install Dependencies: npm install



### 3.Environment Setup: Create a .env file based on .env.example.



### 4.Seed the Admin: ```bash

node src/seed.js



*Default Credentials: `admin@first.com` | `admin123`*

### 5.Run Development Server: npm run dev



## Validation & Error Handling

The system includes a Global Error Middleware that captures service-layer exceptions and returns consistent, readable JSON errors to the client.



**401 Unauthorized**: Invalid or missing JWT.



**403 Forbidden**: Role-based restriction or "Inactive" account status.



**400 Bad Request**: Validation failures (e.g., negative amounts, missing fields).



##  API Versioning



All APIs are versioned under `/api/v1` to ensure backward compatibility and future scalability.



### Example

- `/api/v1/users`

- `/api/v1/records`

- `/api/v1/dashboard/summary`



### Why Versioning?

Versioning allows the system to evolve without breaking existing clients. Future versions (e.g., `/api/v2`) can introduce changes safely while maintaining support for older integrations.



## Project Structure



```

src/

  app.js

  server.js



  config/

    db.js



  controllers/

    authUser.controller.js

    dashboard.controller.js

    record.controller.js

    user.controller.js



  middleware/

    authMiddleware.js



  models/

    recordSchema.js

    userSchema.js



  routes/

    authRoutes.js

    dashboardRoutes.js

    recordRoutes.js

    seed.js

    userRoutes.js



  services/

    dashboardSummary.service.js

    record.service.js

    user.service.js



  utils/

```



## Request Flow



Client → Route → Middleware (Auth) → Controller → Service → Database → Response



- Routes define endpoints

- Middleware verifies JWT and user status

- Controllers handle request/response

- Services contain business logic and access control

- Models interact with the database

## Centralized Access Control
Access control is enforced at the Service Layer to ensure that business rules are applied regardless of the entry point (API, CLI, or internal scripts). This prevents "logic leakage" and ensures a single source of truth for permission checks (e.g., ensuring an Analyst can never trigger a deleteRecord operation).
## Validation Strategy
Current validation is handled through manual checks within the services to ensure strict data integrity. For a scaling application, I would migrate this to a schema-first validation library like Zod or Joi to provide declarative, centralized validation schemas for all incoming request bodies.
