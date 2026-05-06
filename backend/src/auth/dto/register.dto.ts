import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../interfaces/jwt-payload.interface';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255)
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)',
  })
  password!: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be STUDENT, TEACHER, or ADMIN' })
  role?: Role;
}
