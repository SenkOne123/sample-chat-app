import { AppService, User } from './app.service';
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    getAllUsers(): User[];
}
