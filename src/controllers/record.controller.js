import * as recordService from "../services/record.service.js";

export const createRecord_collector = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(req.user, req.body);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const getRecords_collector = async (req, res, next) => {
  try {
    const records = await recordService.getRecords(req.user, req.query);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const updateRecord_collector = async (req, res, next) => {
  try {
    const updated = await recordService.updateRecord(
      req.user,
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRecord_collector = async (req, res, next) => {
  try {
    const deleted = await recordService.deleteRecord(
      req.user,
      req.params.id
    );
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};