export default function theFirstLetterToUpperCase(word) {
  return word.replace(/(^\w{1})/, match => match.toUpperCase());
}
