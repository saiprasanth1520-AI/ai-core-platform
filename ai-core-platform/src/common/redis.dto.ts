import { ApiProperty } from "@nestjs/swagger";

export class InteractionDto {
  @ApiProperty({
    description: "The user's prompt/question",
    example: "what do you suggest for the good breakfast?",
  })
  prompt: string;

  @ApiProperty({
    description: "The system's response",
    example: "A good breakfast is essential to start the day off right!...",
  })
  response: string;

  @ApiProperty({
    description: "Timestamp of the interaction",
    example: "2025-02-18T21:33:59.209Z",
  })
  timestamp: string;
}

export class GetInteractionsQueryDto {
  @ApiProperty({
    description: "Number of interactions to retrieve",
    example: 10,
    required: false,
    default: 10,
  })
  limit?: number;
}
