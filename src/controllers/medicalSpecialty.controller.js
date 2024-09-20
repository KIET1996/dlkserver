import medicalSpecialtyService from "../services/medicalSpecialty.service";
import e from "express";
exports.getAll = async (req, res) => {
  try {
    const result = await medicalSpecialtyService.getAll();
    res.status(200).json({
      errcode: 0,
      message: "Get all medical specialty success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Get all medical specialty error",
      error: e,
    });
  }
};

exports.add = async (req, res) => {
  try {
    if (!req.body.name) {
        res.status(400).json({
            errcode: 1,
            message: "Required field",
            error: e,
          });
    }
    const result = await medicalSpecialtyService.create(req.body);
    res.status(200).json({
      errcode: 0,
      message: "Get all medical specialty success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Add medical specialty error",
      error: e,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.name || !req.params.id) {
        res.status(400).json({
            errcode: 1,
            message: "Required field",
            error: e,
          });
    }
    const result = await medicalSpecialtyService.update(
      req.params.id,
      req.body
    );
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Not Found",
      });
    }else{
      res.status(200).json({
        errcode: 0,
        message: "Update medical specialty success",
        data: result,
      });
    }
    
    
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Update medical specialty error",
      error: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) {
        res.status(400).json({
            errcode: 1,
            message: "Required field",
            error: e,
          });
    }
    const result = await medicalSpecialtyService.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.status(404).json({
        errcode: 1,
        message: "Not Found",
      });
    } else {
      res.status(200).json({
        errcode: 0,
        message: "Delete medical specialty success",
        e: result,
      });
    }
  } catch (e) {
    res.status(500).json({
      errcode: 1,
      message: "Delete medical specialty error",
      error: e,
    });
  }
};
