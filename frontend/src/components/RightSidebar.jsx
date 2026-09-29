import React from 'react';

export default function RightSidebar({ activeFriend }) {
  return (
    <div className="right-sidebar">
      <h3>Shared files</h3>
      <div className="meta-card">
        <div className="avatar">{activeFriend.name.substring(0,2)}</div>
        <h4>Context Assets</h4>
      </div>
      <div className="file-type">
        <h4>File type</h4>
        <div className="file-item">Documents: 126 files</div>
        <div className="file-item">Photos: 53 files</div>
        <div className="file-item">Movies: 3 files</div>
      </div>
    </div>
  );
}