const eventService = require("../services/eventsService");

let getAllEvents = async (req, res) => {
  try {
    const { description, data, ra_teacher } = req.query;
    const events = await eventService.getAllEvents(
      description,
      data,
      ra_teacher
    );
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let getEventByRaTeacher = async (req, res) => {
  const { ra_teacher } = req.params;
  try {
    const event = await eventService.getEventByRaTeacher(ra_teacher);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let createEvent = async (req, res) => {
  const { description, data, ra_teacher } = req.body;
  try {
    const createdEvent = await eventService.createEvent(
      description,
      data,
      ra_teacher
    );
    res
      .status(201)
      .json({ message: "Event created successfully", id: createdEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateEvent = async (req, res) => {
  const { ra_teacher } = req.params;
  const { description, data } = req.body;
  try {
    const updated = await eventService.updateEvent(
      ra_teacher,
      description,
      data
    );
    if (updated) {
      res.json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteEvent = async (req, res) => {
  const { ra_teacher } = req.params;
  try {
    const deleted = await eventService.deleteEvent(ra_teacher);
    if (deleted) {
      res.json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let updateEventById = async (req, res) => {
  const { ID } = req.params;
  const { description, data } = req.body;
  try {
    const updated = await eventService.updateEventById(
      ID,
      description,
      data
    );
    if (updated) {
      res.json({ message: "Event updated successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let deleteEventById = async (req, res) => {
  const { ID } = req.params;
  try {
    const deleted = await eventService.deleteEventById(ID);
    if (deleted) {
      res.json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllEvents: getAllEvents,
  getEventByRaTeacher: getEventByRaTeacher,
  createEvent: createEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  updateEventById,
  deleteEventById
};
