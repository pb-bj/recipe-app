import { IsOptional, IsString } from 'class-validator';

export class NutritionInfoDto {
	@IsOptional()
	@IsString()
	calories?: string;

	@IsOptional()
	@IsString()
	protein?: string;

	@IsOptional()
	@IsString()
	carbs?: string;

	@IsOptional()
	@IsString()
	fat?: string;
}
