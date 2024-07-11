

export const EnvConfig = () => ({
    environments: process.env.NODE_ENV || 'dev',
    MONGODB: process.env.MONGODB,
    PORT: process.env.PORT,
    POKE_API: process.env.POKE_API,
});