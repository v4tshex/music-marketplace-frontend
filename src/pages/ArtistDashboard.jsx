import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import MusicPlayer from "../components/MusicPlayer";

function ArtistDashboard() {
  const [mySongs, setMySongs] = useState([]);
  const [error, setError] = useState("");
  const [royalties, setRoyalties] = useState({});

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || !isMounted) return;

      try {
        const userId = user.uid;
        const response = await axios.get(`http://localhost:5000/api/my-songs/${userId}`);
        if (isMounted) {
          setMySongs(response.data);

          // Fetch royalties for each song
          const royaltyPromises = response.data.map((song) =>
            axios.post("http://localhost:5000/calculate-royalty", {
              songId: song.id,
              numberOfPlays: song.plays || 0,
            })
          );

          const royaltyResults = await Promise.all(royaltyPromises);
          const royaltyMap = {};
          royaltyResults.forEach((res) => {
            royaltyMap[res.data.songId] = res.data.totalRoyalties.toFixed(3);
          });

          setRoyalties(royaltyMap);
        }
      } catch (err) {
        console.error("Failed to fetch user songs:", err);
        if (isMounted) setError("Failed to load your uploaded songs.");
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleDelete = async (songId) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/songs/${songId}`);
      setMySongs((prev) => prev.filter((song) => song.id !== songId));

      // Also remove its royalty data
      setRoyalties((prev) => {
        const updated = { ...prev };
        delete updated[songId];
        return updated;
      });
    } catch (err) {
      console.error("Error deleting song:", err);
      alert("Failed to delete the song.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", backgroundColor: "#000000", color: "#ffffff", minHeight: "100vh" }}>
      <h2 style={{ color: "#ffffff" }}>Your Uploaded Songs</h2>
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

      {mySongs.length === 0 && !error && (
        <p style={{ fontStyle: "italic", color: "#aaa" }}>You haven't uploaded any songs yet.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {mySongs.map((song) => (
          <li
            key={song.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #333",
              borderRadius: "8px",
              gap: "15px",
              backgroundColor: "#111"
            }}
          >
            {song.imageUrl && (
              <img
                src={song.imageUrl}
                alt="Artwork"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <div style={{ color: "#ffffff" }}>
                <strong>{song.title}</strong>
                {song.explicit && <span style={{ color: "#ff6b6b", marginLeft: "8px", fontSize: "12px" }}>EXPLICIT</span>}
                <br />
                <span style={{ color: "#aaa" }}>by {song.artist}</span>
                {song.album && <span style={{ color: "#999" }}> • {song.album}</span>}
                {song.trackNumber && <span style={{ color: "#777" }}> • Track #{song.trackNumber}</span>}
                <br />
                <span style={{ color: "#888", fontSize: "14px" }}>[{song.genre}]</span>
              </div>
              <div style={{ marginTop: "5px" }}>
                {song.fileUrl ? (
                  <MusicPlayer
                    src={song.fileUrl}
                    title={song.title}
                    artist={song.artist}
                    id={song.id}
                  />
                ) : (
                  <p style={{ fontStyle: "italic", color: "#aaa" }}>
                    No audio available
                  </p>
                )}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "0.9em", color: "#ccc" }}>
                Plays: {song.plays || 0} | Estimated Royalties: £
                {royalties[song.id] || "0.000"}
              </p>
            </div>

            <div>
              <button
                onClick={() => handleDelete(song.id)}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistDashboard;
