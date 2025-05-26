import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrpt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	private readonly logger = new Logger(AuthService.name);

	async validateUser({ username, password }: LoginDto) {
		try {
			const user = await this.userService.findByUsername(username);
			if (!user) {
				this.logger.warn(`User not found : ${username}`);
				throw new UnauthorizedException('Invalid credentials');
			}

			const checkValidPassword = await bycrpt.compare(password, user.password);
			if (!checkValidPassword) {
				this.logger.warn(`Invalid password for user: ${username}`);
				throw new UnauthorizedException('Invalid creadentials');
			}

			// returning user without pwd by removing it
			const { password: _, ...data } = user;
			return data;
		} catch (error) {
			throw new InternalServerErrorException('server unavailable');
		}
	}

	async login(loginDto: LoginDto) {
		const user = await this.validateUser(loginDto);
		const payload = { username: user.username, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		};
	}
}
