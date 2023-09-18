import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60;
export default function createSecretToken(id) {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
}
