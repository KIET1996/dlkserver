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
        INSERT INTO schedule (DateSchedule, TimeStart, TimeEnd, DoctorId)
        VALUES (?, ?, ?, ?)`,
        [schedule.dateSchedule, schedule.timeStart, schedule.timeEnd, schedule.doctorId]
    );
    return result;
};

exports.update = async (dateSchedule, timeStart, timeEnd, doctorId, schedule) => {
    const [result, fields] = await db.execute(`
        UPDATE schedule
        SET TimeStart = ?, TimeEnd = ?, DoctorId = ?
        WHERE DateSchedule = ? AND TimeStart = ? AND TimeEnd = ? AND DoctorId = ?`,
        [schedule.timeStart, schedule.timeEnd, schedule.doctorId, dateSchedule, timeStart, timeEnd, doctorId]
    );
    return result;
};

exports.delete = async (dateSchedule, timeStart, timeEnd, doctorId) => {
    const [result, fields] = await db.execute(`
        DELETE FROM schedule 
        WHERE DateSchedule = ? AND TimeStart = ? AND TimeEnd = ? AND DoctorId = ?`,
        [dateSchedule, timeStart, timeEnd, doctorId]
    );
    return result;
};