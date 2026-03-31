import { Router } from "express";
import { db } from "../db/db";
import { users, jobs } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch users" });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userJobs = await db.select().from(jobs).where(eq(jobs.userId, id));

    res.json({
      ...user,
      jobs: userJobs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch user" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password,
      })
      .returning();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create user" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete user" });
  }
});

export default router;
