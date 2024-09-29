import db from '../config/connectionDB';
import moment from 'moment';
exports.getAll = async () => {
    const [rows, fields] = await db.execute(`SELECT * FROM schedule`);
    const formattedRows = rows.map(item => {
        return {
            ...item,
            DateSchedule: moment(item.DateSchedule).format('YYYY-MM-DD')
        };
    });
    return formattedRows;
};

exports.create = async (schedule) => {
    const [result, fields] = await db.execute(`
        INSERT INTO schedule (dateschedule, timestart, timeend, doctorid)
        VALUES (?, ?, ?, ?)`,
        [schedule.dateSchedule, schedule.timeStart, schedule.timeEnd, schedule.doctorId]
    );
    return result;
};

exports.update = async (dateSchedule, timeStart, timeEnd, doctorId, schedule) => {
    const [result, fields] = await db.execute(`
        UPDATE schedule
        SET timestart = ?, timeend = ?, doctorid = ?
        WHERE dateschedule = ? AND timestart = ? AND timeend = ? AND doctorid = ?`,
        [schedule.timeStart, schedule.timeEnd, schedule.doctorId, dateSchedule, timeStart, timeEnd, doctorId]
    );
    return result;
};

exports.delete = async (dateSchedule, timeStart, timeEnd, doctorId) => {
    const [result, fields] = await db.execute(`
        DELETE FROM schedule 
        WHERE dateschedule = ? AND timestart = ? AND timeend = ? AND doctorid = ?`,
        [dateSchedule, timeStart, timeEnd, doctorId]
    );
    return result;
};

exports.getByDoctorIdDate = async (doctorId, date) => {
  const [rows, fields] = await db.execute(
    `
        SELECT * FROM schedule WHERE doctorid = ? AND dateschedule = ?
    `,
    [doctorId, date]
  );
    const formattedRows = rows.map((item) => {
       return {
         ...item,
         dateschedule: moment(item.dateschedule).format("YYYY-MM-DD"),
       };
     });
     return formattedRows;
};

exports.getByDoctorId = async (doctorId) => {
    const [rows, fields] = await db.execute(`SELECT * FROM schedule WHERE doctorid = ?`, [doctorId]);
    const formattedRows = rows.map(item => {
        return {
            ...item,
            DateSchedule: moment(item.DateSchedule).format('YYYY-MM-DD')
        };
    });
    return formattedRows;
};

exports.getByDate = async (date) => {
    const [rows, fields] = await db.execute(`SELECT * FROM schedule WHERE dateschedule = ?`, [date]);
    const formattedRows = rows.map(item => {
        return {
            ...item,
            DateSchedule: moment(item.DateSchedule).format('YYYY-MM-DD')
        };
    });
    return formattedRows;
}

exports.getByWeek = async (date) => {
    const [rows, fields] = await db.execute(`SELECT * FROM schedule WHERE YEARWEEK(dateschedule, 1) = YEARWEEK(?, 1)`, [date]);
    const formattedRows = rows.map(item => {
        return {
            ...item,
            DateSchedule: moment(item.DateSchedule).format('YYYY-MM-DD')
        };
    });
    return formattedRows;
}

exports.getDetail = async (dateSchedule, timeStart, timeEnd, doctorId, patientId) => {
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
        schedule.dateschedule = ? AND schedule.timestart = ? AND schedule.timeend = ? AND schedule.doctorid = ? AND patient.id = ?
    `,
    [dateSchedule, timeStart, timeEnd, doctorId, patientId]
  );
};