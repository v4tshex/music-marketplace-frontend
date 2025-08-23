import React from 'react';

function ArtistAgreement() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#007bff", marginBottom: "30px" }}>Artist Agreement & Upload Policy</h1>
        
        <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>1. Artist Eligibility and Requirements</h2>
          <p style={{ marginBottom: "15px" }}>
            To upload and distribute music through Music Marketplace, you must:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Be at least 18 years old or have parental/guardian consent</li>
            <li>Provide accurate and complete registration information</li>
            <li>Maintain an active account in good standing</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>2. Content Ownership and Rights</h2>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.1 Ownership Warranty</h3>
          <p style={{ marginBottom: "15px" }}>
            By uploading content to our platform, you represent and warrant that:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>You are the sole owner and creator of the musical composition and sound recording, OR</li>
            <li>You have obtained all necessary rights, licenses, permissions, and clearances from all relevant parties, including:</li>
            <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
              <li>Co-writers and composers</li>
              <li>Performers and musicians</li>
              <li>Producers and engineers</li>
              <li>Record labels or publishers (if applicable)</li>
              <li>Any sample clearances for incorporated third-party content</li>
            </ul>
            <li>You have the legal authority to grant the rights described in this agreement</li>
            <li>Your content does not infringe upon any third-party intellectual property rights</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.2 Prohibited Content</h3>
          <p style={{ marginBottom: "15px" }}>The following content is strictly prohibited:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Copyrighted material you do not own or have permission to use</li>
            <li>Content that infringes on third-party rights</li>
            <li>Illegal, harmful, threatening, abusive, harassing, or defamatory content</li>
            <li>Content promoting violence, discrimination, or illegal activities</li>
            <li>Explicit sexual content or content harmful to minors</li>
            <li>Content that violates any applicable laws or regulations</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>3. Content Standards and Quality</h2>
          <p style={{ marginBottom: "15px" }}>All uploaded content must meet our technical and quality standards:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Audio files must be in approved formats (MP3, WAV, FLAC)</li>
            <li>Minimum audio quality requirements apply</li>
            <li>Accurate metadata must be provided (title, artist, genre, etc.)</li>
            <li>Album artwork must be original or properly licensed</li>
            <li>Content must be professionally mixed and mastered</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>4. License Grant to Music Marketplace</h2>
          <p style={{ marginBottom: "15px" }}>
            By uploading content, you grant Music Marketplace a non-exclusive, worldwide, royalty-free license to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Host, store, reproduce, and distribute your content on our platform</li>
            <li>Stream your content to authorized users</li>
            <li>Create and distribute promotional materials featuring your content</li>
            <li>Transcode your content into different formats for platform optimization</li>
            <li>Display associated metadata, artwork, and artist information</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>5. Revenue Sharing and Royalties</h2>
          <p style={{ marginBottom: "15px" }}>
            Revenue from your content will be shared as follows:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Artist Share:</strong> 95% of net revenue</li>
            <li><strong>Platform Fee:</strong> 5% of net revenue</li>
            <li><strong>Net Revenue Definition:</strong> Total sales minus payment processing fees and applicable taxes</li>
          </ul>
          <p style={{ marginBottom: "15px" }}>
            <strong>Important:</strong> You are responsible for any additional royalty payments to co-writers, producers, publishers, or other rights holders.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>6. Indemnification</h2>
          <p style={{ marginBottom: "15px" }}>
            <strong>You agree to indemnify, defend, and hold harmless Music Marketplace, its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or relating to:</strong>
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Your uploaded content or any breach of your ownership warranties</li>
            <li>Any infringement of third-party intellectual property rights</li>
            <li>Your violation of this agreement or applicable laws</li>
            <li>Any claims by third parties regarding your content</li>
            <li>Any breach of your representations and warranties</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>7. Content Monitoring and Removal</h2>
          <p style={{ marginBottom: "15px" }}>
            Music Marketplace reserves the right to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Review and monitor uploaded content for compliance</li>
            <li>Remove content that violates this agreement or applicable laws</li>
            <li>Suspend or terminate artist accounts for violations</li>
            <li>Respond to valid copyright infringement notices (DMCA)</li>
            <li>Implement automated content identification systems</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>8. Copyright Infringement Policy</h2>
          <p style={{ marginBottom: "15px" }}>
            We have a zero-tolerance policy for copyright infringement. If you receive a valid copyright claim:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>The infringing content will be immediately removed</li>
            <li>You will receive a strike against your account</li>
            <li>Multiple strikes may result in account termination</li>
            <li>You may submit a counter-notice if you believe the claim is invalid</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>9. Account Termination</h2>
          <p style={{ marginBottom: "15px" }}>
            Either party may terminate this agreement at any time. Upon termination:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Your content will be removed from the platform within 30 days</li>
            <li>Outstanding royalties will be paid according to our standard schedule</li>
            <li>The indemnification clause will survive termination</li>
            <li>You may request a copy of your content and sales data</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>10. Modification of Agreement</h2>
          <p style={{ marginBottom: "15px" }}>
            We may modify this agreement from time to time. Significant changes will be communicated via email or platform notification. Continued use of our services after modifications constitutes acceptance of the updated terms.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>11. Dispute Resolution</h2>
          <p style={{ marginBottom: "15px" }}>
            Any disputes arising from this agreement will be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]. The prevailing party will be entitled to reasonable attorneys' fees and costs.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>12. Contact Information</h2>
          <p style={{ marginBottom: "15px" }}>
            For questions about this Artist Agreement or to report copyright issues, contact:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Artist Support: artists@musicmarketplace.com</li>
            <li>Copyright Issues: copyright@musicmarketplace.com</li>
            <li>Legal Department: legal@musicmarketplace.com</li>
          </ul>

          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #333",
            marginTop: "30px"
          }}>
            <h3 style={{ color: "#ff6b6b", marginBottom: "15px" }}>⚠️ Important Legal Notice</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
              This Artist Agreement constitutes a legally binding contract. By uploading content to our platform, 
              you acknowledge that you have read, understood, and agreed to be bound by all terms and conditions. 
              If you do not agree with any part of this agreement, do not upload content to our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistAgreement;
