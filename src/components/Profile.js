import React from "react";

function Profile({ user }) {
  return (
    <div className="profile-card">
      <h2>👤 User Profile</h2>
      {user.photoURL && (
        <img src={user.photoURL} alt="Profile" />
      )}
      <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
      <p><strong>Account Created:</strong> {user.metadata?.creationTime || "N/A"}</p>
      <p><strong>Last Sign-in:</strong> {user.metadata?.lastSignInTime || "N/A"}</p>
    </div>
  );
}

export default Profile;
