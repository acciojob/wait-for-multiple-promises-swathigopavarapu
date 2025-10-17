//your JS code here. If required.
const output = document.getElementById("output");

// Add the loading row with an ID for Cypress to detect
output.innerHTML = `
  <tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Helper function to create a promise with a random delay (1–3 seconds)
function createPromise(name) {
  return new Promise((resolve) => {
    const delay = (Math.random() * 2 + 1).toFixed(3); // Random between 1 and 3 seconds
    setTimeout(() => {
      resolve({ name, time: parseFloat(delay) });
    }, delay * 1000);
  });
}

const start = performance.now();
// Create 3 promises
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];
// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  const end = performance.now();
  const total = ((end - start) / 1000).toFixed(3);
  // Clear loading row
  output.innerHTML = "";
  // Add each promise result to the table
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.name}</td>
      <td>${res.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${total}</strong></td>
  `;
  output.appendChild(totalRow);
});
