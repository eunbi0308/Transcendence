import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-oauth2';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FortyTwoOAuthStrategy extends PassportStrategy(Strategy, '42') {
    constructor(configService: ConfigService) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${configService.get<string>(
                'ft_client_id',
            )}&redirect_uri= ${configService.get<string>(
                'ft_callback',
            )}&response_type=code`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: configService.get<string>('ft_client_id'),
            clientSecret: configService.get<string>('ft.client_secret'),
            callbackURL: configService.get<string>('ft_callback'),
        });
    }

    async validate(accessToken: string, refreshToken: string) {
        try {
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);
            return accessToken;
        } catch (error) {
            console.log(error);
        }
    }
}