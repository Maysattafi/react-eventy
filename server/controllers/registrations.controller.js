import { findById } from "../repositories/events.repository.js";
import { create, findByEvent } from "../repositories/registrations.repository.js";

function isValidId(id) {
  const n = Number(id);
  return Number.isInteger(n) && n > 0;
}

export async function registerForEvent(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid event id." });
    }

    const event = await findById(id);
    if (!event) {
      return res.status(404).json({ message: "This event does not exist." });
    }

    const motivation = String(req.body?.motivation ?? "").trim();
    await create({ userId: req.user.id, eventId: Number(id), motivation });

    res.status(201).json({ message: "You are registered for this event." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "You are already registered for this event." });
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

export async function listRegistrations(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid event id." });
    }

    const event = await findById(id);
    if (!event) {
      return res.status(404).json({ message: "This event does not exist." });
    }

    const registrations = await findByEvent(id);
    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}