import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeniorityModule } from './seniority/seniority.module';
import { TypeModule } from './type/type.module';
import { CountryModule } from './country/country.module';
import { LocationModule } from './location/location.module';
import { JobModule } from './job/job.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        // remove this in production:
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SeniorityModule,
    TypeModule,
    CountryModule,
    LocationModule,
    JobModule,
    TagModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
