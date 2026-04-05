import Record from "../models/recordSchema.js";

export const getDashboardSummary = async (user) => {
  // Fetch all records for the user
  const records = await Record.find({ userId: user._id,isDeleted: { $ne: true } }).sort({ date: -1 });

  let income = 0;
  let expense = 0;
  const categoryTotals = {};

  records.forEach((r) => {// calculate totals
    if (r.type === "income") income += r.amount;
    else expense += r.amount;

    //calculate category totals
    categoryTotals[r.category] = (categoryTotals[r.category] || 0) + r.amount;
  });

  if (user.role === "viewer") {// Viewers only get totals, no details
    return {
      totals: {
        income,
        expense,
        balance: income - expense,
      },
    };
  }

  return {// Analysts & Admins get full summary
    totals: {
      income,
      expense,
      balance: income - expense,
    },
    categoryTotals,
    recentActivity: records.slice(0, 5), // top 5 most recent records
    allRecordsCount: records.length    // total number of records for pagination
  };
};