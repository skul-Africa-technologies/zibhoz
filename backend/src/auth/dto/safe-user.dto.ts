import { Expose } from 'class-transformer';
import { IsNumber, IsEmail, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../interfaces/jwt-payload.interface';

export class SafeUserDto {
  @Expose()
  @IsNumber()
  id!: number;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @Expose()
  @IsDate()
  createdAt!: Date;

  @Expose()
  @IsDate()
  updatedAt!: Date;

  @Expose()
  @IsOptional()
  isEmailVerified?: boolean;
}
