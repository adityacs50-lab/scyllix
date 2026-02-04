/**
 * reasonMap.js
 *
 * Maps security core primaryReason keys to human-friendly explanations.
 * Used by TeachBackCard and LearningTip to provide context-specific education.
 *
 * Each key corresponds to a rule from securityCore.js
 * Shape: { [reasonKey]: { title, explanation, learning } }
 */

export const reasonMap = {
  dangerous_attachment: {
    title: "Dangerous Attachment",
    explanation:
      "This email contains a file attachment (.exe, .zip, .rar, or .scr) that could contain malware. These file types are commonly used by hackers to distribute viruses, ransomware, or spyware. Legitimate companies rarely send executable files via email. If you weren't expecting a file, this is a major red flag.",
    learning:
      "Never download attachments from unknown senders. Even if the sender appears to be legitimate, verify directly with them (using a phone number or email address you know) before opening any suspicious files. Use antivirus software as an additional layer of protection.",
  },

  domain_mismatch: {
    title: "Brand Impersonation (Domain Mismatch)",
    explanation:
      "This email mentions a well-known brand (like PayPal, Microsoft, or Amazon) in the content, but the sender's email domain doesn't actually belong to that company. This is a classic phishing tactic: scammers copy the look and feel of legitimate emails but send from their own email address. For example, they might send from 'paypa1.com' (with a 1 instead of an l) or 'paypalsecurity.net' instead of 'paypal.com'.",
    learning:
      "Always check the sender's email domain before trusting the message. The domain is the part after the @ symbol. If it doesn't exactly match the official domain of the company they claim to be, treat the email with suspicion. You can verify official domains on the company's official website.",
  },

  suspicious_link: {
    title: "Suspicious or Shortened Links",
    explanation:
      "This email contains shortened links (like bit.ly or tinyurl.com) or links that point to IP addresses instead of normal domain names. Shortened links hide the true destination, making it easy for scammers to trick you into visiting malicious websites. IP address links are rarely used by legitimate companies and are often a sign of a phishing attempt.",
    learning:
      "Hover over links (don't click!) to see where they actually point. If the link doesn't match the text description, or if it contains random numbers instead of a familiar domain, don't click. Legitimate companies use their official domains in links, not shortened URLs or IP addresses.",
  },

  urgent_language: {
    title: "Urgent or Threatening Language",
    explanation:
      "This email uses words like 'urgent,' 'verify now,' 'account suspended,' 'act now,' or 'limited time' to create a sense of panic or fear. Scammers use urgency to bypass your critical thinking and push you into making mistakes. They want you to click or submit information without stopping to verify the message.",
    learning:
      "Be skeptical of emails that create artificial urgency. Legitimate companies give you time to respond. If an email pressures you, take a breath and verify independently. Contact the company directly using a phone number or website you trust—not information from the suspicious email.",
  },

  none: {
    title: "No Risk Detected",
    explanation:
      "This email appears to be safe. It doesn't exhibit common phishing characteristics like brand impersonation, dangerous attachments, or urgent language designed to manipulate you.",
    learning:
      "Even safe-looking emails should be treated with basic caution. Always be aware of sender identity, avoid clicking unsolicited links, and never share passwords or personal information via email.",
  },
};

/**
 * Helper function to get explanation for a reason key
 * Falls back to a generic message if key not found
 */
export function getReasonExplanation(reasonKey) {
  return (
    reasonMap[reasonKey] || {
      title: "Unknown Risk",
      explanation: "An issue was detected with this email. Be cautious.",
      learning: "When in doubt, verify by contacting the sender directly.",
    }
  );
}
