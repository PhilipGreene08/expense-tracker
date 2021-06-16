const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//     { id: 1, text: 'flowers', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem(`transactions`))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//add transactions to DOM list 
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    item.classList.add(transaction.amount < 0 ? '-' : '+')

    item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `

    list.appendChild(item)
}

//update the balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => {
        return transaction.amount
    })

    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const income = amounts
        .filter(amount => amount > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const expense = (amounts.filter(amount => amount <= 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

    const balanceTotal = +total

    balance.textContent = `$${balanceTotal.toFixed(2)}`
    money_plus.textContent = `$${income}`
    money_minus.textContent = `$${expense}`

    console.log(total);
    console.log(balanceTotal);
}

//add transaction
function addTransaction(e) {
    e.preventDefault()
    if (text.value === `` || amount.value === ``) {
        alert(`Please Add Text`)
    } else {
        const transaction = {
            id: makeID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction)

        updateValues()

        updateLocalStorage()

        text.value = ``
        amount.value = ``
    }
}

//function to make ID
function makeID() {
    return Math.floor(Math.random() * 1000000000)
}

//update local storage
function updateLocalStorage () {
    localStorage.setItem('transactions', JSON.stringify(transactions)) 
    
}

//init app
function init() {
    list.innerHTML = ``
    transactions.forEach(addTransactionDOM)
    updateValues()
}

//remove item from transaction history
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()

    init()
}

init()

form.addEventListener('submit', addTransaction)
