// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, loading, error] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  // Form states
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

  const genres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Country", "Electronic", "Jazz", "Classical",
    "Blues", "Folk", "Reggae", "Punk", "Metal", "Alternative", "Indie", "Soul",
    "Funk", "Gospel", "Latin", "World Music"
  ];

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/api/users/${user.uid}`);
      const profileData = response.data;
      setProfile(profileData);
      
      // Populate form fields
      setFirstName(profileData.firstName || "");
      setLastName(profileData.lastName || "");
      setDisplayName(profileData.displayName || "");
      setBio(profileData.bio || "");
      setLocation(profileData.location || "");
      setWebsite(profileData.website || "");
      setDateOfBirth(profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : "");
      setGenrePreferences(profileData.genrePreferences ? JSON.parse(profileData.genrePreferences) : []);
      setIsArtist(profileData.isArtist || false);
      setArtistName(profileData.artistName || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If profile doesn't exist, user might need to complete registration
      if (error.response?.status === 404) {
        navigate("/register");
      }
    }
  };

  const handleGenreChange = (genre) => {
    setGenrePreferences(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const userData = {
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

      await api.put(`/api/users/${user.uid}`, userData);
      setSaveSuccess(true);
      setIsEditing(false);
      fetchUserProfile(); // Refresh profile data
      
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error.response?.data?.error || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError("");
    // Reset form to original values
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setDisplayName(profile.displayName || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setWebsite(profile.website || "");
      setDateOfBirth(profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : "");
      setGenrePreferences(profile.genrePreferences ? JSON.parse(profile.genrePreferences) : []);
      setIsArtist(profile.isArtist || false);
      setArtistName(profile.artistName || "");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#000", color: "#fff" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#000", color: "#fff" }}>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    marginBottom: 12,
    padding: "8px",
    backgroundColor: "#222",
    color: "#ffffff",
    border: "1px solid #444",
    borderRadius: "4px"
  };

  const readOnlyStyle = {
    ...inputStyle,
    backgroundColor: "#333",
    border: "1px solid #555",
    cursor: "not-allowed"
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#fff" }}>My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {saveSuccess && (
          <div style={{ 
            backgroundColor: "#28a745", 
            color: "#fff", 
            padding: "10px", 
            borderRadius: "4px", 
            marginBottom: "20px",
            textAlign: "center"
          }}>
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} style={{ 
          backgroundColor: "#111", 
          padding: "30px", 
          borderRadius: "8px", 
          border: "1px solid #333" 
        }}>
          {/* Basic Information */}
          <h3 style={{ color: "#007bff", marginBottom: "15px" }}>Basic Information</h3>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Email</label>
            <input
              type="email"
              value={user.email}
              style={readOnlyStyle}
              disabled
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                style={isEditing ? inputStyle : readOnlyStyle}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                style={isEditing ? inputStyle : readOnlyStyle}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              style={isEditing ? inputStyle : readOnlyStyle}
              disabled={!isEditing}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              style={isEditing ? inputStyle : readOnlyStyle}
              disabled={!isEditing}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={isEditing ? inputStyle : readOnlyStyle}
              disabled={!isEditing}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Website</label>
            <input
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              style={isEditing ? inputStyle : readOnlyStyle}
              disabled={!isEditing}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              style={{
                ...(isEditing ? inputStyle : readOnlyStyle),
                height: "100px",
                resize: "vertical"
              }}
              disabled={!isEditing}
            />
          </div>

          {/* Music Preferences */}
          <h3 style={{ color: "#007bff", marginBottom: "15px" }}>Music Preferences</h3>
          <div style={{ marginBottom: "30px" }}>
            <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "10px" }}>Favorite genres:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "5px" }}>
              {genres.map(genre => (
                <label key={genre} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "14px", 
                  cursor: isEditing ? "pointer" : "default",
                  opacity: isEditing ? 1 : 0.7
                }}>
                  <input
                    type="checkbox"
                    checked={genrePreferences.includes(genre)}
                    onChange={() => isEditing && handleGenreChange(genre)}
                    style={{ marginRight: "5px" }}
                    disabled={!isEditing}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>

          {/* Artist Information */}
          <h3 style={{ color: "#007bff", marginBottom: "15px" }}>Artist Information</h3>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              cursor: isEditing ? "pointer" : "default",
              opacity: isEditing ? 1 : 0.7
            }}>
              <input
                type="checkbox"
                checked={isArtist}
                onChange={e => isEditing && setIsArtist(e.target.checked)}
                style={{ marginRight: "10px" }}
                disabled={!isEditing}
              />
              I am an artist and want to upload music
            </label>
          </div>

          {isArtist && (
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Artist/Stage Name</label>
              <input
                type="text"
                value={artistName}
                onChange={e => setArtistName(e.target.value)}
                style={isEditing ? inputStyle : readOnlyStyle}
                disabled={!isEditing}
              />
            </div>
          )}

          {isEditing && (
            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: isLoading ? "#555" : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {saveError && (
            <p style={{ color: "#ff6b6b", textAlign: "center", marginTop: "15px" }}>
              {saveError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
