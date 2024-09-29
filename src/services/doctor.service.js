import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(
    `SELECT
      user.email,
      user.phonenumber,
      doctor.name,
      doctor.birthday,
      doctor.gender,
      doctor.avatar,
      doctor.scoreevaluate,
      doctor.associateprofessor,
      doctor.numberevaluate,
      medicalSpecialty.namemedicalspecialty
     FROM
      user JOIN doctor ON user.id = doctor.id
      JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id`
  );
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(
    `SELECT
      user.id,
      user.email,
      user.phonenumber,
      doctor.name,
      doctor.birthday,
      doctor.gender,
      doctor.avatar,
      doctor.scoreevaluate,
      doctor.associateprofessor,
      doctor.numberevaluate,
      medicalSpecialty.namemedicalspecialty
     FROM
      user JOIN doctor ON user.id = doctor.id
      JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id
     WHERE user.id = ?`,
    [id]
  );
  return row;
};

exports.getDoctorSalient = async () => {
  const [row, fields] = await db.execute(
    `SELECT user.id, user.email, user.phonenumber, doctor.name, doctor.birthday, doctor.gender, doctor.avatar, doctor.scoreevaluate, doctor.associateprofessor,  medicalSpecialty.namemedicalspecialty, doctor.numberevaluate
     FROM user
     JOIN doctor ON user.id = doctor.id
     JOIN medicalSpecialty ON doctor.idmedicalspecialty = medicalSpecialty.id  
     ORDER BY doctor.scoreevaluate DESC
     LIMIT 2`
  );
  return row;
};

// Thêm doctor không có ảnh đại diện
exports.add = async (id, doctorBody, avatar) => {
  const [row, fields] = await db.execute(
    `INSERT INTO doctor (id, name, birthday, gender, avatar, scoreevaluate, associateprofessor, numberevaluate, idmedicalspecialty) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      doctorBody.name,
      doctorBody.birthday,
      doctorBody.gender,
      avatar,
      doctorBody.scoreEvaluate,
      doctorBody.associateProfessor,
      doctorBody.numberEvaluate,
      doctorBody.idMedicalSpecialty,
    ]
  );
  return row;
};

exports.update = async (id, doctorBody, avatar) => {
  const [row, fields] = await db.execute(
    `UPDATE doctor
      JOIN user ON doctor.id = user.id
      SET
        user.email = ?,
        user.phonenumber = ?,
        doctor.name = ?,
        doctor.birthday = ?,
        doctor.gender = ?,
        doctor.avatar = ?,
        doctor.scoreevaluate = ?,
        doctor.associateprofessor = ?,
        doctor.numberevaluate = ?,
        doctor.idmedicalspecialty = ?
      WHERE user.id = ?`,
    [
      doctorBody.email,
      doctorBody.phonenumber,
      doctorBody.name,
      doctorBody.birthday,
      doctorBody.gender,
      avatar,
      doctorBody.scoreEvaluate,
      doctorBody.associateProfessor,
      doctorBody.numberEvaluate,
      doctorBody.idMedicalSpecialty,
      id,
    ]
  );
  return row;
};

exports.updateNotImg = async (id, doctorBody) => {
  const [row, fields] = await db.execute(
    `UPDATE doctor
      JOIN user ON doctor.id = user.id
      SET
        user.email = ?,
        user.phonenumber = ?,
        doctor.name = ?,
        doctor.birthday = ?,
        doctor.gender = ?,
        doctor.scoreevaluate = ?,
        doctor.associateprofessor = ?,
        doctor.numberevaluate = ?,
        doctor.idmedicalspecialty = ?
      WHERE user.id = ?`,
    [
      doctorBody.email,
      doctorBody.phonenumber,
      doctorBody.name,
      doctorBody.birthday,
      doctorBody.gender,
      doctorBody.scoreEvaluate,
      doctorBody.associateProfessor,
      doctorBody.numberEvaluate,
      doctorBody.idMedicalSpecialty,
      id,
    ]
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM doctor WHERE id = ?`, [
    id,
  ]);
  const [rowUser, fieldsUser] = await db.execute(
    `DELETE FROM user WHERE id = ?`,
    [id]
  );
  return row.affectedRows + rowUser.affectedRows;
};
