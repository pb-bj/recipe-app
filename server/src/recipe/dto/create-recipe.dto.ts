import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RecipeCategory } from 'src/common/enums/recipe-category.enum';
import { NutritionInfoDto } from './nutrition.Info.dto';

export class CreateRecipeDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsArray()
	@IsNotEmpty({ each: true })
	@IsString({ each: true })
	ingredients: string[];

	@IsArray()
	@IsNotEmpty({ each: true })
	@IsString({ each: true })
	instructions: string[];

	@IsString()
	image_url: string;

	@IsEnum(RecipeCategory)
	@IsNotEmpty()
	category: RecipeCategory;

	@IsOptional()
	@ValidateNested()
	@Type(() => NutritionInfoDto)
	nutritional_information: NutritionInfoDto;

	@IsString()
	@IsNotEmpty()
	servings: string;

	@IsString()
	@IsNotEmpty()
	prep_time: string;

	@IsString()
	@IsNotEmpty()
	cook_time: string;

	@IsString()
	@IsNotEmpty()
	total_time: string;
}
