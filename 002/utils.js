export const isSafe = (arr) => {
  let direction = null;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1];
    const isGradual = Math.abs(diff) > 0 && Math.abs(diff) <= 3;
    const currentDirection = Math.sign(diff);
    direction = direction ?? currentDirection;
    if (!isGradual || currentDirection !== direction) {
      return false;
    }
  }

  return true;
}