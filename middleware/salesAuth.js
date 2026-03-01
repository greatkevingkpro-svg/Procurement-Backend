const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role; // role must come from auth middleware

      if (!userRole) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // role allowed → continue
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = {authorizeRoles};
