import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(
    `SELECT 
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
    WHERE user.id = patient.id`
  );
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(
    `SELECT 
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
    WHERE user.id = patient.id AND user.id = ?`,
    [id]
  );
  return row;
};

// Trường hợp đăng kí mà không có avatar

// exports.add = async (id, patientBody, avatar) => {
//   const [row, fields] = await db.execute(`INSERT INTO 
//       patient(id, name, birthday, address, profession, gender) 
//       VALUES (${id}, '${patientBody.name}', '${patientBody.birthday}', '${patientBody.address}', '${patientBody.profession}', ${patientBody.gender})`);
//   return row;
// };

// Trường họp dùng cho đăng kí mà có ảnh đại diện 

exports.add = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(
    `INSERT INTO 
      patient(id, name, birthday, address, profession, gender, avatar) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      patientBody.name,
      patientBody.birthday,
      patientBody.address,
      patientBody.profession,
      patientBody.gender,
      avatar,
    ]
  );
  return row;
};

exports.update = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(
    `UPDATE patient 
      JOIN user ON patient.id = user.id
      SET
        user.email = ?,
        user.phonenumber = ?,
        patient.name = ?,
        patient.birthday = ?,
        patient.address = ?,
        patient.profession = ?,
        patient.gender = ?,
        patient.avatar = ?
      WHERE user.id = ?`,
    [
      patientBody.email,
      patientBody.phonenumber,
      patientBody.name,
      patientBody.birthday,
      patientBody.address,
      patientBody.profession,
      patientBody.gender,
      avatar,
      id,
    ]
  );
  return row;
};

exports.updateNotImg = async (id, patientBody) => {
  const [row, fields] = await db.execute(
    `UPDATE patient
      JOIN user ON patient.id = user.id
      SET
        user.email = ?,
        user.phonenumber = ?,
        patient.name = ?,
        patient.birthday = ?,
        patient.address = ?,
        patient.profession = ?,
        patient.gender = ?
      WHERE user.id = ?`,
    [
      patientBody.email,
      patientBody.phonenumber,
      patientBody.name,
      patientBody.birthday,
      patientBody.address,
      patientBody.profession,
      patientBody.gender,
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
 const [row, fields] = await db.execute(`DELETE FROM patient WHERE id = ?`, [
   id,
 ]);
 const [rowUser, fieldsUser] = await db.execute(
   `DELETE FROM user WHERE id = ?`,
   [id]
 );
 return row.affectedRows + rowUser.affectedRows;
};
