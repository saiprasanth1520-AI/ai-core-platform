import { ApiProperty } from "@nestjs/swagger";

export class GetResponseDto {
  @ApiProperty({ description: "Prompt for the response" })
  prompt: string;
}
