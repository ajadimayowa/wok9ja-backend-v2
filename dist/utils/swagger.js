"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
exports.swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
