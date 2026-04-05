import * as dashboardService from "../services/dashboardSummary.service.js";

export const getSummary_controller = async (req, res, next) => {
  try {
    const result = await dashboardService.getDashboardSummary(req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

