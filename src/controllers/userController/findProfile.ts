import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // <-- ঠিকভাবে import করা হলো
import ProfileModel from '../../models/userModel/schemas';
import { refresh_key } from '../../../secret';

interface MyJwtPayload extends jwt.JwtPayload {
  id: string;
  email: string;
}

const findProfile = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    console.log("BBBBBBBBBBBB");

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token missing. Please log in.',
      });
    }

    console.log("EEEEEEEE RefreshToken: " + refreshToken);

    // Token verify
    let decoded: MyJwtPayload;
    try {
      decoded = jwt.verify(refreshToken, refresh_key) as MyJwtPayload;
    } catch (err: any) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token. Verification failed.',
      });
    }

    console.log("CCCCCCCC Decoded:", decoded);

    if (!decoded || !decoded.email) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token payload.',
      });
    }

    // Find profile by email
    const profile = await ProfileModel.findOne({ email: decoded.email });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully.',
      data: profile,
    });

  } catch (error: any) {
    console.error('Internal error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};

export default findProfile;
