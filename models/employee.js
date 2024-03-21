const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_number: { type: Number, required: true },
  nip: { type: Number, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

