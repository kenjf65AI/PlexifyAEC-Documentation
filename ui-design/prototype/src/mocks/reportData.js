const reportTypes = [
  {
    id: "pm-report",
    name: "Project Management Report",
    description: "Comprehensive project status report with schedule, budget, and risk analysis",
    icon: "Assessment",
    frequency: "Monthly",
    sections: [
      "Executive Summary",
      "Schedule Status",
      "Budget Status",
      "Risk Register",
      "Quality Control",
      "Safety Performance",
      "Upcoming Activities"
    ]
  },
  {
    id: "compliance-report",
    name: "Regulatory Compliance Report",
    description: "Detailed analysis of project compliance with NYC building codes and regulations",
    icon: "Gavel",
    frequency: "Quarterly",
    sections: [
      "Compliance Summary",
      "NYC Building Code Status",
      "Zoning Resolution Compliance",
      "Environmental Requirements",
      "ADA Compliance",
      "M/WBE Participation",
      "Permit Status"
    ]
  },
  {
    id: "chapter33-report",
    name: "Chapter 33 Safety Report",
    description: "Site safety report focused on NYC Building Code Chapter 33 requirements",
    icon: "HealthAndSafety",
    frequency: "Monthly",
    sections: [
      "Site Safety Summary",
      "Scaffolding Compliance",
      "Crane Operations",
      "Public Protection Measures",
      "Worker Safety Training",
      "Incident Reports",
      "DOB Inspection Status"
    ]
  },
  {
    id: "schedule-report",
    name: "Schedule Analysis Report",
    description: "Detailed analysis of project schedule performance and forecasting",
    icon: "Schedule",
    frequency: "Bi-weekly",
    sections: [
      "Schedule Summary",
      "Critical Path Analysis",
      "Milestone Status",
      "Delay Analysis",
      "Recovery Plans",
      "Look-Ahead Schedule",
      "Resource Allocation"
    ]
  },
  {
    id: "cost-report",
    name: "Cost Analysis Report",
    description: "Financial analysis of project costs, budget performance, and forecasting",
    icon: "AttachMoney",
    frequency: "Monthly",
    sections: [
      "Cost Summary",
      "Budget vs. Actual Analysis",
      "Change Order Status",
      "Cash Flow Analysis",
      "Contingency Status",
      "Cost Forecasting",
      "Value Engineering Opportunities"
    ]
  }
];

