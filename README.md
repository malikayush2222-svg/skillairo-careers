# SkillAiro Careers — 3D Full-Stack Job Portal

A premium MCA major-project-ready recruitment portal inspired by the supplied SkillAiro branding. It includes a React frontend, Three.js hero scene, Express API, MongoDB models, JWT auth, job search/filtering, applications, and admin job management.

## Stack
- React + Vite
- Tailwind CSS
- Three.js / React Three Fiber
- Framer Motion
- Node.js + Express
- MongoDB / Mongoose
- JWT + bcrypt

## Run

### 1. Server
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### 2. Client
```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Environment
Server `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skillairo_careers
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Client `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Demo admin
Register a normal account, then promote it in MongoDB by setting `role` to `admin` on the user document.

## Production
- Frontend: Vercel
- API: Render/Railway
- Database: MongoDB Atlas
- Resume storage: add Cloudinary/S3 adapter before production use.
