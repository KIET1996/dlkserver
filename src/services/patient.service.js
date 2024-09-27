import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(`SELECT 
      user.email,
      user.phonenumber,
      user.role,
      patient.name,
      patient.birthday,
      patient.address,
      patient.profession,
      patient.gender,
      patient.avatar
    FROM 
      user, patient 
    WHERE user.id = patient.id;
  `);
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(`SELECT 
      user.email,
      user.phonenumber,
      user.role,
      patient.name,
      patient.birthday,
      patient.address,
      patient.profession,
      patient.gender,
      patient.avatar
    FROM 
      user, patient 
    WHERE user.id = patient.id AND user.id = ${id};`);
  return row;
};

exports.add = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(`INSERT INTO 
      patient(id, name, birthday, address, profession, gender) 
      VALUES (${id}, '${patientBody.name}', '${patientBody.birthday}', '${patientBody.address}', '${patientBody.profession}', ${patientBody.gender})`);
  return row;
};

// Trường họp dùng cho đăng kí mà ảnh đại diện 

// exports.add = async (id, patientBody, avatar) => {
//   const [row, fields] = await db.execute(`INSERT INTO 
//       patient(id, name, birthday, address, profession, gender, avatar) 
//       VALUES (${id}, '${patientBody.name}', '${patientBody.birthday}', '${patientBody.address}', '${patientBody.profession}', ${patientBody.gender}, ${avatar})`);
//   return row;
// };

exports.update = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(`
      UPDATE patient 
      JOIN user ON patient.id = user.id
      SET
        user.email = '${patientBody.email}',
        user.phonenumber = '${patientBody.phonenumber}',
        patient.name = '${patientBody.name}',
        patient.birthday = '${patientBody.birthday}',
        patient.address = '${patientBody.address}',
        patient.profession = '${patientBody.profession}',
        patient.gender = ${patientBody.gender},
        patient.avatar = '${avatar}'
        WHERE user.id = ${id}
    `);
  return row;
};

exports.updateNotImg = async (id, patientBody) => {
  const [row, fields] = await db.execute(`
      UPDATE patient
      JOIN user ON patient.id = user.id
      SET
        user.email = '${patientBody.email}',
        user.phonenumber = '${patientBody.phonenumber}',
        patient.name = '${patientBody.name}',
        patient.birthday = '${patientBody.birthday}',
        patient.address = '${patientBody.address}',
        patient.profession = '${patientBody.profession}',
        patient.gender = ${patientBody.gender}
        WHERE user.id = ${id}
    `);
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(
    `DELETE FROM patient WHERE id = ${id}`
  );
  const [rowUser, fieldsUser] = await db.execute(
    `DELETE FROM user WHERE id = ${id}`
  );
  return row.affectedRows + rowUser.affectedRows;
};
