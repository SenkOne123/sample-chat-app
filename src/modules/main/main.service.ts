import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {

    public async getMainPage(): Promise<string> {
        return 'Hello world';
    }
}
