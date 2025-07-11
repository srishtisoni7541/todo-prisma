import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: any): Promise<string>;
    validateToken(token: string): Promise<any>;
}
