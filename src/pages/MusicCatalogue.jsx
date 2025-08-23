import React, { useEffect, useState } from "react";
import axios from "axios";
import { searchSongs, searchArtists, getArtistSongs, getUserSongs, purchaseSong } from "../api/api";
import MusicPlayer from "../components/MusicPlayer";
import PaymentModal from "../components/PaymentModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function MusicCatalogue() {
  const [songs, setSongs] = useState([]);
  const [userSongs, setUserSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [purchasedSongIds, setPurchasedSongIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("songs"); // "songs", "user-songs", "artists", or "artist-songs"
  
  // Payment modal state
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    song: null,
    songType: 'spotify' // 'spotify' or 'user'
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Changed to 12 for better grid layout
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch songs with search and pagination
  const fetchSongs = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const res = await searchSongs(search, page, itemsPerPage);
      setSongs(res.data.songs);
      setTotalItems(res.data.pagination.totalItems);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);
    } catch (err) {
      setError("Failed to load songs");
      console.error("Error fetching songs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch artists with search and pagination
  const fetchArtists = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const res = await searchArtists(search, page, itemsPerPage);
      setArtists(res.data.artists);
      setTotalItems(res.data.pagination.totalItems);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);
    } catch (err) {
      setError("Failed to load artists");
      console.error("Error fetching artists:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch songs by a specific artist
  const fetchArtistSongs = async (artistId, page = 1) => {
    setLoading(true);
    try {
      const res = await getArtistSongs(artistId, page, itemsPerPage);
      setArtistSongs(res.data.songs);
      setSelectedArtist(res.data.artist);
      setTotalItems(res.data.pagination.totalItems);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.currentPage);
    } catch (err) {
      setError("Failed to load artist songs");
      console.error("Error fetching artist songs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user-uploaded songs
  const fetchUserSongs = async () => {
    setLoading(true);
    try {
      const res = await getUserSongs();
      setUserSongs(res.data);
      setTotalItems(res.data.length);
      setTotalPages(1); // No pagination for user songs for now
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to load user songs");
      console.error("Error fetching user songs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Unified fetch function that handles songs, artists, and artist songs
  const fetchData = async (search = "", page = 1) => {
    if (viewMode === "songs") {
      await fetchSongs(search, page);
    } else if (viewMode === "user-songs") {
      await fetchUserSongs();
    } else if (viewMode === "artists") {
      await fetchArtists(search, page);
    } else if (viewMode === "artist-songs" && selectedArtist) {
      await fetchArtistSongs(selectedArtist.id, page);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchData(searchTerm, 1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, viewMode]);

  // Handle view mode change
  const handleViewModeChange = (newMode) => {
    setViewMode(newMode);
    setCurrentPage(1);
    setError("");
    setSearchTerm(""); // Clear search when switching modes
  };

  // Handle artist click to view their songs
  const handleArtistClick = async (artist) => {
    setSelectedArtist(artist);
    setViewMode("artist-songs");
    setCurrentPage(1);
    setError("");
    setSearchTerm(""); // Clear search when viewing artist songs
    await fetchArtistSongs(artist.id, 1);
  };

  // Handle back to artists list
  const handleBackToArtists = () => {
    setViewMode("artists");
    setSelectedArtist(null);
    setArtistSongs([]);
    setCurrentPage(1);
    setError("");
    fetchData("", 1); // Reload artists list
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(searchTerm, pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const purchasesRes = await axios.get(
            `http://localhost:5000/api/purchases/${user.uid}`
          );
          const ids = purchasesRes.data.map((p) => p.songId);
          setPurchasedSongIds(ids);
        } catch (err) {
          console.error("Failed to load purchases", err);
        }
      }
    });

    // Initial load
    fetchData("", 1);

    return () => unsubscribe();
  }, []);

  const handlePurchase = (song, songType = 'spotify') => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to purchase songs.");
      return;
    }

    // Open payment modal
    setPaymentModal({
      isOpen: true,
      song: song,
      songType: songType
    });
  };

  const handlePaymentSuccess = async (paymentData) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !paymentModal.song) {
      return;
    }

    try {
      const response = await purchaseSong(user.uid, paymentModal.song.id, paymentData);
      const songTitle = paymentModal.songType === 'user' ? paymentModal.song.title : paymentModal.song.name;
      
      alert(`Payment successful! You have purchased "${songTitle}" for £${response.data.price}. This is a dummy transaction for university project purposes.`);
      setPurchasedSongIds((prev) => [...prev, paymentModal.song.id]);
      
      // Log purchase details to console for demonstration
      console.log('Purchase completed:', {
        song: songTitle,
        price: `£${response.data.price}`,
        paymentId: paymentData.paymentId,
        timestamp: paymentData.timestamp
      });
      
    } catch (err) {
      console.error("Purchase failed:", err);
      if (err.response?.status === 409) {
        alert("You have already purchased this song.");
      } else {
        alert("Something went wrong with the purchase. Please try again.");
      }
    }
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      song: null,
      songType: 'spotify'
    });
  };

  // Helper function to get artist names
  const getArtistNames = (trackArtists) => {
    if (!trackArtists || trackArtists.length === 0) return "Unknown Artist";
    return trackArtists.map(ta => ta.artist?.name).filter(Boolean).join(", ");
  };

  // Helper function to get album name
  const getAlbumName = (album) => {
    return album?.name || "Unknown Album";
  };

  // Helper function to get album artwork
  const getAlbumArtwork = (album) => {
    if (!album?.media || album.media.length === 0) {
      console.log('No media found for album:', album?.name);
      return null;
    }
    
    console.log('Album media types:', album.media.map(m => ({ type: m.type, url: m.blob_url })));
    
    // Try to find album artwork from various possible type values
    const albumArt = album.media.find(m => 
      ['album_art', 'cover', 'artwork', 'image', 'album_cover'].includes(m.type)
    );
    
    if (albumArt) {
      console.log('Found album art:', albumArt);
      return albumArt.blob_url;
    }
    
    // If no specific type found, try to use the first media item
    console.log('Using first media item as fallback:', album.media[0]);
    return album.media[0]?.blob_url || null;
  };

  // Debug function to log song data
  const debugSongData = (song) => {
    console.log('=== Song Debug Info ===');
    console.log('Song:', song.name);
    console.log('Album:', song.album?.name);
    console.log('Album ID:', song.album?.id);
    console.log('Album Media:', song.album?.media);
    console.log('Track Artists:', song.track_artists);
    console.log('========================');
  };

  // Helper function to get artist artwork
  const getArtistArtwork = (artist) => {
    // Try to get artwork from their albums or tracks
    const albumArt = artist.album_artists?.[0]?.album?.media?.[0]?.blob_url;
    const trackArt = artist.track_artists?.[0]?.track?.album?.media?.[0]?.blob_url;
    return albumArt || trackArt || null;
  };

  // Helper function to get artist stats
  const getArtistStats = (artist) => {
    const trackCount = artist._count?.track_artists || 0;
    const albumCount = artist._count?.album_artists || 0;
    return { trackCount, albumCount };
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        gap: "10px"
      }}>
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              padding: "8px 16px",
              border: "1px solid #444",
              background: "#222",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#ffffff"
            }}
          >
            Previous
          </button>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            style={{
              padding: "8px 16px",
              border: "1px solid #444",
              background: currentPage === number ? "#007bff" : "#222",
              color: "#ffffff",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {number}
          </button>
        ))}
        
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              padding: "8px 16px",
              border: "1px solid #444",
              background: "#222",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#ffffff"
            }}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 20px", backgroundColor: "#000000", color: "#ffffff" }}>
      {/* Navigation */}
      {viewMode === "artist-songs" ? (
        // Back button for artist songs view
        <div style={{ 
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px"
        }}>
          <button
            onClick={handleBackToArtists}
            style={{
              padding: "10px 20px",
              border: "2px solid #444",
              borderRadius: "25px",
              background: "#111",
              color: "#ffffff",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            ← Back to Artists
          </button>
          <div style={{ color: "#ccc", fontSize: "16px" }}>
            Viewing songs by <strong style={{ color: "#ffffff" }}>{selectedArtist?.name}</strong>
          </div>
        </div>
      ) : (
        // Toggle buttons for main views
        <div style={{ 
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}>
          <button
            onClick={() => handleViewModeChange("songs")}
            style={{
              padding: "12px 24px",
              border: "2px solid #444",
              borderRadius: "25px",
              background: viewMode === "songs" ? "#007bff" : "#111",
              color: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: viewMode === "songs" ? "bold" : "normal"
            }}
          >
            Catalogue
          </button>
          <button
            onClick={() => handleViewModeChange("user-songs")}
            style={{
              padding: "12px 24px",
              border: "2px solid #444",
              borderRadius: "25px",
              background: viewMode === "user-songs" ? "#007bff" : "#111",
              color: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: viewMode === "user-songs" ? "bold" : "normal"
            }}
          >
            User Songs
          </button>
          <button
            onClick={() => handleViewModeChange("artists")}
            style={{
              padding: "12px 24px",
              border: "2px solid #444",
              borderRadius: "25px",
              background: viewMode === "artists" ? "#007bff" : "#111",
              color: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontWeight: viewMode === "artists" ? "bold" : "normal"
            }}
          >
            Artists
          </button>
        </div>
      )}

      {/* Search Bar - Hidden in artist-songs and user-songs mode */}
      {viewMode !== "artist-songs" && viewMode !== "user-songs" && (
        <div style={{ 
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "500px"
          }}>
            <input
              type="text"
              placeholder={viewMode === "songs" ? "Search songs by title, album, or artist..." : "Search artists by name..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: "16px",
                border: "2px solid #444",
                borderRadius: "25px",
                outline: "none",
                transition: "border-color 0.3s ease",
                backgroundColor: "#111",
                color: "#ffffff"
              }}
              onFocus={(e) => e.target.style.borderColor = "#007bff"}
              onBlur={(e) => e.target.style.borderColor = "#444"}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#ccc",
                  padding: "5px"
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      <div>
        <h2>
          {viewMode === "songs" && "Music Catalogue"}
          {viewMode === "user-songs" && "User Uploaded Songs"}
          {viewMode === "artists" && "Artists"}
          {viewMode === "artist-songs" && `${selectedArtist?.name} - Songs`}
          {searchTerm && ` (${totalItems} found)`}
          {!searchTerm && viewMode !== "artist-songs" && viewMode !== "user-songs" && ` (${totalItems} total ${viewMode})`}
          {!searchTerm && viewMode === "user-songs" && ` (${totalItems} available for purchase)`}
          {!searchTerm && viewMode === "artist-songs" && ` (${totalItems} songs)`}
        </h2>
        
        {loading && <p style={{ color: "#ffffff" }}>Loading...</p>}
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

        {!loading && viewMode === "songs" && songs.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            {searchTerm ? "No songs found matching your search." : "No songs available."}
          </p>
        )}

        {!loading && viewMode === "artists" && artists.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            {searchTerm ? "No artists found matching your search." : "No artists available."}
          </p>
        )}

        {!loading && viewMode === "user-songs" && userSongs.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            No user-uploaded songs available for purchase.
          </p>
        )}

        {!loading && viewMode === "artist-songs" && artistSongs.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>
            No songs found for this artist.
          </p>
        )}

        {/* Songs Grid View */}
        {!loading && viewMode === "songs" && songs.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {songs.map((song) => {
                // Debug logging for each song
                debugSongData(song);
                
                return (
                  <div
                    key={song.id}
                    style={{
                      padding: "20px",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      backgroundColor: "#111",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px)";
                      e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
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
                      {(() => {
                        const artworkUrl = getAlbumArtwork(song.album);
                        
                        if (artworkUrl) {
                          return (
                            <img
                              src={artworkUrl}
                              alt="Album Art"
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                              }}
                              onError={(e) => {
                                console.error('Failed to load image:', artworkUrl);
                                e.target.style.display = 'none';
                              }}
                            />
                          );
                        } else {
                          return (
                            <div style={{
                              width: "200px",
                              height: "200px",
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
                          );
                        }
                      })()}
                    </div>

                    {/* Song Information */}
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#ffffff", textAlign: "center" }}>
                        {song.name}
                      </h3>
                      <p style={{ margin: "4px 0", color: "#ccc", fontSize: "14px", textAlign: "center" }}>
                        {getArtistNames(song.track_artists)}
                      </p>
                      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "13px", textAlign: "center" }}>
                        {getAlbumName(song.album)}
                      </p>
                      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px", textAlign: "center" }}>
                        Track {song.track_number} • {Math.round(song.duration_ms / 1000)}s
                      </p>
                      {song.explicit && (
                        <div style={{ textAlign: "center", marginTop: "5px" }}>
                          <span style={{
                            backgroundColor: "#ff4444",
                            color: "white",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "10px"
                          }}>
                            Explicit
                          </span>
                        </div>
                      )}

                      {/* Spotify Preview */}
                      {song.preview_url ? (
                        <div style={{ marginTop: "15px" }}>
                          <audio controls style={{ width: "100%" }}>
                            <source src={song.preview_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : (
                        <p style={{ fontStyle: "italic", color: "#aaa", marginTop: "15px", fontSize: "12px", textAlign: "center" }}>
                          No preview available
                        </p>
                      )}

                      {/* Spotify Link */}
                      {song.spotify_url && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <a
                            href={song.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "6px 12px",
                              backgroundColor: "#1DB954",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "15px",
                              fontSize: "12px",
                              fontWeight: "bold"
                            }}
                          >
                            Spotify
                          </a>
                        </div>
                      )}

                      {/* Purchase Button (if applicable) */}
                      {currentUser && !purchasedSongIds.includes(song.id) && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <button
                            onClick={() => handlePurchase(song, 'spotify')}
                            style={{
                              padding: "6px 12px",
                              background: "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Purchase £0.99
                          </button>
                        </div>
                      )}

                      {/* Download/Purchased Status for Spotify Songs */}
                      {currentUser && purchasedSongIds.includes(song.id) && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          {song.preview_url ? (
                            <a
                              href={song.preview_url}
                              download
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                textDecoration: "none",
                                padding: "6px 12px",
                                border: "1px solid green",
                                borderRadius: "4px",
                                fontSize: "12px"
                              }}
                            >
                              Download Preview
                            </a>
                          ) : (
                            <div style={{
                              color: "green",
                              fontWeight: "bold",
                              padding: "6px 12px",
                              border: "1px solid green",
                              borderRadius: "4px",
                              fontSize: "12px",
                              display: "inline-block"
                            }}>
                              Purchased
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination />
          </>
        )}

        {/* Artists Grid View */}
        {!loading && viewMode === "artists" && artists.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {artists.map((artist) => {
                const { trackCount, albumCount } = getArtistStats(artist);
                const artworkUrl = getArtistArtwork(artist);
                
                return (
                  <div
                    key={artist.id}
                    onClick={() => handleArtistClick(artist)}
                    style={{
                      padding: "20px",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      backgroundColor: "#111",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px)";
                      e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                    }}
                  >
                    {/* Artist Image */}
                    <div style={{ marginBottom: "15px", textAlign: "center" }}>
                      {artworkUrl ? (
                        <img
                          src={artworkUrl}
                          alt="Artist"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            margin: "0 auto"
                          }}
                          onError={(e) => {
                            console.error('Failed to load image:', artworkUrl);
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "120px",
                          height: "120px",
                          backgroundColor: "#333",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#aaa",
                          fontSize: "16px",
                          textAlign: "center",
                          margin: "0 auto"
                        }}>
                          Artist
                        </div>
                      )}
                    </div>

                    {/* Artist Information */}
                    <div style={{ textAlign: "center" }}>
                      <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#ffffff" }}>
                        {artist.name}
                      </h3>
                      <div style={{ color: "#ccc", fontSize: "14px", marginBottom: "15px" }}>
                        <p style={{ margin: "2px 0" }}>
                          {trackCount} track{trackCount !== 1 ? 's' : ''}
                        </p>
                        <p style={{ margin: "2px 0" }}>
                          {albumCount} album{albumCount !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Spotify Link */}
                      {artist.spotify_url && (
                        <div style={{ marginTop: "15px" }}>
                          <a
                            href={artist.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "8px 16px",
                              backgroundColor: "#1DB954",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "20px",
                              fontSize: "14px",
                              fontWeight: "bold"
                            }}
                          >
                            View on Spotify
                          </a>
                        </div>
                      )}

                      {/* Recent Albums/Tracks preview */}
                      {(artist.album_artists?.length > 0 || artist.track_artists?.length > 0) && (
                        <div style={{ marginTop: "15px", fontSize: "12px", color: "#aaa" }}>
                          <p style={{ margin: "0", fontStyle: "italic" }}>
                            Recent work: {
                              artist.album_artists?.[0]?.album?.name || 
                              artist.track_artists?.[0]?.track?.name ||
                              "Available"
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination />
          </>
        )}

        {/* User Songs Grid View */}
        {!loading && viewMode === "user-songs" && userSongs.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {userSongs.map((song) => (
                <div
                  key={song.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    backgroundColor: "#111",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
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
                          width: "200px",
                          height: "200px",
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
                        width: "200px",
                        height: "200px",
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
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#ffffff", textAlign: "center" }}>
                      {song.title}
                      {song.explicit && <span style={{ color: "#ff6b6b", marginLeft: "8px", fontSize: "12px" }}>EXPLICIT</span>}
                    </h3>
                    <p style={{ margin: "4px 0", color: "#ccc", fontSize: "14px", textAlign: "center" }}>
                      by {song.artist}
                    </p>
                    {song.album && (
                      <p style={{ margin: "4px 0", color: "#bbb", fontSize: "13px", textAlign: "center" }}>
                        Album: {song.album}
                        {song.trackNumber && <span style={{ color: "#999" }}> • Track #{song.trackNumber}</span>}
                      </p>
                    )}
                    {!song.album && song.trackNumber && (
                      <p style={{ margin: "4px 0", color: "#bbb", fontSize: "13px", textAlign: "center" }}>
                        Track #{song.trackNumber}
                      </p>
                    )}
                    {song.genre && (
                      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "13px", textAlign: "center" }}>
                        Genre: {song.genre}
                      </p>
                    )}
                    <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px", textAlign: "center" }}>
                      Uploaded: {new Date(song.uploadedAt).toLocaleDateString()}
                    </p>
                    <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px", textAlign: "center" }}>
                      {song.plays} play{song.plays !== 1 ? 's' : ''}
                    </p>

                    {/* Audio Player */}
                    {song.fileUrl && (
                      <div style={{ marginTop: "15px" }}>
                        <audio controls style={{ width: "100%" }}>
                          <source src={song.fileUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}

                    {/* Purchase Button */}
                    {currentUser && !purchasedSongIds.includes(song.id) && (
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <button
                          onClick={() => handlePurchase(song, 'user')}
                          style={{
                            padding: "10px 20px",
                            background: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            transition: "background-color 0.2s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0056b3";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007bff";
                          }}
                        >
                          Purchase £0.99
                        </button>
                      </div>
                    )}

                    {/* Already Purchased */}
                    {currentUser && purchasedSongIds.includes(song.id) && (
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <div style={{
                          padding: "10px 20px",
                          backgroundColor: "#28a745",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "bold"
                        }}>
                          Purchased
                        </div>
                      </div>
                    )}

                    {/* Login prompt for non-authenticated users */}
                    {!currentUser && (
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>
                          Log in to purchase this song
                        </p>
                        <a
                          href="/login"
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            backgroundColor: "#444",
                            color: "#fff",
                            textDecoration: "none",
                            borderRadius: "4px",
                            fontSize: "12px"
                          }}
                        >
                          Login
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Artist Songs Grid View */}
        {!loading && viewMode === "artist-songs" && artistSongs.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {artistSongs.map((song) => {
                // Debug logging for each song
                debugSongData(song);
                
                return (
                  <div
                    key={song.id}
                    style={{
                      padding: "20px",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      backgroundColor: "#111",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px)";
                      e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
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
                      {(() => {
                        const artworkUrl = getAlbumArtwork(song.album);
                        
                        if (artworkUrl) {
                          return (
                            <img
                              src={artworkUrl}
                              alt="Album Art"
                              style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                              }}
                              onError={(e) => {
                                console.error('Failed to load image:', artworkUrl);
                                e.target.style.display = 'none';
                              }}
                            />
                          );
                        } else {
                          return (
                            <div style={{
                              width: "200px",
                              height: "200px",
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
                          );
                        }
                      })()}
                    </div>

                    {/* Song Information */}
                    <div>
                      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#ffffff", textAlign: "center" }}>
                        {song.name}
                      </h3>
                      <p style={{ margin: "4px 0", color: "#ccc", fontSize: "14px", textAlign: "center" }}>
                        {getArtistNames(song.track_artists)}
                      </p>
                      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "13px", textAlign: "center" }}>
                        {getAlbumName(song.album)}
                      </p>
                      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "12px", textAlign: "center" }}>
                        Track {song.track_number} • {Math.round(song.duration_ms / 1000)}s
                      </p>
                      {song.explicit && (
                        <div style={{ textAlign: "center", marginTop: "5px" }}>
                          <span style={{
                            backgroundColor: "#ff4444",
                            color: "white",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "10px"
                          }}>
                            Explicit
                          </span>
                        </div>
                      )}

                      {/* Spotify Preview */}
                      {song.preview_url ? (
                        <div style={{ marginTop: "15px" }}>
                          <audio controls style={{ width: "100%" }}>
                            <source src={song.preview_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : (
                        <p style={{ fontStyle: "italic", color: "#aaa", marginTop: "15px", fontSize: "12px", textAlign: "center" }}>
                          No preview available
                        </p>
                      )}

                      {/* Spotify Link */}
                      {song.spotify_url && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <a
                            href={song.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "6px 12px",
                              backgroundColor: "#1DB954",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "15px",
                              fontSize: "12px",
                              fontWeight: "bold"
                            }}
                          >
                            Spotify
                          </a>
                        </div>
                      )}

                      {/* Purchase Button (if applicable) */}
                      {currentUser && !purchasedSongIds.includes(song.id) && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <button
                            onClick={() => handlePurchase(song, 'spotify')}
                            style={{
                              padding: "6px 12px",
                              background: "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Purchase £0.99
                          </button>
                        </div>
                      )}

                      {/* Download/Purchased Status for Spotify Songs */}
                      {currentUser && purchasedSongIds.includes(song.id) && (
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          {song.preview_url ? (
                            <a
                              href={song.preview_url}
                              download
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                textDecoration: "none",
                                padding: "6px 12px",
                                border: "1px solid green",
                                borderRadius: "4px",
                                fontSize: "12px"
                              }}
                            >
                              Download Preview
                            </a>
                          ) : (
                            <div style={{
                              color: "green",
                              fontWeight: "bold",
                              padding: "6px 12px",
                              border: "1px solid green",
                              borderRadius: "4px",
                              fontSize: "12px",
                              display: "inline-block"
                            }}>
                              Purchased
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination />
          </>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        onPaymentSuccess={handlePaymentSuccess}
        song={paymentModal.song}
        songType={paymentModal.songType}
      />
    </div>
  );
}

export default MusicCatalogue;
