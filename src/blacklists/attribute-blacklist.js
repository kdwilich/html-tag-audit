const { blacklist, logAttributes } = require('../options.js').options;

const NG_ATTRIBUTES = [
  '*ngif',
  'ngif',
  'ngswitch',
  '*ngswitchcase',
  '*ngswitchdefault',
  '*ngfor',
  '(ngmodel)',
  '(ngmodelchange)',
  'ngclass',
  'attr.*',
  'class',
  'class.*',
  'ngstyle',
  'style',
  'style.*',
  'value',
]

const NG_BIND_ATTRIBUTES = NG_ATTRIBUTES.map(attr => '['+attr+']')

const HTML_ATTRIBUTES = [
  'accept',
  'accept-charset',
  'accesskey',
  'action',
  'align',
  'alt',
  'async',
  'autocomplete',
  'autofocus',
  'autoplay',
  'bgcolor',
  'border',
  'charset',
  'checked',
  'cite',
  'class',
  'color',
  'cols',
  'colspan',
  'content',
  'contenteditable',
  'controls',
  'coords',
  'data',
  'data-*',
  'datetime',
  'default',
  'defer',
  'dir',
  'dirname',
  'disabled',
  'download',
  'draggable',
  'enctype',
  'for',
  'form',
  'formaction',
  'headers',
  'height',
  'hidden',
  'high',
  'href',
  'hreflang',
  'http-equiv',
  'id',
  'ismap',
  'kind',
  'label',
  'lang',
  'list',
  'loop',
  'low',
  'max',
  'maxlength',
  'media',
  'method',
  'min',
  'multiple',
  'muted',
  'name',
  'novalidate',
  'onabort',
  'onafterprint',
  'onbeforeprint',
  'onbeforeunload',
  'onblur',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'oncontextmenu',
  'oncopy',
  'oncuechange',
  'oncut',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'onhashchange',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onmousedown',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onoffline',
  'ononline',
  'onpagehide',
  'onpageshow',
  'onpaste',
  'onpause',
  'onplay',
  'onplaying',
  'onpopstate',
  'onprogress',
  'onratechange',
  'onreset',
  'onresize',
  'onscroll',
  'onsearch',
  'onseeked',
  'onseeking',
  'onselect',
  'onstalled',
  'onstorage',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'onunload',
  'onvolumechange',
  'onwaiting',
  'onwheel',
  'open',
  'optimum',
  'pattern',
  'placeholder',
  'poster',
  'preload',
  'readonly',
  'rel',
  'required',
  'reversed',
  'rows',
  'rowspan',
  'sandbox',
  'scope',
  'selected',
  'shape',
  'size',
  'sizes',
  'span',
  'spellcheck',
  'src',
  'srcdoc',
  'srclang',
  'srcset',
  'start',
  'step',
  'style',
  'tabindex',
  'target',
  'title',
  'translate',
  'type',
  'usemap',
  'width',
  'wrap'
]

const none = [];
const all = [...NG_ATTRIBUTES, ...NG_BIND_ATTRIBUTES, ...HTML_ATTRIBUTES];
const ng = [...NG_ATTRIBUTES, ...NG_BIND_ATTRIBUTES];;
const html = [...HTML_ATTRIBUTES];


if (logAttributes) {
  switch (logAttributes) {
    case 'all':
      console.log('All blacklisted attributes:');
      console.dir(all, {'maxArrayLength': null});
      break;
    case 'ng':
      console.log('Ng blacklisted attributes:');
      console.dir(ng, {'maxArrayLength': null});
      break;
    case 'html':
      console.log('Html blacklisted attributes:');
      console.dir(html, { 'maxArrayLength': null });
      break;
    default:
      console.log('Unknown attribute blacklist. Use: [all, ng, html]');
      break;
  }
}

if (blacklist) {
  switch (blacklist) {
    case 'all':
      exports.attrBlacklist = all;
      break;
    case 'none':
      exports.attrBlacklist = none;
      break;
    case 'ng':
      exports.attrBlacklist = ng;
      break;
    case 'html':
      exports.attrBlacklist = html;
      break
    default:
      exports.attrBlacklist = all;
      break;
  }
}