const reportTemplates = {
  "pm-report": {
    title: "Monthly Project Management Report",
    subtitle: "NYC Borough-Based Jail System - Manhattan Facility",
    sections: [
      {
        title: "Executive Summary",
        content: "This report provides a comprehensive overview of the Manhattan Facility project status as of {date}. The project is currently {status} with an overall completion of {completion}%."
      },
      {
        title: "Schedule Status",
        content: "The project is currently {schedule_status} compared to the baseline schedule. Key milestones: {milestones}."
      },
      {
        title: "Budget Status",
        content: "Current budget status: {budget_status}. Total expenditure to date: {expenditure}. Projected final cost: {projected_cost}."
      },
      {
        title: "Risk Register",
        content: "Top project risks include: {risks}. Mitigation strategies are in place for all identified risks."
      },
      {
        title: "Quality Control",
        content: "Quality control inspections completed: {qc_inspections}. Open quality issues: {open_issues}."
      },
      {
        title: "Safety Performance",
        content: "Safety incidents this period: {safety_incidents}. Total recordable incident rate: {trir}."
      },
      {
        title: "Upcoming Activities",
        content: "Key activities for the next reporting period include: {upcoming_activities}."
      }
    ],
    variables: {
      date: "July 15, 2025",
      status: "on schedule",
      completion: 42,
      schedule_status: "2 days ahead",
      milestones: "Foundation complete, structural steel 40% complete",
      budget_status: "within budget",
      expenditure: "$42.5M",
      projected_cost: "$98.7M",
      risks: "material delivery delays, skilled labor availability",
      qc_inspections: 78,
      open_issues: 12,
      safety_incidents: 0,
      trir: 0.85,
      upcoming_activities: "Complete structural steel, begin MEP rough-in, façade panel installation"
    }
  },
  
  "chapter33-report": {
    title: "Chapter 33 Safety Compliance Report",
    subtitle: "NYC Borough-Based Jail System - Manhattan Facility",
    sections: [
      {
        title: "Site Safety Summary",
        content: "This report documents compliance with NYC Building Code Chapter 33 requirements for the Manhattan Facility as of {date}. Overall compliance score: {compliance_score}%."
      },
      {
        title: "Scaffolding Compliance",
        content: "Scaffold permits status: {scaffold_status}. Last inspection date: {scaffold_inspection}. Compliance issues: {scaffold_issues}."
      },
      {
        title: "Crane Operations",
        content: "Active crane permits: {crane_permits}. Crane inspection status: {crane_inspection}. Crane safety protocols: {crane_protocols}."
      },
      {
        title: "Public Protection Measures",
        content: "Sidewalk shed status: {sidewalk_shed}. Pedestrian protection measures: {pedestrian_protection}. Compliance with §3307: {3307_compliance}."
      },
      {
        title: "Worker Safety Training",
        content: "Workers with current SST cards: {sst_compliance}%. OSHA 30 compliance: {osha30_compliance}%. Required training completion rate: {training_completion}%."
      },
      {
        title: "Incident Reports",
        content: "Safety incidents this period: {safety_incidents}. DOB violations issued: {dob_violations}. Corrective actions: {corrective_actions}."
      },
      {
        title: "DOB Inspection Status",
        content: "DOB inspections this period: {dob_inspections}. Open ECB violations: {ecb_violations}. Upcoming inspections: {upcoming_inspections}."
      }
    ],
    variables: {
      date: "July 12, 2025",
      compliance_score: 95,
      scaffold_status: "All current and valid",
      scaffold_inspection: "July 8, 2025",
      scaffold_issues: "None",
      crane_permits: "CN-123456, CN-123457",
      crane_inspection: "All cranes inspected and certified",
      crane_protocols: "Wind monitoring active, pre-lift meetings documented",
      sidewalk_shed: "Installed per approved plans, permit #SWS-987654",
      pedestrian_protection: "Compliant with §3307.6 requirements",
      "3307_compliance": "Full compliance verified",
      sst_compliance: 100,
      osha30_compliance: 100,
      training_completion: 98,
      safety_incidents: 0,
      dob_violations: 0,
      corrective_actions: "N/A",
      dob_inspections: 3,
      ecb_violations: 0,
      upcoming_inspections: "Quarterly safety inspection scheduled for July 25, 2025"
    }
  },
  
  "compliance-report": {
    title: "Regulatory Compliance Report",
    subtitle: "NYC Borough-Based Jail System - Manhattan Facility",
    sections: [
      {
        title: "Compliance Summary",
        content: "This report documents regulatory compliance status for the Manhattan Facility as of {date}. Overall compliance score: {compliance_score}%."
      },
      {
        title: "NYC Building Code Status",
        content: "Building Code compliance status: {bc_status}. Open issues: {bc_issues}. Recent inspections: {bc_inspections}."
      },
      {
        title: "Zoning Resolution Compliance",
        content: "Zoning compliance status: {zoning_status}. FAR utilization: {far_utilization}. Height and setback compliance: {setback_compliance}."
      },
      {
        title: "Environmental Requirements",
        content: "CEQR compliance status: {ceqr_status}. Air quality monitoring: {air_quality}. Noise monitoring: {noise_monitoring}."
      },
      {
        title: "ADA Compliance",
        content: "ADA compliance status: {ada_status}. Accessibility features implemented: {ada_features}. Open issues: {ada_issues}."
      },
      {
        title: "M/WBE Participation",
        content: "Current M/WBE participation: {mwbe_participation}%. Goal: {mwbe_goal}%. Compliance status: {mwbe_status}."
      },
      {
        title: "Permit Status",
        content: "Active permits: {active_permits}. Pending renewals: {pending_renewals}. Recent approvals: {recent_approvals}."
      }
    ],
    variables: {
      date: "July 10, 2025",
      compliance_score: 87,
      bc_status: "Compliant",
      bc_issues: "2 minor issues being addressed",
      bc_inspections: "Passed structural inspection on June 28, 2025",
      zoning_status: "Fully compliant",
      far_utilization: "92% of allowable FAR",
      setback_compliance: "All setbacks comply with ZR requirements",
      ceqr_status: "Partial compliance - 2 open items",
      air_quality: "Within acceptable parameters",
      noise_monitoring: "1 exceedance recorded on July 3, mitigation implemented",
      ada_status: "Fully compliant",
      ada_features: "All required features incorporated in design",
      ada_issues: "None",
      mwbe_participation: 27.5,
      mwbe_goal: 30,
      mwbe_status: "Action plan in place to meet goal",
      active_permits: 12,
      pending_renewals: 1,
      recent_approvals: "Crane permit CN-123457 approved July 2, 2025"
    }
  },
  
  "schedule-report": {
    title: "Schedule Analysis Report",
    subtitle: "NYC Borough-Based Jail System - Manhattan Facility",
    sections: [
      {
        title: "Schedule Summary",
        content: "This report analyzes the current schedule status for the Manhattan Facility as of {date}. Overall schedule performance index: {spi}."
      },
      {
        title: "Critical Path Analysis",
        content: "Current critical path: {critical_path}. Critical path float: {cp_float} days. Critical path compression opportunities: {cp_compression}."
      },
      {
        title: "Milestone Status",
        content: "Upcoming milestones: {upcoming_milestones}. Milestone variance: {milestone_variance}. Recovery plan status: {recovery_status}."
      },
      {
        title: "Delay Analysis",
        content: "Current delays: {current_delays}. Delay responsibility: {delay_responsibility}. Mitigation measures: {delay_mitigation}."
      },
      {
        title: "Recovery Plans",
        content: "Active recovery plans: {recovery_plans}. Recovery effectiveness: {recovery_effectiveness}. Additional recovery options: {recovery_options}."
      },
      {
        title: "Look-Ahead Schedule",
        content: "3-week look-ahead: {look_ahead}. Resource constraints: {resource_constraints}. Weather considerations: {weather_considerations}."
      },
      {
        title: "Resource Allocation",
        content: "Current manpower: {current_manpower}. Planned peak manpower: {peak_manpower}. Resource optimization opportunities: {resource_optimization}."
      }
    ],
    variables: {
      date: "July 14, 2025",
      spi: 0.98,
      critical_path: "Structural steel → MEP rough-in → Interior framing → Finishes",
      cp_float: 0,
      cp_compression: "Opportunity to fast-track MEP rough-in with additional crews",
      upcoming_milestones: "Structural steel completion (Aug 15), Building dry-in (Sep 30)",
      milestone_variance: "-2 days on structural steel, +5 days on building dry-in",
      recovery_status: "Recovery plan implemented for structural steel",
      current_delays: "5 days on structural steel erection",
      delay_responsibility: "3 days excusable (weather), 2 days contractor",
      delay_mitigation: "Extended work hours, additional crane",
      recovery_plans: "Acceleration plan for structural steel, early release of MEP packages",
      recovery_effectiveness: "Projected to recover 4 of 5 delay days",
      recovery_options: "Saturday work, prefabrication of MEP components",
      look_ahead: "Complete columns on floors 5-8, begin beam installation on floor 5",
      resource_constraints: "Ironworker availability limited in weeks 30-31",
      weather_considerations: "Potential thunderstorms forecasted for week 29",
      current_manpower: 187,
      peak_manpower: 350,
      resource_optimization: "Staggered shift start times to optimize crane utilization"
    }
  },
  
  "cost-report": {
    title: "Cost Analysis Report",
    subtitle: "NYC Borough-Based Jail System - Manhattan Facility",
    sections: [
      {
        title: "Cost Summary",
        content: "This report analyzes the financial status of the Manhattan Facility as of {date}. Overall cost performance index: {cpi}."
      },
      {
        title: "Budget vs. Actual Analysis",
        content: "Original budget: {original_budget}. Current budget: {current_budget}. Actual cost to date: {actual_cost}. Variance: {cost_variance}."
      },
      {
        title: "Change Order Status",
        content: "Approved change orders: {approved_cos}. Pending change orders: {pending_cos}. Projected final change order rate: {co_rate}%."
      },
      {
        title: "Cash Flow Analysis",
        content: "Planned cash flow to date: {planned_cashflow}. Actual cash flow: {actual_cashflow}. Variance: {cashflow_variance}."
      },
      {
        title: "Contingency Status",
        content: "Original contingency: {original_contingency}. Remaining contingency: {remaining_contingency}. Contingency utilization: {contingency_utilization}%."
      },
      {
        title: "Cost Forecasting",
        content: "Estimated cost at completion: {eac}. Variance at completion: {vac}. Trending: {cost_trending}."
      },
      {
        title: "Value Engineering Opportunities",
        content: "Identified VE opportunities: {ve_opportunities}. Potential savings: {ve_savings}. Implementation status: {ve_status}."
      }
    ],
    variables: {
      date: "July 10, 2025",
      cpi: 0.97,
      original_budget: "$98.5M",
      current_budget: "$100.2M",
      actual_cost: "$42.5M",
      cost_variance: "+$1.2M (2.8%)",
      approved_cos: "$1.7M (1.7%)",
      pending_cos: "$0.8M (0.8%)",
      co_rate: 3.2,
      planned_cashflow: "$41.3M",
      actual_cashflow: "$42.5M",
      cashflow_variance: "+$1.2M",
      original_contingency: "$9.85M (10%)",
      remaining_contingency: "$8.1M",
      contingency_utilization: 17.8,
      eac: "$102.3M",
      vac: "-$3.8M (-3.9%)",
      cost_trending: "Slight negative trend in MEP costs",
      ve_opportunities: 8,
      ve_savings: "$1.2M potential",
      ve_status: "3 implemented, 5 under review"
    }
  }
};

