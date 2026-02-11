// middleware function
app.use((req, res, next) => {
  const userDetailsString = req.get("User-details");

  // converting to object
  const userDetails = JSON.parse(userDetailsString);
  console.log(userDetails);
  next();
});

// middleware
const userDetailsMiddleware = (req, res, next) => {
  const userDetailsString = req.get("User-details");
  if (!userDetailsString) {
    res.status(403);
    res.json({message: "there is no user details"});
  }
  const userDetails = JSON.parse(userDetailsString);
  
  if (userDetails.role && userDetails.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403);
    res.json({message: "User is not an admin"});
  }
}  