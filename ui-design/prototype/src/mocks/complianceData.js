const statusCounts = {
  compliant: 3,
  warning: 2,
  "non-compliant": 0
};

const overallScore = 87;

const detailedData = [
  {
    id: "nyc-zoning",
    name: "NYC Zoning Resolution",
    code: "ZR",
    status: "compliant",
    score: 92,
    lastChecked: "2025-07-10T14:30:00Z",
    description: "Compliance with NYC Zoning Resolution requirements for the Manhattan Detention Complex site.",
    category: "zoning",
    issues: [
      {
        id: "zr-1",
        title: "Floor Area Ratio (FAR) Documentation",
        description: "Additional documentation needed for FAR calculations in community facility space.",
        severity: "low",
        status: "open",
        createdAt: "2025-07-05T10:15:00Z",
        assignedTo: "David Rodriguez",
        dueDate: "2025-07-20T23:59:59Z"
      },
      {
        id: "zr-2",
        title: "Setback Requirements",
        description: "Verify compliance with setback requirements on north facade above 85 feet.",
        severity: "low",
        status: "in-progress",
        createdAt: "2025-07-08T14:30:00Z",
        assignedTo: "David Rodriguez",
        dueDate: "2025-07-18T23:59:59Z"
      }
    ],
    sections: [
      {
        id: "use-groups",
        name: "Use Groups",
        status: "compliant",
        score: 100
      },
      {
        id: "bulk-regulations",
        name: "Bulk Regulations",
        status: "compliant",
        score: 95
      },
      {
        id: "parking",
        name: "Parking Requirements",
        status: "compliant",
        score: 100
      },
      {
        id: "loading",
        name: "Loading Requirements",
        status: "warning",
        score: 85
      },
      {
        id: "special-district",
        name: "Special District Requirements",
        status: "compliant",
        score: 90
      }
    ]
  },
  {
    id: "ceqr",
    name: "City Environmental Quality Review",
    code: "CEQR",
    status: "warning",
    score: 78,
    lastChecked: "2025-07-11T09:15:00Z",
    description: "Environmental impact assessment compliance under City Environmental Quality Review.",
    category: "environmental",
    issues: [
      {
        id: "ceqr-1",
        title: "Air Quality Analysis Update",
        description: "Updated air quality analysis needed to reflect revised HVAC system specifications.",
        severity: "medium",
        status: "open",
        createdAt: "2025-07-01T11:20:00Z",
        assignedTo: "Environmental Consultant",
        dueDate: "2025-07-25T23:59:59Z"
      },
      {
        id: "ceqr-2",
        title: "Noise Mitigation Documentation",
        description: "Additional documentation required for noise mitigation measures during construction phase.",
        severity: "medium",
        status: "open",
        createdAt: "2025-07-03T09:45:00Z",
        assignedTo: "Environmental Consultant",
        dueDate: "2025-07-22T23:59:59Z"
      },
      {
        id: "ceqr-3",
        title: "Transportation Analysis",
        description: "Transportation analysis needs updating based on revised operational staffing levels.",
        severity: "high",
        status: "open",
        createdAt: "2025-06-28T15:10:00Z",
        assignedTo: "Transportation Consultant",
        dueDate: "2025-07-15T23:59:59Z"
      },
      {
        id: "ceqr-4",
        title: "Shadow Analysis",
        description: "Shadow analysis requires revision based on updated building massing.",
        severity: "low",
        status: "in-progress",
        createdAt: "2025-07-02T14:30:00Z",
        assignedTo: "Environmental Consultant",
        dueDate: "2025-07-18T23:59:59Z"
      },
      {
        id: "ceqr-5",
        title: "Historic Resources",
        description: "Additional documentation needed for potential impacts on nearby historic resources.",
        severity: "medium",
        status: "in-progress",
        createdAt: "2025-06-30T10:15:00Z",
        assignedTo: "Historic Preservation Specialist",
        dueDate: "2025-07-20T23:59:59Z"
      },
      {
        id: "ceqr-6",
        title: "Construction Schedule",
        description: "Construction schedule needs updating in environmental impact statement.",
        severity: "low",
        status: "open",
        createdAt: "2025-07-05T11:30:00Z",
        assignedTo: "Project Manager",
        dueDate: "2025-07-19T23:59:59Z"
      },
      {
        id: "ceqr-7",
        title: "Neighborhood Character Assessment",
        description: "Neighborhood character assessment requires additional detail on visual impacts.",
        severity: "low",
        status: "open",
        createdAt: "2025-07-07T09:20:00Z",
        assignedTo: "Urban Designer",
        dueDate: "2025-07-21T23:59:59Z"
      }
    ],
    sections: [
      {
        id: "land-use",
        name: "Land Use, Zoning & Public Policy",
        status: "compliant",
        score: 90
      },
      {
        id: "socioeconomic",
        name: "Socioeconomic Conditions",
        status: "compliant",
        score: 85
      },
      {
        id: "community-facilities",
        name: "Community Facilities",
        status: "compliant",
        score: 95
      },
      {
        id: "open-space",
        name: "Open Space",
        status: "compliant",
        score: 90
      },
      {
        id: "shadows",
        name: "Shadows",
        status: "warning",
        score: 75
      },
      {
        id: "historic-cultural",
        name: "Historic & Cultural Resources",
        status: "warning",
        score: 70
      },
      {
        id: "urban-design",
        name: "Urban Design & Visual Resources",
        status: "compliant",
        score: 85
      },
      {
        id: "natural-resources",
        name: "Natural Resources",
        status: "compliant",
        score: 90
      },
      {
        id: "hazardous-materials",
        name: "Hazardous Materials",
        status: "compliant",
        score: 85
      },
      {
        id: "water-sewer",
        name: "Water & Sewer Infrastructure",
        status: "compliant",
        score: 90
      },
      {
        id: "transportation",
        name: "Transportation",
        status: "warning",
        score: 65
      },
      {
        id: "air-quality",
        name: "Air Quality",
        status: "warning",
        score: 70
      },
      {
        id: "noise",
        name: "Noise",
        status: "warning",
        score: 75
      }
    ]
  },
  {
    id: "chapter-33",
    name: "NYC Building Code Chapter 33",
    code: "BC Ch.33",
    status: "compliant",
    score: 95,
    lastChecked: "2025-07-12T11:45:00Z",
    description: "Safeguards during construction or demolition, including site safety and public protection.",
    category: "construction-safety",
    issues: [
      {
        id: "ch33-1",
        title: "Site Safety Plan Update",
        description: "Site Safety Plan requires updating to reflect revised crane locations on east side of site.",
        severity: "low",
        status: "in-progress",
        createdAt: "2025-07-09T13:20:00Z",
        assignedTo: "Site Safety Manager",
        dueDate: "2025-07-16T23:59:59Z"
      }
    ],
    sections: [
      {
        id: "site-safety",
        name: "Site Safety Program",
        status: "compliant",
        score: 100
      },
      {
        id: "protection-public",
        name: "Protection of Public and Property",
        status: "compliant",
        score: 95
      },
      {
        id: "existing-structures",
        name: "Protection of Existing Structures",
        status: "compliant",
        score: 90
      },
      {
        id: "excavation-foundation",
        name: "Excavation and Foundation",
        status: "compliant",
        score: 100
      },
      {
        id: "scaffold",
        name: "Scaffold Requirements",
        status: "compliant",
        score: 95
      },
      {
        id: "crane-derrick",
        name: "Crane and Derrick Requirements",
        status: "compliant",
        score: 90
      }
    ]
  },
  {
    id: "ada",
    name: "ADA Compliance",
    code: "ADA",
    status: "compliant",
    score: 97,
    lastChecked: "2025-07-09T16:20:00Z",
    description: "Americans with Disabilities Act accessibility requirements for public facilities.",
    category: "accessibility",
    issues: [],
    sections: [
      {
        id: "accessible-routes",
        name: "Accessible Routes",
        status: "compliant",
        score: 100
      },
      {
        id: "entrances",
        name: "Entrances",
        status: "compliant",
        score: 100
      },
      {
        id: "doors-doorways",
        name: "Doors and Doorways",
        status: "compliant",
        score: 95
      },
      {
        id: "ramps",
        name: "Ramps",
        status: "compliant",
        score: 100
      },
      {
        id: "elevators",
        name: "Elevators",
        status: "compliant",
        score: 100
      },
      {
        id: "platform-lifts",
        name: "Platform Lifts",
        status: "compliant",
        score: 95
      },
      {
        id: "toilet-facilities",
        name: "Toilet Facilities",
        status: "compliant",
        score: 95
      },
      {
        id: "signage",
        name: "Signage",
        status: "compliant",
        score: 90
      }
    ]
  },
  {
    id: "mwbe",
    name: "M/WBE Requirements",
    code: "M/WBE",
    status: "warning",
    score: 82,
    lastChecked: "2025-07-11T10:30:00Z",
    description: "Minority and Women-owned Business Enterprise participation requirements for NYC projects.",
    category: "procurement",
    issues: [
      {
        id: "mwbe-1",
        title: "M/WBE Utilization Plan",
        description: "Current M/WBE utilization plan needs updating to meet 30% participation goal for mechanical systems.",
        severity: "medium",
        status: "open",
        createdAt: "2025-07-06T10:45:00Z",
        assignedTo: "Procurement Manager",
        dueDate: "2025-07-20T23:59:59Z"
      },
      {
        id: "mwbe-2",
        title: "Quarterly M/WBE Report",
        description: "Q2 2025 M/WBE utilization report requires additional documentation for electrical subcontractors.",
        severity: "low",
        status: "open",
        createdAt: "2025-07-08T14:15:00Z",
        assignedTo: "Procurement Manager",
        dueDate: "2025-07-15T23:59:59Z"
      },
      {
        id: "mwbe-3",
        title: "M/WBE Subcontractor Documentation",
        description: "Updated certification documentation needed for three M/WBE subcontractors.",
        severity: "low",
        status: "in-progress",
        createdAt: "2025-07-07T11:30:00Z",
        assignedTo: "Contract Administrator",
        dueDate: "2025-07-17T23:59:59Z"
      },
      {
        id: "mwbe-4",
        title: "Outreach Documentation",
        description: "Additional documentation needed for M/WBE outreach efforts for upcoming bid packages.",
        severity: "low",
        status: "open",
        createdAt: "2025-07-09T09:15:00Z",
        assignedTo: "Procurement Manager",
        dueDate: "2025-07-19T23:59:59Z"
      }
    ],
    sections: [
      {
        id: "participation-goals",
        name: "Participation Goals",
        status: "warning",
        score: 75
      },
      {
        id: "utilization-plan",
        name: "Utilization Plan",
        status: "warning",
        score: 80
      },
      {
        id: "good-faith-efforts",
        name: "Good Faith Efforts",
        status: "compliant",
        score: 90
      },
      {
        id: "reporting",
        name: "Reporting Requirements",
        status: "warning",
        score: 85
      },
      {
        id: "certification",
        name: "Certification Verification",
        status: "compliant",
        score: 95
      }
    ]
  }
];

// Helper functions
const getComplianceByCode = (code) => {
  return detailedData.find(item => item.code === code) || null;
};

const getOverallComplianceScore = () => {
  return overallScore;
};

const getComplianceIssues = () => {
  const allIssues = [];
  detailedData.forEach(regulation => {
    regulation.issues.forEach(issue => {
      allIssues.push({
        ...issue,
        regulation: {
          id: regulation.id,
          name: regulation.name,
          code: regulation.code
        }
      });
    });
  });
  return allIssues;
};

const getComplianceStatusCounts = () => {
  return statusCounts;
};

export { 
  detailedData, 
  statusCounts, 
  overallScore, 
  getComplianceByCode, 
  getOverallComplianceScore, 
  getComplianceIssues, 
  getComplianceStatusCounts 
};

export default {
  detailedData,
  statusCounts,
  overallScore,
  getComplianceByCode,
  getOverallComplianceScore,
  getComplianceIssues,
  getComplianceStatusCounts
};