const reportGenerationStatus = [
  {
    id: "gen-pm-report-1689345600000",
    reportType: "pm-report",
    reportName: "July 2025 Project Management Report",
    status: "complete",
    progress: 100,
    startTime: "2025-07-14T10:00:00Z",
    endTime: "2025-07-14T10:05:30Z",
    steps: [
      { name: "Data Collection", status: "complete", duration: "2.1 seconds" },
      { name: "Analysis", status: "complete", duration: "15.3 seconds" },
      { name: "Document Generation", status: "complete", duration: "12.5 seconds" },
      { name: "Evidence Linking", status: "complete", duration: "8.7 seconds" }
    ],
    result: {
      downloadUrl: "#",
      size: "3.2MB",
      format: "pdf",
      pages: 24
    }
  },
  {
    id: "gen-chapter33-report-1689350000000",
    reportType: "chapter33-report",
    reportName: "July 2025 Chapter 33 Safety Report",
    status: "complete",
    progress: 100,
    startTime: "2025-07-14T11:20:00Z",
    endTime: "2025-07-14T11:24:45Z",
    steps: [
      { name: "Data Collection", status: "complete", duration: "3.2 seconds" },
      { name: "Analysis", status: "complete", duration: "12.8 seconds" },
      { name: "Document Generation", status: "complete", duration: "10.5 seconds" },
      { name: "Evidence Linking", status: "complete", duration: "9.2 seconds" }
    ],
    result: {
      downloadUrl: "#",
      size: "2.8MB",
      format: "pdf",
      pages: 18
    }
  },
  {
    id: "gen-compliance-report-1689354000000",
    reportType: "compliance-report",
    reportName: "Q2 2025 Regulatory Compliance Report",
    status: "in-progress",
    progress: 65,
    startTime: "2025-07-14T12:30:00Z",
    steps: [
      { name: "Data Collection", status: "complete", duration: "10 seconds" },
      { name: "Analysis", status: "complete", duration: "15 seconds" },
      { name: "Document Generation", status: "in-progress" },
      { name: "Evidence Linking", status: "pending" }
    ]
  }
];

