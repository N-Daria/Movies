const regExUrl = /^(http(s)?:\/{2})((w{3}\.)?)(([\w-]{1,})(\.))+([\w\-\/\.~:?#\[\]@!$&'\(\)*\+,;=]+)()?([\w])?$(#)?/im;
const regExEn = /[\w\W][^а-я]/mi;
const regExRu = /[\W\d][^a-z]/mi;

module.exports = { regExUrl, regExEn, regExRu };
