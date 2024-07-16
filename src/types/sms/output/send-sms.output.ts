import { ApiProperty } from '@nestjs/swagger';

export type SendSmsResponse = {
  success: 'ok' | 'ko';
  message: string;
};



export class SendSmsResponseSwaggerSchema {
  @ApiProperty({ example: "ok", description: 'Indicates if the SMS was sent successfully.' })
  success: boolean;

  @ApiProperty({ example: 'SMS sent successfully', description: 'A message describing the result.' })
  message: string;
}