import nc from "next-connect";
import {
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployee
} from "../../../src/controller/employee";

const handler = nc();

handler.get(getEmployeeById);
handler.delete(deleteEmployeeById);
handler.post(insertEmployee)
handler.put(updateEmployee);

export default handler;