import nc from "next-connect";
import {
  getAllEmployees,
  insertEmployee,
  updateEmployee
} from "../../../src/controller/employee";

const handler = nc();
handler.get(getAllEmployees);
handler.post(insertEmployee);
handler.put(updateEmployee);

export default handler;