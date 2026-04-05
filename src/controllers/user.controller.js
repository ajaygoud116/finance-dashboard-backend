import * as userService from "../services/user.service.js";

export const createUser_controller = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.user, req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers_controller = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.user);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser_controller = async (req, res, next) => {
  try {
    const updated = await userService.updateUser(req.user, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser_controller = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.user, req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};