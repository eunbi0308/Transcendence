import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-oauth2";
import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import FortyTwoOauthConfig from "../config/ft-oauth.config"
import refreshJwtConfig from '../config/refresh-jwt.config';
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { User, user_status } from '../../users/user.entity';
import { access } from "fs";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft'){
    http: any;
    constructor(
        @Inject(FortyTwoOauthConfig.KEY)
        private fortyTwoConfiguration:ConfigType<typeof FortyTwoOauthConfig>,
        private authService:AuthService
    ){
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${fortyTwoConfiguration.clientID}&redirect_uri=${fortyTwoConfiguration.callbackURL}&response_type=code`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: fortyTwoConfiguration.clientID,
            clientSecret: fortyTwoConfiguration.clientSecret,
            callbackURL: fortyTwoConfiguration.callbackURL,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        Logger.warn('!!!warning!!!');
        Logger.error('something went wrong! ');

        console.log('Access token:', accessToken);
        console.log('refresh token:', refreshToken);
        const req = this.http.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}}` },
        });
        console.log({ profile });

        // try {
        //     const { data } = await lastValueFrom(req);
        //     if (!data) throw new exception();
        //     console.log(data);
        //     return data;
        //   } catch (error) {}
      
        //   throw new UnauthorizedException();
        const user = await this.authService.validateFortyTwoUser({
            email: profile.email,
            avatar: profile.avatars[0].value,
            nickname: "",
            is_second_auth_done: false,
            second_auth_code: 0,
            second_auth_email :"",
            ladder_level: 0,
            user_status: user_status.Offline,
        })
        done(null, user)
    }
}