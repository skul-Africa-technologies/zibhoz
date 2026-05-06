/**
 * User entity definition.
 *
 * This is a TypeScript type/interface representing the User model.
 * The actual database schema is defined in prisma/schema.prisma using Prisma.
 */
export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  verificationToken: string | null;
  verificationExpiry: Date | null;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';
