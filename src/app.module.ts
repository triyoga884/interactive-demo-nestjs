import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
