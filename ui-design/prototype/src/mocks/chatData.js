const agents = [
  {
    id: "document-agent",
    name: "Document Agent",
    avatar: "/assets/document-agent-avatar.png",
    description: "Analyzes construction documents, RFIs, and specifications to extract key information and identify potential issues.",
    capabilities: [
      "Document classification and analysis",
      "Information extraction from PDFs, images, and text",
      "RFI response drafting and analysis",
      "Submittal review assistance"
    ],
    isActive: true
  },
  {
    id: "compliance-agent",
    name: "Compliance Agent",
    avatar: "/assets/compliance-agent-avatar.png",
    description: "Evaluates documents against NYC Building Code, Zoning Resolution, and project requirements to ensure compliance.",
    capabilities: [
      "Code compliance verification",
      "Zoning analysis",
      "Regulatory requirement mapping",
      "Compliance issue detection and resolution suggestions"
    ],
    isActive: true
  },
  {
    id: "schedule-agent",
    name: "Schedule Agent",
    avatar: "/assets/schedule-agent-avatar.png",
    description: "Analyzes project schedules, identifies critical path impacts, and suggests mitigation strategies for delays.",
    capabilities: [
      "Schedule impact analysis",
      "Delay risk assessment",
      "Resource optimization",
      "Critical path management"
    ],
    isActive: true
  },
  {
    id: "cost-agent",
    name: "Cost Agent",
    avatar: "/assets/cost-agent-avatar.png",
    description: "Evaluates cost implications of design changes, RFIs, and construction issues.",
    capabilities: [
      "Change order evaluation",
      "Cost impact assessment",
      "Budget variance analysis",
      "Value engineering suggestions"
    ],
    isActive: false
  }
];

const promptTemplates = [
  {
    id: "rfi-analysis",
    title: "RFI Analysis",
    description: "Analyze an RFI and suggest a response based on project documentation",
    prompt: "Please analyze this RFI and suggest a response based on the project documentation. Consider code implications, schedule impacts, and potential cost effects."
  },
  {
    id: "compliance-check",
    title: "Compliance Check",
    description: "Check a document for compliance with specific regulations",
    prompt: "Please review this document for compliance with {regulation}. Identify any issues and suggest corrections."
  },
  {
    id: "schedule-impact",
    title: "Schedule Impact",
    description: "Assess the impact of an issue on the project schedule",
    prompt: "Analyze the potential schedule impact of this issue. Identify affected activities, critical path effects, and suggest mitigation strategies."
  },
  {
    id: "document-summary",
    title: "Document Summary",
    description: "Summarize the key points of a document",
    prompt: "Please provide a concise summary of this document, highlighting key information, action items, and important dates."
  }
];

const supportedDocumentTypes = [
  {
    type: "rfi",
    name: "Request for Information",
    extensions: [".pdf", ".docx", ".doc", ".txt"],
    icon: "QuestionAnswer"
  },
  {
    type: "drawing",
    name: "Drawing",
    extensions: [".pdf", ".dwg", ".rvt"],
    icon: "Architecture"
  },
  {
    type: "specification",
    name: "Specification",
    extensions: [".pdf", ".docx", ".doc", ".txt"],
    icon: "Description"
  },
  {
    type: "submittal",
    name: "Submittal",
    extensions: [".pdf", ".docx", ".doc", ".xlsx"],
    icon: "Approval"
  },
  {
    type: "schedule",
    name: "Schedule",
    extensions: [".pdf", ".xlsx", ".mpp", ".xer"],
    icon: "Schedule"
  },
  {
    type: "report",
    name: "Report",
    extensions: [".pdf", ".docx", ".doc", ".txt"],
    icon: "Assessment"
  },
  {
    type: "image",
    name: "Site Image",
    extensions: [".jpg", ".jpeg", ".png", ".tif"],
    icon: "Image"
  }
];

