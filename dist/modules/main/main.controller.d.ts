import { MainService } from './main.service';
export declare class MainController {
    private mainService;
    constructor(mainService: MainService);
    mainPage(): Promise<string>;
}
