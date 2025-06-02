import { Exclude } from 'class-transformer';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	@Exclude()
	password: string;

	@Column({ default: 'USER' })
	role: string;

	@Column({ nullable: true })
	avatarUrl?: string;

	@OneToMany(() => Recipe, (recipe) => recipe.createdBy)
	recipes: Recipe[];

	@ManyToMany(() => Recipe, (recipe) => recipe.favouriteBy)
	@JoinTable()
	favourite_recipes: Recipe[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
