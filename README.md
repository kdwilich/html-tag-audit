# html-tag-audit

A tool to audit all html files in a given directory that gets tags and attributes.

## Usage

Run this command from the directory you want to start the audit on:

```bash
npx html-tag-audit
```

Or define the directory to start in (`-sd`/`--start-dir`):

```bash
npx html-tag-audit -sd ./dir/to/start
```

The default behavior is to ignore default html tags and obvious angular tags as this project was built to audit angular apps. Change the blacklist if an alternative output is desired (`-B`/`--blacklist`):

```bash
# accepted values: all, ng, html, none
# skip over html tags and attributes:
npx html-tag-audit --blacklist html
```



## Available Flags

Flags are also viewable with the `--help` flag

- `-sd, --start-dir <dir>` - change starting directory (default: `./`)
- `-nf, --no-file-output` - disable file output
- `-fd, --file-output-dir <dir>` - change output file directory (default: `./`)
- `-fn, --filename <filename>` - change output file name (default: `html-tag-audit`)
- `-ft, --filetype <filetype>` - change output file type [`json`, `md`, `csv`, `txt`] (default: `json`)
- `-lr, --log-results` - log audit results
- `-lp, --log-path` - log current path
- `-B, --blacklist <list>` - change audit blacklist [`all`, `none`, `ng`, `html`] (default: `all`)
- `-lt, --log-tags <list>` - log blacklisted tags without running audit [`all`, `ng`, `html`]
- `-la, --log-attributes <list>` - log blacklisted attributes without running audit [`all`, `ng`, `html`]

## Output

Running the command with no flags will output the audit results to a file named `html-tag-audit.json`. The file type can be changed by passing an accepted type to the `-ft` flag.
