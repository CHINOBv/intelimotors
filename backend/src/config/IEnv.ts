export interface IEnv {
    auth: {
        jwtSecret: string;
        jwtExpiration: string;
    };
    publishers: {
        seminuevos: Publisher;
        mercadolibre: Publisher;
    };
}

type Publisher = AuthPlaceholders & {
    url: string;
}

type AuthPlaceholders = {

    email: string;
    password: string;

}
