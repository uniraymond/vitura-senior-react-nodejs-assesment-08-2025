# Vitura | Senior Fullstack (React/Node.js) Assessment - Q1 2025

## Run the Project
 - Backend (api) the folder name is api
 - Frontend the folder name is frontend

### 1. Clone & Setup
pull from git

```
git clone -b develop https://github.com/uniraymond/vitura-senior-react-nodejs-assesment-08-2025.git
cd vitura-senior-react-nodejs-assesment-08-2025
```

if want to run with React-Redux
```
git clone -b feature/state-management-react-redux https://github.com/uniraymond/vitura-senior-react-nodejs-assesment-08-2025.git
cd vitura-senior-react-nodejs-assesment-08-2025
```

if download the zip file, unzip the download file

### 2. Frontend
```
cd frontend
npm install
npm run build
npm run dev
```
Frontend runs on: http://localhost:5051

### 3. Backend (API)
```
cd api
npm install
npm run build
npm run dev
```
API runs on: http://localhost:5050

 ⚠️ If the frontend can’t load products, restart the API with:

```
npm run dev
```

### 4. Tests (Backend)

From inside the api folder:
```
npm run test
```

### About the Architecture and Design Notes

State Management Choice
React Redux Toolikt was used to manage application state.
 Centralized handling of product data and filters.
 build support for async thunks makes API integration straightforward

#### Could be imporve due to time limit
1. error handling, for the error handling I can add more on handle errors
2. local in-memory state duplication
3. caching
4. add unit tests for the slices and thunks

#### Production Considerations
1. Database indexing
2. Caching strategy, for example API caching with redis, client-side with redux-persist
3. Authentication & Authorization
4. Deployment with CI/CD pipeline and so on
5. Monitoring with logs
6. Testing: end-to-end tests

---


## Overview
Build a small fullstack app: a Node.js API that serves products and a simple React UI that consumes it. The solution should reflect standard practices with Node.js, Express, and React with TypeScript. Use async throughout. Keep setup minimal and focus on senior-level judgement.

**Timebox:** Aim for under three hours. Stop at three hours and note what remains.

## What You Will Build
- Backend: Node.js API with one endpoint `GET /products`
- Frontend: React single-page app that calls the API
- Data: load `sample-products.json` in memory at startup (no database)

## Dataset
Use the provided [`sample-products.json`](https://github.com/mjkearns/vitura-senior-react-nodejs-assesment-08-2025/blob/main/sample-products.json) with 120 realistic products across multiple categories and brands. Load it in memory at startup. Do not add a database.

## Functional Requirements
- **Backend**
  - Endpoint: `GET /products`
  - Query params:
    - `view` in `{admin,doctor}` (controls visibility)
    - `q` (text search on `publicName`)
    - `new` in `{true,false}` (created in last 30 days)
  - Return only fields required by the frontend
  - Implement as async and support cancellation
- **Frontend**
  - Show a list of products from the API
  - Controls:
    - Search box for `publicName`
    - Toggle between `admin` and `doctor` views
    - Optional: filter to show only "new" products

## Non-Functional Requirements
- **Middleware**
  - Central error handler with consistent JSON response
  - Request logging middleware with method, path, duration, status, and item count
- **Config**
  - Use environment variables for config (eg: port, default view)
  - Include a `.env.example` in your repo
- **Logging**
  - Logs should be structured and concise
- **TypeScript**
  - Enable `strict`
  - Define a `Product` type for both backend and frontend
  - Avoid `any`
- **Frontend polish**
  - Inputs should be accessible (labels, focus)
  - Provide loading and empty states
  - Debounce search requests so the API is not spammed

## Testing
Provide one focused test only:
- EITHER backend filter logic (`new` or `view`)
- OR a React component test (eg: "New" filter shows only items created in last 30 days)

## Deliverables
A **GitHub repo** that contains:
- Node.js backend project (TypeScript)
- React frontend project (TypeScript)
- Async implementation with middleware for errors, logging, and validation
- `sample-products.json` loaded at startup
- One focused test (backend or frontend)
- **README** that covers:
  - How to run locally
  - State management choice and why
  - Trade-offs made due to time limit and what you would do next
  - What you would do differently in production (eg: database indexing, caching, auth)

## What To Ignore
- Authentication/authorisation
- Routing beyond a single page
- Pagination or complex tabs
- Heavy styling or design systems
- Database setup

## Evaluation Rubric (0–4 each, total 20)
- **Correctness** - spec met and edge cases handled
- **Code quality** - clear structure, naming, cohesion
- **Test** - targeted and easy to run
- **Senior judgement** - sensible defaults, trade-offs, ops thinking
- **Developer experience** - README clarity, simple startup, useful logs

## Getting Started
- Use Express for the backend
- Use React with Vite or Create React App
- Use TypeScript on both backend and frontend
- Keep it small, async, and readable
