/**
 * Linear event prompt template definitions.
 *
 * Each template is registered at module load time via registerTemplate().
 * Handlers import this module for the side-effect of registration.
 */

import { registerTemplate } from "../prompts/registry";

// ============================================================================
// Issue events
// ============================================================================

registerTemplate({
  eventType: "linear.issue.assigned",
  header: "[Linear {{issue_identifier}}] {{issue_title}}",
  defaultBody: `Source: Linear (Agent Session)
URL: {{issue_url}}{{session_section}}
{{description_section}}`,
  variables: [
    { name: "issue_identifier", description: "Linear issue identifier (e.g. ENG-123)" },
    { name: "issue_title", description: "Issue title" },
    { name: "issue_url", description: "Issue URL on Linear" },
    { name: "session_section", description: "Session URL line or empty string" },
    { name: "description_section", description: "Description section or empty string" },
  ],
  category: "event",
});

registerTemplate({
  eventType: "linear.issue.created",
  header: "[Linear {{issue_identifier}}] New: {{issue_title}}",
  defaultBody: `Source: Linear (issue created){{session_section}}
URL: {{issue_url}}
Created by: {{creator_name}}
{{description_section}}

A new ticket was just opened. Do a fast, bounded preliminary and land it in ONE
of exactly three outcomes — nothing half-finished, and no silent changes.

FIRST, in seconds and from the ticket text alone, post one short comment: what
you read the ask to be and what you will check. Do not open with analysis.

Then a BOUNDED preliminary — cheap, not a deep dive. Read the description, match
the SRE / Player tracker by keyword or fingerprint (link the row, do not
re-derive it), and at most one or two tight signal lookups. You may query Linear
for related issues if it helps. No whole-file reads, no large dumps.

Then land in exactly one outcome, as a single comment:

1. QUESTION / NEEDS CLARITY — the ticket is too thin to act on (no repro, no
   affected platform or tenant, no version, no error text, no expected-vs-actual).
   Ask the creator or assignee ONE specific question naming exactly what to add,
   and stop.

2. CONFLICTING EVIDENCE — your preliminary contradicts the ticket's premise (the
   metric says otherwise, it is already fixed, it duplicates an existing issue, or
   the described cause does not hold). Post the evidence plainly with numbers and
   links, and let a human decide. Do not implement against a premise you doubt.

3. ASK TO IMPLEMENT — the ask is clear, specified, and your preliminary agrees on
   everything, and it is a change you could make. Summarise the plan and the exact
   change, and ask for approval to proceed. Do NOT implement yet — wait for a
   human go. When approved, hold the do-or-ask discipline: a validated change is a
   real diff verified against deployed code.

Never guess to look responsive, and never mutate anything before approval.`,
  variables: [
    { name: "issue_identifier", description: "Linear issue identifier (e.g. ENG-123)" },
    { name: "issue_title", description: "Issue title" },
    { name: "issue_url", description: "Issue URL on Linear" },
    { name: "creator_name", description: "Name of the person who created the issue" },
    { name: "session_section", description: "Session URL line or empty string" },
    { name: "description_section", description: "Description section or empty string" },
  ],
  category: "event",
});

registerTemplate({
  eventType: "linear.issue.reassigned",
  header: "[Linear {{issue_identifier}}] Re-assigned: {{issue_title}}",
  defaultBody: `Source: Linear (Agent Session re-assignment)
URL: {{issue_url}}{{session_section}}
{{description_section}}
This issue was previously tracked but the original task has completed. A new task has been created to handle the re-assignment.`,
  variables: [
    { name: "issue_identifier", description: "Linear issue identifier (e.g. ENG-123)" },
    { name: "issue_title", description: "Issue title" },
    { name: "issue_url", description: "Issue URL on Linear" },
    { name: "session_section", description: "Session URL line or empty string" },
    { name: "description_section", description: "Description section or empty string" },
  ],
  category: "event",
});

registerTemplate({
  eventType: "linear.issue.followup",
  header: "[Linear {{issue_identifier}}] Follow-up: {{issue_title}}",
  defaultBody: `Source: Linear (Agent Session follow-up)
URL: {{issue_url}}

User message:
{{user_message}}

Original issue: {{issue_identifier}} \u2014 {{issue_title}}`,
  variables: [
    { name: "issue_identifier", description: "Linear issue identifier (e.g. ENG-123)" },
    { name: "issue_title", description: "Issue title" },
    { name: "issue_url", description: "Issue URL on Linear" },
    { name: "user_message", description: "Follow-up message from user" },
  ],
  category: "event",
});
