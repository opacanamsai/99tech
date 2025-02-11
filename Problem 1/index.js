function validateInput(n) {
  if (n < 0 || typeof n !== 'number' || !Number.isInteger(n)) {
    throw new Error('Input must be a positive integer');
  }

  if ((n * (n + 1)) / 2 > Number.MAX_SAFE_INTEGER) {
    throw new Error('Input too large');
  }
}

// Implementation using a loop
var sum_to_n_a = function (n) {
  validateInput(n);
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Implementation using the arithmetic formula
var sum_to_n_b = function (n) {
  validateInput(n);
  return (n * (n + 1)) / 2;
};

// Implementation using recursion
var sum_to_n_c = function (n) {
  validateInput(n);
  if (n < 1) return n;
  return n + sum_to_n_c(n - 1);
};

// Test cases
console.log(sum_to_n_a()); // Error: Input must be a positive integer
console.log(sum_to_n_a(2)); // 3
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(123123123)); // RangeError: Maximum call stack size exceeded
console.log(sum_to_n_c(0)); // 0
