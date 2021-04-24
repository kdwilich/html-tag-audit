const { blacklist, logTags } = require('../options.js').options;

const NG_TAGS = [
  'ng-template',
  'ng-container',
  'ng-container',
  'ng-content'
];

const SVG_TAGS = [
  "a",
  "animate",
  "animatemotion",
  "animatetransform",
  "audio",
  "canvas",
  "circle",
  "clippath",
  "defs",
  "desc",
  "discard",
  "ellipse",
  "feblend",
  "fecolormatrix",
  "fecomponenttransfer",
  "fecomposite",
  "feconvolvematrix",
  "fediffuselighting",
  "fedisplacementmap",
  "fedistantlight",
  "fedropshadow",
  "feflood",
  "fefunca",
  "fefuncb",
  "fefuncg",
  "fefuncr",
  "fegaussianblur",
  "feimage",
  "femerge",
  "femergenode",
  "femorphology",
  "feoffset",
  "fepointlight",
  "fespecularlighting",
  "fespotlight",
  "fetile",
  "feturbulence",
  "filter",
  "foreignobject",
  "g",
  "iframe",
  "image",
  "line",
  "lineargradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialgradient",
  "rect",
  "script",
  "set",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "text",
  "textpath",
  "title",
  "tspan",
  "unknown",
  "use",
  "video",
  "view"
]

const HTML_TAGS = [
  'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'bgsound',
  'big',
  'blink',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'class',
  'code',
  'col',
  'colgroup',
  'content',
  'data',
  'datalist',
  'dd',
  'decorator',
  'del',
  'details',
  'dfn',
  'dir',
  'div',
  'dl',
  'dt',
  'element',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'isindex',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'listing',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'nobr',
  'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'plaintext',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'shadow',
  'small',
  'source',
  'spacer',
  'span',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'xmp'
];

const none = [];
const all = [...NG_TAGS, ...SVG_TAGS, ...HTML_TAGS];
const ng = NG_TAGS;
const html = [...SVG_TAGS, ...HTML_TAGS];

const print = (dir) => {
  console.log('Blacklisted tags:');
  console.dir(dir, {'maxArrayLength': null});
}

if (logTags) {
  switch (logTags) {
    case 'all':
      console.log('All blacklisted tags:');
      console.dir(all, {'maxArrayLength': null});
      break;
    case 'ng':
      console.log('Ng blacklisted tags:');
      console.dir(ng, {'maxArrayLength': null});
      break;
    case 'html':
      console.log('Html blacklisted tags:');
      console.dir(html, { 'maxArrayLength': null });
      break;
    default:
      console.log('Unknown tag blacklist. Use: [all, ng, html]');
      break;
  }
}

if (blacklist) {
  switch (blacklist) {
    case 'all':
      exports.tagBlacklist = all;
      break;
    case 'none':
      exports.tagBlacklist = none;
      break;
    case 'ng':
      exports.tagBlacklist = ng;
      break;
    case 'html':
      exports.tagBlacklist = html;
      break
    default:
      exports.tagBlacklist = all;
      break;
  }
}
