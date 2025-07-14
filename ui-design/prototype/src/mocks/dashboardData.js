const projectStats = [
  {
    id: "docs-processed",
    label: "Documents Processed",
    value: 1247,
    change: 12.5,
    changeLabel: "from last month",
    icon: "DocumentScanner"
  },
  {
    id: "compliance-score",
    label: "Compliance Score",
    value: 87,
    suffix: "%",
    change: 3.2,
    changeLabel: "from last assessment",
    icon: "Gavel"
  },
  {
    id: "active-issues",
    label: "Active Issues",
    value: 24,
    change: -8,
    changeLabel: "from last week",
    icon: "BugReport"
  },
  {
    id: "processing-time",
    label: "Avg. Processing Time",
    value: 4.2,
    suffix: "min",
    change: -22.5,
    changeLabel: "from last quarter",
    icon: "Speed"
  }
];

const agentCapabilities = [
  {
    id: "document-analysis",
    title: "Document Analysis",
    description: "Extracts key information from construction documents, RFIs, and specifications",
    icon: "Description",
    color: "#562CE6",
    metrics: {
      accuracy: 94,
      documentsProcessed: 892,
      averageProcessingTime: "3.2 min"
    }
  },
  {
    id: "compliance-check",
    title: "Compliance Checking",
    description: "Validates documents against NYC Building Code, Zoning Resolution, and project requirements",
    icon: "FactCheck",
    color: "#1AC6A1",
    metrics: {
      accuracy: 91,
      regulationsTracked: 347,
      issuesPrevented: 78
    }
  },
  {
    id: "schedule-analysis",
    title: "Schedule Analysis",
    description: "Identifies potential delays and critical path impacts from RFIs and submittals",
    icon: "Schedule",
    color: "#F4B740",
    metrics: {
      accuracy: 89,
      daysOptimized: 42,
      potentialDelaysPrevented: 12
    }
  },
  {
    id: "cost-impact",
    title: "Cost Impact Assessment",
    description: "Evaluates potential cost implications of design changes and RFI responses",
    icon: "AttachMoney",
    color: "#2D9CDB",
    metrics: {
      accuracy: 87,
      potentialSavings: "$1.2M",
      riskFactorsIdentified: 34
    }
  }
];

const processingPipeline = [
  {
    id: "document-intake",
    name: "Document Intake",
    description: "Initial processing and classification of uploaded documents",
    status: "operational",
    metrics: {
      throughput: "125 docs/day",
      accuracy: "98%",
      lastUpdated: "2025-07-12T08:30:00Z"
    }
  },
  {
    id: "content-extraction",
    name: "Content Extraction",
    description: "Structured data extraction from documents using OCR and NLP",
    status: "operational",
    metrics: {
      throughput: "95 docs/day",
      accuracy: "92%",
      lastUpdated: "2025-07-12T10:15:00Z"
    }
  },
  {
    id: "compliance-mapping",
    name: "Compliance Mapping",
    description: "Mapping document content to relevant regulatory requirements",
    status: "operational",
    metrics: {
      throughput: "80 docs/day",
      accuracy: "90%",
      lastUpdated: "2025-07-12T11:45:00Z"
    }
  },
  {
    id: "issue-detection",
    name: "Issue Detection",
    description: "Identifying potential compliance issues and conflicts",
    status: "degraded",
    metrics: {
      throughput: "65 docs/day",
      accuracy: "87%",
      lastUpdated: "2025-07-12T14:20:00Z"
    },
    alert: {
      message: "Performance degraded due to complex NYC Zoning Resolution updates",
      severity: "warning",
      timestamp: "2025-07-12T14:20:00Z"
    }
  },
  {
    id: "report-generation",
    name: "Report Generation",
    description: "Creating compliance reports and documentation",
    status: "operational",
    metrics: {
      throughput: "40 reports/day",
      accuracy: "95%",
      lastUpdated: "2025-07-12T15:10:00Z"
    }
  }
];

