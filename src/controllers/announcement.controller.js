import announcementService from "../services/announcement.service";

exports.getAll = async (req, res) => {
  try {
    const result = await announcementService.getAll();
    res.status(200).json({
      errcode: 0,
      message: "Get all announcements success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get all announcements error",
      error: e,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        errcode: 1,
        message: "Required field",
      });
    }
    const result = await announcementService.getById(req.params.id);
    if (result.length === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Announcement not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Get announcement by ID success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get announcement error",
      error: e,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const { content, dateTime, header, status, userId } = req.body;
    if (!content || !dateTime || !header || !status || !userId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required field missing",
      });
    }
    const result = await announcementService.create(req.body);
    res.status(200).json({
      errcode: 0,
      message: "Announcement added successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Add announcement error",
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { content, dateTime, header, status, userId } = req.body;
    if (!req.params.id || !content || !dateTime || !header || !status || !userId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required field missing",
      });
    }
    const result = await announcementService.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Announcement not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Announcement updated successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Update announcement error",
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        errcode: 1,
        message: "Required field missing",
      });
    }
    const result = await announcementService.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Announcement not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Announcement deleted successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Delete announcement error",
      error: e,
    });
  }
};
