import db from "../config/connectionDB";
import userService from "../services/user.service";

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
// exports.add = async (id, doctorBody, avatar) => {

//   const result = await userService.add(doctorBody);

//   const [row, fields] = await db.execute(
//     `INSERT INTO doctor (id, name, birthday, gender, avatar, scoreevaluate, associateprofessor, numberevaluate, idmedicalspecialty)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       id,
//       doctorBody.name,
//       doctorBody.birthday,
//       doctorBody.gender,
//       avatar,
//       doctorBody.scoreEvaluate,
//       doctorBody.associateProfessor,
//       doctorBody.numberEvaluate,
//       doctorBody.idMedicalSpecialty,
//     ]
//   );
//   return row;
// };

exports.add = async (doctorBody, avatar) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // Thêm vào bảng user
    const result = await userService.add(doctorBody);

    if (result.affectedRows === 1) {
      try {
        const [row, fields] = await connection.execute(
          `INSERT INTO doctor (id, name, birthday, gender, avatar, scoreevaluate, associateprofessor, numberevaluate, idmedicalspecialty) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            result.insertId,
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

        // Commit transaction nếu cả hai thao tác đều thành công
        await connection.commit();
        return row;
      } catch (error) {
        // Rollback và ném lỗi ra ngoài nếu có lỗi khi thêm vào doctor
        await connection.rollback();
        throw error; // Ném lỗi để xử lý ở nơi khác
      }
    } else {
      // Nếu không thêm được user, rollback
      await connection.rollback();
      throw new Error("Failed to add user.");
    }
  } catch (error) {
    // Rollback nếu có lỗi xảy ra
    await connection.rollback();
    throw error; // Ném lỗi ra ngoài để xử lý tiếp
  } finally {
    // Đóng kết nối
    await connection.release();
  }
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
