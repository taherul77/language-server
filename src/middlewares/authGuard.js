import jwt from "jsonwebtoken";
import config from "../config/index.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const authGuard =
  (...requiredRoles) =>
  async (req, _res, next) => {
    try {
      //Get authorization token
      const bearer_token = req.headers.authorization;
      if (!bearer_token) {
        throw new ApiError(401, "Token is required for authorization");
      }
      const token = bearer_token.split(" ")[1];
      let verifiedUser = null;

      // verify token
      verifiedUser = jwt.verify(token, config.JWT_SECRET);

      const user = await User.findById(verifiedUser.id);

      if (!user) {
        throw new ApiError(401, "User not found");
      }

      req.user = {
        id: user._id,
        role: user.role,
        email: user.email,
      };

      // Guard By ROLE
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, `You Don't have permission to access this.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authGuard;