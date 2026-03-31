import { useState } from "react";
import { authFetch } from "../../api";
import "../../css/AddJob.css";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await authFetch("/jobs", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        console.error("Error to add Job", res.status);
        return;
      }

      setDescription("");
      setTitle("");
      if (res.ok) setMessage("Added Job!");
      else setMessage("Error");
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <form className="add-job-form" onSubmit={submit}>
      <h1 className="add-job-title">Add Job</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Add Job</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
