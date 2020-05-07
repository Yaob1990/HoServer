export default () => ({
  dataBaseConfig: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.PORT, 10),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  },
});
