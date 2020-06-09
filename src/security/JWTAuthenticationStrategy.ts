import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/context';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';

//https://loopback.io/doc/en/lb4/Authentication-Tutorial.html
export class JWTAuthenticationStrategy implements AuthenticationStrategy {
    name: string = 'jwt';

    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public tokenService: TokenService,
    ) {}

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        const token: string = this.extractCredentials(request);
        const userProfile: UserProfile = await this.tokenService.verifyToken(token);
        return userProfile;
    }

    extractCredentials(request: Request): string {
        if (!request.headers.authorization) {
            throw new HttpErrors.Unauthorized(`Header Authorization não encontrado.`);
        }

        // for example: Bearer xxx.yyy.zzz
        const authHeaderValue = request.headers.authorization;

        if (!authHeaderValue.startsWith('Bearer')) {
            throw new HttpErrors.Unauthorized(`Header Authorization não é do tipo 'Bearer'.`);
        }

        //split the string into 2 parts: 'Bearer ' and the `xxx.yyy.zzz`
        const parts = authHeaderValue.split(' ');
        if (parts.length !== 2)
            throw new HttpErrors.Unauthorized(
                `O valor do header Authorization tem muitas partes. Deve seguir o padrão: 'Bearer xx.yy.zz' onde xx.yy.zz é um token JWT válido.`,
            );
        const token = parts[1];

        return token;
    }
}
