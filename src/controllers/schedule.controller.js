import scheduleService from "../services/schedule.service";

exports.getAll = async (req, res) => {
  try {
    const result = await scheduleService.getAll();
    res.status(200).json({
      errcode: 0,
      message: "Get all schedules success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get all schedules error",
      error: e,
    });
  }
};

exports.add = async (req, res) => {
  console.log(req.file);
  return 0;
  try {
    const { dateSchedule, timeStart, timeEnd, doctorId } = req.body;
    if (!dateSchedule || !timeStart || !timeEnd || !doctorId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.create(req.body);
    res.status(200).json({
      errcode: 0,
      message: "Schedule added successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Add schedule error",
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { dateSchedule, timeStart, timeEnd, doctorId } = req.params;
    const { timeStart: newTimeStart, timeEnd: newTimeEnd, doctorId: newDoctorId } = req.body;

    if (!dateSchedule || !timeStart || !timeEnd || !doctorId || !newTimeStart || !newTimeEnd || !newDoctorId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.update(dateSchedule, timeStart, timeEnd, doctorId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Schedule not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Schedule updated successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Update schedule error",
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { dateSchedule, timeStart, timeEnd, doctorId } = req.params;
    if (!dateSchedule || !timeStart || !timeEnd || !doctorId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.delete(dateSchedule, timeStart, timeEnd, doctorId);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Schedule not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Schedule deleted successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Delete schedule error",
      error: e,
    });
  }
};

exports.getByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.getByDoctorId(doctorId);
    res.status(200).json({
      errcode: 0,
      message: "Get schedules by doctorId success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get schedules by doctorId error",
      error: e,
    });
  }
};

exports.getByDate = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.getByDate(date);
    res.status(200).json({
      errcode: 0,
      message: "Get schedules by date success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get schedules by date error",
      error: e,
    });
  }
};

exports.getByWeek = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await scheduleService.getByWeek(date);
    res.status(200).json({
      errcode: 0,
      message: "Get schedules by week success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get schedules by week error",
      error: e,
    });
  }
};
