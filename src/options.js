const pjson = require('../package.json');
const program = require('commander');

program
  .option('-sd, --start-dir <dir>', 'change starting directory', './')
  .option('-nf, --no-file-output', 'disable file output')
  .option('-fd, --file-output-dir <dir>', 'change output file directory', './')
  .option('-fn, --filename <filename>', 'change output file name', 'html-tag-audit')
  .option('-ft, --filetype <filetype>', 'change output file type [json, md, csv, txt]', 'json')
  .option('-s, --sort <type>', 'sort results [tag, count]', 'tag')
  .option('-lr, --log-results', 'log audit results')
  .option('-lp, --log-path', 'log current path')
  .option('-B, --blacklist <list>', 'change audit blacklist [all, none, ng, html]', 'all')
  .option('-lt, --log-tags <list>', 'log blacklisted tags without running audit [all, ng, html]')
  .option('-la, --log-attributes <list>', 'log blacklisted attributes without running audit [all, ng, html]');
  
program.version(pjson.version, '-v, --version', 'output the current version');

program.parse(process.argv);

let opts = program.opts();

const addSlash = str => str.substr(-1) === '/' ? str : str + '/';
opts.startDir = addSlash(opts.startDir);
opts.fileOutputDir = addSlash(opts.fileOutputDir);

exports.options = opts;