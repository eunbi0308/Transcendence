import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile} from "passport-42";
import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import FortyTwoOauthConfig from "../config/ft-oauth.config";
import { ConfigType } from "@nestjs/config";
import {lastValueFrom} from "rxjs";
import { HttpService } from "@nestjs/axios";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {user_status} from "../../users/user.entity";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft') {
    constructor(
        @Inject(FortyTwoOauthConfig.KEY) private fortyTwoConfiguration: ConfigType<typeof FortyTwoOauthConfig>,
        private httpService: HttpService,
    ) {
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${fortyTwoConfiguration.clientID}&redirect_uri=${fortyTwoConfiguration.callbackURL}&response_type=code`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: fortyTwoConfiguration.clientID,
            clientSecret: fortyTwoConfiguration.clientSecret,
            callbackURL: fortyTwoConfiguration.callbackURL,       // Corrected here
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, cb: any) {
        console.log("accessToken: ", accessToken);
        console.log("refreshToken", refreshToken);
        const req = this.httpService.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
            const { data } = await lastValueFrom(req);
            if (!data) throw new Error('No data');

            const userDto = new CreateUserDto();
            userDto.avatar = data.avatar_url;
            userDto.is_second_auth_done = false;
            userDto.ladder_level = 0;
            userDto.user_status = user_status.Offline;
            userDto.second_auth_code = null;
            userDto.second_auth_email = null;
            userDto.nickname = data.login;
            // console.log({ data });

            if (userDto) cb(null, userDto);
            else cb(null, false);

        throw new UnauthorizedException();
    }
}