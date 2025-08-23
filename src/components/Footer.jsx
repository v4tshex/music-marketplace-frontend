import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#111", 
      borderTop: "1px solid #333", 
      marginTop: "auto",
      padding: "40px 20px 20px 20px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "30px",
          marginBottom: "30px"
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{ color: "#007bff", marginBottom: "15px", fontSize: "18px" }}>
              Music Marketplace
            </h3>
            <p style={{ color: "#ccc", lineHeight: "1.5", fontSize: "14px" }}>
              A platform connecting artists and music lovers worldwide. 
              Discover, stream, and support independent music.
            </p>
            <p style={{ color: "#666", fontSize: "12px", marginTop: "15px" }}>
              © 2024 Music Marketplace. All rights reserved.
            </p>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 style={{ color: "#fff", marginBottom: "15px", fontSize: "16px" }}>
              Legal & Compliance
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/terms-of-service" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Terms of Service
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/privacy-policy" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/artist-agreement" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Artist Agreement
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/copyright-licensing" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Copyright & Licensing
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/revenue-policy" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Revenue Share Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 style={{ color: "#fff", marginBottom: "15px", fontSize: "16px" }}>
              For Artists
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/upload" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Upload Music
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link 
                  to="/dashboard" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Artist Dashboard
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a 
                  href="mailto:artists@musicmarketplace.com" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Artist Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 style={{ color: "#fff", marginBottom: "15px", fontSize: "16px" }}>
              Support & Contact
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a 
                  href="mailto:support@musicmarketplace.com" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  General Support
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a 
                  href="mailto:legal@musicmarketplace.com" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Legal Inquiries
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a 
                  href="mailto:privacy@musicmarketplace.com" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Privacy & Data
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a 
                  href="mailto:copyright@musicmarketplace.com" 
                  style={{ 
                    color: "#ccc", 
                    textDecoration: "none", 
                    fontSize: "14px",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#007bff"}
                  onMouseOut={(e) => e.target.style.color = "#ccc"}
                >
                  Copyright Issues
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ 
          borderTop: "1px solid #333", 
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}>
          <div style={{ color: "#666", fontSize: "12px" }}>
            Licensing for the use of musical works on this service is covered by PRS for Music.
          </div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            Revenue Split: 95% Artist | 5% Platform
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
