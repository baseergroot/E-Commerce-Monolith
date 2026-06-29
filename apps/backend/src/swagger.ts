import swaggerAutogen from 'swagger-autogen';

const outputFilePath = 'public/swagger-output.json';
const inputFile = 'routes/helper.ts';

swaggerAutogen(outputFilePath, [inputFile], {}); 