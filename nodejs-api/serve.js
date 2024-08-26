const express = require("express");
const app = express();
const routers = require("./routers");
const HttpStatusCode = require("http-status-codes");
const { authorization, validator } = require("./middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("./package.json");
const { environment } = require("./utils/config");

app.get("/", function (req, res) {
  res.json("IML DataSoft NodeJS API");
});

if (environment === "dev")
  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsdoc({
        swaggerDefinition: {
          openapi: "3.0.1",
          info: {
            title: "IML DataSoft NodeJS Back-End Service",
            version: version,
          },
          components: {
            securitySchemes: {
              apiKey: {
                type: "apiKey",
                name: "x-api-key",
                in: "header",
              },
            },
          },
          security: [
            {
              apiKey: [],
            },
          ],
        },
        apis: ["./swagger.yml"],
      })
    )
  );

app.use(authorization.apiKeyControl);
app.use(validator.request);

app.use(routers.authRouter);

app.use((req, res, next) => {
  res.status(HttpStatusCode.NOT_FOUND).send("404 NOT FOUND");
});

module.exports = app;
