import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const outputFilePath = 'public/swagger-output.json';
const inputFile = 'routes/helper.ts';

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined");
}

console.log(process.env.BASE_URL);

swaggerAutogen(outputFilePath, [inputFile], {
  title: "Ecom Monolith API",
  description: "API Documentation for Ecom Monolith",
  version: "1.0.0",
  host: process.env.BASE_URL,
  schemes: [`${process.env.NODE_ENV === 'production' ? 'https' : 'http'}`], // For localhost: http://, for production: https://
  info: {
    title: "Ecom Monolith API",
    description: "API Documentation for Ecom Monolith",
  },
}); 