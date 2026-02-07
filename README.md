# Kidrove AI & Robotics Summer Workshop

Responsive full-stack workshop landing page for Kidrove's **AI & Robotics Summer Workshop** interview assignment.

The app includes a React + TypeScript landing page, client-side form validation, loading and success/error states, and an Express API endpoint for registration enquiries. Enquiries are stored in MongoDB when `MONGODB_URI` is configured, with local JSON storage available as a development fallback.

## Features

- Kid-friendly, parent-focused responsive UI inspired by children's activity platforms
- Hero, workshop details, learning outcomes, FAQ, registration form, and footer sections
- TypeScript React component structure
- Tailwind CSS styling with Framer Motion animations
- Client-side validation for name, email, and phone number
- Express `POST /api/enquiry` endpoint with server-side validation
- MongoDB enquiry storage when `MONGODB_URI` is configured
- Local JSON enquiry storage fallback in `enquiries.json`

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
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── workshop-hero.png
│   │   ├── components/
│   │   │   ├── BrandLogo.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── LearningOutcomes.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── WorkshopDetails.tsx
│   │   ├── data/
│   │   │   └── workshopData.ts
│   │   ├── utils/
│   │   │   └── animations.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.ts
├── server/
│   ├── config/
│   │   └── workshop.js          # Workshop snapshot stored with each enquiry
│   ├── db/
│   │   ├── fileStorage.js       # Local JSON enquiry storage
│   │   └── mongo.js             # MongoDB connection and collection helpers
│   ├── routes/
│   │   └── enquiry.routes.js    # POST /api/enquiry
│   ├── utils/
│   │   └── phone.js             # Indian phone number validation & formatting
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
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
PORT=5000
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/
MONGODB_DB=kidrove_workshop
MONGODB_COLLECTION=enquiries
ENQUIRIES_FILE=../enquiries.json
ENABLE_FILE_STORAGE=false
```

When `MONGODB_URI` is set, the backend writes enquiries to MongoDB. In local development only, if `MONGODB_URI` is blank, the backend writes to the repository-level `enquiries.json` file. You can change `ENQUIRIES_FILE` to use a different local JSON file.

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
Backend: `http://127.0.0.1:5000`

Optional frontend environment variable:

```env
VITE_API_URL=http://127.0.0.1:5000
```

If `VITE_API_URL` is not set, the form posts to `http://127.0.0.1:5000/api/enquiry`.

## Deploy To Vercel

Deploy this repo as two Vercel projects: one for the backend and one for the frontend.

### Backend Project

Create a Vercel project with these settings:

```text
Root Directory: server
Framework Preset: Other
Build Command: leave empty
Output Directory: leave empty
Install Command: npm install
```

Set these backend environment variables in Vercel:

```env
CLIENT_URL=https://your-frontend-project.vercel.app
MONGODB_URI=mongodb+srv://USER:PASSWORD@HOST/
MONGODB_DB=kidrove_workshop
MONGODB_COLLECTION=enquiries
```

Do not set `HOST` or `PORT` on Vercel. Vercel provides the serverless runtime. The backend `server/vercel.json` routes requests to `server.js`.

### Frontend Project

Create a second Vercel project with these settings:

```text
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Set this frontend environment variable after the backend is deployed:

```env
VITE_API_URL=https://your-backend-project.vercel.app
```

The registration form appends `/api/enquiry` automatically, so `VITE_API_URL` can be either the backend origin or the full enquiry endpoint. The frontend `client/vercel.json` rewrites all routes to `index.html` for SPA navigation.

### Deployment Checks

Backend health check:

```bash
curl https://your-backend-project.vercel.app/api/health
```

Backend enquiry check:

```bash
curl -X POST https://your-backend-project.vercel.app/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Aarav Mehta","email":"parent@example.com","phone":"9876543210"}'
```

On Vercel, `MONGODB_URI` is required for persistent enquiry storage.

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
  "message": "Enquiry submitted successfully."
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
curl -X POST http://127.0.0.1:5000/api/enquiry \
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

- Enquiries are persisted to MongoDB when `MONGODB_URI` is configured.
- Local JSON storage remains available during local development when MongoDB is not configured.
- Phone number validation lives in `server/utils/phone.js` and the workshop metadata snapshot lives in `server/config/workshop.js` for easy updates.
- The project intentionally keeps source code at the repository root with separate `client/` and `server/` apps for a clean submission.
