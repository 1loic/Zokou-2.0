const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU1xTWdUaE1hNE9PeWloaGtZMU1yN2lRYlhHNzVzclBqZU5jT3VJc0ltYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1p4UHVZYzRlL1cyTllZUHRRSHJIQlpSVW1qc1YrcTJndzhQa2lTSDhEVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTStIWlcwWGdmSnJyM3ZWcEJVV0JKWjluTUdoQkl5Zi8zQTl0SGJxaDBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUdUxWbG81NjcwSWxZWTVUVXNoZkRpWlJuK01sa2FtelNuT0xIOUV4aEVNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9FQ0tzY3MzZzcva2E5eUpqWmpWeXROQkNGVVhDU0NlTVBLeUIrOFZCMEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkU0d1JOd0wxd0dQU3ZaNmtBTk5FT0EzY0IwQ1lBekFXZTUzcE9WeXNyek09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVBzK2UreS9ldFdEZGEyYkJJcHMrZXdFU0NlTFNiUTBGT2JJUkwrTWJtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjVLalZieGpUTmt6QjlpdU5aM1JaZmFkV2ZxYlhIL0M5d2swZEVRc0R3ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpkMkFFaW1lenBLV3F0UTdEZlFkVTZ4Y3puT3pCbDRzMkpCMktQMnBJdE1TN1l6bjhBTE9zQ05VaDJQRjZWa3l3SzkrUzRLK3kyQkFONlpQaDZ2amh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMyLCJhZHZTZWNyZXRLZXkiOiJZRndHYkFDN3RYSW43OWpVTVBsQ09SSVBDUDkyS3VOZ2ZjS01EeGw4dFhBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTVQ4SUZKNmZUa21TY0N6bUdwYmdDZyIsInBob25lSWQiOiJmNmM3Y2IwYS02YTM4LTQ2OGUtOTlkNy0yZDNhNmY3NjlmYTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1l5eTgycSswOFloSEtaL3c5eDhyTVZBQlA4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IncrWmxWbytaMWFScHFwZ0VoWWtvRWdSMmJidz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJXQkVHWEFaVCIsIm1lIjp7ImlkIjoiMjM3NjU0MDQyMzAzOjM0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlNPUyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzMweG9rRkVMSDh4N2tHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNndoWFE0NUdMNnk3bVFwb0FUN2FwWVJYZitjdHpzZllFRzVNcUtUa1JBVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSmE4QS9kVm9WYzJyZ2JnMGhMQ0NVUU5TN01iQkgwODgzMEt2a2tDbVZpSzc0VkRrdnZwWm1QZjhXUmk5dkpnYTJ6dDNaM0tzd0pVS21sV29pbEM2Qmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjhYbmNmVzZDd3A1TkllNFg2ZEZhUjdYajY3bUhXbXhyNWtkaUV0R3BDaGpJZWNJd2E4RFg0OTU0ay9RTGRRazNjcWpHbmhFL3RQM3hZWDBacDd6b2dRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjU0MDQyMzAzOjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVzSVYwT09SaStzdTVrS2FBRSsycVdFVjMvbkxjN0gyQkJ1VEtpazVFUUYifX1dLCJwbGF0Zm9ybSI6InNtYmEifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "SOS",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'SOS',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
