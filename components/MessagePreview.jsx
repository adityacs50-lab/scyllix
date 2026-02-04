import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Mail, Shield, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "./ui/Card";
import { Badge } from "./ui/Badge";

/**
 * MessagePreview Component
 *
 * Displays a list of sample emails/messages for the user to inspect.
 * Each message is clickable and triggers the security analysis.
 * Uses Card and Badge components for a polished, professional appearance.
 *
 * @typedef {Object} MessagePreviewProps
 * @property {(email: any) => void} [onClickMessage]
 */

const sampleEmails = [
  {
    id: 1,
    sender: "noreply@amazon-support.com",
    senderName: "Amazon Security",
    subject: "Action Required: Confirm Your Identity",
    body: "Dear Valued Customer, Your account was accessed from an unfamiliar location. Please verify your identity immediately to prevent account suspension.",
    links: ["https://bit.ly/amazon-verify"],
    attachments: [],
    isPhishing: true,
    timestamp: "5 min ago",
  },
  {
    id: 2,
    sender: "support@company.com",
    senderName: "Customer Support",
    subject: "Your invoice for February 2026",
    body: "Hello, your monthly invoice is ready for download. Please find it attached. If you have any questions, feel free to reach out.",
    links: ["https://company.com/invoices"],
    attachments: ["invoice_feb.pdf"],
    isPhishing: false,
    timestamp: "2 hours ago",
  },
  {
    id: 3,
    sender: "notification@bank-alert.com",
    senderName: "Security Alert",
    subject: "Unusual Activity Detected - Act Now",
    body: "We detected suspicious activity on your account. Your card has been temporarily frozen for security. Click the link below to unlock your account immediately.",
    links: ["https://192.168.1.100/bank-login"],
    attachments: [],
    isPhishing: true,
    timestamp: "1 min ago",
  },
];

/**
 * MessagePreviewCard - Individual email card with hover effects and risk indicators
 */
const MessagePreviewCard = ({ email, onClickMessage, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer group"
    >
      <Card
        className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClickMessage?.(email)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold truncate">
                    {email.senderName}
                  </CardTitle>
                  {email.isPhishing && (
                    <Badge variant="destructive" className="shrink-0 h-5 px-1.5 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      Suspicious
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{email.timestamp}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-medium text-sm leading-tight line-clamp-1">
              {email.subject}
            </h3>
            <CardDescription className="text-sm line-clamp-2">
              {email.body}
            </CardDescription>
          </div>

          {email.isPhishing && (
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Shield className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                This message may be a phishing attempt
              </p>
            </div>
          )}

          <div className="flex gap-3 text-xs text-muted-foreground pt-2">
            {email.links.length > 0 && <span>🔗 {email.links.length} link(s)</span>}
            {email.attachments.length > 0 && <span>📎 {email.attachments.length} file(s)</span>}
          </div>
        </CardContent>

        {/* Hover gradient effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
          }}
        />
      </Card>
    </motion.div>
  );
};

export default function MessagePreview({ onClickMessage }) {
  return (
    <section className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-3">Inspect Messages</h1>
            <p className="text-muted-foreground">
              Click any message below to analyze it for phishing risk. Notice which ones are flagged as suspicious.
            </p>
          </div>

          <div className="space-y-4">
            {sampleEmails.map((email, index) => (
              <MessagePreviewCard
                key={email.id}
                email={email}
                onClickMessage={onClickMessage}
                index={index}
              />
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Pay attention to sender domain, urgent language, and suspicious links. These are common phishing indicators that Scyllix detects automatically.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
