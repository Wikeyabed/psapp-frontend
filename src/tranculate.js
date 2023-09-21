export function truncate(input, numberOfCharacters) {
  if (input.length > numberOfCharacters) {
    return input.substring(0, numberOfCharacters) + "...";
  }
  return input;
}
