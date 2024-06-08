export function titleAbbreviation(title: string) {
  const Abbreviation = title
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return Abbreviation;
}
