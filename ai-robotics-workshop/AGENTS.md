# AGENTS.md

## Project

Build a responsive AI & Robotics Summer Workshop landing page for children aged 8–14.

## Required stack

Frontend:
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Fetch API for form submission

Backend:
- Node.js
- Express.js
- CORS
- dotenv
- Endpoint: POST /api/enquiry

## Product details

Workshop Name: AI & Robotics Summer Workshop  
Age Group: 8–14 Years  
Duration: 4 Weeks  
Mode: Online  
Fee: ₹2,999  
Start Date: 15 July 2026  

## Frontend requirements

Build these sections:

1. Hero Section
   - Workshop title
   - Short description
   - Enroll Now button
   - Button scrolls to registration form

2. Workshop Details Section
   - Age group
   - Duration
   - Mode
   - Fee
   - Start date

3. Learning Outcomes Section
   - Minimum 5 outcomes

4. FAQ Section
   - Minimum 3 FAQs

5. Registration Form
   - Name
   - Email
   - Phone Number
   - Required validation
   - Email format validation
   - Phone validation
   - Loading state
   - Success message
   - Error message

6. Footer

## UI style

The design should feel:
- Bright
- Friendly
- Modern
- Child-friendly
- Parent-focused
- Inspired by kids’ activity and workshop platforms like Kidrove

Use:
- Rounded cards
- Soft colorful backgrounds
- Clear CTA buttons
- Friendly icons
- Mobile-first responsive layout
- Smooth Framer Motion animations

Avoid:
- Generic plain white AI layout
- Overly dark SaaS design
- Too much technical jargon
- Cluttered sections

## Component structure

Use this structure:

client/src/
- components/
  - Hero.tsx
  - WorkshopDetails.tsx
  - LearningOutcomes.tsx
  - FAQ.tsx
  - RegistrationForm.tsx
  - Footer.tsx
- data/
  - workshopData.ts
- App.tsx
- main.tsx
- index.css

Backend structure:

server/
- routes/
  - enquiry.routes.js
- server.js
- package.json
- .env

## Backend requirements

Create:

POST /api/enquiry

Request body:

{
  "name": "Bibek Kumar Shah",
  "email": "bibek@example.com",
  "phone": "9876543210"
}

Validation:
- name is required
- email is required
- phone is required
- email must be valid
- phone must be valid length

Success response:

{
  "success": true,
  "message": "Enquiry submitted successfully"
}

Error response:

{
  "success": false,
  "message": "Name, email, and phone number are required"
}

## Quality rules

- Keep code clean and readable.
- Use reusable components.
- Keep data in `workshopData.ts`.
- Make the page responsive on mobile, tablet, and desktop.
- Use accessible labels for form fields.
- Run build/lint checks when possible.
- Include clear README instructions.

