import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Client Saving Application API",
      version: "1.0.0",
      description:
        "API documentation for the Client Saving Application backend.",
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://localhost:5000',
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
        ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };