import React from "react";

export default function Privacy() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="h1">Privacy Policy</h1>
        <p className="p" style={{ marginBottom: 24, color: "#aeb9ca" }}>
          Last Updated: February 24, 2026
        </p>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>1. Introduction</span>
          </p>
          <p className="p">
            OPENOS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our browser-based Linux distribution testing platform (the "Service").
          </p>
          <p className="p">
            By accessing or using the Service, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access the Service.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>2. Data Controller</span>
          </p>
          <p className="p">
            OPENOS is the data controller responsible for your personal data. For privacy-related inquiries:
          </p>
          <ul className="p">
            <li><span style={{ fontWeight: "bold" }}>Email:</span> privacy@tryopenos.me</li>
            <li><span style={{ fontWeight: "bold" }}>Company:</span> OPENOS Development Team</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>3. Information We Collect</span>
          </p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>3.1 Account Information</span>
          </p>
          <ul className="p">
            <li>Name and username</li>
            <li>Email address</li>
            <li>Password (stored securely using encryption)</li>
            <li>OAuth provider information (if you sign up via Google, GitHub, or Discord)</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>3.2 Technical Data</span>
          </p>
          <ul className="p">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device identifiers</li>
            <li>Time zone setting</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>3.3 Usage Data</span>
          </p>
          <ul className="p">
            <li>Session duration and timestamps</li>
            <li>Linux distributions you test</li>
            <li>Feature usage patterns</li>
            <li>Resource consumption (CPU, RAM usage during sessions)</li>
            <li>Favorites and session history</li>
            <li>Error reports and performance data</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>3.4 Security Monitoring Data</span>
          </p>
          <ul className="p">
            <li>Logs to detect abuse, fraud, or unauthorized access</li>
            <li>Suspicious activity patterns</li>
            <li>Rate limiting and resource usage monitoring</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>3.5 Payment Information (Premium Users)</span>
          </p>
          <ul className="p">
            <li>Billing information (processed by third-party payment processors)</li>
            <li>Transaction identifiers</li>
            <li>Subscription status</li>
          </ul>
          <p className="p">
            <span style={{ fontWeight: "bold" }}>Note:</span> We do not store full payment details. All payment processing is handled securely by Stripe, PayPal, or similar PCI-compliant providers.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>4. How We Use Your Information</span>
          </p>
          <p className="p">We use your information for the following purposes:</p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>4.1 Service Delivery</span>
          </p>
          <ul className="p">
            <li>Create and manage your account</li>
            <li>Provide access to Linux distribution testing</li>
            <li>Save your favorites and session history</li>
            <li>Process premium subscriptions</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>4.2 Platform Improvement</span>
          </p>
          <ul className="p">
            <li>Analyze usage patterns to improve the Service</li>
            <li>Identify and fix technical issues</li>
            <li>Optimize VM resource allocation</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>4.3 Security and Abuse Prevention</span>
          </p>
          <ul className="p">
            <li>Detect and prevent unauthorized access</li>
            <li>Monitor for abuse of our free tier</li>
            <li>Protect against DDoS attacks and malicious activity</li>
            <li>Enforce rate limits and fair usage policies</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>4.4 Communication</span>
          </p>
          <ul className="p">
            <li>Send service-related notifications</li>
            <li>Respond to support requests</li>
            <li>Provide password reset assistance</li>
            <li>With your consent, send marketing communications (opt-out available)</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>5. Legal Basis for Processing (GDPR)</span>
          </p>
          <p className="p">For users in the European Economic Area (EEA), we process your data based on:</p>
          <ul className="p">
            <li><span style={{ fontWeight: "bold" }}>Performance of a Contract:</span> To provide the Service you requested</li>
            <li><span style={{ fontWeight: "bold" }}>Legitimate Interests:</span> To maintain platform security and improve our Service</li>
            <li><span style={{ fontWeight: "bold" }}>Legal Obligation:</span> To comply with applicable laws</li>
            <li><span style={{ fontWeight: "bold" }}>Consent:</span> For non-essential cookies and marketing communications</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>6. Data Sharing and Third Parties</span>
          </p>
          <p className="p">We share your data only with trusted third-party service providers necessary for platform operation:</p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.1 Infrastructure Providers</span>
          </p>
          <ul className="p">
            <li><span style={{ fontWeight: "bold" }}>Microsoft Azure:</span> Hosting virtual machines and Linux distributions</li>
            <li><span style={{ fontWeight: "bold" }}>MongoDB Atlas:</span> Database hosting for user accounts and session data</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.2 Authentication Providers</span>
          </p>
          <ul className="p">
            <li>Google OAuth</li>
            <li>GitHub OAuth</li>
            <li>Discord OAuth</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.3 Payment Processors</span>
          </p>
          <ul className="p">
            <li>Stripe / PayPal (for premium subscriptions)</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.4 Analytics</span>
          </p>
          <ul className="p">
            <li>Basic usage analytics to improve the platform</li>
          </ul>

          <p className="p">
            All third-party providers are contractually bound to protect your data and comply with applicable privacy laws.
          </p>
          <p className="p">
            <span style={{ fontWeight: "bold" }}>We do not sell your personal information to third parties.</span>
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>7. Data Retention</span>
          </p>
          <p className="p">We retain your data only as long as necessary:</p>
          <ul className="p">
            <li><span style={{ fontWeight: "bold" }}>Account information:</span> Until you delete your account or after 12 months of inactivity</li>
            <li><span style={{ fontWeight: "bold" }}>Session data:</span> Deleted automatically after session ends, with metadata retained for up to 90 days for analytics</li>
            <li><span style={{ fontWeight: "bold" }}>Security logs:</span> Retained for up to 6 months for abuse investigation</li>
            <li><span style={{ fontWeight: "bold" }}>Billing records:</span> Retained as required by tax laws (typically 7 years)</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>8. International Data Transfers</span>
          </p>
          <p className="p">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place through:
          </p>
          <ul className="p">
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Data Processing Agreements with all third-party providers</li>
            <li>Compliance with applicable data protection laws</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>9. Your Rights</span>
          </p>
          <p className="p">Depending on your location, you may have the following rights:</p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.1 For EEA/UK Users (GDPR)</span>
          </p>
          <ul className="p">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erasure ("Right to be Forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.2 For California Residents (CCPA/CPRA)</span>
          </p>
          <ul className="p">
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to opt-out of sale of personal information (we do not sell data)</li>
            <li>Right to non-discrimination for exercising rights</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.3 How to Exercise Your Rights</span>
          </p>
          <p className="p">
            To exercise any of these rights, contact us at <span style={{ fontWeight: "bold" }}>privacy@tryopenos.me</span>. We will verify your identity and respond within 30 days.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>10. Security Measures</span>
          </p>
          <p className="p">We implement industry-standard security measures:</p>
          <ul className="p">
            <li>Encryption in transit (HTTPS/TLS 1.3)</li>
            <li>Encrypted password storage (bcrypt)</li>
            <li>JWT tokens for authentication</li>
            <li>Regular security audits</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Session isolation in VM environments</li>
            <li>Compliance with New York SHIELD Act requirements</li>
          </ul>
          <p className="p">
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>11. Data Breach Notification</span>
          </p>
          <p className="p">
            In the event of a data breach that affects your personal information:
          </p>
          <ul className="p">
            <li>We will notify relevant supervisory authorities within 72 hours (where required)</li>
            <li>Affected users will be notified without undue delay</li>
            <li>We will provide information about the breach and steps taken to address it</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>12. Children's Privacy</span>
          </p>
          <p className="p">
            The Service is not intended for users under 13 years of age. We do not knowingly collect information from children under 13. If you become aware that a child has provided us with personal data, please contact us at <span style={{ fontWeight: "bold" }}>privacy@tryopenos.me</span>.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>13. Cookies and Tracking</span>
          </p>
          <p className="p">We use essential cookies for:</p>
          <ul className="p">
            <li>Authentication and session management</li>
            <li>Security and abuse prevention</li>
            <li>Saving user preferences</li>
          </ul>
          <p className="p">
            Non-essential cookies (analytics) are only deployed after obtaining your consent via our cookie banner. You may withdraw consent at any time through your browser settings.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>14. Changes to This Privacy Policy</span>
          </p>
          <p className="p">
            We may update this Privacy Policy periodically. Material changes will be notified via:
          </p>
          <ul className="p">
            <li>Email notification (for registered users)</li>
            <li>A prominent notice on the website</li>
            <li>Updating the "Last Updated" date</li>
          </ul>
          <p className="p">
            Continued use of the Service after changes constitutes acceptance of the revised policy.
          </p>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>15. Contact Information</span>
          </p>
          <p className="p">
            For privacy-related inquiries:
          </p>
          <ul className="p" style={{ listStyle: "none", paddingLeft: 0 }}>
            <li><span style={{ fontWeight: "bold" }}>Email:</span> privacy@tryopenos.me</li>
            <li><span style={{ fontWeight: "bold" }}>Project:</span> OPENOS Development Team</li>
            <li><span style={{ fontWeight: "bold" }}>Response Time:</span> Within 30 days</li>
          </ul>
        </div>

        <div className="privacySection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>16. Complaints</span>
          </p>
          <p className="p">
            If you believe we have not complied with data protection laws, you have the right to lodge a complaint with your local data protection authority.
          </p>
          <p className="p">
            For EEA users: <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" style={{ color: "#1f6feb" }}>Find your local supervisory authority</a>
          </p>
        </div>
      </div>
    </div>
  );
}