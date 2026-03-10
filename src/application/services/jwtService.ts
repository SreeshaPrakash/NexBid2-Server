import { injectable } from 'tsyringe';

import jwt from 'jsonwebtoken';
import { IJwtService } from './../../domain/interfaces/serviceInterface/jwtServiceInterface';
import { TokenType } from '../../shared/token';
import ms from "ms";
import { logger } from '../../infrastructure/logging/logger';


export interface TokenPayload {
  userId: string
  email: string
  roles: string[]
  activeRole: string
  type: TokenType
}

@injectable()
export class JwtService implements IJwtService {
  private _accessTokenSecret: string;
  private _refreshTokenSecret: string;
  private _accessTokenExpiry: string;
  private _refreshTokenExpiry: string;

  constructor() {
    this._accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
    this._refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;
    // ! => states that it won't never be undefined or null  ( or else config it )
    this._accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || "15m";
    this._refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || "7d";

    if (!this._accessTokenSecret || !this._refreshTokenSecret) {
      throw new Error(
        "JWT secrets not configured in environment variables",
      );
    }

  }

  generateAccessToken(payload: Omit<TokenPayload, "type">): string {
    return jwt.sign(
      { ...payload, type: TokenType.ACCESS },
      this._accessTokenSecret,
      { expiresIn: this._accessTokenExpiry as ms.StringValue },
    );
  }

  generateRefreshToken(payload: Omit<TokenPayload, "type">): string {
    return jwt.sign(
      { ...payload, type: TokenType.REFRESH },
      this._refreshTokenSecret,
      { expiresIn: this._refreshTokenExpiry as ms.StringValue },
    );
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this._accessTokenSecret) as TokenPayload;
    } catch (error) {
      logger.error('Access token verification failed');
      throw error;
    }
  }



  verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this._refreshTokenSecret) as TokenPayload;
    } catch (error) {
      logger.error("Refresh token verification failed");
      throw error;
    }
  }



}
