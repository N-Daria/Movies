const regExEn = /[\w\W][^а-я]/mi;
const regExRu = /[\W\d][^a-z]/mi;
const allowedCorsUrl = ['http://localhost:3000'];

module.exports = {
  regExEn,
  regExRu,
  allowedCorsUrl,
};
