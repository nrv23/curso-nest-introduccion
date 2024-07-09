

export const EnvConfig = () => ({
    environments: process.env.NODE_ENV || 'dev',
    MONGOD: process.env.MONGOD,
    PORT: process.env.PORT,
    POKE_API: process.env.POKE_API,
});