import jwt from "jsonwebtoken";
import { j as json } from "../../../../../chunks/index.js";
import { J as JWT_SECRET } from "../../../../../chunks/private.js";
async function GET() {
  const token = jwt.sign({
    data: "token"
  }, JWT_SECRET, { expiresIn: "30s" });
  return json({
    data: token
  });
}
export {
  GET
};
