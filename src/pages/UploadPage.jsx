import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";
import { getAuth } from "firebase/auth";

const currentUser = auth.currentUser;


const UploadForm = () => {
  // Individual track form states
  const [musicFile, setMusicFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [trackNumber, setTrackNumber] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [acceptedArtistAgreement, setAcceptedArtistAgreement] = useState(false);
  const [confirmedOwnership, setConfirmedOwnership] = useState(false);
  
  // Upload session states
  const [uploadedTracks, setUploadedTracks] = useState([]);
  const [currentUploadProgress, setCurrentUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleMusicChange = (e) => {
    setMusicFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

const handleUpload = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    setUploadStatus("You must be logged in to upload.");
    return;
  }

  if (!musicFile || !title || !artist || !genre) {
    setUploadStatus("Please fill in all fields and select a music file.");
    return;
  }

  if (!acceptedArtistAgreement || !confirmedOwnership) {
    setUploadStatus("You must accept the Artist Agreement and confirm ownership to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("music", musicFile);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    setIsUploading(true);
    setUploadStatus("Uploading files...");
    setCurrentUploadProgress(0);

    const uploadRes = await axios.post("http://localhost:5000/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setCurrentUploadProgress(percent);
      },
    });

    const { fileUrl, imageUrl } = uploadRes.data;

    setUploadStatus("Saving metadata...");
    const songId = uuidv4();

    await axios.post("http://localhost:5000/metadata", {
      songId,
      title,
      artist,
      album,
      genre,
      trackNumber,
      explicit,
      fileUrl,
      imageUrl,
      userId: user.uid,
    });

    // Add to uploaded tracks list
    const newTrack = {
      id: songId,
      title,
      artist,
      album,
      genre,
      trackNumber,
      explicit,
      fileUrl,
      imageUrl,
      uploadedAt: new Date().toLocaleString()
    };
    
    setUploadedTracks(prev => [...prev, newTrack]);
    setUploadStatus(`"${title}" uploaded successfully!`);
    
    // Reset current upload form
    resetCurrentForm();
    
  } catch (err) {
    console.error("Upload error:", err);
    setUploadStatus("Upload or save failed");
  } finally {
    setIsUploading(false);
    setCurrentUploadProgress(0);
  }
};

const resetCurrentForm = () => {
  setTitle("");
  setArtist("");
  setAlbum("");
  setGenre("");
  setTrackNumber("");
  setExplicit(false);
  setAcceptedArtistAgreement(false);
  setConfirmedOwnership(false);
  setMusicFile(null);
  setImageFile(null);
  setPreviewImage(null);
};

const removeUploadedTrack = (trackId) => {
  setUploadedTracks(prev => prev.filter(track => track.id !== trackId));
};

const startNewUploadSession = () => {
  setUploadedTracks([]);
  setUploadStatus("");
  resetCurrentForm();
};


  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", backgroundColor: "#000000", color: "#ffffff", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ color: "#ffffff", margin: 0 }}>Upload Tracks</h2>
        {uploadedTracks.length > 0 && (
          <button
            onClick={startNewUploadSession}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Start New Session
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: uploadedTracks.length > 0 ? "1fr 1fr" : "1fr", gap: "30px" }}>
        {/* Upload Form */}
        <div style={{ backgroundColor: "#111", padding: "20px", borderRadius: "8px" }}>
          <h3 style={{ color: "#ffffff", marginTop: 0 }}>
            {uploadedTracks.length > 0 ? "Upload Another Track" : "Upload Track"}
          </h3>

          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            style={{ 
              width: "100%", 
              padding: "10px", 
              marginBottom: "10px", 
              backgroundColor: "#222", 
              color: "#ffffff", 
              border: "1px solid #444", 
              borderRadius: "4px",
              opacity: isUploading ? 0.6 : 1
            }}
          />
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            disabled={isUploading}
            style={{ 
              width: "100%", 
              padding: "10px", 
              marginBottom: "10px", 
              backgroundColor: "#222", 
              color: "#ffffff", 
              border: "1px solid #444", 
              borderRadius: "4px",
              opacity: isUploading ? 0.6 : 1
            }}
          />
          <input
            type="text"
            placeholder="Album Name (optional)"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            disabled={isUploading}
            style={{ 
              width: "100%", 
              padding: "10px", 
              marginBottom: "10px", 
              backgroundColor: "#222", 
              color: "#ffffff", 
              border: "1px solid #444", 
              borderRadius: "4px",
              opacity: isUploading ? 0.6 : 1
            }}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            disabled={isUploading}
            style={{ 
              width: "100%", 
              padding: "10px", 
              marginBottom: "10px", 
              backgroundColor: "#222", 
              color: "#ffffff", 
              border: "1px solid #444", 
              borderRadius: "4px",
              opacity: isUploading ? 0.6 : 1
            }}
          />
          <input
            type="number"
            placeholder="Track Number (optional)"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            disabled={isUploading}
            min="1"
            style={{ 
              width: "100%", 
              padding: "10px", 
              marginBottom: "15px", 
              backgroundColor: "#222", 
              color: "#ffffff", 
              border: "1px solid #444", 
              borderRadius: "4px",
              opacity: isUploading ? 0.6 : 1
            }}
          />
          
          {/* Explicit Content Checkbox */}
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="checkbox"
              id="explicit"
              checked={explicit}
              onChange={(e) => setExplicit(e.target.checked)}
              disabled={isUploading}
              style={{ 
                width: "18px", 
                height: "18px",
                opacity: isUploading ? 0.6 : 1
              }}
            />
            <label htmlFor="explicit" style={{ color: "#ffffff", fontSize: "14px", cursor: "pointer" }}>
              <strong>Explicit Content</strong> - Check if this track contains explicit language or content
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#ffffff" }}><strong>Music File</strong></label><br />
            <input 
              type="file" 
              accept=".mp3,.wav" 
              onChange={handleMusicChange} 
              disabled={isUploading}
              style={{ 
                color: "#ffffff", 
                backgroundColor: "#222", 
                border: "1px solid #444", 
                padding: "8px", 
                borderRadius: "4px", 
                marginTop: "8px",
                opacity: isUploading ? 0.6 : 1,
                width: "100%"
              }} 
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#ffffff" }}><strong>Artwork (optional)</strong></label><br />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              disabled={isUploading}
              style={{ 
                color: "#ffffff", 
                backgroundColor: "#222", 
                border: "1px solid #444", 
                padding: "8px", 
                borderRadius: "4px", 
                marginTop: "8px",
                opacity: isUploading ? 0.6 : 1,
                width: "100%"
              }} 
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            )}
          </div>

          {/* Artist Agreement and Rights Confirmation */}
          <div style={{ 
            marginBottom: "20px", 
            padding: "15px", 
            backgroundColor: "#1a1a1a", 
            borderRadius: "6px", 
            border: "1px solid #333" 
          }}>
            <h4 style={{ color: "#007bff", marginTop: 0, marginBottom: "15px", fontSize: "16px" }}>
              Rights & Agreement Confirmation
            </h4>
            
            <label style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              marginBottom: "15px", 
              cursor: "pointer", 
              lineHeight: "1.4" 
            }}>
              <input
                type="checkbox"
                checked={confirmedOwnership}
                onChange={(e) => setConfirmedOwnership(e.target.checked)}
                disabled={isUploading}
                style={{ 
                  marginRight: "10px", 
                  marginTop: "2px",
                  opacity: isUploading ? 0.6 : 1
                }}
                required
              />
              <span style={{ fontSize: "14px" }}>
                <strong>I confirm that I own all rights to this content</strong> or have obtained all necessary permissions 
                from co-writers, performers, producers, and any other rights holders. I understand that uploading 
                copyrighted material without permission is illegal and may result in account termination.
              </span>
            </label>
            
            <label style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              cursor: "pointer", 
              lineHeight: "1.4" 
            }}>
              <input
                type="checkbox"
                checked={acceptedArtistAgreement}
                onChange={(e) => setAcceptedArtistAgreement(e.target.checked)}
                disabled={isUploading}
                style={{ 
                  marginRight: "10px", 
                  marginTop: "2px",
                  opacity: isUploading ? 0.6 : 1
                }}
                required
              />
              <span style={{ fontSize: "14px" }}>
                I have read and agree to the{" "}
                <a 
                  href="/artist-agreement" 
                  target="_blank" 
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Artist Agreement
                </a>
                {" "}and{" "}
                <a 
                  href="/revenue-policy" 
                  target="_blank" 
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  Revenue Share Policy
                </a>
                {" "}(95% artist, 5% platform). I understand that I indemnify Music Marketplace 
                against any copyright claims.
              </span>
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            style={{
              width: "100%",
              padding: "12px 20px",
              backgroundColor: isUploading ? "#666" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isUploading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {isUploading ? "Uploading..." : "Upload Track"}
          </button>

          {/* Upload Progress Bar */}
          {currentUploadProgress > 0 && (
            <div style={{
              width: "100%",
              background: "#333",
              height: "12px",
              borderRadius: "6px",
              marginTop: "15px",
              overflow: "hidden"
            }}>
              <div
                style={{
                  width: `${currentUploadProgress}%`,
                  background: "#4caf50",
                  height: "100%",
                  borderRadius: "6px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}

          {uploadStatus && (
            <p style={{ 
              marginTop: 15, 
              color: uploadStatus.includes("successfully") ? "#4caf50" : 
                     uploadStatus.includes("failed") ? "#f44336" : "#ffffff",
              textAlign: "center",
              fontSize: "14px"
            }}>
              {uploadStatus}
            </p>
          )}
        </div>

        {/* Uploaded Tracks List */}
        {uploadedTracks.length > 0 && (
          <div style={{ backgroundColor: "#111", padding: "20px", borderRadius: "8px" }}>
            <h3 style={{ color: "#ffffff", marginTop: 0 }}>
              Uploaded Tracks ({uploadedTracks.length})
            </h3>
            
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {uploadedTracks.map((track, index) => (
                <div key={track.id} style={{
                  backgroundColor: "#222",
                  padding: "15px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  border: "1px solid #333"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 8px 0", color: "#ffffff", fontSize: "16px" }}>
                        {track.title}
                        {track.explicit && <span style={{ color: "#ff6b6b", marginLeft: "8px", fontSize: "12px" }}>EXPLICIT</span>}
                      </h4>
                      <p style={{ margin: "0 0 4px 0", color: "#aaa", fontSize: "14px" }}>
                        by {track.artist}
                      </p>
                      {track.album && (
                        <p style={{ margin: "0 0 4px 0", color: "#999", fontSize: "13px" }}>
                          Album: {track.album}
                          {track.trackNumber && <span style={{ color: "#777" }}> • Track #{track.trackNumber}</span>}
                        </p>
                      )}
                      {!track.album && track.trackNumber && (
                        <p style={{ margin: "0 0 4px 0", color: "#999", fontSize: "13px" }}>
                          Track #{track.trackNumber}
                        </p>
                      )}
                      <p style={{ margin: "0 0 4px 0", color: "#888", fontSize: "12px" }}>
                        Genre: {track.genre}
                      </p>
                      <p style={{ margin: 0, color: "#666", fontSize: "11px" }}>
                        Uploaded: {track.uploadedAt}
                      </p>
                    </div>
                    <button
                      onClick={() => removeUploadedTrack(track.id)}
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "12px",
                        marginLeft: "10px"
                      }}
                      title="Remove from list"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              marginTop: "20px", 
              padding: "15px", 
              backgroundColor: "#0d6efd", 
              borderRadius: "6px",
              textAlign: "center"
            }}>
              <p style={{ margin: 0, color: "#ffffff", fontWeight: "bold" }}>
                {uploadedTracks.length} track{uploadedTracks.length !== 1 ? 's' : ''} uploaded successfully!
              </p>
              <p style={{ margin: "8px 0 0 0", color: "#e3f2fd", fontSize: "14px" }}>
                You can continue uploading more tracks or start a new session.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
