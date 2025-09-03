//your JS code here. If required.
const output = document.getElementById("output");
output.innerHTML = `
  <tr>
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;
// helper to create a promise that resolves after random delay
function createPromise(name) {
  return new Promise((resolve) => {
    const delay = (Math.random() * 2 + 1).toFixed(3); // random between 1–3
    setTimeout(() => {
      resolve({ name, time: parseFloat(delay) });
    }, delay * 1000);
  });
}
const start = performance.now();
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];
// wait for all promises to resolve
Promise.all(promises).then((results) => {
  const end = performance.now();
  const total = ((end - start) / 1000).toFixed(3);
  output.innerHTML = "";
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.name}</td>
      <td>${res.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${total}</strong></td>
  `;
  output.appendChild(totalRow);
});

