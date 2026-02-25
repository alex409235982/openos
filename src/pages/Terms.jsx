import React from "react";

export default function Terms() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="h1">Terms of Service</h1>
        <p className="p" style={{ marginBottom: 24, color: "#aeb9ca" }}>
          Last Updated: February 24, 2026
        </p>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>1. Acceptance of Terms</span>
          </p>
          <p className="p">
            Welcome to OPENOS ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, browser-based Linux distribution testing platform, and related services (collectively, the "Service").
          </p>
          <p className="p">
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to all terms and conditions, you may not access or use the Service.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>2. Eligibility</span>
          </p>
          <p className="p">By using the Service, you represent and warrant that:</p>
          <ul className="p">
            <li>You are at least 13 years of age (or the minimum legal age in your jurisdiction)</li>
            <li>You have the legal capacity to enter into these Terms</li>
            <li>You are not prohibited from using the Service under applicable laws</li>
            <li>If using on behalf of an organization, you have authority to bind that organization</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>3. Account Registration</span>
          </p>
          <p className="p">To access certain features, you must create an account. You agree to:</p>
          <ul className="p">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update information if it changes</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of unauthorized use at <span style={{ fontWeight: "bold" }}>security@tryopenos.me</span></li>
          </ul>
          <p className="p">
            We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>4. Description of Service</span>
          </p>
          <p className="p">
            OPENOS provides a web-based platform that allows users to test Linux distributions safely in their browser. Key features include:
          </p>
          <ul className="p">
            <li>Browser-based Linux distribution testing</li>
            <li>No installation or system changes required</li>
            <li>Support for multiple distributions (Linux Mint, Ubuntu, Arch Linux, and more)</li>
            <li>Difficulty level guidance (Beginner to Advanced)</li>
            <li>Session history and favorites (registered users)</li>
            <li>Premium tier with extended sessions and priority resources (optional)</li>
          </ul>
          <p className="p">
            The Service is provided for educational, testing, and demonstration purposes only. We do not provide production infrastructure or permanent storage.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>5. Third-Party Services</span>
          </p>
          <p className="p">The Service integrates with third-party providers:</p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>5.1 Infrastructure</span>
          </p>
          <ul className="p">
            <li><span style={{ fontWeight: "bold" }}>Microsoft Azure:</span> Virtual machine hosting for Linux distributions</li>
            <li><span style={{ fontWeight: "bold" }}>Apache Guacamole:</span> Remote desktop access technology</li>
          </ul>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>5.2 Open Source Software</span>
          </p>
          <p className="p">
            The Linux distributions available through our platform are open-source software governed by their respective licenses (GPL, MIT, Apache, etc.). You agree to comply with these licenses when using the distributions.
          </p>
          <p className="p">
            We are not responsible for the functionality, security, or licensing terms of third-party software.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>6. Acceptable Use Policy</span>
          </p>
          <p className="p">You agree NOT to use the Service to:</p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.1 Prohibited Activities</span>
          </p>
          <ul className="p">
            <li>Engage in illegal activities or violate any laws</li>
            <li>Attempt unauthorized access to systems, networks, or data</li>
            <li>Distribute malware, viruses, or harmful code</li>
            <li>Perform network attacks (DDoS, port scanning, brute force, etc.)</li>
            <li>Mine cryptocurrency without explicit authorization</li>
            <li>Store or transmit unlawful, abusive, or harmful content</li>
            <li>Exploit system vulnerabilities or attempt to bypass security measures</li>
            <li>Use the Service for automated scraping or data mining</li>
            <li>Interfere with other users' access to the Service</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>6.2 Resource Abuse</span>
          </p>
          <ul className="p">
            <li>Excessive resource usage beyond normal testing purposes</li>
            <li>Automated session creation or farming</li>
            <li>Using the Service as a permanent hosting solution</li>
            <li>Circumventing session time limits or rate limits</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>Violation of this policy may result in immediate account suspension, IP blocking, and legal action.</span>
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>7. Data Persistence and Backups</span>
          </p>
          <p className="p">
            <span style={{ fontWeight: "bold" }}>NO WARRANTY OF DATA PERSISTENCE:</span> Unless explicitly stated otherwise:
          </p>
          <ul className="p">
            <li>VM sessions are temporary and may be terminated at any time</li>
            <li>Data created during sessions may be deleted without notice</li>
            <li>We are not responsible for loss of files, configurations, or session data</li>
            <li>You are solely responsible for backing up any important data externally</li>
            <li>Session history metadata is retained as described in our Privacy Policy</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>8. Premium Subscriptions</span>
          </p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>8.1 Free Tier</span>
          </p>
          <ul className="p">
            <li>Limited session duration</li>
            <li>Standard distribution access</li>
            <li>Basic tutorial access</li>
            <li>Subject to resource availability</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>8.2 Premium Tier</span>
          </p>
          <ul className="p">
            <li>Extended session lengths</li>
            <li>Priority VM resource allocation</li>
            <li>Access to more distribution images</li>
            <li>Saved session snapshots</li>
            <li>Premium features as described on the pricing page</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>8.3 Billing and Payments</span>
          </p>
          <ul className="p">
            <li>Fees are clearly disclosed prior to purchase</li>
            <li>Payments are processed by third-party providers (Stripe/PayPal)</li>
            <li>Subscriptions auto-renew unless cancelled</li>
            <li>All payments are non-refundable except as required by law</li>
            <li>We may modify pricing with 30 days' notice</li>
            <li>Failure to pay may result in downgrade to free tier</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>9. Intellectual Property</span>
          </p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.1 Our IP</span>
          </p>
          <p className="p">
            The OPENOS platform, including website design, branding, logos, and proprietary code, is owned by the OPENOS Development Team and protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without explicit permission.
          </p>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.2 Open Source Software</span>
          </p>
          <p className="p">
            Linux distributions and associated software provided through the Service are the property of their respective owners and are governed by their own open-source licenses. We claim no ownership over third-party software.
          </p>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>9.3 User Content</span>
          </p>
          <p className="p">
            You retain ownership of any files or data you create during sessions. However, you grant us a license to store and process this data solely to provide the Service. Session metadata (duration, distributions used, etc.) may be used for analytics.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>10. Service Availability and Modifications</span>
          </p>
          <p className="p">
            We strive to maintain high availability but do not guarantee:
          </p>
          <ul className="p">
            <li>Continuous, uninterrupted access to the Service</li>
            <li>Error-free operation</li>
            <li>Compatibility with all browsers or devices</li>
            <li>Preservation of session data</li>
          </ul>
          <p className="p">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>11. Disclaimer of Warranties</span>
          </p>
          <p className="p">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p className="p">
            TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="p">
            <li>IMPLIED WARRANTIES OF MERCHANTABILITY</li>
            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>NON-INFRINGEMENT</li>
            <li>ACCURACY OR RELIABILITY OF THE SERVICE</li>
            <li>SECURITY OR FREEDOM FROM ERRORS</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>12. Limitation of Liability</span>
          </p>
          <p className="p">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL OPENOS, ITS DEVELOPERS, OR CONTRIBUTORS BE LIABLE FOR:
          </p>
          <ul className="p">
            <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
            <li>LOSS OF PROFITS, REVENUE, OR DATA</li>
            <li>BUSINESS INTERRUPTION</li>
            <li>SECURITY BREACHES BEYOND OUR REASONABLE CONTROL</li>
            <li>DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE SERVICE</li>
          </ul>
          <p className="p">
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF $100 OR THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS.
          </p>
          <p className="p">
            Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above may not apply to you.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>13. Indemnification</span>
          </p>
          <p className="p">
            You agree to indemnify, defend, and hold harmless OPENOS, its developers, and contributors from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from:
          </p>
          <ul className="p">
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any applicable law or regulation</li>
            <li>Your infringement of any third-party rights</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>14. Termination</span>
          </p>
          
          <p className="p">
            <span style={{ fontWeight: "bold" }}>14.1 By You</span>
          </p>
          <p className="p">
            You may stop using the Service at any time. You may delete your account through the dashboard or by contacting us.
          </p>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>14.2 By Us</span>
          </p>
          <p className="p">
            We may suspend or terminate your access to the Service immediately, without prior notice, for:
          </p>
          <ul className="p">
            <li>Violation of these Terms (especially the Acceptable Use Policy)</li>
            <li>Suspected illegal or abusive activity</li>
            <li>Non-payment of fees (for premium accounts)</li>
            <li>Extended inactivity</li>
            <li>To protect the security or integrity of the Service</li>
          </ul>

          <p className="p">
            <span style={{ fontWeight: "bold" }}>14.3 Effect of Termination</span>
          </p>
          <p className="p">
            Upon termination:
          </p>
          <ul className="p">
            <li>Your right to access the Service ceases immediately</li>
            <li>We may delete your account and associated data</li>
            <li>Sections 9-13 and 15-17 survive termination</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>15. Governing Law</span>
          </p>
          <p className="p">
            These Terms shall be governed by the laws of the United States and the State of [Your State], without regard to conflict of law principles.
          </p>
          <p className="p">
            Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in [Your County/State].
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>16. Changes to Terms</span>
          </p>
          <p className="p">
            We may update these Terms periodically. Material changes will be notified via:
          </p>
          <ul className="p">
            <li>Email notification (for registered users)</li>
            <li>A prominent notice on the website</li>
            <li>Updating the "Last Updated" date</li>
          </ul>
          <p className="p">
            Continued use of the Service after changes constitutes acceptance of the revised Terms. If you do not agree, you must stop using the Service.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>17. Contact Information</span>
          </p>
          <p className="p">
            For questions, concerns, or legal notices:
          </p>
          <ul className="p" style={{ listStyle: "none", paddingLeft: 0 }}>
            <li><span style={{ fontWeight: "bold" }}>General Inquiries:</span> hello@tryopenos.me</li>
            <li><span style={{ fontWeight: "bold" }}>Privacy Issues:</span> privacy@tryopenos.me</li>
            <li><span style={{ fontWeight: "bold" }}>Security Concerns:</span> security@tryopenos.me</li>
            <li><span style={{ fontWeight: "bold" }}>Legal/Abuse Reports:</span> abuse@tryopenos.me</li>
          </ul>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>18. Severability</span>
          </p>
          <p className="p">
            If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
        </div>

        <div className="termsSection">
          <p className="p">
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>19. Entire Agreement</span>
          </p>
          <p className="p">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and OPENOS regarding your use of the Service, superseding any prior agreements.
          </p>
        </div>
      </div>
    </div>
  );
}