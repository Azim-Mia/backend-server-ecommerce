import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "cookie-parser";
import { access_key, refresh_key } from "../../secret";
import { generateAccessToken } from "../../servises/generateToken";
import { createAccessCookie } from "../../servises/makeCookie";

// Custom payload type
interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = req.cookies?.accessToken;

    console.log("accessToken isLoggedIn Middleware " + accessToken , refreshToken);

    // ✅ যদি access token থাকে
    if (accessToken) {
      try {
        const check = jwt.verify(accessToken, access_key) as MyJwtPayload;
        if (!check) {
          return res.json({ success: false, message: "Wrong token, login again" });
        }
        (req as any).user = check; // চাইলে req.user এ attach করতে পারেন
        return next();
      } catch (err) {
        return res.json({ success: false, message: "Access token invalid or expired" });
      }
    }

    // ✅ যদি refresh token না থাকে
    if (!refreshToken) {
      return res.json({ success: false, message: "No refresh token, login again" });
    }

    // ✅ refresh token verify
    let decoded: MyJwtPayload;
    try {
      decoded = jwt.verify(refreshToken, refresh_key) as MyJwtPayload;
    } catch (err) {
      return res.json({ success: false, message: "Invalid refresh token" });
    }

    if (!decoded?.id || !decoded?.email) {
      return res.json({ success: false, message: "Invalid token payload" });
    }

    // ✅ response header এ email সেট করা
    res.setHeader("email", decoded.email);
    console.log(decoded);

    // ✅ নতুন access token generate
    const token = await generateAccessToken(
      { id: decoded.id, email: decoded.email },
      access_key,
      "10m"
    );

    if (!token) {
      return res.json({ success: false, message: "Failed to create access token" });
    }

    // ✅ access token cookie তে সেট করা
    await createAccessCookie(res, token);

    (req as any).user = decoded;

    return next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
