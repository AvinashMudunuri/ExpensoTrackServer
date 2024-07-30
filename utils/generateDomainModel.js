/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const createFileFromTemplate = (
  templatePath,
  destinationPath,
  replacements
) => {
  const template = fs.readFileSync(templatePath, 'utf8');
  const content = ejs.render(template, replacements);
  fs.writeFileSync(destinationPath, content, 'utf8');
};

const createDomainModelFiles = (modelName, className) => {
  const replacements = { modelName, className };
  const baseDir = path.join(__dirname, '../domain');

  const templatesDir = path.join(__dirname, '../templates');
  const routerDir = path.join(__dirname, '../routes');
  const controllerDir = path.join(__dirname, '../controllers');
  const modelDir = path.join(baseDir, 'models');
  const serviceDir = path.join(baseDir, 'services');
  const repositoryDir = path.join(baseDir, 'repositories');

  // Ensure directories exist
  [modelDir, serviceDir, repositoryDir, controllerDir, routerDir].forEach(
    (dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }
  );

  // Create files from templates
  createFileFromTemplate(
    path.join(templatesDir, 'model.ejs'),
    path.join(modelDir, `${modelName}.js`),
    replacements
  );
  createFileFromTemplate(
    path.join(templatesDir, 'service.ejs'),
    path.join(serviceDir, `${modelName}Service.js`),
    replacements
  );
  createFileFromTemplate(
    path.join(templatesDir, 'repository.ejs'),
    path.join(repositoryDir, `${modelName}Repository.js`),
    replacements
  );
  createFileFromTemplate(
    path.join(templatesDir, 'controller.ejs'),
    path.join(controllerDir, `${modelName}Controller.js`),
    replacements
  );
  createFileFromTemplate(
    path.join(templatesDir, 'routes.ejs'),
    path.join(routerDir, `${modelName}Routes.js`),
    replacements
  );

  console.log(`Created domain model files for ${modelName}`);
};

// Get model name from command-line arguments
const modelName = process.argv[2];
const className = process.argv[3];
if (!modelName) {
  console.error('Please provide a model name');
  process.exit(1);
}
if (!className) {
  console.error('Please provide a class name');
  process.exit(1);
}

createDomainModelFiles(modelName, className);