const recentReports = [
  {
    id: "report-pm-1689345600000",
    name: "July 2025 Project Management Report",
    type: "pm-report",
    date: "2025-07-14T10:05:30Z",
    size: "3.2 MB",
    format: "pdf",
    pages: 24,
    downloadUrl: "#",
    jsonUrl: "#",
    author: "PlexifyAEC AI",
    description: "Monthly project status report for the Manhattan Facility"
  },
  {
    id: "report-chapter33-1689350000000",
    name: "July 2025 Chapter 33 Safety Report",
    type: "chapter33-report",
    date: "2025-07-14T11:24:45Z",
    size: "2.8 MB",
    format: "pdf",
    pages: 18,
    downloadUrl: "#",
    jsonUrl: "#",
    author: "PlexifyAEC AI",
    description: "Monthly safety compliance report for the Manhattan Facility"
  },
  {
    id: "report-schedule-1689260000000",
    name: "Bi-weekly Schedule Analysis",
    type: "schedule-report",
    date: "2025-07-13T08:15:22Z",
    size: "4.1 MB",
    format: "pdf",
    pages: 32,
    downloadUrl: "#",
    jsonUrl: "#",
    author: "PlexifyAEC AI",
    description: "Detailed schedule analysis with recovery plan recommendations"
  },
  {
    id: "report-cost-1689170000000",
    name: "June 2025 Cost Analysis Report",
    type: "cost-report",
    date: "2025-07-12T14:30:15Z",
    size: "3.5 MB",
    format: "pdf",
    pages: 28,
    downloadUrl: "#",
    jsonUrl: "#",
    author: "PlexifyAEC AI",
    description: "Monthly cost analysis and forecasting report"
  },
  {
    id: "report-compliance-1688650000000",
    name: "Q2 2025 Regulatory Compliance Report",
    type: "compliance-report",
    date: "2025-07-06T10:45:30Z",
    size: "5.2 MB",
    format: "pdf",
    pages: 42,
    downloadUrl: "#",
    jsonUrl: "#",
    author: "PlexifyAEC AI",
    description: "Quarterly regulatory compliance status report"
  }
];

// Helper functions
const getReportTypeById = (id) => {
  return reportTypes.find(type => type.id === id) || null;
};

const getReportTemplate = (typeId) => {
  return reportTemplates[typeId] || null;
};

export {
  reportTypes,
  reportTemplates,
  reportGenerationStatus,
  recentReports,
  getReportTypeById,
  getReportTemplate
};

export default {
  reportTypes,
  reportTemplates,
  reportGenerationStatus,
  recentReports,
  getReportTypeById,
  getReportTemplate
};
