import { Router } from "express";
import { db } from "../db/db";
import { jobs } from "../db/schema";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { eq, and, like } from "drizzle-orm";

const router = Router();

router.get("/search", authMiddleware, async (req: AuthRequest, res) => {
  const query = String(req.query.title || "");
  const userId = req.user!.id;

  try {
    const results = await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.userId, userId), like(jobs.title, `%${query}%`)));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not search jobs" });
  }
});

router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  try {
    const allJobs = await db.select().from(jobs).where(eq(jobs.userId, userId));
    res.json(allJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch jobs" });
  }
});

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { title, description } = req.body;
  const userId = req.user!.id;

  try {
    const [job] = await db.insert(jobs).values({ title, description, userId }).returning();

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create job" });
  }
});

router.put("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const { title, description } = req.body;
  const jobId = Number(req.params.id);
  const userId = req.user!.id;

  try {
    const [updated] = await db
      .update(jobs)
      .set({ title, description })
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
      .returning();

    if (!updated) return res.status(404).json({ error: "Job not found or not yours" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update job" });
  }
});

router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const jobId = Number(req.params.id);
  const userId = req.user!.id;

  const [job] = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)));

  if (!job) return res.status(404).json({ error: "Job not found" });

  res.json(job);
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const jobId = Number(req.params.id);
  const userId = req.user!.id;

  try {
    const [deleted] = await db
      .delete(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
      .returning();

    if (!deleted) return res.status(404).json({ error: "Job not found or not yours" });
    res.json({ message: "Job deleted", job: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete job" });
  }
});

router.patch("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const jobId = Number(req.params.id);
  const userId = req.user!.id;

  const { title, description } = req.body;
  if (!title && !description) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const [updated] = await db
      .update(jobs)
      .set({ ...(title && { title }), ...(description && { description }) })
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
      .returning();

    if (!updated) return res.status(404).json({ error: "Job not found or not yours" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update job" });
  }
});
export default router;
