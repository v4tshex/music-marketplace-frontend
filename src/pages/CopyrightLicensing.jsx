import React from 'react';

function CopyrightLicensing() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#007bff", marginBottom: "30px" }}>Copyright Notice & Licensing Information</h1>
        
        <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>1. Music Licensing Overview</h2>
          <p style={{ marginBottom: "15px" }}>
            Music Marketplace operates under proper licensing agreements to ensure legal streaming and distribution of musical works. 
            Our licensing covers both the musical compositions (songs) and sound recordings (masters) available on our platform.
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>2. PRS for Music Licensing</h2>
          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #007bff",
            marginBottom: "20px"
          }}>
            <h3 style={{ color: "#007bff", marginBottom: "15px" }}>📜 Official License Notice</h3>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              <strong>Licensing for the use of musical works on this service is covered by PRS for Music.</strong>
            </p>
            <p style={{ fontSize: "14px", color: "#ccc" }}>
              License Reference: PRS-MM-2024-001 | Valid through: December 31, 2024
            </p>
          </div>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.1 What PRS for Music Covers</h3>
          <p style={{ marginBottom: "15px" }}>
            PRS for Music represents songwriters, composers, and music publishers. Our license covers:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Public performance rights for musical compositions</li>
            <li>Streaming rights for songs in the PRS repertoire</li>
            <li>Synchronization rights for platform features</li>
            <li>Mechanical reproduction rights for digital distribution</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.2 MCPS Coverage</h3>
          <p style={{ marginBottom: "15px" }}>
            Mechanical Copyright Protection Society (MCPS) licensing is also included in our agreement, covering:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Mechanical reproduction rights for downloads</li>
            <li>Digital phonorecord delivery licenses</li>
            <li>Synchronization with user-generated content features</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>3. Sound Recording Licenses</h2>
          <p style={{ marginBottom: "15px" }}>
            In addition to musical composition rights, we secure appropriate licenses for sound recordings through:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Direct Artist Agreements:</strong> Independent artists grant us streaming rights directly</li>
            <li><strong>Label Partnerships:</strong> Distribution agreements with record labels</li>
            <li><strong>Aggregator Services:</strong> Third-party distribution platforms</li>
            <li><strong>PPL Licensing:</strong> For neighboring rights where applicable</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>4. International Licensing</h2>
          <p style={{ marginBottom: "15px" }}>
            Our platform serves users globally, and we maintain appropriate licenses in key territories:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>United Kingdom:</strong> PRS for Music, PPL, MCPS</li>
            <li><strong>United States:</strong> ASCAP, BMI, SESAC mechanical licenses</li>
            <li><strong>European Union:</strong> Local PRO agreements via reciprocal arrangements</li>
            <li><strong>Other Territories:</strong> Licensing through international societies as needed</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>5. Royalty Collection and Distribution</h2>
          <p style={{ marginBottom: "15px" }}>
            We ensure proper royalty payments through multiple channels:
          </p>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>5.1 Performance Royalties</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Streaming data reported to PRS for Music monthly</li>
            <li>Royalties calculated based on actual plays and duration</li>
            <li>Payments distributed to rightsholders through PRO networks</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>5.2 Mechanical Royalties</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Download and streaming mechanical royalties via MCPS</li>
            <li>Monthly reporting of digital sales and streams</li>
            <li>Direct payment to publishers and songwriters</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>5.3 Master Recording Royalties</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Direct payment to artists and labels through our platform</li>
            <li>95% artist share, 5% platform fee structure</li>
            <li>Monthly payout schedule for eligible earnings</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>6. User Rights and Restrictions</h2>
          <p style={{ marginBottom: "15px" }}>
            Our licenses allow users to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Stream music for personal, non-commercial use</li>
            <li>Download purchased tracks for offline listening</li>
            <li>Create personal playlists and share recommendations</li>
          </ul>

          <p style={{ marginBottom: "15px" }}>
            Users are <strong>not permitted</strong> to:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Redistribute, broadcast, or publicly perform downloaded content</li>
            <li>Use content for commercial purposes without separate licensing</li>
            <li>Circumvent digital rights management or copy protection</li>
            <li>Extract or synchronize audio with video content</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>7. Copyright Compliance</h2>
          <p style={{ marginBottom: "15px" }}>
            Music Marketplace is committed to copyright compliance through:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Content ID Systems:</strong> Automated detection of copyrighted material</li>
            <li><strong>DMCA Compliance:</strong> Rapid response to takedown notices</li>
            <li><strong>Rights Clearance:</strong> Verification of upload permissions</li>
            <li><strong>Regular Audits:</strong> Periodic review of licensing compliance</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>8. Licensing Costs and Fees</h2>
          <p style={{ marginBottom: "15px" }}>
            Our licensing fees are calculated as follows:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Performance Rights:</strong> Percentage of streaming revenue to PRS for Music</li>
            <li><strong>Mechanical Rights:</strong> Per-stream/download rate to MCPS</li>
            <li><strong>Master Rights:</strong> Revenue share with artists and labels</li>
            <li><strong>Administrative Costs:</strong> Platform maintenance and operations</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>9. License Compliance Monitoring</h2>
          <p style={{ marginBottom: "15px" }}>
            We maintain comprehensive systems to ensure ongoing compliance:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Real-time usage tracking and reporting</li>
            <li>Automated royalty calculations and distributions</li>
            <li>Regular reconciliation with licensing organizations</li>
            <li>Annual compliance audits by external firms</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>10. Future Licensing Developments</h2>
          <p style={{ marginBottom: "15px" }}>
            We continuously evaluate and expand our licensing coverage:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Exploring additional territory licenses</li>
            <li>Evaluating new technology licensing requirements</li>
            <li>Participating in industry licensing standard developments</li>
            <li>Adapting to changes in copyright law and regulation</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>11. Contact Information</h2>
          <p style={{ marginBottom: "15px" }}>
            For licensing-related inquiries, contact:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Licensing Department: licensing@musicmarketplace.com</li>
            <li>Rights Management: rights@musicmarketplace.com</li>
            <li>Copyright Issues: copyright@musicmarketplace.com</li>
            <li>PRS for Music Direct: <a href="https://www.prsformusic.com" style={{ color: "#007bff" }}>prsformusic.com</a></li>
          </ul>

          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #28a745",
            marginTop: "30px"
          }}>
            <h3 style={{ color: "#28a745", marginBottom: "15px" }}>✅ Compliance Guarantee</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
              Music Marketplace is fully licensed and compliant with UK and international copyright law. 
              All content on our platform is properly licensed, and we maintain active agreements with 
              relevant collecting societies and rights organizations. Users can stream and purchase 
              content with confidence in our legal compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyrightLicensing;
