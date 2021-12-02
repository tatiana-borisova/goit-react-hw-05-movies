export default function colorMaker() {
  return '#' + (Math.random().toString(16) + '000000').substring(2, 8) + '80';
}
