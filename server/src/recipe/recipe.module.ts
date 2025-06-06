import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
	imports: [TypeOrmModule.forFeature([Recipe, User])],
	controllers: [RecipeController],
	providers: [RecipeService],
})
export class RecipeModule {}
