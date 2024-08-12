import {IEnv} from "./IEnv";

const env: IEnv = {
    auth: {
        jwtSecret: process.env.JWT_SECRET || "",
        jwtExpiration: process.env.JWT_EXPI || ""
    },
    publishers: {
        seminuevos: {
            email: process.env.SN_EMAIL || "",
            password: process.env.SN_PASSWORD || "",
            url: process.env.SN_URL || ""
        },
        mercadolibre: {
            email: process.env.ML_EMAIL || "",
            password: process.env.ML_PASSWORD || "",
            url: process.env.ML_URL || ""
        }
    }
};

export default env;
