import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/enroll", async (req, res) => {
  try {
    const { name, email, descriptor, image } = req.body;

    const user = await User.create({
      name,
      email,
      descriptor,
      image
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { descriptor } = req.body;
    const users = await User.find();

    let matchedUser = null;

    for (const user of users) {
      const distance = euclideanDistance(
        descriptor,
        user.descriptor
      );

      if (distance < 0.5) {
        matchedUser = user;
        break;
      }
    }

    res.json({
      success: !!matchedUser,
      user: matchedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users", async (_, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function euclideanDistance(arr1, arr2) {
  return Math.sqrt(
    arr1.reduce(
      (sum, val, i) => sum + Math.pow(val - arr2[i], 2),
      0
    )
  );
}

export default router;