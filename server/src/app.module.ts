import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'postgres',
				url: process.env.DATABASE_URL,
				autoLoadEntities: true,
				synchronize: true,
				ssl: { rejectUnauthorized: false },
			}),
		}),
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
