import { requireAdmin } from "../middleware/admin.middleware.js";
import { add, remove, findAll, findById } from "../repositories/events.repository.js";

export async function getAllEvents(req, res) {
  try {
    const events = await findAll();
    res.json(events) 
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "server error"})
  }
}

export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    if (Number.isInteger(Number(id)) && Number(id)>0){
        const event = await findById(id);
        if(!event){
      return res.status(404).json({ message: "no rows found" });
    }
        res.json(event)}
    else{
        res.status(400).json({message: "request error"})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "server error"})
  }
}
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: "Invalid event id." });
    }

    const deleted = await remove(id);
    if (!deleted) {
      return res.status(404).json({ message: "This event does not exist." });
    }

    res.sendStatus(204);
    } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message: "This event has comments, so it cannot be deleted.",
      });
    }
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
export async function createEvent(req, res) {
  try {
    const { titre, description, date_event, n_sale, category } = req.body ?? {};

    if (!titre || !description || !date_event || !n_sale) {
      return res.status(400).json({
        message: "Title, description, date and room are required.",
      });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date_event)) {
      return res.status(400).json({ message: "The date must look like 2026-12-31." });
    }

    const id = await add({
      titre: String(titre).trim(),
      description: String(description).trim(),
      date_event,
      n_sale: String(n_sale).trim(),
      category: category ? String(category).trim() : null,
    });

    const event = await findById(id);
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}