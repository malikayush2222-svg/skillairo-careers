import { Router } from 'express';
import Application from '../models/Application.js';
import { protect } from '../middleware/auth.js';

const r = Router();

// Candidate: Get my applications
r.get('/my', protect, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id
    })
      .populate('job', 'title company location type salary')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: 'Unable to load applications'
    });
  }
});

// Admin: Get all applications
r.get('/', protect, async (req, res) => {
  try {
    console.log('ADMIN CHECK:', req.user);

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Only admin can view applications'
      });
    }

    const applications = await Application.find()
      .populate('job', 'title company location type salary')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: 'Unable to load applications'
    });
  }
});

// Admin: Update application status
r.patch('/:id/status', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Only admin can update application status'
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      'Applied',
      'Shortlisted',
      'Interview',
      'Rejected',
      'Selected'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid application status'
      });
    }

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    application.status = status;

    await application.save();

    res.json({
      message: 'Application status updated',
      application
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: 'Unable to update application status'
    });
  }
});

export default r;