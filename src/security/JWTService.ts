import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SECRET)
        private jwtSecret: string,
        @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
        private jwtExpiresIn: string,
    ) {}

    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(`Erro na verificação do token: 'token' é null`);
        }

        let userProfile: UserProfile;

        try {
            // decode user profile from token
            const decodedToken = await verifyAsync(token, this.jwtSecret);
            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            userProfile = Object.assign(
                {id: '', [securityId]: '', name: ''},
                {id: decodedToken.id, [securityId]: decodedToken.id, name: decodedToken.name},
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(`Erro na verificação do token: ${error.message}`);
        }

        return userProfile;
    }

    async generateToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized('Erro ao gerar token: userProfile é null');
        }

        // Generate a JSON Web Token
        let token: string;
        try {
            token = await signAsync(userProfile, this.jwtSecret, {
                expiresIn: Number(this.jwtExpiresIn),
            });
        } catch (error) {
            throw new HttpErrors.Unauthorized(`Erro no encoding do token: ${error}`);
        }

        return token;
    }
}
