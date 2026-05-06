import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../../auth/interfaces/jwt-payload.interface';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255)
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  password!: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be STUDENT, TEACHER, or ADMIN' })
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsString()
  verificationToken?: string;

  @IsOptional()
  @IsDate()
  verificationExpiry?: Date;
}