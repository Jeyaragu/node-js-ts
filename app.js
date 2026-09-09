// main.js
const { Worker } = require('node:worker_threads');

function runHeavyTask(data) {
  return new Promise((resolve, reject) => {
    // Spin up a new thread executing worker.js
    const worker = new Worker('./worker.js', { workerData: data });
    // Listen for the result from the worker
    worker.on('message', resolve);
    // Handle any runtime errors inside the worker
    worker.on('error', reject);
    // Handle unexpected worker exit
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function main() {
  console.log("Starting main thread... (This remains responsive)");
  try {
    const result = await runHeavyTask(10); 
    console.log(`Result from worker: ${result}`);
  } catch (error) {
    console.error(`Worker error: ${error.message}`);
  }
}

main();
