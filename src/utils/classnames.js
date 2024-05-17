export function cn(...classes) {
  let result = "";

  for (const c of classes) {
    if (typeof c !== "string") continue;

    result += c + " ";
  }

  return result.trim();
}
