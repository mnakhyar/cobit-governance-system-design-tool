const express = require('express');
const { body, validationResult } = require('express-validator');
const CobitDesign = require('../models/CobitDesign');

const router = express.Router();

// Validation middleware
const validateDesign = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
];

// GET all designs
router.get('/', async (req, res) => {
  try {
    const designs = await CobitDesign.find({})
      .select('name description createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    res.json(designs);
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

// GET single design by ID
router.get('/:id', async (req, res) => {
  try {
    const design = await CobitDesign.findById(req.params.id);
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    
    res.json(design);
  } catch (error) {
    console.error('Error fetching design:', error);
    res.status(500).json({ error: 'Failed to fetch design' });
  }
});

// POST create new design
router.post('/', validateDesign, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const design = new CobitDesign(req.body);
    await design.save();
    
    res.status(201).json(design);
  } catch (error) {
    console.error('Error creating design:', error);
    res.status(500).json({ error: 'Failed to create design' });
  }
});

// PUT update design
router.put('/:id', validateDesign, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const design = await CobitDesign.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    
    res.json(design);
  } catch (error) {
    console.error('Error updating design:', error);
    res.status(500).json({ error: 'Failed to update design' });
  }
});

// DELETE design
router.delete('/:id', async (req, res) => {
  try {
    const design = await CobitDesign.findByIdAndDelete(req.params.id);
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    
    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    console.error('Error deleting design:', error);
    res.status(500).json({ error: 'Failed to delete design' });
  }
});

module.exports = router; 