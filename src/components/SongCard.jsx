// components/SongCard.js
import React from "react";
import MusicPlayer from "./MusicPlayer";

function SongCard({ song }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
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
            marginRight: "15px",
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div>
          <strong>{song.title}</strong>
          {song.explicit && <span style={{ color: "#ff6b6b", marginLeft: "8px", fontSize: "12px" }}>EXPLICIT</span>}
        </div>
        <div style={{ color: "#666", fontSize: "14px", marginTop: "2px" }}>
          by {song.artist}
          {song.album && <span> • {song.album}</span>}
          {song.trackNumber && <span> • Track #{song.trackNumber}</span>}
        </div>
        <div style={{ color: "#888", fontSize: "13px" }}>[{song.genre}]</div>
        <div style={{ marginTop: "5px" }}>
          <MusicPlayer
            src={song.fileUrl}
            title={song.title}
            artist={song.artist}
            id={song.id}
          />
        </div>
      </div>
    </li>
  );
}

export default SongCard;
