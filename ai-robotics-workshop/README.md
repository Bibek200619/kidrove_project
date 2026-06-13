# AI & Robotics Summer Workshop

Responsive full-stack landing page for the AI & Robotics Summer Workshop assignment.

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Framer Motion, Fetch API
- Backend: Node.js, Express.js, CORS, dotenv

## Workshop Details

- Workshop Name: AI & Robotics Summer Workshop
- Age Group: 8–14 Years
- Duration: 4 Weeks
- Mode: Online
- Fee: ₹2,999
- Start Date: 15 July 2026

## Project Structure

```text
client/
  src/
    components/
      Hero.tsx
      WorkshopDetails.tsx
      LearningOutcomes.tsx
      FAQ.tsx
      RegistrationForm.tsx
      Footer.tsx
    data/
      workshopData.ts
    App.tsx
    main.tsx
    index.css
server/
  routes/
    enquiry.routes.js
  server.js
  package.json
  .env
```

## Run Locally

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Create a backend environment file:

```bash
cd server
cp .env.example .env
```

The default backend values are:

```env
HOST=127.0.0.1
PORT=5001
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
```

Optional frontend environment variable:

```env
VITE_API_URL=http://localhost:5001
```

If `VITE_API_URL` is not set, the form posts to `http://localhost:5001/api/enquiry`.

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5001`.

## API

`POST /api/enquiry`

Request body:

```json
{
  "name": "Bibek Kumar Shah",
  "email": "bibek@example.com",
  "phone": "9876543210"
}
```

Success response:

```json
{
  "success": true,
  "message": "Enquiry submitted successfully"
}
```

Validation error response:

```json
{
  "success": false,
  "message": "Name, email, and phone number are required"
}
```

## Build and Lint

```bash
cd client
npm run lint
npm run build
```

```bash
cd server
npm start
```

## Manual API Check

```bash
curl -X POST http://localhost:5001/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Bibek Kumar Shah","email":"bibek@example.com","phone":"9876543210"}'
```

## Submission Note

For this project, I created a responsive workshop landing page for an AI & Robotics Summer Workshop using React.js. The page uses a bright, parent-friendly design with reusable sections for the hero, workshop details, learning outcomes, FAQs, registration form, and footer. The form validates name, email, and phone number before submitting data with Fetch API to a simple Express.js backend endpoint. The backend validates incoming enquiry data and returns clear success or error responses. With more time, I would add MongoDB storage, email confirmations, a countdown timer, an admin dashboard, payment integration, and production deployment for the frontend and backend.
