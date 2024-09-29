import db from "../config/connectionDB";
import moment from "moment";

exports.getAll = async () => {
  const [rows, fields] = await db.execute(`SELECT * FROM booking`);
  const formattedRows = rows.map((item) => {
    return {
      ...item,
      DateBooking: moment(item.DateBooking).format("YYYY-MM-DD"),
    };
  });
  return rows;
};

exports.create = async (booking) => {
  const [result, fields] = await db.execute(
    `
        INSERT INTO booking (datebooking, timestart, timeend, patientid, doctorid, timebooking, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      booking.dateBooking,
      booking.timeStart,
      booking.timeEnd,
      booking.patientId,
      booking.doctorId,
      booking.timeBooking,
      1,
    ]
  );
  return result;
};

exports.update = async (
  dateBooking,
  timeStart,
  timeEnd,
  patientId,
  doctorId,
  booking
) => {
  const [result, fields] = await db.execute(
    `
        UPDATE booking
        SET timebooking = ?, status = ?
        WHERE datebooking = ? AND timestart = ? AND timeend = ? AND patientid = ? AND doctorid = ?`,
    [
      booking.timeBooking,
      booking.status,
      dateBooking,
      timeStart,
      timeEnd,
      patientId,
      doctorId,
    ]
  );
  return result;
};

exports.delete = async (
  dateBooking,
  timeStart,
  timeEnd,
  patientId,
  doctorId
) => {
  const [result, fields] = await db.execute(
    `
        DELETE FROM booking 
        WHERE datebooking = ? AND timestart = ? AND timeend = ? AND patientid = ? AND doctorid = ?`,
    [dateBooking, timeStart, timeEnd, patientId, doctorId]
  );
  return result;
};

exports.cancelBooking = async (bookingBody) => {
  const [result, fields] = await db.execute(
    `
        UPDATE booking
        SET status = 0
        WHERE datebooking = ? AND timestart = ? AND timeend = ? AND patientid = ? AND doctorid = ?
    `,
    [
      bookingBody.datebooking,
      bookingBody.timestart,
      bookingBody.timeend,
      bookingBody.patientid,
      bookingBody.doctorid,
    ]
  );
  return result;
};

exports.getBookingCompleted = async () => {
  const [result, field] = await db.execute(
    `
       SELECT 
        patient.name AS patientname,
        doctor.name AS doctorname,
        medicalSpecialty.namemedicalspecialty,
        booking.datebooking,
        booking.timebooking,
        booking.status
        FROM booking JOIN patient ON booking.patientid = patient.id 
        JOIN doctor ON booking.doctorid = doctor.id
        JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id
        WHERE booking.status = 3
    `
  );

  return result;
};

exports.getBookingCancel = async () => {
  const [result, field] = await db.execute(
    `
       SELECT 
        patient.name AS patientname,
        doctor.name AS doctorname,
        medicalSpecialty.namemedicalspecialty,
        booking.datebooking,
        booking.timebooking,
        booking.status
        FROM booking JOIN patient ON booking.patientid = patient.id 
        JOIN doctor ON booking.doctorid = doctor.id
        JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id
        WHERE booking.status = 0
    `
  );

  return result;
};

exports.getBookingWait = async () => {
  const [result, field] = await db.execute(
    `
       SELECT 
        patient.name AS patientname,
        doctor.name AS doctorname,
        medicalSpecialty.namemedicalspecialty,
        booking.datebooking,
        booking.timebooking,
        booking.status
        FROM booking JOIN patient ON booking.patientid = patient.id 
        JOIN doctor ON booking.doctorid = doctor.id
        JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id
        WHERE booking.status = 1
    `
  );

  return result;
};

exports.getBookingComingSoon = async () => {
  const [result, field] = await db.execute(
    `
       SELECT 
        patient.name AS patientname,
        doctor.name AS doctorname,
        medicalSpecialty.namemedicalspecialty,
        booking.datebooking,
        booking.timebooking,
        booking.status
        FROM booking JOIN patient ON booking.patientid = patient.id 
        JOIN doctor ON booking.doctorid = doctor.id
        JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id
        WHERE booking.status = 4
    `
  );

  return result;
};


exports.updateStatus = async (bookingBody) => {
  const [result, fields] = await db.execute(
    `
        UPDATE booking
        SET status = ?
        WHERE datebooking = ? AND timestart = ? AND timeend = ? AND patientid = ? AND doctorid = ?
    `,
    [
      bookingBody.status,
      bookingBody.datebooking,
      bookingBody.timestart,
      bookingBody.timeend,
      bookingBody.patientid,
      bookingBody.doctorid,
    ]
  );
  return result;
};






