import * as fs from "fs";
import * as path from "path";

import { isMain, ROOT } from "./utils.mjs";
import { generateDocs, parseFrontmatter } from "./docgen.mjs";

function listMarkdownFiles(baseDir) {
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    const fullPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath));
      return;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  });

  return files;
}

function ensureFileExists(filePath, errors) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing required file: ${filePath}`);
  }
}

function validateFrontmatter(data, type, filePath, errors) {
  if (!data.name) {
    errors.push(`Missing name in frontmatter: ${filePath}`);
  }
  if (!data.description) {
    errors.push(`Missing description in frontmatter: ${filePath}`);
  }
  if (type === "skill" && !data.command) {
    errors.push(`Missing command in frontmatter: ${filePath}`);
  }
}

function validateSkillsAndAgents(root, errors) {
  const skillFiles = listMarkdownFiles(path.join(root, "skills")).filter(
    (file) => file.endsWith("skill.md"),
  );
  const agentFiles = listMarkdownFiles(path.join(root, "agents"));

  [...skillFiles, ...agentFiles].forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const hasFrontmatter =
      content.startsWith("---") && content.includes("\n---");
    if (!hasFrontmatter) {
      errors.push(`Missing frontmatter in ${filePath}`);
      return;
    }

    const { data } = parseFrontmatter(content);
    validateFrontmatter(
      data,
      filePath.endsWith("skill.md") ? "skill" : "agent",
      filePath,
      errors,
    );
  });
}

function validateDocs(docsDir, errors) {
  const { skillsMd, agentsMd } = generateDocs({ writeFiles: false });

  const skillsPath = path.join(docsDir, "skills.md");
  const agentsPath = path.join(docsDir, "agents.md");

  if (
    !fs.existsSync(skillsPath) ||
    fs.readFileSync(skillsPath, "utf8") !== skillsMd
  ) {
    errors.push(
      "docs/generated/skills.md is out of date. Run `npm run docgen`.",
    );
  }

  if (
    !fs.existsSync(agentsPath) ||
    fs.readFileSync(agentsPath, "utf8") !== agentsMd
  ) {
    errors.push(
      "docs/generated/agents.md is out of date. Run `npm run docgen`.",
    );
  }
}

function validate() {
  const errors = [];

  ensureFileExists(path.join(ROOT, "README.md"), errors);

  validateSkillsAndAgents(ROOT, errors);

  validateDocs(ROOT, errors);

  if (errors.length) {
    console.error("Validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Validation passed.");
}

if (isMain(import.meta.url)) {
  validate();
}
