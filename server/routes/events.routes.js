import { Router } from "express";
import { getAllEvents, getEventById, deleteEvent, createEvent } from "../controllers/events.controller.js";
import { registerForEvent, listRegistrations } from "../controllers/registrations.controller.js";
import { addComment, listComments } from "../controllers/comments.controller.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", requireAuth, requireAdmin, createEvent);
router.delete("/:id", requireAuth, requireAdmin, deleteEvent);
router.post("/:id/registrations", requireAuth, registerForEvent);
router.get("/:id/registrations", requireAuth, requireAdmin, listRegistrations);
router.get("/:id/comments", listComments);
router.post("/:id/comments", requireAuth, addComment);

export default router;