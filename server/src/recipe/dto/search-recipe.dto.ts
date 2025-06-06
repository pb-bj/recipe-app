import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecipeCategory } from 'src/common/enums/recipe-category.enum';

export class SearchRecipeDto {
	@IsArray()
	@IsString({ each: true })
	ingredients: string[];

	@IsOptional()
	@IsEnum(RecipeCategory)
	category?: RecipeCategory;

	// @IsOptional()
	// @ValidateNested()
	// @Type(() => NutritionInfoDto);
	// protein?: string;

	// @IsOptional()
	// @IsString()
	// @ValidateNested()
	// @Type(() => NutritionInfoDto);
	// calories?: string;

	// @IsOptional()
	// @IsString()
	// @ValidateNested()
	// @Type(() => NutritionInfoDto);
	// carbs?: string;

	// @IsOptional()
	// @IsString()
	// @ValidateNested()
	// @Type(() => NutritionInfoDto);
	// fat?: string;
}
