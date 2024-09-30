import bookingService from "../services/booking.service";
import scheduleService from "../services/schedule.service";
import ApiError from "../../api-error";

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
      message: "Get all bookings fail",
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
      timeBooking
    } = req.body;
    if (
      !dateBooking ||
      !timeStart ||
      !timeEnd ||
      !patientId ||
      !doctorId ||
      !timeBooking 
    ) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }

    try {
      const schedule = await scheduleService.getByDoctorIdDate(doctorId, dateBooking);
      if (timeBooking >= schedule[0].timestart && timeBooking <= schedule[0].timeend) {
        const result = await bookingService.create(req.body);
        res.status(200).json({
          errcode: 0,
          message: "Booking added successfully",
          data: result,
        });
      } else {
         res.status(400).json({
           errcode: 1,
           message: "Add booking error",
         });
      }
    } catch (error) {
      res.status(404).json({
        errcode: 1,
        message: "Can not found schedule",
        error: e,
      });
    }
    
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
      status === undefined
    ) {
      return res.status(400).json({
        errcode: 1,
        message: "Required fields missing",
      });
    }
    const result = await bookingService.update(
      dateBooking,
      timeStart,
      timeEnd,
      patientId,
      doctorId,
      req.body
    );
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

exports.cancelBooking = async (req, res, next) => {
  const { dateBooking, timeStart, timeEnd, patientId, doctorId} =
    req.body;
  if ((!dateBooking, timeStart, timeEnd, patientId, doctorId)) {
    return next(new ApiError(500, "Not enough field require"));
  }

  try {
    const result = bookingService.cancelBooking(req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Cancel booking successfully",
    });
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Can not cancel booking",
    });
  }
};

exports.getBookingCompleted = async (req, res, next) => {
  try {
    const result = await bookingService.getBookingCompleted();
    res.status(200).json({
      errcode: 0,
      message: "Get bookings completed success",
      data: result,
    });
  } catch (error) {
    res.status.json({
      errcode: 1,
      message: "Get bookings completed fail",
    });
  }
};

exports.getBookingCancel = async (req, res, next) => {
  try {
    const result = await bookingService.getBookingCancel();
    res.status(200).json({
      errcode: 0,
      message: "Get bookings cancel success",
      data: result,
    });
  } catch (error) {
    res.status.json({
      errcode: 1,
      message: "Get bookings cancel fail",
    });
  }
};

exports.getBookingWait = async (req, res, next) => {
  try {
    const result = await bookingService.getBookingWait();
    res.status(200).json({
      errcode: 0,
      message: "Get bookings wait success",
      data: result,
    });
  } catch (error) {
    res.status.json({
      errcode: 1,
      message: "Get bookings wait fail",
    });
  }
};

exports.getBookingComingSoon = async (req, res, next) => {
  try {
    const result = await bookingService.getBookingComingSoon();
    res.status(200).json({
      errcode: 0,
      message: "Get bookings coming soon success",
      data: result,
    });
  } catch (error) {
    res.status.json({
      errcode: 1,
      message: "Get bookings coming soon fail",
    });
  }
};

exports.updateStatus = async (req, res, next) => {
  const { dateBooking, timeStart, timeEnd, patientId, doctorId, status } =
    req.body;
  if ((!dateBooking, timeStart, timeEnd, patientId, doctorId, status)) {
    return next(new ApiError(500, "Not enough field require"));
  }

  try {
    const result = bookingService.updateStatus(req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        errcode: 1,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      errcode: 0,
      message: "Update status booking successfully",
    });
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Update status booking fail",
    });
  }
};

exports.getByDate = async (req, res, next) => {
  const {date} = req.params;
  if(!date){
    res.status(500).json({
      errcode: 1,
      message: "Not enough field require"
    });
  }

  try {
    const result = await bookingService.getByDate(date);

    if(result.lenght != 0){
      res.status(200).json({
        errcode: 0,
        message: "Get booking by date success",
        data: result
      })
    }else{
      res.status(404).json({
        errcode: 1,
        message: "Not found booking"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Get Booking by date error"
    });
  }
};

exports.getByMedicalSpecialty = async (req, res, next) => {
  const {idMedicalSpecialty} = req.params;
  if(!idMedicalSpecialty){
    res.status(400).json({
      errcode: 1,
      message: "Not enough field require"
    });
  }

  try {
    const result = await bookingService.getByMedicalSpecialty(idMedicalSpecialty);

    if(result.lenght != 0){
      res.status(200).json({
        errcode: 0,
        message: "Get booking by medical specialty success",
        data: result
      })
    }else{
      res.status(404).json({
        errcode: 1,
        message: "Not found booking"
      })
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Get booking by medical specialty error"
    });
  }
};

exports.getByTime = async (req, res, next) => {
  const {date, timeStart,timeEnd} = req.params;
  if(!date, !timeStart, !timeEnd){
    res.status(400).json({
      errcode: 1,
      message: "Not enough field require"
    });
  }

  try {
    const result = await bookingService.getByTime(date, timeStart,timeEnd);

    if(result.lenght != 0){
      res.status(200).json({
        errcode: 0,
        message: "Get booking by time success",
        data: result
      })
    }else{
      res.status(404).json({
        errcode: 1,
        message: "Not found booking"
      })
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Get booking by time error"
    });
  }
};

exports.getDetail = async (req, res, next) => {
  const { dateBooking, timeStart, timeEnd, doctorId, patientId } = req.body;
  if (!dateBooking || !timeStart || !timeEnd || !doctorId || !patientId) {
    res.status(400).json({
      errcode: 1,
      message: "Not enough require field",
    });
  }

  try {
    const result = await bookingService.getDetail(dateBooking, timeStart, timeEnd, doctorId, patientId);

    res.status(200).json({
      errcode: 0,
      message: "Get detail schedules success",
      data: result
    });

  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Get detail schedules error",
      error: error,
    });
  }
};

