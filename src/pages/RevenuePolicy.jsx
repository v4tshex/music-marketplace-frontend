import React from 'react';

function RevenuePolicy() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#007bff", marginBottom: "30px" }}>Revenue Share & Royalty Policy</h1>
        
        <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>1. Revenue Sharing Overview</h2>
          <p style={{ marginBottom: "15px" }}>
            Music Marketplace operates on a transparent and artist-friendly revenue sharing model. We believe in maximizing artist earnings while maintaining a sustainable platform for all users.
          </p>

          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #28a745",
            marginBottom: "20px"
          }}>
            <h3 style={{ color: "#28a745", marginBottom: "15px" }}>💰 Revenue Split Summary</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <h4 style={{ color: "#fff", marginBottom: "10px" }}>Artist Share</h4>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>95%</p>
                <p style={{ fontSize: "14px", color: "#ccc" }}>of net revenue</p>
              </div>
              <div>
                <h4 style={{ color: "#fff", marginBottom: "10px" }}>Platform Fee</h4>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>5%</p>
                <p style={{ fontSize: "14px", color: "#ccc" }}>of net revenue</p>
              </div>
            </div>
          </div>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>2. Revenue Calculation</h2>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.1 Gross Revenue Sources</h3>
          <p style={{ marginBottom: "15px" }}>Revenue is generated from the following sources:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Track Sales:</strong> Individual song purchases</li>
            <li><strong>Album Sales:</strong> Full album purchases</li>
            <li><strong>Streaming Revenue:</strong> Per-stream royalties from subscription users</li>
            <li><strong>Premium Features:</strong> Enhanced streaming options</li>
            <li><strong>Licensing Fees:</strong> Third-party licensing agreements</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>2.2 Net Revenue Definition</h3>
          <p style={{ marginBottom: "15px" }}>Net revenue is calculated as gross revenue minus:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Payment processing fees (typically 2.9% + £0.30 per transaction)</li>
            <li>Applicable taxes (VAT, sales tax, etc.)</li>
            <li>Currency conversion fees (for international transactions)</li>
            <li>Chargebacks and refunds</li>
            <li>Third-party licensing costs (PRS, MCPS, etc.)</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>3. Payout Schedule & Minimums</h2>
          
          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #333",
            marginBottom: "20px"
          }}>
            <h3 style={{ color: "#007bff", marginBottom: "15px" }}>📅 Payment Schedule</h3>
            <ul style={{ marginLeft: "0", listStyle: "none" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Monthly Payments:</strong> Processed on the 15th of each month
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Reporting Period:</strong> Previous calendar month (1st to last day)
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Minimum Payout:</strong> £25.00 (or equivalent in local currency)
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Payment Methods:</strong> Bank transfer, PayPal, Stripe
              </li>
            </ul>
          </div>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>3.1 Minimum Payout Thresholds</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Standard Threshold:</strong> £25.00 minimum balance required</li>
            <li><strong>Below Threshold:</strong> Earnings carry forward to next month</li>
            <li><strong>Account Closure:</strong> Final payment regardless of amount</li>
            <li><strong>Annual Minimum:</strong> All balances paid out in December</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>4. Revenue Breakdown by Content Type</h2>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>4.1 Individual Track Sales</h3>
          <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <p><strong>Typical Price:</strong> £0.99 - £1.29 per track</p>
            <p><strong>Artist Earnings:</strong> 95% of net revenue (approximately £0.85 - £1.10 per sale)</p>
            <p><strong>Platform Fee:</strong> 5% of net revenue</p>
          </div>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>4.2 Album Sales</h3>
          <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <p><strong>Typical Price:</strong> £7.99 - £12.99 per album</p>
            <p><strong>Artist Earnings:</strong> 95% of net revenue</p>
            <p><strong>Bulk Discount:</strong> Same revenue share applies regardless of album size</p>
          </div>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>4.3 Streaming Revenue</h3>
          <div style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <p><strong>Per-Stream Rate:</strong> £0.003 - £0.005 per stream (varies by subscription tier)</p>
            <p><strong>Artist Earnings:</strong> 95% of streaming revenue</p>
            <p><strong>Minimum Duration:</strong> 30 seconds for qualifying stream</p>
          </div>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>5. Multi-Artist Revenue Splits</h2>
          <p style={{ marginBottom: "15px" }}>For collaborations and featured artists:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Primary Artist:</strong> Receives full 95% share by default</li>
            <li><strong>Custom Splits:</strong> Artists can configure custom split percentages</li>
            <li><strong>Featured Artists:</strong> Must be added during upload with agreed percentages</li>
            <li><strong>Producer Splits:</strong> Can be allocated from artist share if desired</li>
            <li><strong>Automatic Distribution:</strong> Platform handles split calculations and payments</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>6. Geographic Revenue Variations</h2>
          <p style={{ marginBottom: "15px" }}>Revenue may vary by territory due to:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Local purchasing power and pricing adjustments</li>
            <li>Currency exchange rates and conversion fees</li>
            <li>Regional licensing costs and royalty rates</li>
            <li>Local tax obligations and withholding requirements</li>
            <li>Payment processing costs in different regions</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>7. Promotional Pricing Impact</h2>
          <p style={{ marginBottom: "15px" }}>During promotional periods:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Platform Discounts:</strong> Artist receives 95% of actual sale price</li>
            <li><strong>Artist-Initiated Sales:</strong> Artist sets promotional price, receives 95% of that amount</li>
            <li><strong>Bundle Offers:</strong> Revenue allocated proportionally across included tracks</li>
            <li><strong>Free Promotions:</strong> No revenue generated during free periods</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>8. Additional Revenue Opportunities</h2>
          
          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>8.1 Sync Licensing</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Artists retain 100% of sync licensing revenue</li>
            <li>Platform may facilitate introductions for 10% finder's fee</li>
            <li>Direct artist-to-client negotiations encouraged</li>
          </ul>

          <h3 style={{ color: "#ccc", marginTop: "20px", marginBottom: "10px" }}>8.2 Merchandise Integration</h3>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Artists keep 90% of merchandise sales</li>
            <li>10% platform fee covers payment processing and platform features</li>
            <li>Direct fulfillment or dropshipping options available</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>9. Tax Considerations</h2>
          <p style={{ marginBottom: "15px" }}>Important tax information for artists:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>UK Artists:</strong> Earnings subject to income tax and National Insurance</li>
            <li><strong>International Artists:</strong> May be subject to withholding tax</li>
            <li><strong>Tax Reporting:</strong> Annual statements provided for tax filing</li>
            <li><strong>VAT Registration:</strong> Artists responsible for own VAT obligations</li>
            <li><strong>Professional Advice:</strong> We recommend consulting a tax professional</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>10. Payment Methods & Processing</h2>
          
          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #333",
            marginBottom: "20px"
          }}>
            <h3 style={{ color: "#007bff", marginBottom: "15px" }}>💳 Available Payment Methods</h3>
            <ul style={{ marginLeft: "0", listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>🏦 Bank Transfer (ACH/SEPA):</strong> Free, 3-5 business days
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>💰 PayPal:</strong> 2% fee, instant transfer
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>💳 Stripe Direct:</strong> 1% fee, 1-2 business days
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>🪙 Cryptocurrency:</strong> 1% fee, 24-48 hours (Bitcoin, Ethereum)
              </li>
            </ul>
          </div>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>11. Revenue Reporting & Analytics</h2>
          <p style={{ marginBottom: "15px" }}>Artists have access to comprehensive reporting:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>Real-time Dashboard:</strong> Current month earnings and statistics</li>
            <li><strong>Monthly Statements:</strong> Detailed breakdown of all revenue sources</li>
            <li><strong>Geographic Analysis:</strong> Revenue by country and region</li>
            <li><strong>Track Performance:</strong> Individual song statistics and earnings</li>
            <li><strong>Historical Data:</strong> Multi-year revenue trends and analytics</li>
            <li><strong>Export Options:</strong> CSV and PDF reports for accounting</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>12. Policy Changes & Grandfathering</h2>
          <p style={{ marginBottom: "15px" }}>When revenue policies change:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li><strong>60-Day Notice:</strong> All changes announced with advance notice</li>
            <li><strong>Existing Content:</strong> Current terms apply to previously uploaded content</li>
            <li><strong>New Uploads:</strong> Latest terms apply to new content</li>
            <li><strong>Opt-out Period:</strong> Artists may remove content before changes take effect</li>
          </ul>

          <h2 style={{ color: "#007bff", marginTop: "30px", marginBottom: "15px" }}>13. Contact & Support</h2>
          <p style={{ marginBottom: "15px" }}>For revenue and payout questions:</p>
          <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
            <li>Revenue Support: revenue@musicmarketplace.com</li>
            <li>Payment Issues: payments@musicmarketplace.com</li>
            <li>Tax Questions: tax@musicmarketplace.com</li>
            <li>General Inquiries: support@musicmarketplace.com</li>
          </ul>

          <div style={{ 
            backgroundColor: "#1a1a1a", 
            padding: "20px", 
            borderRadius: "8px", 
            border: "1px solid #28a745",
            marginTop: "30px"
          }}>
            <h3 style={{ color: "#28a745", marginBottom: "15px" }}>🎯 Our Commitment</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
              Music Marketplace is committed to providing transparent, fair, and timely revenue sharing. 
              We believe artists deserve the majority of revenue from their creative work, and our 95% 
              artist share reflects this commitment. We continuously work to minimize costs and maximize 
              artist earnings while maintaining a high-quality platform for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenuePolicy;
