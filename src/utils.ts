export function textAbbreviation(text: string) {
  const Abbreviation = text
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return `${text} (${Abbreviation})`;
}

export function log(message: string) {
  if (process.env.NODE_ENV === "devlopment") {
    console.log(message);
  }
}
