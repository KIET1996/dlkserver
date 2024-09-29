import db from '../config/connectionDB';

exports.getAll = async () => {
    const [row,field] = await db.execute(`SELECT * FROM medicalspecialty`);
    return row;
}

exports.create = async (medicalSpecialty) => {
    const [row,field] = await db.execute(`INSERT INTO medicalspecialty (namemedicalspecialty) VALUES ('${medicalSpecialty.name}')`);
    return row;
}

exports.update = async (id, medicalSpecialty) => {
    const [row,field] = await db.execute(`UPDATE medicalspecialty SET namemedicalspecialty = '${medicalSpecialty.name}' WHERE id = ${id}`);
    return row;
}

exports.delete = async (id) => {
    const [row,field] = await db.execute(`DELETE FROM medicalspecialty WHERE id = ${id}`);
    return row;
}