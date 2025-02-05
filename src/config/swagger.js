const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project PTLink API',
      version: '1.0.0',
      description: 'API documentation for PTLink',
    },
    servers: [
        {
          url: "/", 
          description: "API server",
        },
      ],
  },
  apis: ['./src/routers/*.js',
    path.resolve(__dirname, 'swaggerComponents.yaml'),
  ], // 라우트 파일에서 Swagger 주석을 가져옴
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;