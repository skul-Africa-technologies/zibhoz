export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}
