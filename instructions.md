# Restaurant Management Software (RMS) - Instructions

## Project Overview

The **Restaurant Management Software (RMS)** is a SaaS-based platform designed to revolutionize restaurant operations by integrating all management functions into a unified, cloud-based system. It aims to streamline processes, boost customer satisfaction, and maximize profitability through automation, real-time analytics, and seamless third-party integrations (BRS: Section 2, 3). The project encompasses multiple modules—POS Software, POS Admin Panel, Waiter/Captain App, and Super Admin Panel—catering to restaurant staff, managers, customers, and system administrators (SRS: Section 3).

This document details the **POS Software (Web Application)**, the initial module, which serves as the frontline interface for staff to handle orders, payments, and kitchen communication. It’s critical for operational efficiency, supporting high-volume transactions with offline capabilities (SRS: Section 5).

### Objectives
- **Holistic Management**: Create a comprehensive platform covering all restaurant operations, from order taking to analytics (BRS: 3 - Operational Streamlining, Profit Maximization).
- **Real-Time Insights**: Deliver live metrics and integrations (e.g., payment gateways, delivery platforms) for informed decision-making (SRS: 4.2).
- **User-Centric Design**: Serve diverse users—staff for daily tasks, managers for oversight, customers for ordering, and admins for system management (SRS: 3).

### Scope
- **POS Software (Web)**: A web-based transactional hub for order processing, billing, and kitchen coordination (SRS: 4.1).
- **Future Phases**: Expand to POS Admin Panel (management/analytics), Waiter App (mobile order taking), and Super Admin Panel (system oversight) (SRS: 4.1).

### Development Approach
- **Tool**: Use Windsurf by Codeium for AI-assisted coding to accelerate development and ensure code quality.
- **Methodology**: Follow agile practices with sprints for iterative progress (Task List: 4.1), incorporating user feedback loops for continuous improvement (Task List: 4.5).

---

## POS Software (Web Application)

The POS Software is a browser-based application enabling restaurant staff to efficiently manage orders, process payments, and communicate with the kitchen, even during network outages. It’s designed for speed, security, and ease of use in fast-paced environments (Task List: Section 1).

### Key Functionalities
1. **Login**:
   - **Description**: Staff log in using a unique staff ID and password, with a clock-in feature to track shifts (User Flows: 3.1). Sensitive actions (e.g., voids) require MFA (Task List: 1.1.4).
   - **Example**: Server Maria enters "M001" and her password, clocking in for her shift (User Flows: 3.1).
   - **UI**: Centered form with accessibility features like keyboard navigation (Wireframes: 4.1).

2. **Order Taking**:
   - **Description**: Staff select tables, browse a categorized menu, customize items (e.g., "No Onions"), and send orders to the kitchen instantly via KOT (Task List: 1.2.1; FRS: 3.2). Order status updates are tracked in real-time (Task List: 1.2.3).
   - **Example**: Maria adds "Grilled Chicken" for table 5, notes "Birthday surprise," and sends it to the kitchen (User Flows: 3.2).
   - **UI**: Menu grid with customization modal and quick-send button (Wireframes: 4.2, 4.3).

3. **Billing and Payment**:
   - **Description**: Handles transactions (split, merge, void, refund) with validation (Task List: 1.1.1), integrates payment gateways (Task List: 1.1.2), and applies dynamic discounts (Task List: 1.1.3). Voids/refunds require MFA and are logged (Task List: 1.1.4).
   - **Example**: Maria splits a $85.99 bill for table 5, processes card payment with a 15% tip, and emails the receipt (User Flows: 3.3).
   - **UI**: Payment screen with method selector and quick actions (Wireframes: 4.4, 4.5).

4. **Offline Mode**:
   - **Description**: Stores transactions locally during outages and syncs them when online, resolving conflicts with timestamps (Task List: 1.3; SRS: 5).
   - **Example**: During an internet outage, Maria takes orders, which sync automatically later (User Flows: 3.6).
   - **UI**: Persistent offline alert with sync status (Wireframes: 4.7).

5. **UI/UX**:
   - **Description**: Features an intuitive layout with quick actions (e.g., Split, Void) and accessibility options like high contrast mode (Wireframes: Annotations; SRS: 4.3).
   - **Example**: Staff navigate with minimal clicks, using keyboard shortcuts in dim lighting (Wireframes: 4.2).

