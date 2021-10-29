const encodeUtf8 = (string) => {
  // Função de Lucas Rodrigues Turma 08, recomendada por Michael Caxias Turma 14B.
  const stringUTF = unescape(encodeURIComponent(string));
  return stringUTF.replace(/&quot;|&#039;/gi, '\'');
};

export default encodeUtf8;
