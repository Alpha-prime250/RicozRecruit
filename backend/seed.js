require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const User = require("./models/User");
const Job = require("./models/Job");
const Candidate = require("./models/Candidate");
const Application = require("./models/Application");

const run = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Job.deleteMany({}),
    Candidate.deleteMany({}),
    Application.deleteMany({}),
  ]);

  const admin = await User.create({
    name: "Asha Verma",
    email: "admin@ricozrecruit.com",
    password: "password123",
    role: "admin",
    department: "HR",
  });

  const recruiter = await User.create({
    name: "Rahul Mehta",
    email: "recruiter@ricozrecruit.com",
    password: "password123",
    role: "recruiter",
    department: "Talent Acquisition",
  });

  const job = await Job.create({
    title: "Frontend Engineer (React)",
    department: "Engineering",
    location: "Remote - India",
    employmentType: "full_time",
    openings: 2,
    minSalary: 800000,
    maxSalary: 1400000,
    description: "Build and ship customer-facing features in React.",
    requirements: ["3+ years React", "Strong JS fundamentals"],
    skills: ["React", "JavaScript", "CSS"],
    requestedBy: recruiter._id,
    approvalStatus: "approved",
    approvedBy: admin._id,
    status: "open",
  });

  const candidate = await Candidate.create({
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91-9876543210",
    source: "linkedin",
    currentTitle: "Frontend Developer",
    currentCompany: "TechNova",
    experienceYears: 3,
    skills: ["React", "JavaScript", "Redux"],
    location: "Bengaluru",
    addedBy: recruiter._id,
  });

  await Application.create({
    job: job._id,
    candidate: candidate._id,
    stage: "screening",
    stageHistory: [
      { stage: "applied", changedBy: recruiter._id },
      { stage: "screening", changedBy: recruiter._id, note: "Resume shortlisted" },
    ],
  });

  console.log("Seed data created:");
  console.log("  admin@ricozrecruit.com / password123");
  console.log("  recruiter@ricozrecruit.com / password123");

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
