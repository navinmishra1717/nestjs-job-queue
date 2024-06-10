import { readFileSync } from "fs";
import * as ejs from "ejs";

const getTemplate = (templateName: string, data: { [key: string]: any }) => {
  const templatePath = `/src/common/templates/${templateName}.html`;
  const template = readFileSync(templatePath, "utf-8");
  const content = ejs.render(template, data);
  return content;
};
