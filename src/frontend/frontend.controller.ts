import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get('/')
  getRoot(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
  }

  @Get('/login')
  getLogin(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
  }

  @Get('/register')
  getRegister(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
  }

  @Get('/userview')
  getView(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'userview.html'));
  }
}
