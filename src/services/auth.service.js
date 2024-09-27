import db from "../config/connectionDB";

exports.login = async (loginBody) => {
  const [row, fields] = await db.execute(
    `SELECT user.id, user.email, user.phonenumber, user.role, patient.name, patient.birthday, patient.address, patient.profession, patient.gender, patient.avatar  FROM user, patient WHERE user.id = patient.id AND user.email = '${loginBody.email}'`
  );
  return row;
};
