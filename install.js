#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'jianzhen-perspective';
const TARGET_DIR = path.join(os.homedir(), '.claude', 'skills', SKILL_NAME);
const SOURCE_DIR = path.dirname(require.main.filename);

const FILES = [
  'SKILL.md',
  'references/research/01-writings.md',
  'references/research/02-conversations.md',
  'references/research/03-expression-dna.md',
  'references/research/04-external-views.md',
  'references/research/05-decisions.md',
  'references/research/06-timeline.md',
];

function copyFile(rel) {
  const src = path.join(SOURCE_DIR, rel);
  const dest = path.join(TARGET_DIR, rel);
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

console.log('\n✦ 简媜写作视角 Skill 安装程序\n');

let count = 0;
for (const file of FILES) {
  if (copyFile(file)) {
    console.log(`  ✓  ${file}`);
    count++;
  } else {
    console.warn(`  ✗  ${file}（找不到，已跳过）`);
  }
}

console.log(`\n✅ 已安装 ${count} 个文件 → ${TARGET_DIR}`);
console.log('   在 Claude Code 中运行 /reload-plugins 或重启以激活 Skill。\n');
