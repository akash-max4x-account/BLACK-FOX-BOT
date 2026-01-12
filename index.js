const fs = require('fs-extra');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
const appstatePath = path.join(__dirname, 'appstate.json');

let botModule = null;
let botStarted = false;

const BRAND_NAME = "BLACK-FOX";
const BOT_VERSION = "0.1";
const BRAND_WHATSAPP = "+8801980871152";
const BRAND_EMAIL = "akash.black.fox@gmail.com";

function getConfig() {
  try {
    return fs.readJsonSync(configPath);
  } catch {
    return {
      BOTNAME: 'BLACK-FOX',
      PREFIX: '.',
      ADMINBOT: ['100071539569680'],
      TIMEZONE: 'Asia/Dhaka',
      PREFIX_ENABLED: true,
      REACT_DELETE_EMOJI: '😡',
      ADMIN_ONLY_MODE: false,
      AUTO_ISLAMIC_POST: true,
      AUTO_GROUP_MESSAGE: true,
      APPROVE_ONLY: false
    };
  }
}

function saveConfig(config) {
  fs.writeJsonSync(configPath, config, { spaces: 2 });
}

function getAppstate() {
  try {
    return fs.readJsonSync(appstatePath);
  } catch {
    return null;
  }
}

function saveAppstate(appstate) {
  fs.writeJsonSync(appstatePath, appstate, { spaces: 2 });
}

// Start bot
async function startBot() {
  try {
    if (!fs.existsSync(appstatePath)) {
      console.log('❌ AppState not found. Please add appstate.json to start the bot.');
      return;
    }
    
    console.log(`\n╔═══════════════════════════════════════════════════╗`);
    console.log(`║  ██████╗ ██████╗ ██╗  ██╗    ██████╗  ██████╗  ████████╗║`);
    console.log(`║  ██╔══██╗██╔══██╗╚██╗██╔╝    ██╔══██╗██╔═══██╗ ╚══██╔══╝║`);
    console.log(`║  ██████╔╝██║  ██║ ╚███╔╝     ██████╔╝██║   ██║    ██║   ║`);
    console.log(`║  ██╔══██╗██║  ██║ ██╔██╗     ██╔══██╗██║   ██║    ██║   ║`);
    console.log(`║  ██║  ██║██████╔╝██╔╝ ██╗    ██████╔╝╚██████╔╝    ██║   ║`);
    console.log(`║  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝     ╚═╝   ║`);
    console.log(`╠═══════════════════════════════════════════════════╣`);
    console.log(`║                    v${BOT_VERSION}                              ║`);
    console.log(`║ WhatsApp: ${BRAND_WHATSAPP}                           ║`);
    console.log(`║ Email: ${BRAND_EMAIL}                      ║`);
    console.log(`╚═══════════════════════════════════════════════════╝\n`);
    
    console.log('[BOT] Starting BLACK-FOX...');
    
    botModule = require('./black-fox');
    botModule.startBot();
    botStarted = true;
    
    console.log('[BOT] BLACK-FOX is now online! 🚀');
  } catch (error) {
    console.error('❌ Error starting bot:', error.message);
    process.exit(1);
  }
}

// Start the bot immediately
startBot();
