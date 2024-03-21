const employeeModel = require("../models/employee");

let lastEmployeeNumber = 0;

employeeModel.getAllEmployees = async () => {
  try {
    return await employeeModel.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeModel.getEmployeeByNIP = async (nip) => {
  try {
    return await employeeModel.findOne({ nip: nip });
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeModel.createEmployee = async (employee) => {
  try {
    lastEmployeeNumber++;
    employee.employee_number = lastEmployeeNumber;

    const newEmployee = await employeeModel.create(employee);
    return newEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeModel.updateEmployee = async (nip, update) => {
  try {
    return await employeeModel.findOneAndUpdate({ nip: nip }, update, {
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeModel.deleteEmployee = async (nip) => {
  try {
    return await employeeModel.findOneAndDelete({ nip: nip });
  } catch (error) {
    throw new Error(error.message);
  }
};

employeeModel.loginEmployee = async (username, password) => {
  try {
    return await employeeModel.findOne({
      username: username,
      password: password,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = employeeModel;
