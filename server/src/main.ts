import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
