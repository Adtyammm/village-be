const { v4: uuidv4 } = require("uuid");


const date = new Date().toLocaleDateString("id-ID");

const Reporting = require("../models/reporting"); 
const reportingModel = {};

reportingModel.getAllReporting = async () => {
  try {
    const reporting = await Reporting.find();
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.getReportingByID = async (id) => {
  try {
    const reporting = await Reporting.findOne({ complaint_id: id });
    if (!reporting) {
      return null; 
    }
    return reporting;  
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.createReporting = async (detail) => {
 
  try {
    const saveDate = date.split("/");
    const workStatus = "Pending";

    const newReporting = new Reporting({
      complaint_id: uuidv4(),
      complainants_name: detail.complainants_name,
      complaint_title: detail.complaint_title,
      complaint_date: new Date(), 
      complaint_category: detail.complaint_category,
      description: detail.description,
      work_status: workStatus,
      vote: 0,
      user_id: detail.user_id,
    });


    const result = await newReporting.save();
    return result; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.updateReporting = async (id, update) => {
  try {
    const saveDate = date.split("/");

    let updateObj = {
      updatedAt: `${saveDate[2]}-${saveDate[1]}-${saveDate[0]}`,
      work_status: update.work_status || "Accepted" || "Completed",
    };

    if (update.work_status === "Rejected") {
      updateObj = {
        updatedAt: `${saveDate[2]}-${saveDate[1]}-${saveDate[0]}`,
        reason: update.reason,
        work_status: update.work_status,
      };
    }

    const reporting = await Reporting.findOneAndUpdate(
      { complaint_id: id },
      updateObj,
      { new: true }
    );
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.deleteReporting = async (id) => {
  try {
    const reporting = await Reporting.findOneAndDelete({
      complaint_id: id,
    });
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.updateReportingReason = async (id, reason) => {
  try {
    const reporting = await Reporting.findOneAndUpdate(
      { complaint_id: id },
      { reason: reason, work_status: "Rejected" },
      { new: true }
    );
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.vote = async (id, vote) => {
  try {
    const reporting = await Reporting.findOneAndUpdate(
      { complaint_id: id },
      { vote: vote },
      { new: true }
    );
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

reportingModel.getReportingByUserId = async (userId) => {
  try {
    const reporting = await Reporting.find({ user_id: userId });
    return reporting; 
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = reportingModel;
