import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('')
export class MainController {

    constructor(private mainService: MainService) {
    }

    @Get('')
    public async mainPage(): Promise<string> {
        return await this.mainService.getMainPage();
    }
}
