import jwt from 'jsonwebtoken';

export async function verifyJwtToken(token: string) {
  try {
    const decodedJwt: string | jwt.JwtPayload | null = jwt.decode(token);

    if (!decodedJwt) {
      return false;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const jwtExpireTimestamp: number | undefined = (
      decodedJwt as jwt.JwtPayload
    ).exp as number;

    return jwtExpireTimestamp > currentTimestamp;
  } catch (error) {
    return false;
  }
}
