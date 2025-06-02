import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async create(createRecipeDto: CreateRecipeDto, userId: string) {
		const user = await this.userRepository.findOne({ where: { id: userId } });
		if (!user) {
			throw new NotFoundException('User not found');
		}

		const recipe = this.recipeRepository.create({
			...createRecipeDto,
			createdBy: user,
		});

		return this.recipeRepository.save(recipe);
	}

	async findAll() {
		return this.recipeRepository.find({
			relations: ['createdBy', 'favouriteBy'],
			order: { createdAt: 'DESC' },
		});
	}

	async findOne(id: string) {
		const recipe = await this.recipeRepository.findOne({
			where: { id },
			relations: ['createdBy', 'favouriteBy'],
		});

		if (!recipe) {
			throw new NotFoundException(`recipe of id ${id} not found`);
		}
		return recipe;
	}

	async update(id: string, updateRecipeDto: UpdateRecipeDto) {
		const recipe = await this.recipeRepository.findOne({
			where: { id },
			relations: ['createdBy'],
		});

		if (!recipe) throw new NotFoundException(`Recipe with ID ${id} not found`);

		Object.assign(recipe, updateRecipeDto);

		return this.recipeRepository.save(recipe);
	}

	async remove(id: string) {
		const recipe = await this.recipeRepository.findOne({ where: { id } });

		if (!recipe) {
			throw new NotFoundException(`Recipe with ID ${id} not found`);
		}

		await this.recipeRepository.remove(recipe);
		return { message: 'Recipe deleted successfully' };
	}
}
