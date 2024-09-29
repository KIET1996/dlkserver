import doctorService from "../services/doctor.service";
import userService from "../services/user.service";
import ApiError from "../../api-error";
import multer from "multer";
import fs from "fs";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single("file");

exports.getAll = async (req, res, next) => {
  try {
    const result = await doctorService.getAll();
    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(204).json({
        errcode: 0,
        message: "No content",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Can not get doctor",
      error: error,
    });
  }
};

exports.getId = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is require"));
  }

  try {
    const result = await doctorService.getId(req.params.id);
    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(404).json({
        errcode: 0,
        message: "Not found",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Can not get doctor",
      error: error,
    });
  }
};

exports.add = async (req, res, next) => {
  // Sử dụng khi người dùng upload file lên khi đăng kí
  // upload(req, res, async function (err) {
  //   if (err instanceof multer.MulterError) {
  //     console.log("Multer Error:", err);
  //     return res.status(500).json({ error: "Error uploading file" });
  //   } else if (err) {
  //     console.log("Unknown Error:", err);
  //     return res.status(500).json({ error: "Error uploading file" });
  //   }

  if (
    !req.body.name ||
    !req.body.birthday ||
    !req.body.scoreEvaluate ||
    !req.body.associateProfessor ||
    !req.body.numberEvaluate ||
    !req.body.idMedicalSpecialty
  ) {
    return next(new ApiError(400, "Not enough field require"));
  }

  const filePath = "src/assets/default.jpg";

  // Đọc tệp bằng fs
  const avatar = await readFileImg(filePath);

  // console.log(avatar);

  // Thêm user vào cơ sở dữ liệu
  var addUser = await userService.add(req.body);

  if (addUser.affectedRows === 1) {
    try {
      // Thêm doctor vào cơ sở dữ liệu
      const result = await doctorService.add(
        addUser.insertId,
        req.body,
        avatar
      );

      res.status(200).json({
        errcode: 0,
        message: "Add success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        errcode: 1,
        message: "Add fail: could not add doctor",
        error: error,
      });
    }
  } else {
    res.status(500).json({
      errcode: 1,
      message: "Add fail: could not add user",
    });
  }
  // });
};

exports.getDoctorSalient = async (req, res, next) => {
  try {
    const result = await doctorService.getDoctorSalient();
    if (result != []) {
      res.status(200).json({
        errcode: 0,
        message: "Get success",
        data: result,
      });
    } else {
      res.status(204).json({
        errcode: 0,
        message: "No content",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "Get fail",
      error: error,
    });
  }
};

exports.update = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is field require"));
  }

  var checkFileImg = true;

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    } else if (err) {
      checkFileImg = false;
      console.log("Unknown Error:", err);
    }

    if (
      !req.body.email ||
      !req.body.phonenumber ||
      !req.body.name ||
      !req.body.birthday ||
      !req.body.scoreEvaluate ||
      !req.body.associateProfessor ||
      !req.body.numberEvaluate ||
      !req.body.idMedicalSpecialty
    ) {
      return next(new ApiError(400, "not enough field require"));
    }

    var avatar = null;

    if (checkFileImg && req.file != undefined) {
      avatar = req.file.buffer.toString("base64");
    }

    try {
      var result = null;
      if (avatar != null) {
        result = await doctorService.update(req.params.id, req.body, avatar);
      } else {
        result = await doctorService.updateNotImg(req.params.id, req.body);
      }

      if (result.affectedRows === 0) {
        res.status(404).json({
          errcode: 1,
          message: "Not found",
        });
      } else {
        res.status(200).json({
          errcode: 0,
          message: "update success",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        errcode: 1,
        message: "Update fail",
        error: error,
      });
    }
  });
};

exports.delete = async (req, res, next) => {
  if (!req.params.id) {
    return next(new ApiError(400, "Id is field require"));
  }

  try {
    const result = await doctorService.delete(req.params.id);
    if (result == 2) {
      res.status(200).json({
        errcode: 0,
        message: "delete success",
      });
    } else {
      res.status(404).json({
        errcode: 1,
        message: "Can not found doctor",
      });
    }
  } catch (error) {
    res.status(500).json({
      errcode: 1,
      message: "delete fail",
      error: error,
    });
  }
};

const readFileImg = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        reject("Không thể đọc tệp"); // Reject the promise with the error message
      }

      // Convert file to Base64
      const avatar = data.toString("base64");
      resolve(avatar); // Resolve the promise with the avatar
    });
  });
};
