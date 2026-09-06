# Quick setup

1. Install Node.js 20+ and MongoDB (local) or create a MongoDB Atlas cluster.
2. `cd server && npm install && copy .env.example .env` (Windows) or `cp .env.example .env`.
3. Set `MONGO_URI` and a strong `JWT_SECRET`.
4. Optional sample jobs: `node src/seed.js`.
5. In a second terminal: `cd client && npm install && npm run dev`.
6. Open the Vite URL.

The 3D hero uses the supplied SkillAiro logo as the site brand asset and a Three.js animated object as the hero visual. The next development phase should add a dedicated job-details page, application-status page, admin UI, and Cloudinary resume upload.
