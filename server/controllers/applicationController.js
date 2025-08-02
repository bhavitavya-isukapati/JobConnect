// controllers/applicationController.js
import nodemailer from 'nodemailer';
import JobApplication from '../models/JobApplication.js';

// Submit a new job application
export const submitApplication = async (req, res) => {
  try {
    const { jobId, jobTitle, name, email, message } = req.body;
    const resume = req.file ? req.file.filename : null;

    // Save to MongoDB
    const newApplication = new JobApplication({
      jobId,
      jobTitle,
      name,
      email,
      resume,
      message
    });

    await newApplication.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jobconnect1204@gmail.com',         // Your Gmail ID
        pass: 'yzfv hiry vmsv eyve'               // Your 16-character app password
      }
    });

    // Email content
    const mailOptions = {
      from: '"JobConnect Team" <yournewemail@gmail.com>',
      to: email,
      subject: `Application Received for ${jobTitle}`,
      html: `
        <h3>Hi ${name},</h3>
        <p>We have received your application for the role of <strong>${jobTitle}</strong>.</p>
        <p>Thank you for applying. We will get back to you soon.</p>
        <br/>
        <p>Best Regards,<br/>JobConnect Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Application submitted and confirmation email sent." });

  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all job applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
