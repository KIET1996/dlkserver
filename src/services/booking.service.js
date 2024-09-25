import db from '../config/connectionDB';
import moment from 'moment';

exports.getAll = async () => {
    const [rows, fields] = await db.execute(`SELECT * FROM booking`);
    const formattedRows = rows.map(item => {
        return {
            ...item,
            DateBooking: moment(item.DateBooking).format('YYYY-MM-DD')
        };
    });
    return rows;
};

exports.create = async (booking) => {
    const [result, fields] = await db.execute(`
        INSERT INTO booking (DateBooking, TimeStart, TimeEnd, PatientId, DoctorId, TimeBooking, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [booking.dateBooking, booking.timeStart, booking.timeEnd, booking.patientId, booking.doctorId, booking.timeBooking, booking.status]
    );
    return result;
};

exports.update = async (dateBooking, timeStart, timeEnd, patientId, doctorId, booking) => {
    const [result, fields] = await db.execute(`
        UPDATE booking
        SET TimeBooking = ?, Status = ?
        WHERE DateBooking = ? AND TimeStart = ? AND TimeEnd = ? AND PatientId = ? AND DoctorId = ?`,
        [booking.timeBooking, booking.status, dateBooking, timeStart, timeEnd, patientId, doctorId]
    );
    return result;
};

exports.delete = async (dateBooking, timeStart, timeEnd, patientId, doctorId) => {
    const [result, fields] = await db.execute(`
        DELETE FROM booking 
        WHERE DateBooking = ? AND TimeStart = ? AND TimeEnd = ? AND PatientId = ? AND DoctorId = ?`,
        [dateBooking, timeStart, timeEnd, patientId, doctorId]
    );
    return result;
};