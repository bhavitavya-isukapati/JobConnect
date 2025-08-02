// controllers/adminController.js
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const getDashboardStats = async (req, res) => {
  try {
    const jobsPosted = await Job.countDocuments();
    const applications = await JobApplication.countDocuments();

    res.status(200).json({
      jobsPosted,
      applications,
      admins: 1,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
