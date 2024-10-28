import { CanActivate, ExecutionContext, Injectable, Inject } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import axios from "axios";
import { Observable } from "rxjs";
import { ConfigType } from "@nestjs/config";
import FortyTwoOauthConfig from "../../config/ft-oauth.config";
import { AuthService } from "../../auth.service";

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard("ft") {}