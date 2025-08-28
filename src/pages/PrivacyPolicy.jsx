// static legal page: privacy policy
import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#007bff", marginBottom: "30px" }}>Privacy Policy</h1>
        
        <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>1. Introduction</h2>
          <p style={{ marginBottom: "15px" }}>
            Music Marketplace ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our music streaming and marketplace platform.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>2. Information We Collect</h2>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.1 Personal Information</h3>
          <p style={{ marginBottom: "15px" }}>We collect information you provide directly to us, including:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Account information (email, name, password)</li>
            <li>Profile information (bio, location, website, preferences)</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Artist information (stage name, uploaded content metadata)</li>
            <li>Communications with our support team</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.2 Automatically Collected Information</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, features used)</li>
            <li>Audio streaming data (songs played, listening history)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: "15px" }}>We use the collected information to:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Provide and maintain our music streaming service</li>
            <li>Process transactions and manage your account</li>
            <li>Personalize your experience and provide recommendations</li>
            <li>Communicate with you about your account and our services</li>
            <li>Analyze usage patterns to improve our platform</li>
            <li>Comply with legal obligations and prevent fraud</li>
            <li>Calculate and distribute royalties to artists</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>4. Information Sharing and Disclosure</h2>
          <p style={{ marginBottom: "15px" }}>We may share your information in the following circumstances:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>With Artists:</strong> Purchase data for royalty calculation (anonymized where possible)</li>
            <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (payment processing, analytics, hosting)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>5. GDPR Compliance (EU Users)</h2>
          <p style={{ marginBottom: "15px" }}>
            Under the General Data Protection Regulation (GDPR), you have the following rights:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Right of Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Rights Related to Automated Decision Making:</strong> Protection against automated profiling</li>
          </ul>
          
          <p style={{ marginBottom: "15px" }}>
            <strong>Legal Basis for Processing:</strong> We process your data based on:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Contractual necessity (providing our services)</li>
            <li>Legitimate interests (improving our platform, fraud prevention)</li>
            <li>Legal compliance (tax obligations, anti-money laundering)</li>
            <li>Consent (marketing communications, optional features)</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>6. Data Security</h2>
          <p style={{ marginBottom: "15px" }}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and employee training</li>
            <li>Secure payment processing through certified providers</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>7. Data Retention</h2>
          <p style={{ marginBottom: "15px" }}>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Account data is retained until account deletion, while transaction records may be kept longer for tax and legal compliance.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>8. Cookies and Tracking</h2>
          <p style={{ marginBottom: "15px" }}>
            We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences, though this may affect platform functionality.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>9. International Data Transfers</h2>
          <p style={{ marginBottom: "15px" }}>
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses and adequacy decisions.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>10. Children's Privacy</h2>
          <p style={{ marginBottom: "15px" }}>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information promptly.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>11. Changes to This Privacy Policy</h2>
          <p style={{ marginBottom: "15px" }}>
            We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification. Your continued use after such changes constitutes acceptance of the updated policy.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>12. Contact Us</h2>
          <p style={{ marginBottom: "15px" }}>
            For privacy-related questions or to exercise your rights, contact us at:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Email: privacy@musicmarketplace.com</li>
            <li>Data Protection Officer: dpo@musicmarketplace.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
