class Log {
   ok(str) { console.log('\x1b[32m%s\x1b[0m', str); return this; }
   err(str) { console.log('\x1b[31m%s\x1b[0m', str); return this; }
   info(str) { console.log('\x1b[36m%s\x1b[0m', str); return this; }
   warn(str) { console.log('\x1b[33m%s\x1b[0m', str); return this; }
}

module.exports = new Log()