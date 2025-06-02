import { RecipeCategory } from 'src/common/enums/recipe-category.enum';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NutritionInfoDto } from '../dto/nutrition.Info.dto';

@Entity()
export class Recipe {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'text', array: true })
	ingredients: string[];

	@Column({ type: 'text', array: true })
	instructions: string[];

	@Column()
	image_url: string;

	@Column({ type: 'enum', enum: RecipeCategory })
	category: RecipeCategory;

	@Column({ type: 'json', nullable: true })
	nutritional_information?: NutritionInfoDto;

	@Column()
	servings: string;

	@Column()
	prep_time: string;

	@Column()
	cook_time: string;

	@Column()
	total_time: string;

	@ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
	createdBy: User;

	@ManyToMany(() => User, (user) => user.favourite_recipes)
	favouriteBy: User[];

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}
