import { ApiProperty } from "@nestjs/swagger";

export class GenerateApiKeyWithRootDto {
  @ApiProperty({ description: "Root key for generating API key" })
  rootKey: string;
}

export class SetApiKeyDto {
  @ApiProperty({ description: "API key to set" })
  key: string;

  @ApiProperty({ description: "Value associated with the API key" })
  value: string;
}
