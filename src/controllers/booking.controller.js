import bookingService from "../services/booking.service";

exports.getAll = async (req, res) => {
  try {
    const result = await bookingService.getAll();
    res.status(200).json({
      errcode: 0,
      message: "Get all bookings success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get all bookings error",
      error: e,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const {
      dateBooking,
      timeStart,
      timeEnd,
      patientId,
      doctorId,
      timeBooking,
      status,
    } = req.body;
    if (
      !dateBooking ||
      !timeStart ||
      !timeEnd ||
      !patientId ||
      !doctorId ||
      !timeBooking ||
      !status === undefined
    ) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await bookingService.create(req.body);
    res.status(200).json({
      errcode: 0,
      message: "Booking added successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Add booking error",
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const {dateBooking, timeStart, timeEnd, patientId, doctorId, timeBooking, status } = req.body;
    if (
      !dateBooking ||
      !timeStart ||
      !timeEnd ||
      !patientId ||
      !doctorId ||
      !timeBooking ||
      status === undefined
    ) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await bookingService.update(dateBooking, timeStart, timeEnd, patientId, doctorId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Update booking error",
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { dateBooking, timeStart, timeEnd, patientId, doctorId } = req.body;
    if (!dateBooking || !timeStart || !timeEnd || !patientId || !doctorId) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await bookingService.delete(
      dateBooking,
      timeStart,
      timeEnd,
      patientId,
      doctorId
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Booking deleted successfully",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Delete booking error",
      error: e,
    });
  }
};
