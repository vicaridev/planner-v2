import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString, IsUUID } from 'class-validator';
import { Activity } from 'src/activities/interface/activity.interface';
import { Link } from 'src/links/interface/link.interface';
import {
  createUserResponseExample,
  createUserResponseExample2,
} from 'src/users/dto/examples/createUser';
import { UserDto } from 'src/users/dto/user.dto';

export class Trip {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Paris' })
  @IsString()
  destination: string;

  @ApiProperty({ example: '2024-09-15T10:00:00Z' })
  @IsDateString()
  starts_at: Date;

  @ApiProperty({ example: '2024-09-25T10:00:00Z' })
  @IsDateString()
  ends_at: Date;

  @ApiProperty()
  @IsBoolean()
  is_confirmed: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  owner_id: string;

  @ApiProperty({ example: createUserResponseExample })
  owner: UserDto;

  @ApiProperty({ type: [UserDto], example: [createUserResponseExample2] })
  participants: UserDto[];

  @ApiProperty({ type: [Activity] })
  activities: Activity[];

  @ApiProperty({ type: [Link] })
  links: Link[];
}
