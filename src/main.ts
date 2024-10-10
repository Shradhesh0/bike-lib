import { NestFactory } from '@nestjs/core' ;
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger
  const options = new DocumentBuilder()
    .setTitle('Bike Library API')
    .setDescription('API documentation for the Bike Library')
    .setVersion('1.0')
    .addTag('bikes')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // The API docs will be available at /api

  await app.listen(3000);
}
bootstrap();
