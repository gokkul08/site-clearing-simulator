interface AuthConfigs {
    AUTH0_CLIENT_ID: string | undefined;
    AUTH0_CLIENT_SECRET?: string | undefined;
    AUTH0_AUDIENCE: string | undefined;
    AUTH0_SCOPE: string | undefined;
    AUTH0_DOMAIN: string | undefined;
    REDIRECT_URI: string | undefined;
    POST_LOGOUT_REDIRECT_URI: string | undefined;
    SESSION_COOKIE_SECRET?: string | undefined;
    SESSION_COOKIE_LIFETIME?: string | undefined;


}

// Settings are exposed to the Server
export const config: AuthConfigs = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
};

// // Settings are exposed to the Client
// const windowDefinedConfigs: AuthConfigs = {
//     AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//     AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
//     AUTH0_SCOPE: process.env.AUTH0_SCOPE,
//     AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//     REDIRECT_URI: process.env.REDIRECT_URI,
//     POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
// }

// export const config = typeof window === 'undefined' ? windowUndefinedConfigs : windowDefinedConfigs;