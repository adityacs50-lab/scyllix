/**
 * Core responsibility (one line):
 * Decide “Should we warn the user?” and explain “Why?” in a way humans understand.
 *
 * Hackathon MVP: rule-based phishing risk scoring for an email object.
 * Keep this small and dependency-free. Treat inputs as untrusted.
 */

/**
 * INPUT SHAPE (email):
 * {
 *   senderEmail: string,
 *   senderName: string,
 *   subject: string,
 *   body: string,
 *   links: string[],
 *   attachments: string[]
 * }
 *
 * OUTPUT SHAPE:
 * {
 *   riskDetected: boolean,
 *   riskScore: number,
 *   primaryReason: string,
 *   triggeredReasons: string[]
 * }
 */

/**
 * Rule-based phishing detection core.
 *
 * - Uses ONLY simple heuristics (no ML, no APIs)
 * - Each heuristic adds to a risk score
 * - riskDetected = true if riskScore >= 50
 * - primaryReason is ONE clear string explaining the main risk
 *
 * Focus is explainability, not accuracy.
 *
 * @param {Object} email
 * @param {string} email.senderEmail
 * @param {string} email.senderName
 * @param {string} email.subject
 * @param {string} email.body
 * @param {string[]} email.links
 * @param {string[]} email.attachments
 * @returns {{riskDetected: boolean, riskScore: number, primaryReason: string, triggeredReasons: string[]}}
 */
function assessPhishingRisk(email = {}) {
  // Normalize / sanitize inputs (treat everything as potentially missing or wrong type).
  const senderEmail = String(email.senderEmail ?? "").trim();
  const senderName = String(email.senderName ?? "").trim();
  const subject = String(email.subject ?? "").trim();
  const body = String(email.body ?? "").trim();
  const links = Array.isArray(email.links) ? email.links.filter(Boolean).map((x) => String(x)) : [];
  const attachments = Array.isArray(email.attachments) ? email.attachments.filter(Boolean).map((x) => String(x)) : [];

  const fullText = `${subject}\n${body}`.toLowerCase();

  /**
   * Each triggered rule contributes points.
   * We also track a reason key (easy to show to judges and easy to test).
   * 
   * Priority order for tie-breaking (most human-understandable first):
   * 1. dangerous_attachment (50 pts) - most actionable
   * 2. domain_mismatch (40 pts) - clear, familiar concept
   * 3. suspicious_link (30 pts) - visual/clickable threat
   * 4. urgent_language (20 pts) - emotional/behavioral
   */
  const REASON_PRIORITY = {
    dangerous_attachment: 1,
    domain_mismatch: 2,
    suspicious_link: 3,
    urgent_language: 4,
  };

  /** @type {{id: string, points: number, reasonKey: string}[]} */
  const hits = [];

  const addHit = (id, points, reasonKey) => {
    hits.push({ id, points, reasonKey });
  };

  // ----------------------------
  // Heuristics (simple + explainable)
  // ----------------------------

  // RULE 1) Sender domain mismatch (+40) => "domain_mismatch"
  // If the email mentions a common brand, but the sender's domain does NOT contain that brand name.
  // Example: body mentions "PayPal" but sender domain is "paypa1.com" (doesn't contain "paypal").
  const senderDomain = senderEmail.includes("@") ? senderEmail.split("@").pop().toLowerCase() : "";
  const brands = ["paypal", "microsoft", "apple", "google", "amazon", "netflix", "bank"];
  const mentionedBrands = brands.filter((b) => new RegExp(`\\b${escapeRegExp(b)}\\b`, "i").test(fullText));
  if (mentionedBrands.length > 0) {
    const domainMatchesAnyBrand = mentionedBrands.some((b) => senderDomain.includes(b));
    if (!domainMatchesAnyBrand && senderDomain) {
      addHit("domain_mismatch", 40, "domain_mismatch");
    }
  }

  // RULE 2) Urgent or threatening language (+20) => "urgent_language"
  if (/\b(verify now|account suspended|urgent|act now|limited time)\b/i.test(fullText)) {
    addHit("urgent_language", 20, "urgent_language");
  }

  // RULE 3) Suspicious or shortened links (+30) => "suspicious_link"
  // Detect link shorteners or IP-address links. Count once even if multiple links match.
  const urlShorteners = /\b(bit\.ly|tinyurl\.com)\b/i;
  const ipInUrl = /\b\d{1,3}(?:\.\d{1,3}){3}\b/;
  const hasSuspiciousLink = links.some((u) => {
    const url = String(u).trim();
    if (!url) return false;
    return urlShorteners.test(url) || ipInUrl.test(url);
  });
  if (hasSuspiciousLink) addHit("suspicious_link", 30, "suspicious_link");

  // RULE 4) Dangerous attachment types (+50) => "dangerous_attachment"
  // Count once even if multiple attachments match.
  const dangerousExt = /\.(exe|zip|rar|scr)$/i;
  const hasDangerousAttachment = attachments.some((f) => dangerousExt.test(String(f).trim()));
  if (hasDangerousAttachment) addHit("dangerous_attachment", 50, "dangerous_attachment");

  // ----------------------------
  // Scoring + outputs
  // ----------------------------
  // Score is the sum of points. Clamp to 0..100 for clean UI.
  let riskScore = hits.reduce((sum, h) => sum + h.points, 0);
  riskScore = Math.max(0, Math.min(100, riskScore));

  const riskDetected = riskScore >= 50;

  // triggeredReasons: all unique reason keys in the order rules fired (deterministic and easy to demo).
  const triggeredReasons = Array.from(new Set(hits.map((h) => h.reasonKey)));

  // primaryReason: THE SINGLE most important rule to explain the risk.
  // - Sort by points (descending) to find highest risk contribution
  // - Use REASON_PRIORITY as tie-breaker when points are equal
  // - This ensures consistent, human-friendly explanations for the UI teach-back
  const primaryReason = hits.length > 0
    ? hits
        .slice()
        .sort((a, b) => {
          // First: highest points wins
          if (b.points !== a.points) {
            return b.points - a.points;
          }
          // Second: if tied on points, use priority order (lower number = higher priority)
          const priorityA = REASON_PRIORITY[a.reasonKey] ?? 999;
          const priorityB = REASON_PRIORITY[b.reasonKey] ?? 999;
          return priorityA - priorityB;
        })[0].reasonKey
    : "none";

  return { riskDetected, riskScore, primaryReason, triggeredReasons };
}

