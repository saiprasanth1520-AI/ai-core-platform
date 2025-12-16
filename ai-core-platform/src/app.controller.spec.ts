import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GetResponseDto } from "./app.dto";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return a response from Bedrock", async () => {
      const dto = new GetResponseDto();
      dto.prompt = "Test prompt";
      const response = await appController.getResponse(dto);
      expect(response).toBeDefined(); // Adjust this based on expected response
    });
  });
});
