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

  