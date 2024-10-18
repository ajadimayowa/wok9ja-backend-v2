import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Wok9ja',
      version: '1.0.0',
      description: 'API documentation for wok9ja',
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);