### Technical Stack
#### Frontend
- **React.js with Vite**: Builds a reactive UI with components (e.g., `<POS />`, `<PaymentModal />`). Vite’s fast HMR speeds up development compared to Create React App ([React Docs](https://react.dev/), [Vite Docs](https://vitejs.dev/)).
  - **Example**: Use React hooks (`useState`, `useEffect`) for order state management.
- **TypeScript**: Ensures type safety for data like `Order` and `User`, reducing bugs (Task List: 3.4.5) ([TypeScript Docs](https://www.typescriptlang.org/docs/)).
  - **Example**: Define `interface Order { id: number; items: Item[]; }`.
- **Tailwind CSS**: Offers utility classes (e.g., `flex`, `p-4`) for rapid styling of grids and modals (Wireframes: 3) ([Tailwind CSS Docs](https://tailwindcss.com/docs)).
  - **Example**: Style a button with `className="p-2 bg-blue-500 text-white rounded"`.

#### Backend
- **Node.js with Express.js**: Runs a server for APIs (e.g., `/login`, `/payment`) and real-time features (SRS: 6) ([Node.js Docs](https://nodejs.org/en/docs/), [Express Docs](https://expressjs.com/))).
  - **Example**: Define `app.post('/login', ...)` with Express routing.

#### Database
- **IndexedDB**: Stores offline orders in the browser with key-value pairs (Task List: 1.3.1) ([IndexedDB Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)).
  - **Example**: Save `{ id: 1, items: [...] }` to an `orders` object store.
- **PostgreSQL**: Manages synced data with relational tables (e.g., `users`, `orders`) (SRS: 6) ([PostgreSQL Docs](https://www.postgresql.org/docs/)).
  - **Example**: Query `INSERT INTO orders (tableNumber, items) VALUES (...)`.

#### Real-Time
- **Socket.IO**: Sends KOT to kitchen displays instantly (Task List: 1.2.1) ([Socket.IO Docs](https://socket.io/docs/v4/)).
  - **Example**: Emit `socket.emit('newOrder', order)` from the client.

#### Offline
- **Service Workers**: Caches assets and queues requests for offline use (Task List: 1.3.3) ([Service Workers Docs](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)).
  - **Example**: Intercept POST requests in `sw.ts` to queue them.

#### Security
- **JWT**: Authenticates users with tokens (Task List: 3.4.3) ([JWT Docs](https://jwt.io/introduction)).
  - **Example**: Generate `jwt.sign({ id, role }, 'secret')`.
- **bcrypt**: Hashes passwords securely (Task List: 3.4.3) ([bcrypt Docs](https://www.npmjs.com/package/bcrypt)).
  - **Example**: Hash with `bcrypt.hash(password, 10)`.

#### Payment
- **Stripe (Placeholder)**: Processes payments online; offline payments are queued (Task List: 1.1.2) ([Stripe Docs](https://docs.stripe.com/)).
  - **Example**: Stub `stripe.charges.create()` until integrated.

#### Tools
- **Vite Plugins**: `vite-plugin-pwa` for offline support, `vite-plugin-typescript` ([Vite PWA Docs](https://vite-pwa-org.netlify.app/)).
- **ESLint + Prettier**: Enforces code style (Task List: 3.4.5) ([ESLint Docs](https://eslint.org/docs/), [Prettier Docs](https://prettier.io/docs/en/)).
- **Husky**: Runs linting pre-commit ([Husky Docs](https://typicode.github.io/husky/)).

### Project Structure
rms-pos-web/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components (e.g., Login.tsx, POS.tsx)
│   │   ├── types/         # TypeScript types (e.g., order.ts, user.ts)
│   │   ├── offline/       # Offline logic (e.g., index.ts for IndexedDB)
│   │   ├── App.tsx        # Main app component with routing
│   │   └── main.tsx       # Entry point for Vite
│   ├── public/            # Static files (e.g., favicon.ico), sw.ts for Service Worker
│   ├── vite.config.ts     # Vite configuration (plugins, server options)
│   └── package.json       # Frontend dependencies (react, typescript, etc.)
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/        # DB schemas (e.g., db.ts for PostgreSQL setup)
│   │   ├── routes/        # API routes (e.g., auth.ts, payment.ts)
│   │   └── server.ts      # Express server with Socket.IO
│   └── package.json       # Backend dependencies (express, socket.io, etc.)
└── instructions.md         # This 


### Setup Instructions
#### Prerequisites
- Node.js v18+ ([Node.js Docs](https://nodejs.org/en/docs/)) and npm v9+.
- PostgreSQL installed locally or a cloud instance (e.g., Supabase).
- Windsurf by Codeium installed.

#### Steps
1. **Initialize Project**:
   - Open Windsurf and create `rms-pos-web`.
   - In Cascade:  
     `"Initialize a React.js app with Vite and TypeScript, Node.js Express backend, PostgreSQL, Socket.IO, Tailwind CSS, and Service Workers with IndexedDB for offline support."`
   - Install dependencies:
     - Frontend: `cd client && npm install && npm run dev` (runs at `http://localhost:5173`).
     - Backend: `cd server && npm install && npm run start` (runs at `http://localhost:3000`).

2. **Database Configuration**:
   - Set up PostgreSQL: Create a database and update `server/src/models/db.ts` with credentials (e.g., `user`, `password`, `host`) ([PostgreSQL Docs](https://www.postgresql.org/docs/)).
   - Initialize IndexedDB in `client/src/offline/index.ts` for offline storage (Task List: 1.3.1).

3. **Run and Test**:
   - Start both servers and open `http://localhost:5173` in a browser.
   - Test offline mode by disabling network in dev tools (Wireframes: 4.7).
   - Troubleshoot: Check console for errors; ensure ports 5173 and 3000 are free.

### Development Tasks
#### 1. Login
- **Backend**: 
  - Create `POST /login` in `server/src/routes/auth.ts` using JWT and bcrypt (Task List: 3.4.3).
  - Example: `if (bcrypt.compareSync(password, user.password)) { return jwt.sign(...); }`.
- **Frontend**: 
  - Build `Login.tsx` with form inputs and fetch call to `/login` (Wireframes: 4.1).
  - Example: Use `useState` for form state, redirect to `/pos` on success.

#### 2. Order Taking
- **Backend**: 
  - Set up Socket.IO in `server.ts` to emit `newOrder` events (Task List: 1.2.1).
  - Save to PostgreSQL if online, else queue in frontend (FRS: 3.2).
- **Frontend**: 
  - Create `POS.tsx` with menu grid, customization input, and Socket.IO client (Wireframes: 4.2, 4.3).
  - Example: `socket.emit('newOrder', { tableNumber, items })`.

#### 3. Billing and Payment
- **Backend**: 
  - Add `POST /payment` and `POST /void` in `server/src/routes/` with Stripe stub and audit logging (Task List: 1.1).
  - Example: `pool.query('UPDATE orders SET status = $1', ['Paid'])`.
- **Frontend**: 
  - Build `PaymentModal.tsx` with total calculation, payment options, and quick actions (Wireframes: 4.4, 4.5).
  - Example: `fetch('/api/payment', { method: 'POST', body: JSON.stringify(...) })`.

#### 4. Offline Mode
- **Frontend**: 
  - Implement Service Worker in `public/sw.ts` to queue requests (Task List: 1.3.3).
  - Use IndexedDB in `offline/index.ts` for storage and sync (Wireframes: 4.7).
  - Example: `await db.add('orders', order); syncOrders();`.

#### 5. Testing
- Write unit tests (e.g., validate order data) with Jest (Task List: 3.4.5).
- Test integrations (API, Socket.IO) with mock data.
- Simulate load with tools like Artillery (Task List: 3.4.2).

### Notes
- **Security**: Use HTTPS for all API calls; encrypt sensitive data with TLS (Task List: 3.4.3; SRS: 5).
- **Scalability**: Structure backend for microservices (e.g., separate auth service) (Task List: 3.4.8; SRS: 6).
- **Feedback**: Add a feedback button in `POS.tsx` (Task List: 4.5; BRS: 4.15).
- **References**: 
  - SRS: Software Requirements Specification
  - FRS: Functional Requirements Specification
  - BRS: Business Requirements Specification
  - User Flows: User Flows Document
  - Task List: Detailed Task List for POS Software
  - Wireframes: Wireframes Document for POS Software
- **Documentation Links**:
  - React.js: [https://react.dev/](https://react.dev/) - Use hooks for state management.
  - Vite: [https://vitejs.dev/](https://vitejs.dev/) - Configure plugins in `vite.config.ts`.
  - TypeScript: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/) - Define interfaces for data.
  - Tailwind CSS: [https://tailwindcss.com/docs/](https://tailwindcss.com/docs/) - Style with utility classes.
  - Node.js: [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/) - Manage async operations.
  - Express.js: [https://expressjs.com/](https://expressjs.com/) - Set up RESTful routes.
  - Socket.IO: [https://socket.io/docs/v4/](https://socket.io/docs/v4/) - Handle real-time events.
  - PostgreSQL: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/) - Query relational data.
  - IndexedDB: [https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Store offline data.
  - Service Workers: [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Enable offline caching.
  - JWT: [https://jwt.io/introduction](https://jwt.io/introduction) - Secure authentication tokens.
  - bcrypt: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) - Hash passwords.
  - Stripe: [https://docs.stripe.com/](https://docs.stripe.com/) - Process payments (stubbed initially).
  - ESLint: [https://eslint.org/docs/](https://eslint.org/docs/) - Lint TypeScript code.
  - Prettier: [https://prettier.io/docs/en/](https://prettier.io/docs/en/) - Format consistently.
  - Husky: [https://typicode.github.io/husky/](https://typicode.github.io/husky/) - Automate pre-commit checks.
  - Vite PWA: [https://vite-pwa-org.netlify.app/](https://vite-pwa-org.netlify.app/) - Add offline capabilities.
- **Next Steps**: After POS, develop POS Admin Panel, Waiter App, and Super Admin Panel (SRS: 4.1).

---

## Conclusion
This `instructions.md` serves as a comprehensive blueprint for the RMS project, detailing the POS Software (Web Application). Using React with Vite, TypeScript, Node.js with Express, Tailwind CSS, and supporting technologies, we’ll build a robust, scalable, and user-friendly system. Start by setting up the project in Windsurf, then follow the tasks to bring the POS to life!