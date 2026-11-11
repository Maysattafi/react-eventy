import { findById } from "../repositories/events.repository.js";
import { create, findByEvent } from "../repositories/comments.repository.js";

function isValidId(id) {
  const n = Number(id);
  return Number.isInteger(n) && n > 0;
}

export async function addComment(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid event id." });
    }

    const event = await findById(id);
    if (!event) {
      return res.status(404).json({ message: "This event does not exist." });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (String(event.date_event).slice(0, 10) >= today) {
      return res.status(409).json({
        message: "Comments open after the event has taken place.",
      });
    }

    const comment = String(req.body?.comment ?? "").trim();
    const rating = Number(req.body?.rating);

    if (!comment || comment.length > 1000) {
      return res.status(400).json({
        message: "The comment is required and must be at most 1000 characters.",
      });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "The rating must be a whole number from 1 to 5." });
    }

    await create({ eventId: Number(id), userId: req.user.id, comment, rating });
    res.status(201).json({ message: "Thank you for your feedback." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

export async function listComments(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid event id." });
    }

    const event = await findById(id);
    if (!event) {
      return res.status(404).json({ message: "This event does not exist." });
    }

    const comments = await findByEvent(id);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}