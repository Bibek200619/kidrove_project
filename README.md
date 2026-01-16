# Kidrove AI & Robotics Summer Workshop

Responsive full-stack workshop landing page for Kidrove's **AI & Robotics Summer Workshop** interview assignment.

The app includes a React + TypeScript landing page, client-side form validation, loading and success/error states, and an Express API endpoint for registration enquiries. MongoDB persistence is integrated through the official MongoDB driver when `MONGODB_URI` is configured.

## Features

- Kid-friendly, parent-focused responsive UI inspired by children's activity platforms
- Hero, workshop details, learning outcomes, FAQ, registration form, and footer sections
- TypeScript React component structure
- Tailwind CSS styling with Framer Motion animations
- Client-side validation for name, email, and phone number
- Express `POST /api/enquiry` endpoint with server-side validation
- MongoDB enquiry storage when a MongoDB URI is provided

## Workshop Details

- Workshop: AI & Robotics Summer Workshop
- Age Group: 8–14 Years
- Duration: 4 Weeks
- Mode: Online
- Fee: ₹2,999
- Start Date: 15 July 2026

## Project Structure

```text
.
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── workshop-hero.png
│   │   ├── components/
│   │   │   ├── FAQ.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── LearningOutcomes.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   └── WorkshopDetails.tsx
│   │   ├── data/
│   │   │   └── workshopData.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/
│   ├── db/
│   │   └── mongo.js
│   ├── routes/
│   │   └── enquiry.routes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
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

Create backend environment config:

```bash
cd server
cp .env.example .env
```

Backend environment variables:

```env
HOST=127.0.0.1
PORT=5001
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=kidrove_workshop
MONGODB_COLLECTION=enquiries
```

MongoDB persistence is enabled when `MONGODB_URI` has a value:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
```

For quick API testing without MongoDB, leave `MONGODB_URI` blank in `server/.env`.

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

Frontend: `http://localhost:5173`  
Backend: `http://127.0.0.1:5001`

Optional frontend environment variable:

```env
VITE_API_URL=http://127.0.0.1:5001
```

If `VITE_API_URL` is not set, the form posts to `http://127.0.0.1:5001/api/enquiry`.

## API

### Health Check

```http
GET /api/health
```

### Submit Enquiry

```http
POST /api/enquiry
```

Request body:

```json
{
  "name": "Aarav Mehta",
  "email": "parent@example.com",
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

Manual API check:

```bash
curl -X POST http://127.0.0.1:5001/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Aarav Mehta","email":"parent@example.com","phone":"9876543210"}'
```

## Quality Checks

Frontend:

```bash
cd client
npm run lint
npm run build
```

Backend:

```bash
cd server
npm start
```

## Notes

- MongoDB is integrated through the official driver and writes enquiries into the configured collection when `MONGODB_URI` is set.
- If `MONGODB_URI` is blank, the API still validates and returns the assignment success response, which keeps local review simple.
- The project intentionally keeps source code at the repository root with separate `client/` and `server/` apps for a clean submission.
