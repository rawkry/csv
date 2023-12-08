const abort = (debug) => (err, req, res, next) => {
  if (err) {
    if (debug) console.log(err);

    if (err.name === "ValidationError") {
      return res.status(412).json({ message: err.message.split(": ").pop() });
    }

    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
  next();
};

export default abort;
