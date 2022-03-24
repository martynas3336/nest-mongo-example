import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { config } from './config';

@ApiTags('system')
@Controller()
export class AppController {
  @Get('healthcheck')
  @HttpCode(200)
  async healthcheckControllerWithOutPrefix(@Headers() headers) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return {
      environment: `${config.nodeEnv || 'unknown'}`,
      dateTime: `${new Date()}`,
      isHealthy: true,
      heap: `The script uses approximately ${Math.round(used * 100) / 100} MB`,
      node: `${process.version}`,
      incommingHeaders: JSON.stringify(headers),
    };
  }
}
