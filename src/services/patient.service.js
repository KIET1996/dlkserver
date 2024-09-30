import db from "../config/connectionDB";
import userService from "../services/user.service";

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

exports.add = async (patientBody, avatar) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // Thêm vào bảng user
    const result = await userService.add(patientBody);

    if (result.affectedRows === 1) {
      try {
        const [row, fields] = await db.execute(
          `INSERT INTO 
            patient(id, name, birthday, address, profession, gender, avatar) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            result.insertId,
            patientBody.name,
            patientBody.birthday,
            patientBody.address,
            patientBody.profession,
            patientBody.gender,
            avatar,
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
