import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  // const refreshToken = req.cookies.refreshToken;
  const token = header && header.split(" ")[1];
  if (!token) return res.sendStatus(401);
  //eslint-disable-next-line
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: err.message });
    req.user = decoded;
    next();
  });
}
