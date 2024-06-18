import objectEquality from './objectsEquality';

export default function arraysEquality(a: any[], b: any[]) {
  a.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  });
  b.sort((a, b) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  });

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (!objectEquality(a[i], b[i])) {
      return false
    };
  }
  return true;
}