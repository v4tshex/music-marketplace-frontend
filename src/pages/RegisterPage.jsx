
import React, { useState } from "react";
// page for creating a new user account and profile
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/api";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [genrePreferences, setGenrePreferences] = useState([]);
  const [isArtist, setIsArtist] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const genres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Country", "Electronic", "Jazz", "Classical",
    "Blues", "Folk", "Reggae", "Punk", "Metal", "Alternative", "Indie", "Soul",
    "Funk", "Gospel", "Latin", "World Music"
  ];

  // toggle selected genres in local state
  const handleGenreChange = (genre) => {
    setGenrePreferences(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // create firebase user then persist profile to backend
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    
    if (!acceptedTerms || !acceptedPrivacy) {
      setError("You must accept the Terms of Service and Privacy Policy to register.");
      setIsLoading(false);
      return;
    }
    
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      
      const userData = {
        firebaseUid: firebaseUser.uid,
        email: email,
        firstName: firstName || null,
        lastName: lastName || null,
        displayName: displayName || null,
        bio: bio || null,
        location: location || null,
        website: website || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
        genrePreferences: genrePreferences.length > 0 ? JSON.stringify(genrePreferences) : null,
        isArtist: isArtist,
        artistName: isArtist ? artistName : null
      };
      
      await createUser(userData);
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "90%",
    marginBottom: 12,
    padding: "8px",
    backgroundColor: "#222",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "4px"
  };

  const checkboxStyle = {
    margin: "8px",
    cursor: "pointer"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20, backgroundColor: "#000000", minHeight: "100vh", color: "#ffffff", padding: "20px" }}>
      <form onSubmit={handleRegister} style={{ width: 500, maxWidth: "90%", textAlign: "left", border: "1px solid #333", padding: 24, borderRadius: 8, backgroundColor: "#111", height: "fit-content" }}>
        <h2 style={{ color: "#ffffff", textAlign: "center", marginBottom: "20px" }}>Create Your Account</h2>
        
        {/* basic account details */}
        <h3 style={{ color: "#007bff", marginBottom: "15px" }}>Basic Information</h3>
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        
        {/* personal profile details */}
        <h3 style={{ color: "#007bff", marginBottom: "15px", marginTop: "20px" }}>Personal Details</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ ...inputStyle, width: "45%" }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ ...inputStyle, width: "45%" }}
          />
        </div>
        <input
          type="text"
          placeholder="Display Name (how others will see you)"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={e => setDateOfBirth(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Location (City, Country)"
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={inputStyle}
        />
        <input
          type="url"
          placeholder="Website (optional)"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={e => setBio(e.target.value)}
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
        />
        
        {/* user music preferences */}
        <h3 style={{ color: "#007bff", marginBottom: "15px", marginTop: "20px" }}>Music Preferences</h3>
        <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "10px" }}>Select your favorite genres:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "5px", marginBottom: "15px" }}>
          {genres.map(genre => (
            <label key={genre} style={{ display: "flex", alignItems: "center", fontSize: "14px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={genrePreferences.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                style={{ marginRight: "5px" }}
              />
              {genre}
            </label>
          ))}
        </div>
        
        {/* artist specific fields */}
        <h3 style={{ color: "#007bff", marginBottom: "15px", marginTop: "20px" }}>Artist Information</h3>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "15px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={isArtist}
            onChange={e => setIsArtist(e.target.checked)}
            style={{ marginRight: "10px" }}
          />
          I am an artist and want to upload music
        </label>
        
        {isArtist && (
          <input
            type="text"
            placeholder="Artist/Stage Name"
            value={artistName}
            onChange={e => setArtistName(e.target.value)}
            style={inputStyle}
          />
        )}
        
        {/* legal consents */}
        <h3 style={{ color: "#007bff", marginBottom: "15px", marginTop: "20px" }}>Legal Agreements</h3>
        <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#1a1a1a", borderRadius: "6px", border: "1px solid #333" }}>
          <label style={{ display: "flex", alignItems: "flex-start", marginBottom: "15px", cursor: "pointer", lineHeight: "1.4" }}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              style={{ marginRight: "10px", marginTop: "2px" }}
              required
            />
            <span style={{ fontSize: "14px" }}>
              I have read and agree to the{" "}
              <a 
                href="/terms-of-service" 
                target="_blank" 
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                Terms of Service
              </a>
              {" "}and confirm that I will only upload content I own or have permission to distribute.
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", cursor: "pointer", lineHeight: "1.4" }}>
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={e => setAcceptedPrivacy(e.target.checked)}
              style={{ marginRight: "10px", marginTop: "2px" }}
              required
            />
            <span style={{ fontSize: "14px" }}>
              I have read and agree to the{" "}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                style={{ color: "#007bff", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>
              {" "}and understand how my data will be processed.
            </span>
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: "100%",
            padding: "12px 16px", 
            marginTop: 20, 
            backgroundColor: isLoading ? "#555" : "#007bff", 
            color: "#ffffff", 
            border: "none", 
            borderRadius: "4px", 
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "16px"
          }}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
        
        {error && <p style={{ color: "#ff6b6b", textAlign: "center", marginTop: "15px" }}>{error}</p>}
        <p style={{ color: "#ffffff", textAlign: "center", marginTop: "15px" }}>
          Already have an account? <a href="/login" style={{ color: "#007bff" }}>Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
