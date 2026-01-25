import * as fs from "fs";
import * as path from "path";

import { isMain, ROOT } from "./utils.mjs";

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function parseFrontmatter(content) {
  if (!content.startsWith("---")) {
    return { data: {}, body: content };
  }

  const endIndex = content.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { data: {}, body: content };
  }

  const raw = content.slice(3, endIndex).trim();
  const body = content.slice(endIndex + 4).replace(/^\s+/, "");
  const data = {};
  let currentKey = null;

  raw.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith("- ") && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(trimmed.slice(2).trim());
      return;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!value) {
      data[key] = [];
      currentKey = key;
      return;
    }

    data[key] = value;
    currentKey = key;
  });

  return { data, body };
}

function listMarkdownFiles(baseDir) {
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

function buildSkillsTable(skills) {
  const rows = skills.map((skill) => {
    return `| ${skill.name || ""} | ${skill.description || ""} |`;
  });

  return [
    "# Skills",
    "",
    "| Name | Description |",
    "| --- | --- |",
    ...rows,
    "",
  ].join("\n");
}

function buildAgentsTable(agents) {
  const rows = agents.map((agent) => {
    return `| ${agent.name || ""} | ${agent.description || ""} |`;
  });

  return [
    "# Agents",
    "",
    "| Name | Description |",
    "| --- | --- |",
    ...rows,
    "",
  ].join("\n");
}

export function generateDocs({ writeFiles } = { writeFiles: true }) {
  const skillsDir = path.join(ROOT, "skills");
  const agentsDir = path.join(ROOT, "agents");

  const skillFiles = listMarkdownFiles(skillsDir).filter((file) =>
    file.endsWith("SKILL.md"),
  );
  const agentFiles = listMarkdownFiles(agentsDir);

  const skills = skillFiles
    .map((filePath) => {
      const { data } = parseFrontmatter(readFile(filePath));
      return {
        name: data.name || path.basename(filePath),
        description: data.description || "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const agents = agentFiles
    .map((filePath) => {
      const { data } = parseFrontmatter(readFile(filePath));
      return {
        name: data.name || path.basename(filePath),
        description: data.description || "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const skillsMd = buildSkillsTable(skills);
  const agentsMd = buildAgentsTable(agents);

  if (writeFiles) {
    fs.writeFileSync(path.join(ROOT, "skills.md"), skillsMd);
    fs.writeFileSync(path.join(ROOT, "agents.md"), agentsMd);
  }

  return { skillsMd, agentsMd };
}

if (isMain(import.meta.url)) {
  generateDocs({ writeFiles: true });
}
