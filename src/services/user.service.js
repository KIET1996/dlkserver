import db from "../config/connectionDB";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.getId = async (id) => {
  const [row, fields] = await db.execute(`SELECT * FROM user WHERE id = ?`, [
    id,
  ]);
  return row;
};

exports.getEmail = async (userBody) => {
  const [row, fields] = await db.execute(`SELECT * FROM user WHERE email = ?`, [
    userBody.email,
  ]);
  return row;
};

exports.add = async (userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `INSERT INTO user(password, email, phonenumber, role) VALUES (?, ?, ?, 0)`,
    [passwordHash, userBody.email, userBody.phonenumber]
  );
  return row;
};

exports.update = async (id, userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `UPDATE user SET password = ?, email = ?, phonenumber = ? WHERE id = ?`,
    [passwordHash, userBody.email, userBody.phonenumber, id]
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM user WHERE id = ?`, [id]);
  return row;
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashedPassword = bcrypt.hashSync(password, salt);
      // console.log('>>> hashedPassword', hashedPassword);
      resolve(hashedPassword);
    } catch (e) {
      reject(e);
    }
  });
};
