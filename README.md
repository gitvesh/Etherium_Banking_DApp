# 💰 Ethereum Banking DApp  

A decentralized banking system built on **Ethereum blockchain** using **Solidity, Truffle, Ganache, and Web3.js**.  
Users can deposit, withdraw, and check balances securely on the blockchain.

## **🚀 Features**
- ✅ Decentralized banking system  
- ✅ Connects to **Metamask** for secure transactions  
- ✅ Stores balances securely on **Ethereum blockchain**  
- ✅ Uses **Ganache** for local blockchain development  
- ✅ Frontend built with **HTML, CSS, and JavaScript (Web3.js)**  

---

## **📚 Project Structure**
```
eth-banking/
│── contracts/           # Smart contracts (Solidity)
│── migrations/          # Truffle migration scripts
│── test/                # Smart contract tests
│── frontend/            # Frontend code (HTML, CSS, JS)
│── .github/workflows/   # GitHub Actions for deployment
│── truffle-config.js    # Truffle configuration file
│── package.json         # Node.js dependencies
│── README.md            # Project documentation
```

---

## **⚙️ Prerequisites**
Before running the DApp, ensure you have the following installed:
- **Node.js** (Install from [nodejs.org](https://nodejs.org/))
- **Truffle** (`npm install -g truffle`)
- **Ganache** (Download from [trufflesuite.com/ganache](https://trufflesuite.com/ganache))
- **Metamask** browser extension (Install from [metamask.io](https://metamask.io/))

---

## **🛠️ Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/gitvesh/Etherium_Banking_DApp.git
cd Etherium_Banking_DApp
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Start Ganache (Blockchain)**
- If using **GUI Ganache**, open it and set **RPC Server** to `http://127.0.0.1:8545`.  
- If using **CLI**, run:
  ```sh
  ganache-cli --port 8545
  ```

### **4️⃣ Deploy Smart Contracts**
```sh
truffle migrate --reset
```

---

## **🖥️ Running the Frontend**
### **Option 1: Using Python HTTP Server**
```sh
cd frontend
python -m http.server 5500
```
Open **`http://localhost:5500/index.html`** in your browser.

### **Option 2: Using VS Code Live Server**
1. Install **Live Server** extension in VS Code.
2. Right-click **index.html** → Click **"Open with Live Server"**.

---

## **📝 Smart Contract - Solidity Code**
Create a file **`contracts/Bank.sol`**:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) private balances;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
```

---

## **🌐 Frontend - Web3.js Integration**
Create `frontend/app.js`:
```js
let web3;
let contract;
const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";

async function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        document.getElementById("account").innerText = "Connected: " + accounts[0];

        const abi = [
            {"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
            {"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
            {"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}
        ];
        
        contract = new web3.eth.Contract(abi, contractAddress);
        updateBalance();
    } else {
        alert("Metamask not detected!");
    }
}

async function deposit() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    updateBalance();
}

async function withdraw() {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdraw(web3.utils.toWei("1", "ether")).send({ from: accounts[0] });
    updateBalance();
}

async function updateBalance() {
    const accounts = await web3.eth.getAccounts();
    const balance = await contract.methods.getBalance().call({ from: accounts[0] });
    document.getElementById("balance").innerText = "Balance: " + web3.utils.fromWei(balance, "ether") + " ETH";
}

document.getElementById("connect").addEventListener("click", connectMetamask);
```

---

## **💪 Troubleshooting**
- **Metamask Not Detected?** Use `http://localhost:5500` instead of `file://`.
- **Contract Not Deploying?** Run `truffle migrate --reset`.
- **Wrong Network?** Switch to **Localhost 8545** in Metamask.  

---

## **🚀 Deployment**
### **GitHub Deployment**
```sh
cd frontend
git init
git add .
git commit -m "Deploy frontend"
git push origin main
```

---



