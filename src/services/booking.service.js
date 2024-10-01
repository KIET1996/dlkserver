import db from "../config/connectionDB";
import moment from "moment";


// Sửa lại lấy đẩy đủ cá thông tin cần thiết
exports.getAll = async () => {
  const [rows, fields] = await db.execute(`SELECT 
        patient.name AS patientname,
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
        booking.timebooking,
        booking.status
    FROM booking
    JOIN doctor ON booking.doctorid = doctor.id
    JOIN patient ON booking.patientid = patient.id
    JOIN medicalspecialty ON medicalspecialty.id = doctor.idmedicalspecialty`);
  const formattedRows = rows.map((item) => {
    return {
      ...item,
      datebooking: moment(item.datebooking).format("YYYY-MM-DD"),
    };
  });
  return formattedRows;
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
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
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
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
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
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
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
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
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

exports.getByDate = async (date) => {
  const [rows, fields] = await db.execute(
    `SELECT 
        patient.name AS patientname,
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
        booking.timebooking,
        booking.status
    FROM booking
    JOIN doctor ON booking.doctorid = doctor.id
    JOIN patient ON booking.patientid = patient.id
    JOIN medicalspecialty ON medicalspecialty.id = doctor.idmedicalspecialty
    WHERE datebooking= ?`,
    [date]
  );
  return rows;
};

exports.getByMedicalSpecialty = async (idMedicalSpecialty) => {
  const [rows, fields] = await db.execute(
    `SELECT 
        patient.name AS patientname,
        patient.id AS patientid,
        doctor.name AS doctorname,
        doctor.id AS doctorid,
        medicalSpecialty.namemedicalspecialty,
        medicalSpecialty.id AS medicalspecialtyid,
        booking.datebooking,
        booking.timestart,
        booking.timeend,
        booking.timebooking,
        booking.status
    FROM booking
    JOIN doctor ON booking.doctorid = doctor.id
    JOIN patient ON booking.patientid = patient.id
    JOIN medicalspecialty ON medicalspecialty.id = doctor.idmedicalspecialty
    WHERE medicalspecialty.id = ?`,
    [idMedicalSpecialty]
  );
  return rows;
};

exports.getByTime = async (date, timestart, timeend) => {
  const [rows, fields] = await db.execute(
    `SELECT 
          patient.name AS patientname,
          patient.id AS patientid,
          doctor.name AS doctorname,
          doctor.id AS doctorid,
          medicalSpecialty.namemedicalspecialty,
          medicalSpecialty.id AS medicalspecialtyid,
          booking.datebooking,
          booking.timestart,
          booking.timeend,
          booking.timebooking,
          booking.status
      FROM booking
      JOIN doctor ON booking.doctorid = doctor.id
      JOIN patient ON booking.patientid = patient.id
      JOIN medicalspecialty ON medicalspecialty.id = doctor.idmedicalspecialty
      WHERE booking.datebooking = ? AND booking.timebooking >= ? AND booking.timebooking <= ?`,
    [date, timestart, timeend]
  );
  return rows;
};

exports.getDetail = async (dateBooking, timeStart, timeEnd, doctorId, patientId) => {
  const [rows, fields] = await db.execute(
    `
        SELECT
            schedule.dateschedule,
            schedule.timestart,
            schedule.timeend,
            booking.timebooking,
            booking.status,
            doctor.name AS namedoctor,
            doctor.birthday AS birthdaydoctor,
            doctor.gender AS genderdoctor,
            doctor.avatar AS avatardoctor,
            doctor.associateprofessor,
            medicalspecialty.namemedicalspecialty,
            medicalSpecialty.id AS medicalspecialtyid ,
            patient.name AS namepatient,
            patient.birthday AS birthdaypatient,
            patient.address,
            patient.profession,
            patient.gender AS genderpatient,
            patient.avatar AS  avatarpatient
        FROM schedule
        JOIN booking ON schedule.dateschedule = booking.datebooking AND schedule.timestart = booking.timestart AND schedule.timeend = booking.timeend AND schedule.doctorid = booking.doctorid
        JOIN doctor ON schedule.doctorid = doctor.id
        JOIN patient ON booking.patientid = patient.id
        JOIN medicalspecialty ON doctor.idmedicalspecialty = medicalspecialty.id
        WHERE
        booking.datebooking = ? AND booking.timestart = ? AND booking.timeend = ? AND booking.doctorid = ? AND patient.id = ?
    `,
    [dateBooking, timeStart, timeEnd, doctorId, patientId]
  );

  return rows;
};


