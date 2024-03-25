import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      if (!(decoded.id === req.params.id || decoded.isAdmin)) {
        return next(createError(403, "Forbidden: You are not authorized"));
      }
      req.user = decoded; // Assign the decoded user object to the request
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
//role number and is admin based cockie authentication
export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      if (!decoded.isAdmin) {
        return next(createError(403, "Forbidden: You are not an admin"));
      }
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  
  export const verifyStudent = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const username = decoded.username;
     const { isAdmin, username } = decoded;
  
      // Regular expression to match the pattern: starts with BM, IT, HR, EN, BT, AT, PS, or ET followed by 8 numbers
      const studentRegex = /^(BM|IT|HR|EN|BT|AT|PS|ET)\d{8}$/;
  
      if (!(studentRegex.test(username) || isAdmin)) {
        return next(createError(403, "Forbidden: You are not a student"));
      }
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };

  export const verifyStaff = (req, res, next) => {
    //with request we are sending the JWT Token as a cockie, then that cookie we access the token
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      //const username = decoded.username;
      const { isAdmin, username } = decoded;
  
      // Regular expression to match the pattern: starts with BM, IT, HR, EN, BT, AT, PS, or ET followed by 8 numbers
      const studentRegex = /^(LE|SE|PRO|DR)\d{8}$/;
  
      if (!(studentRegex.test(username)||isAdmin)) {
        return next(createError(403, "Forbidden: You are not a staff"));
      }
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };

//role number based cockie authentication
  export const verifyPersonAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const { isAdmin, role } = decoded;
  
      if (decoded.role === 1|| decoded.role === 0) {
        // If the role is 1, treat as admin
        next();
      } else {
        return next(createError(403, "Forbidden: You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  

  export const verifyStaffAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const { isAdmin, role } = decoded;
  
      if (decoded.role === 1|| decoded.role === 2) {
        // If the role is 1, treat as admin
        next();
      } else {
        return next(createError(403, "Forbidden: You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  

  export const verifyAdminRole = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const { isAdmin, role } = decoded;
  
      if (decoded.role === 1) {
        // If the role is 1, treat as admin
        next();
      } else {
        return next(createError(403, "Forbidden: You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };

  // Username based verifications.
  //username based cockie authentication

  export const verifyAdmin1 = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const username = decoded.username;
     const { isAdmin, username } = decoded;
  
      // Regular expression to match the pattern: starts with BM, IT, HR, EN, BT, AT, PS, or ET followed by 8 numbers
      const adminRegex = /^(ADMIN|AD|AS)\d{8}$/;
  
      if (!adminRegex.test(username)) {
        return next(createError(403, "Forbidden: You are not an Admin"));
      }
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
  
  export const verifyStudent1 = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
     // const username = decoded.username;
     const { isAdmin, username } = decoded;
  
      // Regular expression to match the pattern: starts with BM, IT, HR, EN, BT, AT, PS, or ET followed by 8 numbers
      const studentRegex = /^(BM|IT|HR|EN|BT|AT|PS|ET)\d{8}$/;
      const adminRegex = /^(ADMIN|AD|AS)\d{8}$/;
  
      if (!(studentRegex.test(username) || adminRegex.test(username))) {
        return next(createError(403, "Forbidden: You are not a student"));
      }
      
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };

  export const verifyStaff1 = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "Unauthorized: Token not provided"));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      //const username = decoded.username;
      const { isAdmin, username } = decoded;
  
      // Regular expression to match the pattern: starts with BM, IT, HR, EN, BT, AT, PS, or ET followed by 8 numbers
      const studentRegex = /^(LE|SE|PRO|DR)\d{8}$/;
      const adminRegex = /^(ADMIN|AD|AS)\d{8}$/;
  
      if (!(studentRegex.test(username)||adminRegex.test(username))) {
        return next(createError(403, "Forbidden: You are not a staff"));
      }
      next();
    } catch (error) {
      return next(createError(401, "Unauthorized: Invalid token"));
    }
  };
