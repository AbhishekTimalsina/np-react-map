export function doContains(list, item) {
  if (!list || !item) return false;
  return list.includes(item);
}
