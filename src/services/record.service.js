import Record from "../models/recordSchema.js";

export const createRecord = async (user, data) => {

  if (user.role !== "admin") {
    throw new Error("Only Admins can create records");
  }

  // Validation
  if (!data.amount || data.amount <= 0) {
    throw new Error("Invalid amount");
  }

  if (!data.type) {
    throw new Error("Type is required");
  }

  const { amount, type, category, date, notes } = data;
  // Create record
  const record = await Record.create({
    amount,
    type,
    category,
    date,
    notes,
    userId: user._id,
  });

  return record;
};

export const getRecords = async (user, query) => {

  const filter = { userId: user._id,isDeleted: { $ne: true } };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;
  const total = await Record.countDocuments(filter);// total records for pagination 

  const DEFAULT_LIMIT = 10;//
  const limit_role = 
    user.role === "analyst" || user.role === "admin" ? 100 : 50;// Analysts & Admins can see up to 100 records, Viewers up to 50
  const page = 
    Math.max(1, parseInt(query.page) || 1);// default to page 1 if invalid page number provided
  const requestedLimit = 
    parseInt(query.limit) || DEFAULT_LIMIT;// user can request a custom limit, but it will be capped by their role's maximum
  
  const limit = Math.min(requestedLimit, limit_role);
  const skip = (page - 1) * limit;

  

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .lean();// Use lean() for faster read-only queries

  return {
    records,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),// we calculate total pages based on the total count and limit
      pageSize: records.length, 
      limitApplied: limit, 
      hasNextPage: page < Math.ceil(total / limit),// we determine if there is a next page based on the current page and total pages
      hasPrevPage: page > 1
    }
  };  

};

export const updateRecord = async (user, id, data) => {

  if (user.role !== "admin") {
    throw new Error("Only admin can update");
  }

  const updated =await Record.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Record not found");
  return updated;
};

export const deleteRecord = async (user, id) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can delete");
  }
  const deleted = await Record.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!deleted) throw new Error("Record not found");
  return { message: "Record deleted successfully" };
};