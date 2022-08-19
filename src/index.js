#!/usr/bin/env node
"use strict";
const fs = require('fs');
const glob = require('glob');
const htmlparser2 = require('htmlparser2');
const { tagBlacklist } = require('./blacklists/tag-blacklist.js');
const { attrBlacklist } = require('./blacklists/attribute-blacklist.js');
const { 
  startDir,
  fileOutput,
  fileOutputDir,
  filename,
  filetype,
  logResults,
  logPath,
  logTags,
  logAttributes,
  sort
} = require('./options').options;
const tagObj = {};


function error(message) {
  console.error('Error:', message);
  process.exit(1);
}

function asJSON(obj) {
  return JSON.stringify(obj, null, 2);
}

function asMD(obj) {
  const table = ['|Tag|Count|Attributes|', '|---|---:|---|'];

  for (const [tagName, { count, attributes }] of Object.entries(obj)) {
    let row = `|${tagName}|${count}|${attributes}|`;
    table.push(row);
  }

  return table.join('\r\n');
}

function asCSV(obj) {
  const table = ['Tag,Count,Attributes'];

  for (const [tagName, { count, attributes }] of Object.entries(obj)) {
    let row = `${tagName},${count},"${attributes}"`;
    table.push(row);
  }

  return table.join('\r\n');
}

function formatObj(obj) {
  let formattedObj = '';
  switch (filetype) {
    case ('json' || 'txt'):
      formattedObj = asJSON(obj);
      break;
    case 'md':
      formattedObj = asMD(obj);
      break;
    case 'csv':
      formattedObj = asCSV(obj);
      break;
    default:
      error('Unsupported or missing file type. Supported types include: json, md, csv, txt');
      break;
  }
  return formattedObj;
}

function writeToFile(obj) {
  const filePath = fileOutputDir + filename + '.' + filetype;

  console.log('writing to ' + filePath);
  fs.writeFile(filePath, formatObj(obj), (err) => { if (err) { error(err); return; } });
}

function sortByQty(obj) {
  return Object.fromEntries(
    Object.entries(obj).sort(([t1, a], [t2, b]) => {
      a.attributes.sort();
      if (a.count === b.count) {
        return t1 > t2 ? 1 : -1;
      }
      return b.count - a.count;
    })
  );
}

function sortByAlpha(obj) {
  return Object.keys(obj).sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];

      return acc;
    }, {});
}

const getUnion = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

function handleTagObj(tag, attrs) {
  if (tag in tagObj) {
    tagObj[tag]['count'] += 1;
    tagObj[tag]['attributes'] = getUnion(tagObj[tag]['attributes'], attrs);
  } else {
    tagObj[tag] = {
      count: 1,
      attributes: attrs
    };
  }
}

const parser = new htmlparser2.Parser({
  onopentag(tag, attrs) {
    if(tag.indexOf('\xa0') > -1) {
      const brokenTag = tag.split('\xa0');
      tag = brokenTag[0];
    }
    if (!tagBlacklist.includes(tag)) {
      if (attrs) {
        attrs = Object.keys(attrs)
          .filter(attr => !attrBlacklist.includes(attr) && attr.indexOf('#') === -1)
      }
      handleTagObj(tag, attrs);
    }
  },
  onerror(err) {
    error(err);
  }
}, {decodeEntities: true})

function readFiles() {
  const paths = glob.sync(startDir + '**/*.html');

  for (const path of paths) {
    if (logPath) { console.log(path); }
    const content = fs.readFileSync(path);
    parser.parseComplete(content);
  }

  const sortedObj = sort === 'tag' ? sortByAlpha(tagObj) : sortByQty(tagObj);
  if (logResults) { console.log(sortedObj); }
  if (fileOutput) { writeToFile(sortedObj); }
  console.log('done');
}

if (!(logTags || logAttributes)) {
  readFiles();
}