const documentAnalysisExamples = [
  {
    id: "doc-analysis-1",
    title: "RFI #237 - Column Reinforcement",
    type: "rfi",
    summary: "Analysis of structural engineer response regarding column reinforcement modifications at grid line E-5.",
    date: "2025-07-08T14:30:00Z"
  },
  {
    id: "doc-analysis-2",
    title: "Zoning Analysis - Building Height",
    type: "report",
    summary: "Verification of building height calculations against NYC Zoning Resolution requirements.",
    date: "2025-07-05T11:15:00Z"
  },
  {
    id: "doc-analysis-3",
    title: "MEP Coordination Drawing",
    type: "drawing",
    summary: "Analysis of mechanical ductwork conflicts with structural elements on Level 3.",
    date: "2025-07-09T09:45:00Z"
  }
];

// Conversation history with multiple examples
const conversations = [
  {
    id: "conv-1",
    title: "RFI Analysis - Foundation Waterproofing",
    createdAt: "2025-07-10T09:30:00Z",
    updatedAt: "2025-07-10T10:15:00Z",
    agent: "document-agent",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "I need help analyzing this RFI about foundation waterproofing at the Manhattan facility. The contractor is asking about substituting the specified waterproofing membrane with an alternative product.",
        timestamp: "2025-07-10T09:30:00Z"
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "I'd be happy to help analyze this RFI. Could you please upload the RFI document and any related specifications or drawings?",
        timestamp: "2025-07-10T09:30:15Z"
      },
      {
        id: "msg-3",
        role: "user",
        content: "Here's the RFI and the waterproofing specification section.",
        attachments: [
          {
            id: "file-1",
            name: "RFI-237-Foundation-Waterproofing.pdf",
            type: "application/pdf",
            size: "1.2 MB"
          },
          {
            id: "file-2",
            name: "071300-Sheet-Waterproofing.pdf",
            type: "application/pdf",
            size: "3.4 MB"
          }
        ],
        timestamp: "2025-07-10T09:32:00Z"
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "Thank you for providing the documents. I've analyzed the RFI and the specification section. Here's my assessment:\n\n**RFI Summary:**\n- The contractor is requesting to substitute the specified Bituthene 3000 waterproofing membrane with GCP's newer Bituthene 4000 product.\n- They cite improved cold weather application properties and better adhesion to concrete substrates as advantages.\n- The cost difference is negligible (+$0.15/sf).\n\n**Specification Requirements:**\n- Section 071300 specifies Grace Bituthene 3000 or approved equal.\n- Key performance requirements include:\n  - Permeance: 0.05 perms max\n  - Tensile Strength: 325 psi min\n  - Elongation: 300% min\n  - Puncture Resistance: 50 lbs min\n\n**Analysis:**\n- Bituthene 4000 exceeds all performance requirements in the specification.\n- The product has been used successfully on similar NYC projects.\n- The material is compatible with the specified protection board and drainage composite.\n- The warranty terms are equivalent (5-year manufacturer warranty).\n\n**Recommendation:**\nThe substitution appears acceptable based on technical merit. I recommend approving the substitution with the following conditions:\n1. Contractor must submit complete product data and SDS for project records.\n2. Installation must follow manufacturer's latest instructions.\n3. Same installer qualifications apply as specified.\n4. No change in warranty requirements.\n\nWould you like me to draft a formal response to this RFI?",
        timestamp: "2025-07-10T09:35:00Z"
      },
      {
        id: "msg-5",
        role: "user",
        content: "Yes, please draft a formal response that I can send to the architect for review.",
        timestamp: "2025-07-10T09:37:30Z"
      },
      {
        id: "msg-6",
        role: "assistant",
        content: "# RFI #237 Response: Foundation Waterproofing Substitution\n\n**Response Date:** July 10, 2025\n\n**RFI Description:** Request to substitute specified Bituthene 3000 waterproofing membrane with Bituthene 4000.\n\n**Response:** The substitution of Grace Bituthene 3000 with Grace Bituthene 4000 waterproofing membrane is acceptable, subject to the following conditions:\n\n1. Contractor shall submit complete product data sheets, installation instructions, and Safety Data Sheets (SDS) for the Bituthene 4000 product for project records.\n\n2. Installation shall strictly follow manufacturer's latest published instructions, including all preparation requirements and temperature limitations.\n\n3. Installer qualifications shall remain as specified in Section 071300.\n\n4. Warranty requirements remain unchanged from those specified (5-year manufacturer warranty).\n\n5. All accessories, including primers, protection board, and drainage composite, shall be compatible with the Bituthene 4000 product as recommended by the manufacturer.\n\n**Note:** This substitution approval does not relieve the Contractor from meeting all performance requirements specified in Section 071300 - Sheet Waterproofing.\n\n**Attachments:** None\n\n**Distribution:** Architect, General Contractor, MEP Engineer, Structural Engineer, Owner's Representative\n\nIs there anything you'd like me to modify in this response?",
        timestamp: "2025-07-10T09:42:00Z"
      },
      {
        id: "msg-7",
        role: "user",
        content: "This looks great. Can you also analyze if there are any potential schedule impacts from this substitution?",
        timestamp: "2025-07-10T09:45:00Z"
      },
      {
        id: "msg-8",
        role: "assistant",
        content: "**Schedule Impact Analysis: Bituthene 3000 to Bituthene 4000 Substitution**\n\nBased on my analysis, here are the potential schedule impacts of this substitution:\n\n**Positive Schedule Impacts:**\n1. **Improved Cold Weather Application:** Bituthene 4000 can be applied at lower temperatures (25°F vs. 40°F for Bituthene 3000). This could prevent weather-related delays during the remaining foundation work, particularly important as we approach fall/winter months.\n\n2. **Better Adhesion Properties:** The improved adhesion to concrete substrates may reduce the likelihood of rework or repairs, which could prevent potential delays.\n\n3. **No Learning Curve:** Same manufacturer and similar application methods mean no additional training required for installation crews.\n\n**Potential Schedule Risks:**\n1. **Product Availability:** Need to verify that Bituthene 4000 is readily available in the quantities needed. Current lead times should be confirmed with GCP.\n\n2. **Submittal Process:** Although minimal, there will be some time required for the submittal review process (typically 3-5 business days).\n\n**Overall Schedule Assessment:**\nThe substitution is likely to have a neutral to slightly positive effect on the project schedule. The improved cold weather application properties provide schedule risk mitigation as foundation work continues into cooler months.\n\n**Recommendation:**\nRequest that the contractor confirm current lead times for Bituthene 4000 and process the submittal immediately to avoid any potential delays in the procurement process. With these steps taken, the substitution should not negatively impact the project schedule and may provide some schedule risk mitigation benefits.",
        timestamp: "2025-07-10T09:50:00Z"
      },
      {
        id: "msg-9",
        role: "user",
        content: "Perfect. I'll forward this to the project team. Thanks for your help!",
        timestamp: "2025-07-10T10:15:00Z"
      }
    ]
  },
  {
    id: "conv-2",
    title: "Compliance Check - Chapter 33 Safety Requirements",
    createdAt: "2025-07-11T13:45:00Z",
    updatedAt: "2025-07-11T14:30:00Z",
    agent: "compliance-agent",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "I need to check if our current site safety plan complies with Chapter 33 requirements for the Manhattan facility. We've updated some of the crane locations on the east side of the site.",
        timestamp: "2025-07-11T13:45:00Z"
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "I'd be happy to help you check your site safety plan against NYC Building Code Chapter 33 requirements, particularly focusing on the crane location changes. Could you please upload your current site safety plan and the proposed crane location changes?",
        timestamp: "2025-07-11T13:45:15Z"
      },
      {
        id: "msg-3",
        role: "user",
        content: "Here's our current approved site safety plan and the proposed crane location update drawing.",
        attachments: [
          {
            id: "file-1",
            name: "Manhattan-Site-Safety-Plan-Rev2.pdf",
            type: "application/pdf",
            size: "8.7 MB"
          },
          {
            id: "file-2",
            name: "Crane-Location-Update-East-Side.pdf",
            type: "application/pdf",
            size: "2.3 MB"
          }
        ],
        timestamp: "2025-07-11T13:47:00Z"
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "Thank you for providing the documents. I've reviewed your current site safety plan and the proposed crane location changes against NYC Building Code Chapter 33 requirements. Here's my compliance assessment:\n\n## Compliance Issues Identified\n\n1. **§3319.3 - Crane Location Documentation**\n   - The proposed crane locations on the east side are not fully documented according to §3319.3.1 requirements.\n   - **Required Action:** Update site safety plan to include detailed positioning information, swing radius diagrams, and proximity to overhead power lines for the new crane locations.\n\n2. **§3319.8 - Safety Zone Requirements**\n   - The safety zones for Crane #2 in its new position appear to overlap with the public sidewalk on Centre Street without adequate protection measures.\n   - **Required Action:** Either adjust the crane position or implement additional sidewalk protection and pedestrian safety measures in accordance with §3319.8.3.\n\n3. **§3319.10 - Operations Near Occupied Buildings**\n   - The revised location of Crane #3 will operate within 200 feet of occupied buildings not related to the project.\n   - **Required Action:** Develop and document a plan for crane operations near these occupied buildings per §3319.10.1, including notification requirements.\n\n4. **§3301.9 - Site Safety Plan Update**\n   - Any change to crane locations requires a formal update to the site safety plan approved by the DOB.\n   - **Required Action:** Submit a formal site safety plan amendment to DOB for approval before implementing the crane location changes.\n\n## Compliant Elements\n\n1. The crane types and configurations remain compliant with §3319.5 requirements.\n2. The proposed crane foundations appear to meet §3319.6 structural requirements.\n3. Wind measurement devices are properly specified per §3319.11.\n4. Operator licensing documentation is current and compliant.\n\n## Recommendations\n\n1. Update the site safety plan to address the compliance issues identified above.\n2. Conduct a pre-implementation meeting with the site safety manager, crane operators, and rigging crew to review the changes.\n3. Ensure all signage and notification requirements are met before repositioning the cranes.\n4. Update the crane inspection schedule to reflect the new configurations.\n\nWould you like me to provide more specific guidance on any of these compliance issues?",
        timestamp: "2025-07-11T13:55:00Z"
      },
      {
        id: "msg-5",
        role: "user",
        content: "This is very helpful. Can you provide more details on what specifically needs to be included in the site safety plan update for the DOB submission?",
        timestamp: "2025-07-11T14:00:00Z"
      },
      {
        id: "msg-6",
        role: "assistant",
        content: "# Site Safety Plan Update Requirements for DOB Submission\n\nFor your site safety plan amendment submission to the DOB regarding the crane location changes, you'll need to include the following specific elements:\n\n## 1. CN Drawing Updates (Site Plan)\n\n- **Revised crane location coordinates** with distances from property lines and buildings\n- **Updated swing radius diagrams** showing the full operational range of each crane\n- **Safety zone delineation** clearly marked with dimensions\n- **Pedestrian protection measures** where safety zones impact public areas\n- **Loading/unloading zones** for crane materials\n- **Crane assembly/disassembly staging areas**\n\n## 2. Technical Documentation\n\n- **Crane specifications** including make, model, configuration, and capacity charts\n- **Foundation engineering** calculations for the new crane locations\n- **Structural analysis** showing impacts on excavation support systems or adjacent structures\n- **Power line clearance documentation** showing minimum 15' clearance from all overhead lines\n- **Wind restriction protocols** specific to the new locations\n\n## 3. Operational Procedures\n\n- **Updated lift plan** for critical picks from the new crane positions\n- **Communication protocols** between multiple crane operators\n- **Revised rigging procedures** specific to the new locations\n- **Emergency response procedures** updated for the new configuration\n\n## 4. Notifications and Permits\n\n- **CD5 Notification updates** for adjacent property owners\n- **Updated CN numbers** application for the new positions\n- **Street closure permits** if crane operations will impact traffic\n- **Flagging plan** for any street or sidewalk impacts\n\n## 5. Personnel Documentation\n\n- **Hoisting machine operator licenses** appropriate for the cranes\n- **Site safety manager/coordinator** acknowledgment of changes\n- **Lift director designations** for the new configurations\n\n## 6. Compliance Statements\n\n- **Chapter 33 compliance statement** signed by the site safety manager\n- **Technical report statement** signed by the engineer of record\n- **Owner's endorsement** of the site safety plan changes\n\n## Submission Process\n\n1. Submit the amended site safety plan through DOB NOW: Build\n2. Include a cover letter explaining the scope of changes\n3. Pay the required amendment fees\n4. Schedule a pre-approval inspection if required\n5. Allow 5-10 business days for review and approval\n\nWould you like me to help draft any specific sections of this submission?",
        timestamp: "2025-07-11T14:10:00Z"
      },
      {
        id: "msg-7",
        role: "user",
        content: "This is exactly what I needed. One last question - are there any specific Chapter 33 requirements we need to address regarding the proximity to the subway entrance on the east side of the site?",
        timestamp: "2025-07-11T14:20:00Z"
      },
      {
        id: "msg-8",
        role: "assistant",
        content: "# Chapter 33 Requirements for Proximity to Subway Entrance\n\nYou've raised an important point about the subway entrance on the east side of the site. This introduces additional compliance requirements under Chapter 33 and MTA regulations. Here are the specific requirements you need to address:\n\n## 1. NYC Building Code Chapter 33 Requirements\n\n### §3303.2 - Protection of Public Transit\n- **Required Action:** Provide a detailed protection plan for the subway entrance, including overhead protection and pedestrian access maintenance.\n\n### §3303.2.3 - Transit Authority Approval\n- **Required Action:** Obtain written approval from MTA/NYCT for any construction activity within 200 feet of the subway entrance.\n- Submit your plans to MTA through their online Adjacent Construction Project Information (ACPI) system.\n\n### §3307.6 - Sidewalk Shed Requirements\n- **Required Action:** Install a sidewalk shed over the subway entrance if crane operations occur overhead.\n- Design must meet enhanced load requirements (300 psf minimum) for areas over transit entrances.\n\n## 2. MTA/NYCT Specific Requirements\n\n### NYCT Operating Environment Security Guidelines\n- **Required Action:** Submit an application for work in proximity to the subway system.\n- Include vibration monitoring plan for any crane foundation work near the subway structure.\n\n### NYCT Adjacent Construction Manual Requirements\n- **Required Action:** Provide a detailed site logistics plan showing crane positioning relative to the subway entrance.\n- Include a section showing vertical clearance between crane operations and the subway entrance.\n\n### Emergency Egress Requirements\n- **Required Action:** Maintain minimum 8-foot clear path to subway entrance at all times.\n- Provide alternative routing plans if normal access is impacted during specific operations.\n\n## 3. Additional Documentation Required\n\n- **MTA Approval Letter:** Must be obtained before DOB will approve your site safety plan amendment.\n- **Protection Drawing:** Detailed drawing of protection measures for the subway entrance.\n- **Monitoring Plan:** Procedures for monitoring vibration and settlement near the subway structure.\n- **Emergency Contact Protocol:** Specific procedures for notifying MTA in case of incidents.\n\n## 4. Operational Restrictions\n\n- No crane operations directly over an active subway entrance without specific MTA approval.\n- Restricted hours may apply for certain operations near the subway entrance.\n- A flagging person may be required during active crane operations near the entrance.\n- MTA may require an inspector on site during critical operations (at your expense).\n\n## Submission Timeline\n\nImportant: MTA reviews typically take 30-45 days, so this should be initiated immediately to avoid project delays. The DOB will not approve your site safety plan amendment without MTA concurrence if the subway entrance is affected.\n\nWould you like me to help prepare the specific MTA submission requirements for your project?",
        timestamp: "2025-07-11T14:25:00Z"
      },
      {
        id: "msg-9",
        role: "user",
        content: "This is extremely helpful. I'll get our team working on these requirements right away. Thank you!",
        timestamp: "2025-07-11T14:30:00Z"
      }
    ]
  },
  {
    id: "conv-3",
    title: "Schedule Analysis - Concrete Delivery Delays",
    createdAt: "2025-07-12T10:15:00Z",
    updatedAt: "2025-07-12T11:00:00Z",
    agent: "schedule-agent",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "We're experiencing delays with concrete deliveries for the Manhattan facility foundation work. The supplier has informed us they can only deliver 50% of our daily requirement for the next two weeks due to a plant maintenance issue. I need to understand the schedule impact and potential mitigation strategies.",
        timestamp: "2025-07-12T10:15:00Z"
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "I'll help you analyze the schedule impact of the concrete delivery constraints and identify potential mitigation strategies. To provide a comprehensive assessment, could you please share:\n\n1. The current project schedule, particularly the foundation activities\n2. The concrete pour sequence plan\n3. The daily concrete volume requirements\n4. Any float available in the current schedule for these activities",
        timestamp: "2025-07-12T10:15:30Z"
      },
      {
        id: "msg-3",
        role: "user",
        content: "Here's our current schedule and concrete pour plan. We need 80 cubic yards per day for the next 10 working days to complete the foundation work on schedule. The foundation work is on the critical path with zero float.",
        attachments: [
          {
            id: "file-1",
            name: "Manhattan-Foundation-Schedule.pdf",
            type: "application/pdf",
            size: "1.8 MB"
          },
          {
            id: "file-2",
            name: "Concrete-Pour-Sequence.pdf",
            type: "application/pdf",
            size: "2.4 MB"
          }
        ],
        timestamp: "2025-07-12T10:20:00Z"
      },
      {
        id: "msg-4",
        role: "assistant",
        content: "# Schedule Impact Analysis: Concrete Delivery Constraints\n\n## Current Situation\n- Required concrete delivery: 80 cubic yards per day for 10 working days (800 cubic yards total)\n- Available concrete delivery: 40 cubic yards per day (50% of requirement) for 10 working days (400 cubic yards total)\n- Foundation work is on critical path with zero float\n- Pour sequence requires continuous pours for certain sections\n\n## Schedule Impact Assessment\n\n### Base Impact (No Mitigation)\n- **Direct Delay:** 10 additional working days (20 working days total to complete all pours)\n- **Critical Path Delay:** 10 working days to overall project schedule\n- **Successor Activities Affected:** Waterproofing, underslab utilities, slab on grade, vertical concrete\n- **Secondary Impacts:** Potential equipment rental extensions, general conditions cost increases, winter weather risk exposure\n\n## Quantitative Impact Analysis\n\n| Activity | Original Duration | Impacted Duration | Delay |\n|---------|-------------------|-------------------|-------|\n| Foundation Mat Pour 1 | 2 days | 4 days | 2 days |\n| Foundation Mat Pour 2 | 2 days | 4 days | 2 days |\n| Foundation Mat Pour 3 | 2 days | 4 days | 2 days |\n| Foundation Walls Pour 1 | 2 days | 4 days | 2 days |\n| Foundation Walls Pour 2 | 2 days | 4 days | 2 days |\n| **Total Impact** | **10 days** | **20 days** | **10 days** |\n\n## Mitigation Strategies\n\n### 1. Alternative Supplier Supplementation\n- **Approach:** Source remaining 40 cubic yards per day from alternative supplier(s)\n- **Potential Schedule Recovery:** 100% (eliminate delay completely)\n- **Challenges:** Potential cost premium, concrete mix consistency, quality control\n- **Implementation Timeline:** 2-3 days to secure agreements and verify mix designs\n\n### 2. Pour Sequence Optimization\n- **Approach:** Redesign pour sequence to optimize for reduced daily volumes\n- **Potential Schedule Recovery:** 3-4 days\n- **Challenges:** Requires structural engineer review, additional cold joints\n- **Implementation Timeline:** 1-2 days for engineering review and approval\n\n### 3. Extended Work Hours / Additional Shifts\n- **Approach:** Add second shift for concrete placement and finishing\n- **Potential Schedule Recovery:** 5 days\n- **Challenges:** Productivity concerns, lighting requirements, noise restrictions, additional labor costs\n- **Implementation Timeline:** 1 day to mobilize additional crews\n\n### 4. Accelerate Successor Activities\n- **Approach:** Compress duration of successor activities through additional resources\n- **Potential Schedule Recovery:** Varies (not direct recovery but reduces overall impact)\n- **Challenges:** Coordination issues, diminishing returns on added resources\n- **Implementation Timeline:** Varies by activity\n\n## Recommended Mitigation Plan\n\n1. **Primary Strategy:** Pursue alternative supplier supplementation immediately\n2. **Backup Strategy:** Implement pour sequence optimization in parallel\n3. **Contingency:** Prepare for extended work hours if needed\n4. **Additional Recommendation:** Review critical successor activities for potential acceleration\n\n## Next Steps\n\n1. Contact alternative concrete suppliers today (priority: HIGH)\n2. Engage structural engineer to review pour sequence options (priority: HIGH)\n3. Notify affected subcontractors of potential schedule changes (priority: MEDIUM)\n4. Prepare change order documentation for potential cost impacts (priority: MEDIUM)\n5. Update look-ahead schedule to reflect new constraints (priority: HIGH)\n\nWould you like me to elaborate on any specific aspect of this analysis or the recommended mitigation strategies?",
        timestamp: "2025-07-12T10:35:00Z"
      },
      {
        id: "msg-5",
        role: "user",
        content: "This is very helpful. Can you provide more details on the potential cost implications of these delays and mitigation strategies?",
        timestamp: "2025-07-12T10:40:00Z"
      },
      {
        id: "msg-6",
        role: "assistant",
        content: "# Cost Impact Analysis: Concrete Delivery Constraints\n\n## 1. Base Delay Costs (No Mitigation)\n\n### Direct Costs\n| Cost Category | Daily Rate | 10-Day Impact | Notes |\n|--------------|------------|---------------|-------|\n| General Conditions | $8,500 | $85,000 | Site management, facilities, security |\n| Equipment Rentals | $4,200 | $42,000 | Cranes, pumps, formwork |\n| Labor Standby | $6,300 | $63,000 | Crews unable to proceed with next activities |\n| Extended MPT | $1,800 | $18,000 | Maintenance of traffic protection |\n| Winter Protection (Risk) | - | $35,000 | Potential cost if work extends into colder weather |\n| **Subtotal Direct** | | **$243,000** | |\n\n### Indirect Costs\n| Cost Category | Estimated Impact | Notes |\n|--------------|------------------|-------|\n| Liquidated Damages Risk | $150,000 | Based on $15,000/day for critical milestone |\n| Subcontractor Delay Claims | $75,000 | From affected follow-on trades |\n| Financing Costs | $28,000 | Extended carrying costs |\n| Overhead Allocation | $45,000 | Extended home office overhead |\n| **Subtotal Indirect** | **$298,000** | |\n\n**Total Potential Cost Impact (No Mitigation): $541,000**\n\n## 2. Mitigation Strategy Costs\n\n### Strategy 1: Alternative Supplier Supplementation\n| Cost Category | Estimated Cost | Notes |\n|--------------|----------------|-------|\n| Premium on Concrete | $24,000 | $60/cy premium × 400 cy |\n| Expediting Fees | $5,000 | Mix design verification, approvals |\n| Additional Testing | $3,500 | Quality assurance for new supplier |\n| Additional Coordination | $4,500 | PM and superintendent time |\n| **Total Strategy Cost** | **$37,000** | |\n| **Net Cost Benefit** | **$504,000** | Compared to no mitigation |\n\n### Strategy 2: Pour Sequence Optimization\n| Cost Category | Estimated Cost | Notes |\n|--------------|----------------|-------|\n| Engineering Redesign | $8,500 | Structural engineer review |\n| Additional Formwork | $12,000 | For modified joint locations |\n| Additional Waterstop | $5,500 | For extra cold joints |\n| Reduced Productivity | $9,000 | Due to sequence changes |\n| **Total Strategy Cost** | **$35,000** | |\n| **Partial Delay Costs** | **$324,600** | 60% of base delay costs (6 days saved) |\n| **Net Cost Benefit** | **$181,400** | Compared to no mitigation |\n\n### Strategy 3: Extended Work Hours / Additional Shifts\n| Cost Category | Estimated Cost | Notes |\n|--------------|----------------|-------|\n| Shift Differential | $38,000 | 15% premium for second shift labor |\n| Overtime Premiums | $45,000 | For extended hours |\n| Lighting & Equipment | $12,500 | For night work |\n| Supervision | $15,000 | Additional supervision for second shift |\n| Permits & Compliance | $3,500 | For after-hours work permits |\n| **Total Strategy Cost** | **$114,000** | |\n| **Partial Delay Costs** | **$270,500** | 50% of base delay costs (5 days saved) |\n| **Net Cost Benefit** | **$156,500** | Compared to no mitigation |\n\n## 3. Combined Approach (Recommended)\n\n| Component | Cost | Notes |\n|-----------|------|-------|\n| Alternative Supplier (70%) | $25,900 | 70% of concrete from alt. supplier |\n| Pour Sequence Optimization | $35,000 | Implementation costs |\n| Remaining Delay Costs | $108,200 | 20% of base delay (2 days) |\n| **Total Combined Cost** | **$169,100** | |\n| **Net Cost Benefit** | **$371,900** | Compared to no mitigation |\n\n## 4. Cost-Benefit Summary\n\n| Approach | Total Cost | Savings vs. No Action | Schedule Recovery |\n|----------|------------|----------------------|-------------------|\n| No Mitigation | $541,000 | - | 0 days |\n| Alt. Supplier Only | $37,000 | $504,000 | 10 days |\n| Pour Sequence Only | $359,600 | $181,400 | 6 days |\n| Extended Hours Only | $384,500 | $156,500 | 5 days |\n| Combined Approach | $169,100 | $371,900 | 8 days |\n\n## 5. Funding and Approval Considerations\n\n- **Change Order Potential:** Document all costs for potential recovery from concrete supplier\n- **Contingency Usage:** Current contingency balance of $1.2M can absorb these costs\n- **Owner Notification:** Required under contract section 8.3.2 for potential delays exceeding 5 days\n- **Approval Timeline:** Need owner decision on premium costs within 48 hours to implement effectively\n\n## 6. Recommended Financial Approach\n\n1. Immediately authorize alternative supplier costs as this has the best cost-benefit ratio\n2. Implement pour sequence optimization as a parallel strategy\n3. Document all delay and mitigation costs separately for potential claims\n4. Prepare change order request for owner consideration\n5. Review insurance coverage for supplier default provisions\n\nWould you like a more detailed breakdown of any specific cost category or a cash flow analysis for these scenarios?",
        timestamp: "2025-07-12T10:50:00Z"
      },
      {
        id: "msg-7",
        role: "user",
        content: "This is excellent. I'll present these options to the project team today. Thank you for the comprehensive analysis.",
        timestamp: "2025-07-12T11:00:00Z"
      }
    ]
  }
];

const currentConversationId = "conv-1";
const isTyping = false;

export {
  agents,
  promptTemplates,
  supportedDocumentTypes,
  documentAnalysisExamples,
  conversations,
  currentConversationId,
  isTyping
};

export default {
  agents,
  promptTemplates,
  supportedDocumentTypes,
  documentAnalysisExamples,
  conversations,
  currentConversationId,
  isTyping
};
