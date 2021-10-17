const N = 81;

function isValid(result, p, v) {
  let y = Math.floor(p / 9);
  let x = p % 9;
  for (let i = 0; i < 9; i++) {
    if (result[9 * i + x] === v || result[9 * y + i] === v) {
      return false;
    }
  }
  let block_y = Math.floor(y / 3);
  let block_x = Math.floor(x / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (result[9 * (3 * block_y + i) + (3 * block_x + j)] == v) {
        return false;
      }
    }
  }
  return true;
}

function solveJs(problem) {
  let result = new Array(N);
  result.fill(0);

  let stack = [];
  for (let i = 0; i < N; i++) {
    if (problem[i] > 0) {
      result[i] = problem[i];
    } else if (stack.length === 0) {
      stack.push([false, i, 1]);
    }
  }

  let is_failing = false;
  while (stack.length > 0) {
    let t = stack.pop();
    let is_back = t[0];
    let p = t[1];
    let v = t[2];
    // 戻りがけの処理
    if (is_back && is_failing) {
      result[p] = 0;
      if (v < 9) {
        stack.push([false, p, v + 1]);
      }
      continue;
    }
    // 行きがけの処理
    if (!isValid(result, p, v)) {
      if (v < 9) {
        stack.push([false, p, v + 1]);
      } else {
        is_failing = true;
      }
      continue;
    }
    is_failing = false;
    result[p] = v;
    stack.push([true, p, v]);
    let is_updated = false;
    for (let i = p + 1; i < N; i++) {
      if (result[i] === 0) {
        stack.push([false, i, 1]);
        is_updated = true;
        break;
      }
    }
    if (!is_updated) {
      break;
    }
  }
  return result;
}
