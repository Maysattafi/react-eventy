import { findAll, findById } from "../repositories/events.repository.js";

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