import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  User,
  LogIn,
  LayoutDashboard,
  ArrowRight,
  MapPin,
  Clock3
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Stars
} from '@react-three/drei';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/* =========================
   LOGO
========================= */

http://localhost:5173
return (
  <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080611]/75 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">

      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <Logo />

        <div>
          <div className="font-black tracking-wide">
            SKILL<span className="gold">AIRO</span>
          </div>

          <div className="text-[10px] uppercase tracking-[.3em] text-white/45">
            Careers
          </div>
        </div>
      </Link>

      <div className="hidden items-center gap-6 md:flex">

        <Link
          to="/jobs"
          className="text-white/70 hover:text-white"
        >
          Jobs
        </Link>

        {token && role === 'admin' && (
          <Link
            to="/admin/dashboard"
            className="text-white/70 hover:text-white"
          >
            Admin Dashboard
          </Link>
        )}

        {token && role === 'user' && (
          <Link
            to="/dashboard"
            className="text-white/70 hover:text-white"
          >
            Dashboard
          </Link>
        )}

        {token ? (
          <button
            className="btn btn-gold"
            onClick={() => {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('role');

              setToken(null);
              setRole(null);

              window.dispatchEvent(
                new Event('auth-changed')
              );

              location.href = '/';
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary"
          >
            <LogIn size={16} />
            Login
          </Link>
        )}

      </div>
    </div>
  </nav>
);


function AdminRoute({ children }) {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================
   3D SCENE
========================= */

function Scene() {
  return (
    <div className="absolute inset-0">

      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45
        }}
      >

        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.6} />

        <pointLight
          position={[3, 3, 4]}
          intensity={30}
          color="#c084fc"
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={20}
          color="#f2c96d"
        />

        <Float
          speed={2}
          rotationIntensity={0.6}
          floatIntensity={1.2}
        >

          <mesh rotation={[0.3, 0.5, 0.2]}>

            <torusKnotGeometry
              args={[1.35, 0.22, 128, 24]}
            />

            <meshStandardMaterial
              color="#a855f7"
              metalness={0.85}
              roughness={0.18}
            />

          </mesh>

        </Float>

        <Stars
          radius={40}
          depth={20}
          count={700}
          factor={2}
          fade
        />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.7}
        />

      </Canvas>

    </div>
  );
}

/* =========================
   HOME
========================= */

