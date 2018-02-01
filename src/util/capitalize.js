export default function capitalize(string) {
  return string
    .split("")
    .map(function(l, i) {
      return i === 0 ? l.toUpperCase() : l;
    })
    .join("");
}
