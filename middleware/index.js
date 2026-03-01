const simulateSalesAgent = (req, res, next) => {
  req.user = {
    role: "manager",
    username: "ALly"
  }

  next();
}

const userDetailsMiddleware = (req, res, next) => {
  const userDetailString = req.get("user-details");
  if (!userDetailString) {
    res.status(403).json({ message: "there is no user info found" });
  }

  const userDetails = JSON.parse(userDetailString);
  console.log(userDetails);


  if (userDetails.role && userDetails.role.toLowerCase() === "admin") {
    req.user = userDetails
    next();
  } else {
    res.status(403).json({ message: "you are not authorized to access this resource" });
  }

  next();
}

const isDirectorOrManager = (req, res, next) => {
  if (req.user && (req.user.role.toLowerCase() === "director" || req.user.role.toLowerCase() === "manager")) {
    next();
  } else {
    res.status(403).json({ message: "you are not authorized to access this resource" });
  }
  next();
}

const isNotSalesManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  if (req.user.role.toLowerCase() !== "sales-manager") {
    res.status(403).json({ message: "You are not authorised to access this resource" })
  }

  return next();
}

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({
      message: "Only admins can access this resource"
    });
  }

  return next();
};

module.exports = { userDetailsMiddleware, isDirectorOrManager, simulateSalesAgent, isNotSalesManager, isAdmin };