function Home() {
  const stats = [
    ['500+', 'Open opportunities'],
    ['120+', 'Hiring partners'],
    ['10k+', 'Candidates']
  ];

  const categories = [
    {
      icon: '💻',
      title: 'Software Development',
      text: 'Build and develop modern applications.'
    },
    {
      icon: '📊',
      title: 'Data & Analytics',
      text: 'Turn data into meaningful insights.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      text: 'Create beautiful digital experiences.'
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      text: 'Work with modern cloud technologies.'
    },
    {
      icon: '🔐',
      title: 'Cyber Security',
      text: 'Protect systems and digital platforms.'
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      text: 'Build intelligent solutions for tomorrow.'
    }
  ];

  const features = [
    {
      icon: '✓',
      title: 'Verified Opportunities',
      text: 'Discover genuine jobs and career opportunities from hiring partners.'
    },
    {
      icon: '⚡',
      title: 'Easy Applications',
      text: 'Apply to relevant opportunities with a simple and streamlined process.'
    },
    {
      icon: '📈',
      title: 'Track Your Progress',
      text: 'Keep track of your applications and know exactly where you stand.'
    },
    {
      icon: '🚀',
      title: 'Grow Your Career',
      text: 'Find opportunities that match your skills and career goals.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create your profile',
      text: 'Showcase your skills, education and career interests.'
    },
    {
      number: '02',
      title: 'Discover opportunities',
      text: 'Explore jobs and internships that match your profile.'
    },
    {
      number: '03',
      title: 'Apply with confidence',
      text: 'Submit applications and take the next step.'
    },
    {
      number: '04',
      title: 'Track & grow',
      text: 'Monitor your applications and move closer to your goals.'
    }
  ];

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[680px] overflow-hidden">

        <Scene />

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-[#080611]/80 blur-3xl" />

        <div className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-[#080611]/80 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:min-h-[680px] md:grid-cols-2 md:py-20">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          >

            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.15,
                duration: 0.5
              }}
              className="mb-6 inline-flex items-center rounded-full border border-[#e6bd64]/30 bg-[#e6bd64]/10 px-4 py-2 text-sm font-medium text-[#f0d58d] backdrop-blur-md"
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#e6bd64] shadow-[0_0_10px_#e6bd64]" />
              Find your next opportunity
            </motion.div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
              Build your{' '}
              <span className="gold">
                future
              </span>{' '}
              with SkillAiro.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
              A premium career platform connecting ambitious talent with
              meaningful jobs, internships and opportunities.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                className="btn btn-primary group"
                to="/jobs"
              >
                Explore Jobs
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                className="btn glass transition-all duration-300 hover:border-[#e6bd64]/30 hover:bg-white/10"
                to="/register"
              >
                Create Profile
              </Link>

            </div>

            {/* Trust */}
            <div className="mt-7 flex items-center gap-3 text-sm text-white/40">
              <div className="flex -space-x-2">
                <span className="h-7 w-7 rounded-full border-2 border-[#0b0715] bg-purple-500" />
                <span className="h-7 w-7 rounded-full border-2 border-[#0b0715] bg-yellow-500" />
                <span className="h-7 w-7 rounded-full border-2 border-[#0b0715] bg-blue-500" />
              </div>

              <span>
                Built for ambitious careers
              </span>
            </div>

          </motion.div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24">

        <div className="grid gap-5 md:grid-cols-3">

          {stats.map((x, index) => (

            <motion.div
              key={x[0]}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.3
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{
                y: -5
              }}
              className="glass group rounded-3xl border border-white/10 p-7 transition-all duration-300 hover:border-[#e6bd64]/20 hover:bg-white/[0.06]"
            >

              <div className="text-4xl font-black gold transition-transform duration-300 group-hover:scale-105">
                {x[0]}
              </div>

              <div className="mt-2 text-white/55">
                {x[1]}
              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          JOB SEARCH
      ====================================================== */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 25
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.25
          }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-10"
        >

          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bd64]">
              Find your opportunity
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Search for your next role
            </h2>

            <p className="mt-3 text-white/50">
              Explore opportunities that match your skills and ambitions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
                What are you looking for?
              </label>

              <div className="text-white/70">
                Job title, skill or keyword
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <label className="mb-2 block text-xs uppercase tracking-wider text-white/40">
                Location
              </label>

              <div className="text-white/70">
                City or remote
              </div>
            </div>

            <Link
              to="/jobs"
              className="btn btn-primary flex items-center justify-center gap-2 rounded-2xl px-7"
            >
              Search Jobs
              <ArrowRight size={17} />
            </Link>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          POPULAR CATEGORIES
      ====================================================== */}
      <section className="relative mx-auto max-w-7xl px-5 pb-28">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bd64]">
              Explore careers
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Popular categories
            </h2>

            <p className="mt-3 max-w-2xl text-white/50">
              Find opportunities across the most in-demand career fields.
            </p>
          </div>

          <Link
            to="/jobs"
            className="group flex items-center gap-2 text-sm font-semibold text-[#e6bd64]"
          >
            View all jobs
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (

            <motion.div
              key={category.title}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.2
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.06
              }}
              whileHover={{
                y: -6
              }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-[#e6bd64]/25 hover:bg-white/[0.05]"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl">
                  {category.icon}
                </div>

                <ArrowRight
                  size={18}
                  className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#e6bd64]"
                />

              </div>

              <h3 className="mt-6 text-lg font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/45">
                {category.text}
              </p>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          WHY SKILLAIRO
      ====================================================== */}
      <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.02]">

        <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-28">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <motion.div
              initial={{
                opacity: 0,
                x: -25
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
            >

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bd64]">
                Why SkillAiro
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                More than a job search.
                <span className="gold"> A career journey.</span>
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-white/50">
                SkillAiro is designed to make your journey from discovering
                opportunities to building your career simpler and smarter.
              </p>

              <Link
                to="/register"
                className="btn btn-primary group mt-8 inline-flex"
              >
                Start your journey
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </motion.div>


            <div className="grid gap-4 sm:grid-cols-2">

              {features.map((feature, index) => (

                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: index * 0.08
                  }}
                  className="rounded-3xl border border-white/10 bg-black/10 p-6"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6bd64]/10 text-[#e6bd64]">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {feature.text}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-28">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bd64]">
            Simple process
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Your next opportunity is four steps away
          </h2>

          <p className="mt-4 text-white/50">
            Everything you need to move from searching to getting hired.
          </p>

        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-4">

          {steps.map((step, index) => (

            <motion.div
              key={step.number}
              initial={{
                opacity: 0,
                y: 25
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.2
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.025] p-7"
            >

              <div className="text-sm font-bold tracking-widest text-[#e6bd64]">
                {step.number}
              </div>

              <h3 className="mt-8 text-lg font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {step.text}
              </p>

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-28">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          className="relative overflow-hidden rounded-[2rem] border border-[#e6bd64]/20 bg-gradient-to-br from-[#e6bd64]/10 via-purple-500/5 to-transparent px-6 py-16 text-center md:px-12"
        >

          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#e6bd64]/10 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e6bd64]">
              Your future starts here
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black text-white md:text-5xl">
              Ready to take the next step in your career?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/50">
              Explore opportunities, showcase your skills and start building
              the career you deserve.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/jobs"
                className="btn btn-primary group"
              >
                Explore Jobs
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="btn glass hover:bg-white/10"
              >
                Create Profile
              </Link>

            </div>

          </div>

        </motion.div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-white/10 bg-black/20">

        <div className="mx-auto max-w-7xl px-5 py-14">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            <div className="lg:col-span-2">

              <h3 className="text-2xl font-black text-white">
                Skill<span className="gold">Airo</span>
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/40">
                A modern career platform connecting ambitious talent with
                meaningful jobs, internships and opportunities.
              </p>

            </div>


            <div>
              <h4 className="font-semibold text-white">
                Platform
              </h4>

              <div className="mt-4 space-y-3 text-sm text-white/45">

                <Link
                  to="/jobs"
                  className="block transition-colors hover:text-[#e6bd64]"
                >
                  Explore Jobs
                </Link>

                <Link
                  to="/dashboard"
                  className="block transition-colors hover:text-[#e6bd64]"
                >
                  Dashboard
                </Link>

                <Link
                  to="/applications"
                  className="block transition-colors hover:text-[#e6bd64]"
                >
                  My Applications
                </Link>

              </div>
            </div>


            <div>
              <h4 className="font-semibold text-white">
                Account
              </h4>

              <div className="mt-4 space-y-3 text-sm text-white/45">

                <Link
                  to="/login"
                  className="block transition-colors hover:text-[#e6bd64]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="block transition-colors hover:text-[#e6bd64]"
                >
                  Create Profile
                </Link>

              </div>
            </div>

          </div>


          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/30 md:flex-row">

            <p>
              © {new Date().getFullYear()} SkillAiro Careers. All rights reserved.
            </p>

            <p>
              Built for ambitious careers.
            </p>

          </div>

        </div>

      </footer>
    </>
  );
}
/* =========================
   JOBS
========================= */

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {

    fetch(API + '/jobs')
      .then((r) => r.json())
      .then(setJobs)
      .catch(() => { });

  }, []);

  const locations = [
    ...new Set(
      jobs
        .map((job) => job.location)
        .filter(Boolean)
    )
  ];

  const types = [
    ...new Set(
      jobs
        .map((job) => job.type)
        .filter(Boolean)
    )
  ];

  const filtered = jobs.filter((j) => {

    const searchText = (
      j.title +
      ' ' +
      j.company +
      ' ' +
      j.location
    ).toLowerCase();

    const matchesSearch =
      searchText.includes(
        q.toLowerCase()
      );

    const matchesLocation =
      !location ||
      j.location === location;

    const matchesType =
      !type ||
      j.type === type;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType
    );

  });

  const clearFilters = () => {
    setQ('');
    setLocation('');
    setType('');
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      <h1 className="text-4xl font-black">
        Explore{' '}
        <span className="gold">
          Jobs
        </span>
      </h1>

      <p className="mt-2 text-white/50">
        Find the right opportunity for your career.
      </p>

      {/* Search + Filters */}

      <div className="glass mt-7 rounded-3xl p-4">

        <div className="flex items-center gap-3">

          <Search size={20} />

          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search role, company or location..."
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
          />

        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">

          {/* Location */}

          <select
            className="input"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          >
            <option value="">
              All Locations
            </option>

            {locations.map((loc) => (
              <option
                key={loc}
                value={loc}
              >
                {loc}
              </option>
            ))}

          </select>

          {/* Job Type */}

          <select
            className="input"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="">
              All Job Types
            </option>

            {types.map((jobType) => (
              <option
                key={jobType}
                value={jobType}
              >
                {jobType}
              </option>
            ))}

          </select>

          {/* Clear */}

          <button
            type="button"
            onClick={clearFilters}
            className="btn glass"
          >
            Clear Filters
          </button>

        </div>

      </div>

      {/* Results */}

      <div className="mt-8 flex items-center justify-between">

        <p className="text-sm text-white/50">
          {filtered.length}{' '}
          {filtered.length === 1
            ? 'job'
            : 'jobs'}{' '}
          found
        </p>

      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">

        {filtered.map((j) => (

          <Link
            to={'/jobs/' + j._id}
            key={j._id}
            className="glass rounded-3xl p-6 transition hover:-translate-y-1"
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  {j.title}
                </h2>

                <p className="mt-1 gold">
                  {j.company}
                </p>

              </div>

              <Briefcase />

            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/55">

              <span className="flex items-center gap-1">
                <MapPin size={15} />
                {j.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={15} />
                {j.type}
              </span>

            </div>

            {j.skills?.length > 0 && (

              <div className="mt-5 flex flex-wrap gap-2">

                {j.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-200"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            )}

          </Link>

        ))}

        {!filtered.length && (

          <div className="glass rounded-3xl p-8 text-center text-white/50 md:col-span-2">
            No jobs found matching your filters.
          </div>

        )}

      </div>

    </main>
  );
}

/* =========================
   JOB DETAILS
========================= */
function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {

    fetch(API + '/jobs/' + id)
      .then(async (r) => {

        const data = await r.json();

        if (!r.ok) {
          throw new Error(
            data.message || 'Unable to load job'
          );
        }

        return data;

      })
      .then((data) => {

        setJob(data);
        setLoading(false);

      })
      .catch((e) => {

        setError(e.message);
        setLoading(false);

      });

  }, [id]);

  const apply = async () => {

    setMessage('');
    setError('');

    const token =
      sessionStorage.getItem('token');

    if (!token) {

      setError(
        'Please login first to apply.'
      );

      return;
    }

    try {

      const r = await fetch(
        API + '/jobs/' + id + '/apply',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer ' + token
          }
        }
      );

      const d = await r.json();

      if (!r.ok) {

        setError(
          d.message ||
          'Unable to apply'
        );

        return;
      }

      setMessage(
        'Application submitted successfully! 🎉'
      );

    } catch {

      setError(
        'Unable to connect to server.'
      );

    }

  };

  if (loading) {

    return (
      <main className="mx-auto max-w-7xl px-5 py-14">

        <div className="glass rounded-3xl p-8 text-center">

          <p className="text-white/60">
            Loading job...
          </p>

        </div>

      </main>
    );

  }

  if (!job) {

    return (
      <main className="mx-auto max-w-7xl px-5 py-14">

        <div className="glass rounded-3xl p-8 text-center">

          <p className="text-red-300">
            {error || 'Job not found'}
          </p>

          <Link
            to="/jobs"
            className="btn glass mt-6 inline-flex"
          >
            Back to Jobs
          </Link>

        </div>

      </main>
    );

  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-14">

      {/* Back */}

      <Link
        to="/jobs"
        className="inline-flex items-center text-sm text-white/50 transition hover:text-white"
      >
        ← Back to Jobs
      </Link>

      {/* Main Card */}

      <div className="glass mt-6 rounded-3xl p-6 md:p-10">

        {/* Header */}

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div>

            <p className="text-sm uppercase tracking-wider text-white/40">
              Job Opportunity
            </p>

            <h1 className="mt-2 text-4xl font-black md:text-5xl">
              {job.title}
            </h1>

            <p className="mt-3 text-xl gold">
              {job.company}
            </p>

          </div>

          <div className="hidden rounded-2xl bg-purple-500/10 p-4 md:block">
            <Briefcase size={32} />
          </div>

        </div>

        {/* Job Info */}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl bg-white/5 p-4">

            <p className="text-xs text-white/40">
              Location
            </p>

            <p className="mt-2 flex items-center gap-2 font-semibold">
              <MapPin size={16} />
              {job.location || 'Remote'}
            </p>

          </div>

          <div className="rounded-2xl bg-white/5 p-4">

            <p className="text-xs text-white/40">
              Job Type
            </p>

            <p className="mt-2 flex items-center gap-2 font-semibold">
              <Clock3 size={16} />
              {job.type || 'Full-time'}
            </p>

          </div>

          <div className="rounded-2xl bg-white/5 p-4">

            <p className="text-xs text-white/40">
              Salary
            </p>

            <p className="mt-2 font-semibold">
              {job.salary || 'Not specified'}
            </p>

          </div>

        </div>

        {/* Description */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Job Description
          </h2>

          <p className="mt-4 whitespace-pre-line leading-8 text-white/60">
            {job.description ||
              'No description available.'}
          </p>

        </section>

        {/* Skills */}

        {job.skills?.length > 0 && (

          <section className="mt-10">

            <h2 className="text-2xl font-bold">
              Required Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">

              {job.skills.map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-200"
                >
                  {skill}
                </span>

              ))}

            </div>

          </section>

        )}

        {/* Messages */}

        {error && (

          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
            {error}
          </div>

        )}

        {message && (

          <div className="mt-8 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-green-300">
            {message}
          </div>

        )}

        {/* Apply */}

        <div className="mt-10 border-t border-white/10 pt-8">

          <h2 className="text-xl font-bold">
            Interested in this opportunity?
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Submit your application and track its status from your dashboard.
          </p>

          <button
            onClick={apply}
            className="btn btn-primary mt-5 w-full md:w-auto"
          >
            Apply Now
            <ArrowRight size={17} />
          </button>

        </div>

      </div>

    </main>
  );
}
/* =========================
   AUTH
========================= */

function Auth({ register = false }) {

  const nav = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [name, setName] =
    useState('');

  const [err, setErr] =
    useState('');

  const submit = async (e) => {

    e.preventDefault();

    setErr('');

    try {

      const r = await fetch(
        API +
        '/auth/' +
        (register
          ? 'register'
          : 'login'),
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(
            register
              ? {
                name,
                email,
                password
              }
              : {
                email,
                password
              }
          )
        }
      );

      const d = await r.json();

      if (!r.ok) {

        setErr(
          d.message ||
          'Something went wrong'
        );

        return;
      }
      sessionStorage.setItem(
        'token',
        d.token
      );

      sessionStorage.setItem(
        'role',
        d.user.role
      );

      window.dispatchEvent(
        new Event('auth-changed')
      );

      if (d.user.role === 'admin') {
        nav('/admin/dashboard');
      } else {
        nav('/dashboard');
      }

    } catch {

      setErr(
        'Unable to connect to server.'
      );

    }

  };

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md items-center px-5">

      <form
        onSubmit={submit}
        className="glass w-full rounded-3xl p-8"
      >

        <h1 className="text-3xl font-black">
          {register
            ? 'Create your profile'
            : 'Welcome back'}
        </h1>

        <p className="mt-2 text-white/50">
          {register
            ? 'Start your career journey.'
            : 'Sign in to continue.'}
        </p>

        {register && (

          <input
            className="input mt-6"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            autoComplete="name"
            required
          />

        )}

        <input
          className="input mt-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          className="input mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          minLength={6}
        />

        {err && (
          <p className="mt-3 text-sm text-red-300">
            {err}
          </p>
        )}

        <button
          className="btn btn-primary mt-6 w-full"
          type="submit"
        >
          {register
            ? 'Create account'
            : 'Login'}
        </button>

        <p className="mt-5 text-center text-sm text-white/50">

          {register
            ? 'Already have an account? '
            : 'New here? '}

          <Link
            className="gold"
            to={
              register
                ? '/login'
                : '/register'
            }
          >
            {register
              ? 'Login'
              : 'Create one'}
          </Link>

        </p>

      </form>

    </main>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch(API + '/auth/me', {
      headers: {
        Authorization:
          'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((r) => r.json())
      .then(setMe)
      .catch(() => { });
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      <div className="glass rounded-3xl p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-purple-500/20 p-4">
            <User />
          </div>

          <div>
            <h1 className="text-3xl font-black">
              Hello, {me?.name || 'Candidate'}
            </h1>

            <p className="text-white/50">
              Your SkillAiro career dashboard
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {/* Browse Jobs */}
          <Link
            to="/jobs"
            className="glass rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <Briefcase />

            <h2 className="mt-5 font-bold">
              Browse jobs
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Discover matching opportunities.
            </p>
          </Link>

          {/* Applications */}
          <Link
            to="/applications"
            className="glass rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <LayoutDashboard />

            <h2 className="mt-5 font-bold">
              Applications
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Track your application status.
            </p>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="glass rounded-2xl p-6 transition hover:-translate-y-1"
          >
            <User />

            <h2 className="mt-5 font-bold">
              Profile
            </h2>

            <p className="mt-2 text-sm text-white/50">
              Update your personal and professional information.
            </p>
          </Link>

        </div>

      </div>

    </main>
  );
}

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    skills: '',
    resumeUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError('Please login first.');
      setLoading(false);
      return;
    }

    fetch(API + '/auth/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(async (r) => {
        const data = await r.json();

        if (!r.ok) {
          throw new Error(
            data.message || 'Unable to load profile'
          );
        }

        return data;
      })
      .then((data) => {
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          education: data.education || '',
          skills: Array.isArray(data.skills)
            ? data.skills.join(', ')
            : data.skills || '',
          resumeUrl: data.resumeUrl || ''
        });

        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = sessionStorage.getItem('token');

      const r = await fetch(API + '/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          location: profile.location,
          education: profile.education,
          skills: profile.skills,
          resumeUrl: profile.resumeUrl
        })
      });

      const data = await r.json();

      if (!r.ok) {
        throw new Error(
          data.message || 'Unable to update profile'
        );
      }

      setMessage('Profile updated successfully!');

    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-14">
        <div className="glass rounded-3xl p-8 text-center">
          <p className="text-white/60">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-14">

      <div>
        <h1 className="text-4xl font-black">
          My <span className="gold">Profile</span>
        </h1>

        <p className="mt-2 text-white/50">
          Manage your personal and professional information.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-green-300">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="glass mt-8 rounded-3xl p-6 md:p-8"
      >

        <div className="grid gap-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="text-sm text-white/60">
              Full Name
            </label>

            <input
              className="input mt-2 w-full"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-white/60">
              Email
            </label>

            <input
              className="input mt-2 w-full opacity-60"
              type="email"
              value={profile.email}
              disabled
            />

            <p className="mt-1 text-xs text-white/30">
              Email cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-white/60">
              Phone
            </label>

            <input
              className="input mt-2 w-full"
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-white/60">
              Location
            </label>

            <input
              className="input mt-2 w-full"
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>

          {/* Education */}
          <div className="md:col-span-2">
            <label className="text-sm text-white/60">
              Education
            </label>

            <input
              className="input mt-2 w-full"
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
              placeholder="e.g. MCA - Shobhit University"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="text-sm text-white/60">
              Skills
            </label>

            <input
              className="input mt-2 w-full"
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="Java, Python, React, HTML, CSS"
            />

            <p className="mt-1 text-xs text-white/30">
              Separate skills with commas.
            </p>
          </div>

          {/* Resume */}
          <div className="md:col-span-2">
            <label className="text-sm text-white/60">
              Resume URL
            </label>

            <input
              className="input mt-2 w-full"
              type="url"
              name="resumeUrl"
              value={profile.resumeUrl}
              onChange={handleChange}
              placeholder="https://..."
            />

            <p className="mt-1 text-xs text-white/30">
              Add a link to your resume.
            </p>
          </div>

        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary mt-8 w-full"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>

      </form>

    </main>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    applied: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = sessionStorage.getItem('token');

        if (!token) {
          throw new Error('Please login first.');
        }

        const headers = {
          Authorization: 'Bearer ' + token
        };

        const [jobsResponse, applicationsResponse] =
          await Promise.all([
            fetch(API + '/jobs'),
            fetch(API + '/applications', {
              headers
            })
          ]);

        const jobs = await jobsResponse.json();
        const applications = await applicationsResponse.json();

        if (!jobsResponse.ok) {
          throw new Error('Unable to load jobs');
        }

        if (!applicationsResponse.ok) {
          throw new Error(
            applications.message ||
            'Unable to load applications'
          );
        }

        const countStatus = (status) =>
          applications.filter(
            (application) =>
              String(application.status || 'Applied')
                .toLowerCase() === status.toLowerCase()
          ).length;

        setStats({
          jobs: Array.isArray(jobs) ? jobs.length : 0,
          applications: Array.isArray(applications)
            ? applications.length
            : 0,
          applied: countStatus('Applied'),
          shortlisted: countStatus('Shortlisted'),
          interview: countStatus('Interview'),
          selected: countStatus('Selected'),
          rejected: countStatus('Rejected')
        });

      } catch (e) {
        console.error('Admin dashboard error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-white/60">
          Loading admin dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Admin <span className="gold">Dashboard</span>
        </h1>

        <p className="mt-2 text-white/50">
          Manage jobs and track candidate applications.
        </p>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        <div className="glass rounded-3xl p-6">
          <Briefcase />
          <p className="mt-5 text-sm text-white/50">
            Total Jobs
          </p>
          <h2 className="mt-2 text-4xl font-black gold">
            {stats.jobs}
          </h2>
        </div>

        <div className="glass rounded-3xl p-6">
          <LayoutDashboard />
          <p className="mt-5 text-sm text-white/50">
            Total Applications
          </p>
          <h2 className="mt-2 text-4xl font-black gold">
            {stats.applications}
          </h2>
        </div>
        <Link
          to="/admin/applications?status=Applied"
          className="glass rounded-3xl p-6 transition hover:-translate-y-1 cursor-pointer"
        >
          <User />

          <p className="mt-5 text-sm text-white/50">
            Applied
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.applied}
          </h2>
        </Link>

        <Link
          to="/admin/applications?status=Shortlisted"
          className="glass rounded-3xl p-6 transition hover:-translate-y-1 cursor-pointer"
        >
          <User />

          <p className="mt-5 text-sm text-white/50">
            Shortlisted
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.shortlisted}
          </h2>
        </Link>

        <Link
          to="/admin/applications?status=Interview"
          className="glass rounded-3xl p-6 transition hover:-translate-y-1 cursor-pointer"
        >
          <Clock3 />

          <p className="mt-5 text-sm text-white/50">
            Interviews
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.interview}
          </h2>
        </Link>

        <Link
          to="/admin/applications?status=Selected"
          className="glass rounded-3xl p-6 transition hover:-translate-y-1 cursor-pointer"
        >
          <User />

          <p className="mt-5 text-sm text-white/50">
            Selected
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.selected}
          </h2>
        </Link>

        <Link
          to="/admin/applications?status=Rejected"
          className="glass rounded-3xl p-6 transition hover:-translate-y-1 cursor-pointer"
        >
          <User />

          <p className="mt-5 text-sm text-white/50">
            Rejected
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {stats.rejected}
          </h2>
        </Link>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <Link
          to="/admin/jobs"
          className="btn btn-primary"
        >
          Manage Jobs
          <ArrowRight size={17} />
        </Link>

        <Link
          to="/admin/applications"
          className="btn btn-primary"
        >
          Manage Applications
          <ArrowRight size={17} />
        </Link>

        <Link
          to="/jobs"
          className="btn glass"
        >
          View Jobs
        </Link>

      </div>

    </main>
  );
}

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError('Please login first.');
      setLoading(false);
      return;
    }

    fetch(API + '/applications/my', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(async (r) => {
        const data = await r.json();

        if (!r.ok) {
          throw new Error(
            data.message || 'Unable to load applications'
          );
        }

        return data;
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Status step
  const getStatusStep = (status) => {
    const value = String(status || '').toLowerCase();

    if (value.includes('reject')) return 4;
    if (value.includes('select')) return 4;
    if (value.includes('interview')) return 3;
    if (value.includes('short')) return 2;

    return 1;
  };

  // Status label
  const getStatusLabel = (status) => {
    const value = String(status || '').toLowerCase();

    if (value.includes('reject')) return 'Rejected';
    if (value.includes('select')) return 'Selected';
    if (value.includes('interview')) return 'Interview';
    if (value.includes('short')) return 'Shortlisted';
    if (value.includes('review')) return 'Under Review';

    return 'Applied';
  };

  // Status badge color
  const getStatusColor = (status) => {
    const value = String(status || '').toLowerCase();

    if (value.includes('reject')) {
      return 'bg-red-500/20 text-red-300 border-red-400/20';
    }

    if (value.includes('select')) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/20';
    }

    if (value.includes('interview')) {
      return 'bg-purple-500/20 text-purple-300 border-purple-400/20';
    }

    if (value.includes('short')) {
      return 'bg-green-500/20 text-green-300 border-green-400/20';
    }

    if (value.includes('review')) {
      return 'bg-blue-500/20 text-blue-300 border-blue-400/20';
    }

    return 'bg-purple-500/20 text-purple-200 border-purple-400/20';
  };

  // Progress percentage
  const getProgressWidth = (step) => {
    if (step === 1) return '0%';
    if (step === 2) return '33.33%';
    if (step === 3) return '66.66%';
    return '100%';
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-14">
        <div className="glass rounded-3xl p-8 text-center">
          <p className="text-white/60">
            Loading applications...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-black">
          My <span className="gold">Applications</span>
        </h1>

        <p className="mt-2 text-white/50">
          Track your job applications and their status.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {/* No Applications */}
      {!error && applications.length === 0 && (
        <div className="glass mt-8 rounded-3xl p-10 text-center">

          <Briefcase
            className="mx-auto text-white/60"
            size={45}
          />

          <h2 className="mt-5 text-xl font-bold">
            No applications yet
          </h2>

          <p className="mt-2 text-white/50">
            Apply for a job and it will appear here.
          </p>

          <Link
            to="/jobs"
            className="btn btn-primary mt-6 inline-flex items-center gap-2"
          >
            Explore Jobs
            <ArrowRight size={17} />
          </Link>

        </div>
      )}

      {/* Applications */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {applications.map((application) => {

          const step = getStatusStep(application.status);
          const statusLabel = getStatusLabel(application.status);
          const isRejected =
            String(application.status || '')
              .toLowerCase()
              .includes('reject');

          const isSelected =
            String(application.status || '')
              .toLowerCase()
              .includes('select');

          return (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-6 transition hover:-translate-y-1"
            >

              {/* Header */}
              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <h2 className="truncate text-xl font-bold">
                    {application.job?.title || 'Job'}
                  </h2>

                  <p className="mt-1 font-medium gold">
                    {application.job?.company || 'Company'}
                  </p>

                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(
                    application.status
                  )}`}
                >
                  {statusLabel}
                </span>

              </div>

              {/* Job Information */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">

                {application.job?.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {application.job.location}
                  </span>
                )}

                {application.job?.type && (
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={15} />
                    {application.job.type}
                  </span>
                )}

              </div>

              {/* Status Tracker */}
              <div className="mt-8">

                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white/75">
                    Application Status
                  </h3>

                  <span
                    className={`text-xs font-medium ${isRejected
                      ? 'text-red-300'
                      : isSelected
                        ? 'text-emerald-300'
                        : 'text-white/40'
                      }`}
                  >
                    {statusLabel}
                  </span>
                </div>

                <div className="relative">

                  {/* Background Line */}
                  <div className="absolute left-[12.5%] right-[12.5%] top-3 h-[2px] bg-white/10" />

                  {/* Progress Line */}
                  <div
                    className={`absolute left-[12.5%] top-3 h-[2px] transition-all duration-500 ${isRejected
                      ? 'bg-red-400'
                      : isSelected
                        ? 'bg-emerald-400'
                        : 'bg-purple-400'
                      }`}
                    style={{
                      width: `calc(${getProgressWidth(step)} * 0.75)`
                    }}
                  />

                  {/* Steps */}
                  <div className="relative grid grid-cols-4">

                    {/* Applied */}
                    <div className="flex flex-col items-center">

                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-bold shadow-lg shadow-purple-500/20">
                        ✓
                      </div>

                      <span className="mt-2 text-center text-xs text-white/65">
                        Applied
                      </span>

                    </div>

                    {/* Shortlisted */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${step >= 2
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-white/30'
                          }`}
                      >
                        {step >= 2 ? '✓' : '2'}
                      </div>

                      <span
                        className={`mt-2 text-center text-xs ${step >= 2
                          ? 'text-white/75'
                          : 'text-white/35'
                          }`}
                      >
                        Shortlisted
                      </span>

                    </div>

                    {/* Interview */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${step >= 3
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/30'
                          }`}
                      >
                        {step >= 3 ? '✓' : '3'}
                      </div>

                      <span
                        className={`mt-2 text-center text-xs ${step >= 3
                          ? 'text-white/75'
                          : 'text-white/35'
                          }`}
                      >
                        Interview
                      </span>

                    </div>

                    {/* Final */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${isRejected
                          ? 'bg-red-500 text-white'
                          : isSelected
                            ? 'bg-emerald-500 text-white'
                            : step >= 4
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/10 text-white/30'
                          }`}
                      >
                        {isRejected
                          ? '✕'
                          : isSelected
                            ? '✓'
                            : '4'}
                      </div>

                      <span
                        className={`mt-2 text-center text-xs ${isRejected
                          ? 'text-red-300'
                          : isSelected
                            ? 'text-emerald-300'
                            : 'text-white/35'
                          }`}
                      >
                        {isRejected ? 'Rejected' : 'Selected'}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Current Status Message */}
              <div
                className={`mt-7 rounded-2xl border p-4 ${isRejected
                  ? 'border-red-400/15 bg-red-400/5'
                  : isSelected
                    ? 'border-emerald-400/15 bg-emerald-400/5'
                    : 'border-white/10 bg-white/5'
                  }`}
              >

                <p className="text-sm text-white/60">

                  {isRejected && (
                    <>
                      Your application was not selected for this position.
                    </>
                  )}

                  {isSelected && (
                    <>
                      Congratulations! You have been selected for this position. 🎉
                    </>
                  )}

                  {!isRejected && !isSelected && step === 3 && (
                    <>
                      Your application has moved to the interview stage.
                    </>
                  )}

                  {!isRejected && !isSelected && step === 2 && (
                    <>
                      Your application has been shortlisted.
                    </>
                  )}

                  {!isRejected && !isSelected && step === 1 && (
                    <>
                      Your application has been received and is under consideration.
                    </>
                  )}

                </p>

              </div>

              {/* Applied Date */}
              <div className="mt-5 flex items-center justify-between">

                <p className="text-xs text-white/40">
                  Applied on{' '}
                  {application.createdAt
                    ? new Date(
                      application.createdAt
                    ).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                    : 'N/A'}
                </p>

                {application.job?._id && (
                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="text-xs font-semibold text-purple-300 transition hover:text-purple-200"
                  >
                    View Job →
                  </Link>
                )}

              </div>

            </motion.div>
          );
        })}

      </div>

    </main>
  );
}


