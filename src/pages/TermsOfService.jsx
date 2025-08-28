// static legal page: terms of service
import React from 'react';

function TermsOfService() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#007bff", marginBottom: "30px" }}>Terms of Service</h1>
        
        <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: "15px" }}>
            By accessing and using Music Marketplace ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>2. Artist Rights and Responsibilities</h2>
          <p style={{ marginBottom: "15px" }}>
            <strong>2.1 Upload Rights:</strong> By uploading music to our platform, you confirm and warrant that:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>You are the copyright owner of the musical work, or you have obtained all necessary rights, licenses, and permissions to upload and distribute the content</li>
            <li>You have the legal authority to grant the rights described in these terms</li>
            <li>Your content does not infringe upon any third-party rights, including but not limited to copyright, trademark, privacy, or publicity rights</li>
            <li>Your content does not contain any illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable material</li>
          </ul>
          
          <p style={{ marginBottom: "15px" }}>
            <strong>2.2 Content License:</strong> By uploading content, you grant Music Marketplace a non-exclusive, worldwide, royalty-free license to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Host, store, and distribute your content on our platform</li>
            <li>Stream your content to users who have purchased or licensed it</li>
            <li>Use your content for promotional purposes related to our service</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>3. User Rights and Licensing</h2>
          <p style={{ marginBottom: "15px" }}>
            <strong>3.1 Licensed Use:</strong> When you purchase or stream music through our platform, you are granted a limited, non-exclusive, non-transferable license to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Stream the purchased content for personal, non-commercial use</li>
            <li>Download content for offline listening on authorized devices (where applicable)</li>
            <li>Access purchased content through your account indefinitely, subject to these terms</li>
          </ul>

          <p style={{ marginBottom: "15px" }}>
            <strong>3.2 Prohibited Uses:</strong> You may not:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Redistribute, sell, or commercially exploit any content obtained through our service</li>
            <li>Use content for synchronization with video or other media without separate licensing</li>
            <li>Remove or circumvent any digital rights management or copy protection measures</li>
            <li>Share your account credentials or allow unauthorized access to your account</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>4. Account Responsibilities</h2>
          <p style={{ marginBottom: "15px" }}>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>5. Intellectual Property Protection</h2>
          <p style={{ marginBottom: "15px" }}>
            We respect intellectual property rights and expect our users to do the same. We will respond to clear notices of alleged copyright infringement that comply with applicable law.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>6. Termination</h2>
          <p style={{ marginBottom: "15px" }}>
            We may terminate or suspend your account and access to the service at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>7. Limitation of Liability</h2>
          <p style={{ marginBottom: "15px" }}>
            In no event shall Music Marketplace be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>8. Governing Law</h2>
          <p style={{ marginBottom: "15px" }}>
            These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>9. Changes to Terms</h2>
          <p style={{ marginBottom: "15px" }}>
            We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notification. Continued use of the service after such modifications constitutes acceptance of the updated terms.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>10. Contact Information</h2>
          <p style={{ marginBottom: "15px" }}>
            If you have any questions about these Terms of Service, please contact us at legal@musicmarketplace.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
