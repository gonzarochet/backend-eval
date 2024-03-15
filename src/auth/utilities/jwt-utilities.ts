import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class JwtUtilities {


    constructor(
        private jwtService: JwtService,
        @Inject(REQUEST) private readonly request : Request,

    ) { }


    public async getId(): Promise<string> {

        try {

            const token = this.extractTokenFromHeader();

            const payload = await this.getPayload(token)

            return payload.id;

        } catch (error) {
            throw new UnauthorizedException(error.message)
        }

    }



    async getPayload(token: string) {
        return await this.jwtService.verifyAsync<JwtPayload>(
            token, { secret: process.env.JWT_SEED }
        )
    }

    async refreshToken(refreshToken: string): Promise<string | null> {

        const decoded = this.jwtService.verify(refreshToken); // Verificar el token de refresco
        if (!decoded) {
            return null; // Si el token es inválido, devuelve null
        }

        const userId = decoded['id']; // Obtener el ID del usuario del token decodificado

        // Implementar lógica para verificar si el usuario sigue siendo válido (opcional)

        const newToken = this.jwtService.sign({ id: userId }); // Generar un nuevo token de acceso

        return newToken;
    }

    public extractTokenFromHeader(): string | undefined {
        const [type, token] = this.request.headers['authorization']?.split(' ') ?? [];
        return (type === 'Bearer') ? token : undefined;
    }


    public getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload)
        return token;
    }
}