import { assessPhishingRisk } from "../securityCore.js";

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
