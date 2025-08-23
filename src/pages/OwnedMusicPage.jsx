import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserPurchases } from "../api/api";

function OwnedMusicPage() {
  const [purchases, setPurchases] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          setLoading(true);
          const response = await getUserPurchases(user.uid);
          setPurchases(response.data);
        } catch (err) {
          console.error("Failed to load purchases:", err);
          setError("Failed to load your purchased music. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setPurchases([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDownload = (song) => {
    if (song.fileUrl) {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = song.fileUrl;
      link.download = `${song.title} - ${song.artist}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!currentUser) {
    return (
      <div style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "center"
      }}>
        <h2>Please log in to view your purchased music</h2>
        <p style={{ color: "#ccc" }}>
          You need to be logged in to access your music library.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1200,
      margin: "40px auto",
      padding: "0 20px",
      backgroundColor: "#000000",
      color: "#ffffff"
    }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>My Music Library</h1>
        <p style={{ color: "#ccc", fontSize: "16px" }}>
          Your purchased tracks are available for download below
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#ffffff" }}>Loading your music library...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#ff6b6b" }}>{error}</p>
        </div>
      )}

      {!loading && !error && purchases.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{
            backgroundColor: "#111",
            borderRadius: "12px",
            padding: "40px",
            border: "1px dashed #333"
          }}>
            <h3 style={{ color: "#aaa", marginBottom: "15px" }}>No music in your library yet</h3>
            <p style={{ color: "#777", marginBottom: "20px" }}>
              Browse the music catalogue to purchase and download tracks
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold"
              }}
            >
              Browse Music Catalogue
            </a>
          </div>
        </div>
      )}

      {!loading && !error && purchases.length > 0 && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ color: "#ccc" }}>
              You own {purchases.length} track{purchases.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px"
          }}>
            {purchases.map((purchase) => {
              const song = purchase.song;
              const purchaseDate = new Date(purchase.purchasedAt).toLocaleDateString();

              return (
                <div
                  key={purchase.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    backgroundColor: "#111",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                  }}
                >
                  {/* Album Art */}
                  <div style={{
                    marginBottom: "15px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    {song.imageUrl ? (
                      <img
                        src={song.imageUrl}
                        alt="Album Art"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#333",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#aaa",
                        fontSize: "14px",
                        textAlign: "center"
                      }}>
                        No Art
                      </div>
                    )}
                  </div>

                  {/* Song Information */}
                  <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <h3 style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      color: "#ffffff"
                    }}>
                      {song.title}
                    </h3>
                    <p style={{
                      margin: "4px 0",
                      color: "#ccc",
                      fontSize: "14px"
                    }}>
                      by {song.artist}
                    </p>
                    {song.genre && (
                      <p style={{
                        margin: "4px 0",
                        color: "#aaa",
                        fontSize: "12px"
                      }}>
                        {song.genre}
                      </p>
                    )}
                    <p style={{
                      margin: "8px 0 0 0",
                      color: "#777",
                      fontSize: "11px"
                    }}>
                      Purchased on {purchaseDate}
                    </p>
                  </div>

                  {/* Audio Player */}
                  {song.fileUrl && (
                    <div style={{ marginBottom: "15px" }}>
                      <audio controls style={{ width: "100%" }}>
                        <source src={song.fileUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {/* Download Button */}
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDownload(song)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "background-color 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#218838";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                      }}
                    >
                      Download
                    </button>
                  </div>

                  {/* Play count if available */}
                  {song.plays > 0 && (
                    <div style={{
                      marginTop: "10px",
                      textAlign: "center",
                      fontSize: "11px",
                      color: "#666"
                    }}>
                      {song.plays} play{song.plays !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default OwnedMusicPage;
