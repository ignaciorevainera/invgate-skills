#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SKILLS_SOURCE_DIR = path.join(__dirname, '..', 'skills');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function listSkills() {
  console.log('\n📦 Skills disponibles en invgate-skills:\n');
  if (!fs.existsSync(SKILLS_SOURCE_DIR)) {
    console.log('No se encontraron skills.');
    return;
  }

  const skills = fs.readdirSync(SKILLS_SOURCE_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

  skills.forEach(skill => {
    console.log(`  - ${skill}`);
  });
  console.log('');
}

function getTargetDir(target) {
  const home = process.env.HOME || process.env.USERPROFILE;

  switch (target) {
    case 'antigravity':
      return path.join(home, '.gemini', 'config', 'skills');
    case 'agents':
      return path.join(process.cwd(), '.agents', 'skills');
    case 'claude':
      return path.join(process.cwd(), '.claude', 'skills');
    default:
      return null;
  }
}

function performInstall(target) {
  const targetDir = getTargetDir(target);

  if (!targetDir) {
    console.error(`❌ Destino no reconocido: "${target}". Opciones válidas: antigravity, agents, claude.`);
    process.exit(1);
  }

  console.log(`\n🚀 Instalando skills en: ${targetDir}...`);

  const skills = fs.readdirSync(SKILLS_SOURCE_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);

  for (const skill of skills) {
    const src = path.join(SKILLS_SOURCE_DIR, skill);
    const dest = path.join(targetDir, skill);
    copyDirRecursive(src, dest);
    console.log(`  ✓ Instalada skill: ${skill}`);
  }

  console.log('\n✨ ¡Instalación completada exitosamente!\n');
}

function askTargetAndInstall() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n¿Dónde deseas instalar las skills de InvGate?');
  console.log('1) Antigravity Global (~/.gemini/config/skills/)');
  console.log('2) Proyecto actual (.agents/skills/)');
  console.log('3) Claude Code local (.claude/skills/)');
  console.log('4) Cancelar\n');

  rl.question('Selecciona una opción [1-4]: ', (answer) => {
    rl.close();
    switch (answer.trim()) {
      case '1':
        performInstall('antigravity');
        break;
      case '2':
        performInstall('agents');
        break;
      case '3':
        performInstall('claude');
        break;
      default:
        console.log('Operación cancelada.');
        break;
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'install';

  if (command === 'list') {
    listSkills();
    return;
  }

  if (command === 'install') {
    const targetIdx = args.indexOf('--target');
    if (targetIdx !== -1 && args[targetIdx + 1]) {
      performInstall(args[targetIdx + 1]);
    } else {
      askTargetAndInstall();
    }
    return;
  }

  console.log('\nUso:');
  console.log('  npx invgate-skills [install] [--target antigravity|agents|claude]');
  console.log('  npx invgate-skills list\n');
}

main();
