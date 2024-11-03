const balance = document.getElementById("balance-amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();
  
  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  updateBalance();
  
  text.value = "";
  amount.value = "";
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(transaction => {
    const sign = transaction.amount > 0 ? "+" : "-";
    const listItem = document.createElement("li");
    listItem.classList.add("transaction", transaction.amount > 0 ? "plus" : "minus");
    listItem.innerHTML = `
      ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    transactionList.appendChild(listItem);
  });
}

function updateBalance() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expenseTotal = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0).toFixed(2);

  balance.textContent = `$${total}`;
  income.textContent = `+$${incomeTotal}`;
  expense.textContent = `-$${Math.abs(expenseTotal)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  renderTransactions();
  updateBalance();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

renderTransactions();
updateBalance();
form.addEventListener("submit", addTransaction);
