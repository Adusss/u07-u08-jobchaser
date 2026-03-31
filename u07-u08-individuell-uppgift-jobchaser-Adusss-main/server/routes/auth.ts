import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashed,
      })
      .returning();

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create user" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Could not login" });
  }
});
export default router;
