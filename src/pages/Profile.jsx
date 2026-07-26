import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!currentUser) return;
      const snap = await getDoc(doc(db, "users", currentUser.uid));
      if (snap.exists()) {
        setName(snap.data().name || "");
        setAddress(snap.data().address || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [currentUser]);

  async function handleUpdate(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { name, address });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Delete your account? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="main-content">
      <h2>Your Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "limegreen" }}>Profile updated!</p>}

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={currentUser?.email || ""}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-cyber btn-cyber-primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <hr className="my-4" />
      <button className="btn btn-danger" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
