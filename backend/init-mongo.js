// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

db = db.getSiblingDB('cobit-tool');

// Create collections
db.createCollection('cobitdesigns');

// Create indexes for better performance
db.cobitdesigns.createIndex({ "name": 1 });
db.cobitdesigns.createIndex({ "createdAt": -1 });
db.cobitdesigns.createIndex({ "updatedAt": -1 });

// Insert sample data (optional)
db.cobitdesigns.insertOne({
  name: "Sample COBIT Design",
  description: "This is a sample COBIT governance design for demonstration purposes",
  context: {
    organizationType: "Enterprise",
    industry: "Technology",
    size: "Large"
  },
  initialScope: {
    selectedDomains: ["EDM", "APO", "BAI"],
    priorityAreas: ["Security", "Risk Management"]
  },
  refinement: {
    detailedProcesses: [
      {
        domain: "EDM",
        process: "EDM01 - Ensured Governance Framework Setting and Maintenance",
        priority: "High",
        notes: "Critical for governance framework"
      }
    ],
    resourceAllocation: {
      budget: "$500,000",
      timeline: "12 months",
      teamSize: "15 people"
    }
  },
  finalDesign: {
    governanceStructure: {
      roles: ["CIO", "IT Director", "Security Manager"],
      responsibilities: ["Strategic Planning", "Risk Management", "Compliance"],
      reportingLines: ["Board of Directors", "Executive Committee"]
    },
    implementationPlan: {
      phases: [
        {
          name: "Phase 1: Assessment",
          duration: "3 months",
          deliverables: ["Current State Analysis", "Gap Assessment"]
        }
      ],
      milestones: ["Q1: Assessment Complete", "Q2: Design Complete"],
      successMetrics: ["Risk Reduction", "Compliance Score"]
    },
    riskMitigation: [
      {
        risk: "Data Breach",
        mitigation: "Enhanced Security Controls",
        owner: "Security Team"
      }
    ]
  },
  results: {
    overallScore: 75,
    domainScores: [
      { domain: "EDM", score: 80 },
      { domain: "APO", score: 75 },
      { domain: "BAI", score: 70 }
    ],
    recommendations: [
      "Focus on EDM domain for governance framework",
      "Enhance APO processes for better alignment",
      "Improve BAI implementation capabilities"
    ],
    nextSteps: [
      "Implement governance framework",
      "Establish monitoring mechanisms",
      "Conduct regular assessments"
    ]
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

print("MongoDB initialization completed successfully!");
print("Sample COBIT design inserted into database."); 