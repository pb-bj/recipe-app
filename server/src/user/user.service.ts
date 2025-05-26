import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrpt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			const existingUserEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
			if (existingUserEmail) throw new ConflictException('Email already exist');

			const salt = await bycrpt.genSalt();
			const hashedPassword = await bycrpt.hash(createUserDto.password, salt);

			const newUser = this.userRepository.create({
				...createUserDto,
				password: hashedPassword,
			});

			return await this.userRepository.save(newUser);
		} catch (error) {
			if (error instanceof ConflictException) {
				throw error;
			}
			throw new InternalServerErrorException('Failed to create user');
		}
	}

	async findByUsername(username: string) {
		return this.userRepository.findOne({
			where: { username },
			select: ['id', 'username', 'password', 'email'],
		});
	}
	async findAll() {
		try {
			const user = await this.userRepository.find();
			return user;
		} catch (error) {
			throw new InternalServerErrorException('Failed to fetch users');
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.userRepository.findOne({ where: { id } });
			if (!user) {
				throw new NotFoundException(`user with the ${id} not found`);
			}

			return user;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new InternalServerErrorException('Failed to fetch user');
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const user = await this.userRepository.preload({
				id,
				...updateUserDto,
			});

			if (!user) {
				throw new NotFoundException(`user with ${id} not found`);
			}

			const updatedUser = await this.userRepository.save(user);
			return updatedUser;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new InternalServerErrorException('Failed to update user');
		}
	}

	async remove(id: string) {
		try {
			const result = await this.userRepository.delete(id);

			if (result.affected === 0) {
				throw new NotFoundException(`User with ID ${id} not found`);
			}

			return { message: `User with ID ${id} successfully deleted` };
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new InternalServerErrorException('Failed to delete user');
		}
	}
}
