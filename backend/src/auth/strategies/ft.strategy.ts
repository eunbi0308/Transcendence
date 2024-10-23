import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-oauth2";
import { Inject, Injectable } from "@nestjs/common";
import FortyTwoOauthConfig from "../config/ft-oauth.config"
import { ConfigType } from "@nestjs/config";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft'){
    constructor(
        @Inject(FortyTwoOauthConfig.KEY) private fortyTwoConfiguration:
        ConfigType<typeof FortyTwoOauthConfig>
    ){
        super({
            authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${fortyTwoConfiguration.clientID}&redirect_uri=${fortyTwoConfiguration.callbackURL}&response_type=code`,
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: fortyTwoConfiguration.clientID,
            clientSecret: fortyTwoConfiguration.clientSecret,
            callbakcURL: fortyTwoConfiguration.callbackURL,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile:any, done:VerifyCallback) {
        console.log({ profile });
    }
}