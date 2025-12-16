import { AppService } from "./app.service";
import { GetResponseDto } from "./app.dto";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getResponse(getResponseDto: GetResponseDto): Promise<string>;
}