function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const statusFilter = searchParams.get('status') || '';

  const allowedStatuses = [
    'Applied',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const activeStatus = allowedStatuses.includes(statusFilter)
    ? statusFilter
    : '';

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = sessionStorage.getItem('token');

        if (!token) {
          throw new Error('Please login first.');
        }

        const response = await fetch(API + '/applications', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Unable to load applications'
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            'Invalid applications data received.'
          );
        }

        setApplications(data);

      } catch (e) {
        console.error('Admin applications error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const changeFilter = (status) => {
    setSuccess('');

    if (status) {
      setSearchParams({ status });
    } else {
      setSearchParams({});
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      setError('');
      setSuccess('');

      const token = sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Please login first.');
      }

      const response = await fetch(
        API + '/applications/' + applicationId + '/status',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to update status'
        );
      }

      setApplications((current) =>
        current.map((application) =>
          application._id === applicationId
            ? {
              ...application,
              status: data.application.status
            }
            : application
        )
      );

      setSuccess(
        `Application status updated to ${status}.`
      );

      setTimeout(() => {
        setSuccess('');
      }, 3000);

    } catch (e) {
      console.error('Status update error:', e);
      setError(e.message);
    }
  };

  const filteredApplications = activeStatus
    ? applications.filter(
      (application) =>
        String(application.status || 'Applied').toLowerCase() ===
        activeStatus.toLowerCase()
    )
    : applications;

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-white/60">
          Loading applications...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-black">
          {activeStatus ? (
            <>
              {activeStatus}{' '}
              <span className="gold">
                Applications
              </span>
            </>
          ) : (
            <>
              All{' '}
              <span className="gold">
                Applications
              </span>
            </>
          )}
        </h1>

        <p className="mt-2 text-white/50">
          Manage candidate applications and update their status.
        </p>

      </div>

      {/* Status Tabs */}
      <div className="glass rounded-2xl p-2">

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() => changeFilter('')}
            className={
              !activeStatus
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            All
          </button>

          <button
            type="button"
            onClick={() => changeFilter('Applied')}
            className={
              activeStatus === 'Applied'
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            Applied
          </button>

          <button
            type="button"
            onClick={() => changeFilter('Shortlisted')}
            className={
              activeStatus === 'Shortlisted'
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            Shortlisted
          </button>

          <button
            type="button"
            onClick={() => changeFilter('Interview')}
            className={
              activeStatus === 'Interview'
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            Interview
          </button>

          <button
            type="button"
            onClick={() => changeFilter('Selected')}
            className={
              activeStatus === 'Selected'
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            Selected
          </button>

          <button
            type="button"
            onClick={() => changeFilter('Rejected')}
            className={
              activeStatus === 'Rejected'
                ? 'btn btn-primary'
                : 'btn glass'
            }
          >
            Rejected
          </button>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-400/10 p-5 text-green-300">
          {success}
        </div>
      )}

      {/* Result Count */}
      {!error && (
        <div className="mt-6 text-sm text-white/50">
          Showing{' '}
          <span className="font-semibold text-white">
            {filteredApplications.length}
          </span>{' '}
          {activeStatus
            ? `${activeStatus.toLowerCase()} `
            : ''}
          application
          {filteredApplications.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Empty State */}
      {!error && filteredApplications.length === 0 && (
        <div className="glass mt-5 rounded-3xl p-8 text-center">

          <Briefcase
            className="mx-auto"
            size={40}
          />

          <h2 className="mt-4 text-xl font-bold">
            {activeStatus
              ? `No ${activeStatus} applications`
              : 'No applications found'}
          </h2>

          <p className="mt-2 text-white/50">
            {activeStatus
              ? `There are currently no applications with ${activeStatus} status.`
              : 'Applications will appear here when candidates apply.'}
          </p>

        </div>
      )}

      {/* Applications */}
      <div className="mt-5 grid gap-5">

        {filteredApplications.map((application) => (
          <div
            key={application._id}
            className="glass rounded-3xl p-6"
          >

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              {/* Job + Candidate */}
              <div>

                <h2 className="text-xl font-bold">
                  {application.job?.title || 'Job'}
                </h2>

                <p className="mt-1 gold">
                  {application.job?.company || 'Company'}
                </p>

                <div className="mt-3 space-y-1 text-sm text-white/55">

                  <p>
                    Candidate:{' '}
                    <span className="text-white/80">
                      {application.user?.name || 'Unknown'}
                    </span>
                  </p>

                  <p>
                    Email:{' '}
                    <span className="text-white/80">
                      {application.user?.email || 'Unknown'}
                    </span>
                  </p>

                  {application.job?.location && (
                    <p>
                      Location: {application.job.location}
                    </p>
                  )}

                  <p>
                    Applied on:{' '}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col gap-2">

                <label className="text-sm text-white/50">
                  Application Status
                </label>

                <select
                  value={application.status || 'Applied'}
                  onChange={(e) =>
                    updateStatus(
                      application._id,
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                </select>

              </div>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}


function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    skills: ''
  });

  const [editingId, setEditingId] = useState(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(API + '/jobs');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to load jobs'
        );
      }

      setJobs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      skills: ''
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Please login first.');
      }

      const payload = {
        title: form.title,
        company: form.company,
        location: form.location,
        type: form.type,
        salary: form.salary,
        description: form.description,
        skills: form.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      };

      const url = editingId
        ? API + '/jobs/' + editingId
        : API + '/jobs';

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Unable to save job'
        );
      }

      resetForm();
      await loadJobs();

    } catch (e) {
      setError(e.message);
    }
  };

  const editJob = (job) => {
    setEditingId(job._id);

    setForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      type: job.type || 'Full-time',
      salary: job.salary || '',
      description: job.description || '',
      skills: Array.isArray(job.skills)
        ? job.skills.join(', ')
        : ''
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const deleteJob = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job?'
    );

    if (!confirmed) return;

    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(
        API + '/jobs/' + id,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Unable to delete job'
        );
      }

      setJobs((current) =>
        current.filter(
          (job) => job._id !== id
        )
      );

    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-white/60">
          Loading jobs...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">

      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Manage <span className="gold">Jobs</span>
        </h1>

        <p className="mt-2 text-white/50">
          Add, edit and remove job opportunities.
        </p>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {/* Job Form */}

      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-8"
      >

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {editingId
              ? 'Edit Job'
              : 'Add New Job'}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn glass"
            >
              Cancel
            </button>
          )}

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <input
            className="input"
            name="title"
            placeholder="Job title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <select
            className="input"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Full-time">
              Full-time
            </option>

            <option value="Part-time">
              Part-time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Contract">
              Contract
            </option>
          </select>

          <input
            className="input"
            name="salary"
            placeholder="Salary (optional)"
            value={form.salary}
            onChange={handleChange}
          />

          <input
            className="input"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />

        </div>

        <textarea
          className="input mt-4 min-h-[140px]"
          name="description"
          placeholder="Job description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary mt-5"
        >
          {editingId
            ? 'Update Job'
            : 'Add Job'}

          <ArrowRight size={17} />
        </button>

      </form>

      {/* Jobs List */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Existing Jobs
        </h2>

        {!jobs.length && (
          <div className="glass mt-5 rounded-3xl p-8 text-center text-white/50">
            No jobs found.
          </div>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="glass rounded-3xl p-6"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="text-xl font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-1 gold">
                    {job.company}
                  </p>

                </div>

                <Briefcase />
              </div>

              <div className="mt-5 space-y-2 text-sm text-white/55">

                <p>
                  📍 {job.location}
                </p>

                <p>
                  🕐 {job.type}
                </p>

                {job.salary && (
                  <p>
                    💰 {job.salary}
                  </p>
                )}

              </div>

              {job.skills?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">

                  {job.skills.map((skill) => (

                    <span
                      key={skill}
                      className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-200"
                    >
                      {skill}
                    </span>

                  ))}

                </div>
              )}

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => editJob(job)}
                  className="btn glass"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteJob(job._id)
                  }
                  className="btn bg-red-500/20 text-red-300"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}


/* =========================
   APP
========================= */

function App() {

  return (
    <>
      <Nav />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/login"
          element={<Auth />}
        />

        <Route
          path="/register"
          element={<Auth register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AdminJobs />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <AdminApplications />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} SkillAiro Careers · Built as a full-stack MCA major project
      </footer>
    </>
  );
}

export default App;
