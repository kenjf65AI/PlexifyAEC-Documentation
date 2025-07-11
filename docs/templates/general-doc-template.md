---
title: "REPLACE WITH DOC TITLE"
description: "1–2 sentence summary of the document’s purpose."
author: "Your Name"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
version: "0.1.0"
status: "draft"            # draft | review | approved | deprecated
category: "DEFINE"         # architecture | guide | reference | compliance | demo | meta
tags: ["keyword1","keyword2"]
related:
  - path: "relative/path/to/other-doc.md"
    relationship: "references"  # references | supersedes | extends
---

<!--
 #######################################################################
 PlexifyAEC – GENERAL DOCUMENT TEMPLATE
 Use this file as the starting point for any new documentation artifact.
 Replace ALL UPPERCASE placeholders. Keep comment blocks for guidance;
 they may be removed once content is finalised.
 #######################################################################
-->

# 1  Overview
Provide a concise paragraph describing what this document covers and why it matters.

# 2  Scope & Audience
Explain who should read this file (e.g., Devs, Product Owners, Compliance Auditors) and what phases/features it applies to.

# 3  Context
Describe background information, dependencies, or preceding decisions that inform this topic.

# 4  Content
Break down the main subject matter. Suggested sub-sections:

## 4.1  Requirements / Objectives
List goals, acceptance criteria, or regulatory mandates.

## 4.2  Process / Workflow
Detail step-by-step procedures or agent orchestration flows.

## 4.3  Data & Interfaces
Document key data models, APIs, or integration points involved.

## 4.4  Diagrams
Include Mermaid code blocks or image references as needed.

# 5  Compliance Mapping
If relevant, map features or steps to regulation IDs from `compliance/matrices/`.

| Reg ID | Requirement Summary | Evidence Source |
|--------|--------------------|-----------------|
| R-XX   | …                  | Doc-ID / Section |

# 6  Risks & Mitigations
Identify potential issues and how they will be addressed.

# 7  Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1.0   | YYYY-MM-DD | Your Name | Initial draft |

<!--
========================== STYLE GUIDELINES ==========================
* Use sentence case for headings (except proper nouns).
* Keep lines ≤ 120 characters.
* Prefer ordered lists for sequential steps; bullets for unordered.
* Prefix code blocks with language identifiers.
* Reference other docs with relative links.
* Update YAML `updated` + `version` on every change.
=====================================================================
-->
