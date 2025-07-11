import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase";

function ProjectHistory({ userId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "projects"), where("userId", "==", userId));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(list);
    });
    return () => unsub();
  }, [userId]);

  return (
    <div>
      <h2>📚 Project History</h2>
      {projects.length === 0 ? (
        <p>No past projects found.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>
              <span style={{ marginLeft: "10px", color: "gray" }}>
                (ID: {p.id})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectHistory;
