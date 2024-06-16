import objectEquality from './objectsEquality';

export default function arraysEquality(a: any[], b: any[]) {
  a.sort();
  b.sort();

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (!objectEquality(a[i], b[i])) {
      console.log(a[i], b[i])
      return false
    };
  }
  return true;
}