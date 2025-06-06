import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SearchRecipeDto } from './dto/search-recipe.dto';
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

	async toggleFavouriteRecipes(recipeId: string, userId: string) {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ['favourite_recipes'],
		});

		if (!user) throw new NotFoundException('User not found');

		const recipe = await this.recipeRepository.findOne({ where: { id: recipeId } });
		if (!recipe) throw new NotFoundException('Recipe not found');

		const alreadyFavorited = user.favourite_recipes.some((r) => r.id === recipe.id);

		if (alreadyFavorited) {
			user.favourite_recipes = user.favourite_recipes.filter((r) => r.id !== recipe.id);
			await this.userRepository.save(user);
			return {
				message: 'Removed from favorites',
				isFavorite: false,
			};
		} else {
			user.favourite_recipes.push(recipe);
			await this.userRepository.save(user);
			return {
				message: 'Added to favorites',
				isFavorite: true,
			};
		}
	}

	async getUserFavorites(userId: string): Promise<Recipe[]> {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ['favourite_recipes'],
		});

		if (!user) throw new NotFoundException('User not found');

		return user.favourite_recipes;
	}

	async searchRecipesMatching(searchRecipes: SearchRecipeDto) {
		const { ingredients, category } = searchRecipes;
		const candidate = await this.recipeRepository.find({
			where: category ? { category } : {},
		});

		const userSet = ingredients.map((x) => x.toLowerCase().trim());

		// subset-checking every candidate
		const matchingRecipes = candidate.filter((recipe) => recipe.ingredients.map((x) => x.toLowerCase().trim()).every((req) => userSet.includes(req)));

		if (matchingRecipes.length === 0) {
			if (!category) {
				throw new NotFoundException('No matching recipes found for the selected ingredients.');
			} else {
				throw new NotFoundException('No matching recipes found for the selected category and ingredients.');
			}
		}

		return matchingRecipes;
	}
}
