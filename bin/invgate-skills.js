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

function unpackSdw(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Archivo no encontrado: ${inputPath}`);
    process.exit(1);
  }
  const defaultOut = outputPath || inputPath.replace(/\.sdw$/i, '') + '.json';
  const b64 = fs.readFileSync(inputPath, 'utf8').trim();
  const jsonStr = Buffer.from(b64, 'base64').toString('utf8');
  const parsed = JSON.parse(jsonStr);
  fs.writeFileSync(defaultOut, JSON.stringify(parsed, null, 2), 'utf8');
  console.log(`\n✨ Workflow extraído correctamente en: ${defaultOut}`);
  console.log(`  Nombre: ${parsed.name}`);
  console.log(`  Nodos: ${Object.keys(parsed.items || {}).length}\n`);
}

function packSdw(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Archivo no encontrado: ${inputPath}`);
    process.exit(1);
  }
  const defaultOut = outputPath || inputPath.replace(/\.json$/i, '') + '.sdw';
  const jsonContent = fs.readFileSync(inputPath, 'utf8');
  JSON.parse(jsonContent);
  const b64 = Buffer.from(jsonContent, 'utf8').toString('base64');
  fs.writeFileSync(defaultOut, b64, 'utf8');
  console.log(`\n✨ Archivo .sdw generado correctamente en: ${defaultOut}\n`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'install';

  if (command === 'list') {
    listSkills();
    return;
  }

  if (command === 'sdw') {
    const subCommand = args[1];
    const inputFile = args[2];
    const outputFile = args[3];

    if (subCommand === 'unpack') {
      if (!inputFile) {
        console.error('❌ Debes especificar el archivo .sdw a desempaquetar.');
        process.exit(1);
      }
      unpackSdw(inputFile, outputFile);
      return;
    }

    if (subCommand === 'pack') {
      if (!inputFile) {
        console.error('❌ Debes especificar el archivo .json a empaquetar.');
        process.exit(1);
      }
      packSdw(inputFile, outputFile);
      return;
    }

    console.log('\nUso de sdw:');
    console.log('  npx invgate-skills sdw unpack <archivo.sdw> [archivo.json]');
    console.log('  npx invgate-skills sdw pack <archivo.json> [archivo.sdw]\n');
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
  console.log('  npx invgate-skills list');
  console.log('  npx invgate-skills sdw unpack <archivo.sdw> [archivo.json]');
  console.log('  npx invgate-skills sdw pack <archivo.json> [archivo.sdw]\n');
}

main();
