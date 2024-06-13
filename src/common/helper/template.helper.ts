import { readFileSync } from "fs";
import * as ejs from "ejs";
import * as path from "path";

export const getTemplate = (
  templateName: string,
  data: { [key: string]: any },
) => {
  const templatePath = path.resolve(
    __dirname,
    `../../templates/${templateName}.ejs`,
  );

  const template = readFileSync(templatePath, "utf-8");
  const content = ejs.render(template, data);
  return content;
};
