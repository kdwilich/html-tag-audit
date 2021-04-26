# html-tag-audit

A tool to audit all html files in a given directory and output their tags and attributes.

## Usage

Run this command from the directory you want to start the audit on:

```bash
npx html-tag-audit
```

Or define the directory to start in (`-sd`/`--start-dir`):

```bash
npx html-tag-audit -sd ./dir/to/start
```

The default behavior is to ignore html tags and obvious angular tags as this project was built to audit angular apps. Change the blacklist if an alternative output is desired (`-B`/`--blacklist`):

```bash
# accepted values: all, ng, html, none
# skip over html tags and attributes:
npx html-tag-audit --blacklist html
```

View [tag blacklist](https://github.com/kdwilich/html-tag-audit/blob/master/src/blacklists/tag-blacklist.js) and [attributes blacklist](https://github.com/kdwilich/html-tag-audit/blob/master/src/blacklists/attribute-blacklist.js)

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

### Example

A file exists as `./html-files/test.html` and contains:
```html
<app-html-tag (onclick)="clickme()" [disabled]="false"></app-html-tag>
<app-html-tag styleclass="example-class" randAttribute="someValue"></app-html-tag>
```

Executing `npx html-tag-audit -sd ./html-files` results in this output:

```json
# html-tag-audit.json
{
  "app-html-tag": {
    "count": 2,
    "attributes": [
      "(onclick)",
      "[disabled]",
      "styleclass",
      "randattribute"
    ]
  }
}
```

Or to output as a markdown file instead, run `npx html-tag-audit -sd ./html-files -ft md`:

```md
# html-tag-audit.md
|Tag|Count|Attributes|
|---|---:|---|
|app-html-tag|2|(onclick),[disabled],styleclass,randattribute|
```

Preview:
|Tag|Count|Attributes|
|---|---:|---|
|app-html-tag|2|(onclick),[disabled],styleclass,randattribute|