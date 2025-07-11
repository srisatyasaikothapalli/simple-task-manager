import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import TaskList from "./TaskList";

function ProjectList({ userId }) {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "projects"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projList);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      await addDoc(collection(db, "projects"), {
        name: newProjectName,
        userId
      });
      setNewProjectName("");
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleUpdate = async (id) => {
    const projectRef = doc(db, "projects", id);
    await updateDoc(projectRef, { name: editName });
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="container">
      <h2>Your Projects</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
        />
        <button onClick={handleAddProject}>Add Project</button>
      </div>

      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: "30px" }}>
          {editingId === project.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => handleUpdate(project.id)}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ backgroundColor: "#888" }}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>{project.name}</h3>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button onClick={() => handleEdit(project.id, project.name)}>Edit</button>
                <button
                  onClick={() => handleDelete(project.id)}
                  style={{ backgroundColor: "#ff4d6d", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
          <TaskList projectId={project.id} />
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
