// worker.js
const { parentPort, workerData } = require("node:worker_threads");
// Simulate a CPU-intensive task (e.g., Fibonacci)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate using the data passed from the main thread
const result = fibonacci(workerData);

// Send the final result back to the main thread
parentPort.postMessage(result);
