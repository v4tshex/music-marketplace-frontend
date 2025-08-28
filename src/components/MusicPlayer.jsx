// simple audio player with play tracking
import React from "react";

// music player component
function MusicPlayer({ src, title = "", artist = "", id = "" }) {
  // notify backend that track started playing
  const handlePlay = async () => {
    if (id) {
      try {
        await fetch(`http://localhost:5000/api/songs/${id}/play`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to increment play count:", error);
      }
    }
  };

  return (
    <div style={{ margin: "1em 0" }}>
      {title && <h4>{title}</h4>}
      {artist && <p>by {artist}</p>}
      <audio controls src={src} style={{ width: "100%" }} onPlay={handlePlay}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default MusicPlayer;
