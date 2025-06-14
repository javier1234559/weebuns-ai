/* eslint-disable */
import { defaultConfig } from "swagger-typescript-api-es";

export default defaultConfig({
  name: "swagger-types.ts",
  output: "./src/services",
  url: "http://localhost:8080/api-json", // json = docs + json
  // url: 'https://neutral-kathrine-weebuns-b3fea564.koyeb.app/api-json',
  httpClientType: "axios",
});