module.exports = {
  assessPhishingRisk,
};

// Small helper to safely build brand regexes.
function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ============================================================================
// TEST CASES: Mock emails to demonstrate risk detection
// ============================================================================

console.log("\n=== TEST 1: Safe Email ===");
const safeEmail = {
  senderEmail: "support@company.com",
  senderName: "Customer Support",
  subject: "Your monthly invoice",
  body: "Hi, here is your monthly invoice for February. Please review the attached statement.",
  links: ["https://company.com/invoices"],
  attachments: ["invoice_feb_2026.pdf"],
};
const result1 = assessPhishingRisk(safeEmail);
console.log("Input:", safeEmail);
console.log("Output:", result1);
console.log("Expected: riskDetected = false, riskScore < 50");
console.log("✓ PASS" + (result1.riskDetected === false && result1.riskScore < 50 ? "" : " (UNEXPECTED)"));

console.log("\n=== TEST 2: Obvious Phishing Email ===");
const obviousPhishing = {
  senderEmail: "secure@paypa1.com",
  senderName: "PayPal Security",
  subject: "Urgent: Verify your PayPal account now",
  body: "Dear PayPal customer, your account has been suspended. Please verify now by clicking the link or opening the attached document to avoid account closure.",
  links: ["https://bit.ly/paypal-verify"],
  attachments: ["document.exe"],
};
const result2 = assessPhishingRisk(obviousPhishing);
console.log("Input:", obviousPhishing);
console.log("Output:", result2);
console.log("Expected: riskDetected = true, high riskScore, primaryReason = 'dangerous_attachment'");
console.log(
  "✓ PASS" +
    (result2.riskDetected === true && result2.riskScore >= 50 && result2.primaryReason === "dangerous_attachment"
      ? ""
      : " (UNEXPECTED)")
);

console.log("\n=== TEST 3: Subtle Phishing Email ===");
const subtlePhishing = {
  senderEmail: "noreply@payments-verify.com",
  senderName: "PayPal Team",
  subject: "Urgent: Account update required",
  body: "We have urgent security concerns with your PayPal account. Please log in to review your security settings.",
  links: ["https://payments-verify.com/login"],
  attachments: [],
};
const result3 = assessPhishingRisk(subtlePhishing);
console.log("Input:", subtlePhishing);
console.log("Output:", result3);
console.log("Expected: riskDetected = true, moderate riskScore (lower than obvious phishing), primaryReason = 'domain_mismatch'");
console.log(
  "✓ PASS" +
    (result3.riskDetected === true && result3.riskScore < result2.riskScore && result3.primaryReason === "domain_mismatch"
      ? ""
      : " (UNEXPECTED)")
);


