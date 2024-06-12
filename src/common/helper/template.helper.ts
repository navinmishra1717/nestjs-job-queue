import { readFileSync } from "fs";
import * as ejs from "ejs";
import path from "path";

export const getTemplate = (
  templateName: string,
  data: { [key: string]: any },
) => {
  console.log(__dirname, "dirname");
  const templatePath = path.join(__dirname, `../templates/${templateName}.ejs`);
  console.log(2222222222222);

  console.log(templatePath, "templatePath");
  const template = readFileSync(templatePath, "utf-8");
  const content = ejs.render(template, data);
  console.log(content, "content");
  return content;
};
