import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/types/request-user';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
	constructor(private readonly recipeService: RecipeService) {}

	@Post('create')
	@UseGuards(JwtAuthGuard)
	async create(@Body() createRecipeDto: CreateRecipeDto, @Req() req: RequestWithUser) {
		const userId = req.user.id;
		const recipe = await this.recipeService.create(createRecipeDto, userId);

		return {
			message: 'Recipe created successfully',
			data: recipe,
		};
	}

	@Public()
	@Get('all')
	async findAll() {
		const recipes = await this.recipeService.findAll();
		return {
			message: 'Recipes fetched successfully',
			data: recipes,
		};
	}

	@Public()
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const recipe = await this.recipeService.findOne(id);
		return {
			message: 'Recipe fetched succesfully',
			data: recipe,
		};
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto, @Req() req: RequestWithUser) {
		const recipe = await this.recipeService.findOne(id);
		if (recipe.createdBy.id !== req.user.id) {
			throw new ForbiddenException('You are not allowed to update this recipe');
		}

		const updated = await this.recipeService.update(id, updateRecipeDto);

		return {
			message: 'Recipe updated successfully',
			data: updated,
		};
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
		const recipe = await this.recipeService.findOne(id);
		if (recipe.createdBy.id !== req.user.id) {
			throw new ForbiddenException('You are not allowed to delete this recipe');
		}

		await this.recipeService.remove(id);

		return {
			message: 'Recipe deleted successfully',
		};
	}
}
