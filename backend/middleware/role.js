import User from "../model/User.js";

// middleware/checkRole.js
export const checkRole = (...allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const userRole = user.role; // assume `jwtauthmiddleware` adds req.user
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