const integrationStatus = [
  {
    id: "procore",
    name: "Procore",
    type: "Project Management",
    status: "connected",
    lastSync: "2025-07-12T16:30:00Z",
    metrics: {
      documentsSync: 342,
      issuesTracked: 87,
      syncFrequency: "15 min"
    }
  },
  {
    id: "autodesk-bim360",
    name: "Autodesk BIM 360",
    type: "BIM Collaboration",
    status: "connected",
    lastSync: "2025-07-12T16:15:00Z",
    metrics: {
      modelsSync: 24,
      issuesTracked: 56,
      syncFrequency: "30 min"
    }
  },
  {
    id: "primavera-p6",
    name: "Primavera P6",
    type: "Scheduling",
    status: "degraded",
    lastSync: "2025-07-12T14:45:00Z",
    metrics: {
      activitiesSync: 1245,
      milestonesTracked: 38,
      syncFrequency: "60 min"
    },
    alert: {
      message: "API rate limiting causing delayed syncs",
      severity: "warning",
      timestamp: "2025-07-12T14:45:00Z"
    }
  },
  {
    id: "bluebeam",
    name: "Bluebeam",
    type: "Document Markup",
    status: "connected",
    lastSync: "2025-07-12T16:00:00Z",
    metrics: {
      documentsSync: 156,
      markupsSync: 892,
      syncFrequency: "15 min"
    }
  },
  {
    id: "nyc-dob-now",
    name: "NYC DOB NOW",
    type: "Permitting",
    status: "scheduled",
    lastSync: null,
    metrics: {
      permitApplications: 0,
      inspectionsScheduled: 0,
      syncFrequency: "manual"
    },
    alert: {
      message: "Integration scheduled for deployment on July 20, 2025",
      severity: "info",
      timestamp: "2025-07-10T09:00:00Z"
    }
  }
];

const projectDetails = {
  id: "nyc-bbj-2025",
  name: "NYC Borough-Based Jail System - Manhattan Facility",
  client: "NYC Department of Design and Construction",
  location: "Manhattan, NY",
  phase: "Construction Documents",
  startDate: "2024-03-15",
  estimatedCompletion: "2027-08-30",
  budget: "$1.8B",
  squareFootage: 1.25e6,
  description: "Part of the NYC Borough-Based Jail System, replacing the Rikers Island complex with modern, humane facilities. The Manhattan facility includes 886 beds in a 19-story structure with community and support spaces.",
  keyMilestones: [
    {
      name: "Design Development Completion",
      date: "2024-12-15",
      status: "completed"
    },
    {
      name: "Construction Documents - 50%",
      date: "2025-05-30",
      status: "completed"
    },
    {
      name: "Construction Documents - 100%",
      date: "2025-09-15",
      status: "in-progress"
    },
    {
      name: "Bidding Phase",
      date: "2025-10-30",
      status: "scheduled"
    },
    {
      name: "Construction Start",
      date: "2026-01-15",
      status: "scheduled"
    }
  ],
  projectTeam: [
    {
      role: "Project Executive",
      name: "Sarah Johnson",
      company: "NYC DDC",
      email: "s.johnson@example.com"
    },
    {
      role: "Project Manager",
      name: "Michael Chen",
      company: "AECOM",
      email: "m.chen@example.com"
    },
    {
      role: "Lead Architect",
      name: "David Rodriguez",
      company: "Perkins Eastman",
      email: "d.rodriguez@example.com"
    },
    {
      role: "Structural Engineer",
      name: "Lisa Washington",
      company: "Thornton Tomasetti",
      email: "l.washington@example.com"
    }
  ]
};

const complianceStatus = [
  {
    id: "nyc-zoning",
    name: "NYC Zoning Resolution",
    status: "compliant",
    lastChecked: "2025-07-10T14:30:00Z",
    score: 92,
    issues: 2,
    critical: 0
  },
  {
    id: "ceqr",
    name: "City Environmental Quality Review",
    status: "warning",
    lastChecked: "2025-07-11T09:15:00Z",
    score: 78,
    issues: 7,
    critical: 1
  },
  {
    id: "chapter-33",
    name: "NYC Building Code Chapter 33",
    status: "compliant",
    lastChecked: "2025-07-12T11:45:00Z",
    score: 95,
    issues: 1,
    critical: 0
  },
  {
    id: "ada",
    name: "ADA Compliance",
    status: "compliant",
    lastChecked: "2025-07-09T16:20:00Z",
    score: 97,
    issues: 0,
    critical: 0
  },
  {
    id: "mwbe",
    name: "M/WBE Requirements",
    status: "warning",
    lastChecked: "2025-07-11T10:30:00Z",
    score: 82,
    issues: 4,
    critical: 0
  }
];

export {
  projectStats,
  agentCapabilities,
  processingPipeline,
  integrationStatus,
  projectDetails,
  complianceStatus
};

export default {
  projectStats,
  agentCapabilities,
  processingPipeline,
  integrationStatus,
  projectDetails,
  complianceStatus
};
