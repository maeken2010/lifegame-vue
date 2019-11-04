export function calcNextGeneration(statesArray) {
  const size = statesArray.length;
  const nextStatesArray = [...Array(size)].map(() => Array(size));
  // 速度重視
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const neighborhood = calcNeighborhood(statesArray, i, j);
      const currentState = statesArray[i][j];
      nextStatesArray[i][j] = calcnNextStateByNeighborhood(
        currentState,
        neighborhood
      );
    }
  }
  return nextStatesArray;
}

function calcNeighborhood(a, i, j) {
  return [
    accessState(a, i - 1, j - 1),
    accessState(a, i - 1, j),
    accessState(a, i - 1, j + 1),
    accessState(a, i, j - 1),
    accessState(a, i, j + 1),
    accessState(a, i + 1, j - 1),
    accessState(a, i + 1, j),
    accessState(a, i + 1, j + 1)
  ];
}

function calcnNextStateByNeighborhood(currentState, neighborhood) {
  const aliveNumber = neighborhood.filter(s => s).length;
  if (currentState) {
    if (2 <= aliveNumber && aliveNumber <= 3) {
      return true;
    } else if (aliveNumber <= 1 || 4 <= aliveNumber) {
      return false;
    }
  } else {
    if (aliveNumber === 3) {
      return true;
    }
    return false;
  }
}

function accessState(a, i, j) {
  // 範囲外はdead扱いにしてるけど，後でトーラス的な位置関係にする
  if (a[i] !== undefined) {
    if (a[i][j] !== undefined) {
      return a[i][j];
    }
    return false;
  }
  return false;
}
