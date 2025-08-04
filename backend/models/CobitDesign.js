const mongoose = require('mongoose');

const cobitDesignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Step 1: Context
  context: {
    organizationType: String,
    industry: String,
    size: String,
    regulatoryRequirements: [String],
    businessObjectives: [String],
    riskTolerance: String
  },
  // Step 2: Initial Scope
  initialScope: {
    selectedDomains: [String],
    priorityAreas: [String],
    scopeNotes: String
  },
  // Step 3: Refinement
  refinement: {
    detailedProcesses: [{
      domain: String,
      process: String,
      priority: String,
      notes: String
    }],
    resourceAllocation: {
      budget: String,
      timeline: String,
      teamSize: String
    }
  },
  // Step 4: Final Design
  finalDesign: {
    governanceStructure: {
      roles: [String],
      responsibilities: [String],
      reportingLines: [String]
    },
    implementationPlan: {
      phases: [{
        name: String,
        duration: String,
        deliverables: [String]
      }],
      milestones: [String],
      successMetrics: [String]
    },
    riskMitigation: [{
      risk: String,
      mitigation: String,
      owner: String
    }]
  },
  // Calculated results
  results: {
    overallScore: Number,
    domainScores: [{
      domain: String,
      score: Number
    }],
    recommendations: [String],
    nextSteps: [String]
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
cobitDesignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CobitDesign', cobitDesignSchema); 