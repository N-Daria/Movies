const regExEn = /[\w\W][^а-я]/mi;
const regExRu = /[\W\d][^a-z]/mi;
const allowedCorsUrl = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3002',
  'https://localhost:3002',
];

module.exports = {
  regExEn,
  regExRu,
  allowedCorsUrl,
};
