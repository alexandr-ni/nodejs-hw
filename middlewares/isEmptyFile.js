import { HttpError } from "../helpers/index.js";

const isEmptyFile = async (req, res, next) => {
  const keys = req.file;
  if (!keys) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

export default isEmptyFile;
