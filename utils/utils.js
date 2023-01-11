const regExEn = /[\w\W\s][^а-я]+/mi;
const regExRu = /[а-яА-ЯёЁ\s\w]+/mi;
const allowedCorsUrl = [
  'http://localhost:3000',
  'http://movies.daria.nomoredomains.icu',
  'https://movies.daria.nomoredomains.icu',
];

module.exports = {
  regExEn,
  regExRu,
  allowedCorsUrl,
};
