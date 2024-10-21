'use strict';

var https = require('https');
var fs = require('fs');

function download(url, callback) {
  https.get(url, function (res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on("end", function () {
      callback(data);
    });

  }).on("error", function () {
    callback(null);
  });
}
var categories = {};

download('https://cdn.jsdelivr.net/gh/github/gemoji@master/db/emoji.json', function (data) {
  parse(data);
  parse_categories();
});

function parse(data) {
  const json = JSON.parse(data);

  var string = 'public let emojiList: [String: String] = [\n'

  json.forEach(function (item) {
    if (typeof item.aliases === "undefined"
      || typeof item.emoji === "undefined"
      || item.emoji == "undefined") {
      return;
    }

    const itemString = '  "' + item.aliases[0] + '": "' + item.emoji + '",\n'
    string = string + itemString

    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push(item);
  })

  string = string + ']'

  fs.writeFileSync('../Sources/Emojis.swift', string);
};

const formatEmoji = (emoji) => {
  return `Emoji(
    value: "${emoji.emoji}", 
    description: "${emoji.description}", 
    aliases: [${emoji.aliases.map(alias => `"${alias}"`).join(", ")}], 
    tags: [${emoji.tags.map(tag => `"${tag}"`).join(", ")}]
  )`
}

const formatCategory = (category) => {
  return `Category(name: "${category}", emojis: [\n${categories[category].map(formatEmoji).join(",\n")}\n])`
}


function parse_categories() {
  var string = 'public let emojiCategories: [Category] = [\n'
  string += Object.keys(categories).map(function (category) {
    return formatCategory(category)
  }).join(",\n")


  string = string + '\n]'

  fs.writeFileSync('../Sources/Categories.swift', string);
};
