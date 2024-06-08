export function VersionCompare(version1, version2) {
  var x = version1.split('.');
  var y = version2.split('.');

  for (let i = 0; i < 5; i++) {
    var a = x[i] !== undefined ? x[i] : 0;
    var b = y[i] !== undefined ? y[i] : 0;
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
  }

  return 0;
}
