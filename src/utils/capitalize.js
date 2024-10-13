String.prototype.toCapitalizeCase = function() {
  const words = this.split(' ');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(' ');
};

export { };
