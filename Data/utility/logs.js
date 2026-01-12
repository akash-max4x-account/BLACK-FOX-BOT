const chalk = require('chalk');
const moment = require('moment-timezone');
const fs = require('fs-extra');
const path = require('path');

const logDir = path.join(__dirname, '../system/database/botdata/logs');
fs.ensureDirSync(logDir);

const BRAND_NAME = "BLACK FOX";
const BOT_VERSION = "0.1";
const BRAND_WHATSAPP = "+8801980871152";
const BRAND_EMAIL = "akash.hasan.blackfox@gmail.com";

const getTime = () => moment().tz('Asia/Dhaka').format('hh:mm:ss A');
const getDate = () => moment().tz('Asia/Dhaka').format('DD/MM/YYYY');
const getDateTime = () => `${getTime()} || ${getDate()}`;

const writeLog = (type, message) => {
  const date = moment().tz('Asia/Dhaka').format('YYYY-MM-DD');
  const logFile = path.join(logDir, `${date}.log`);
  const logEntry = `[${getDateTime()}] [${type}] ${message}\n`;
  fs.appendFileSync(logFile, logEntry);
};

const printBanner = () => {
  console.log('');
  console.log(chalk.cyan('  ╔═══════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('  ║') + chalk.yellow.bold('  ██████╗ ██████╗ ██╗  ██╗    ██████╗  ██████╗ ████████╗') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.yellow.bold('  ██╔══██╗██╔══██╗╚██╗██╔╝    ██╔══██╗██╔═══██╗╚══██╔══╝') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.magenta.bold('  ██████╔╝██║  ██║ ╚███╔╝     ██████╔╝██║   ██║   ██║   ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.magenta.bold('  ██╔══██╗██║  ██║ ██╔██╗     ██╔══██╗██║   ██║   ██║   ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.yellow.bold('  ██║  ██║██████╔╝██╔╝ ██╗    ██████╔╝╚██████╔╝   ██║   ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.yellow.bold('  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ╠═══════════════════════════════════════════════════╣'));
  console.log(chalk.cyan('  ║') + chalk.green(' Version: ') + chalk.white.bold(BOT_VERSION) + chalk.green('                                           ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.green(' WhatsApp: ') + chalk.white.bold('+8801980871152') + chalk.green('                           ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.green(' Email: ') + chalk.white.bold('akash.hasan.blackfox@gmail.com') + chalk.green('                      ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ╚═══════════════════════════════════════════════════╝'));
  console.log('');
};

const logs = {
  banner: printBanner,
  
  info: (title, ...args) => {
    const message = args.join(' ');
    console.log(chalk.blue(`[${getTime()}]`), chalk.yellow(`[${title}]`), chalk.blue(message));
    writeLog('INFO', `[${title}] ${message}`);
  },

  success: (title, ...args) => {
    const message = args.join(' ');
    console.log(chalk.yellow(`[${getTime()}]`), chalk.blue.bold(`[${title}]`), chalk.yellow.bold(message));
    writeLog('SUCCESS', `[${title}] ${message}`);
  },

  error: (title, ...args) => {
    const message = args.join(' ');
    console.log(chalk.red(`[${getTime()}]`), chalk.redBright(`[${title}]`), chalk.red(message));
    writeLog('ERROR', `[${title}] ${message}`);
  },

  warn: (title, ...args) => {
    const message = args.join(' ');
    console.log(chalk.yellow(`[${getTime()}]`), chalk.yellowBright(`[${title}]`), chalk.yellow(message));
    writeLog('WARN', `[${title}] ${message}`);
  },

  command: (name, user, threadID) => {
    console.log(
      chalk.blue(`[${getTime()}]`),
      chalk.yellow.bold('[BLACK-FOX-COMMAND]'),
      chalk.blue.bold(`${name}`),
      chalk.yellow('by'),
      chalk.blue(user),
      chalk.yellow('in'),
      chalk.blue(threadID)
    );
    writeLog('COMMAND', `${name} by ${user} in ${threadID}`);
  },

  event: (type, threadID) => {
    console.log(
      chalk.yellow(`[${getTime()}]`),
      chalk.blue.bold('[BLACK-FOX-EVENT]'),
      chalk.yellow.bold(type),
      chalk.blue('in'),
      chalk.yellow(threadID)
    );
    writeLog('EVENT', `${type} in ${threadID}`);
  },
  
  getBrand: () => ({ name: BRAND_NAME, whatsapp: BRAND_WHATSAPP, email: BRAND_EMAIL })
};

module.exports = logs;
