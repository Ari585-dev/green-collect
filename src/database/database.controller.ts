import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('get-users')
  async getUsers() {
    return await this.databaseService.getUsers();
  }
}
