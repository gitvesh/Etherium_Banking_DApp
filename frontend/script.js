document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('account').innerText = accounts[0];
        updateBalance(accounts[0]);
    } else {
        alert("MetaMask not detected!");
    }
});

async function updateBalance(account) {
    const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, "latest"]
    });
    document.getElementById('balance').innerText = (parseInt(balance, 16) / 10**18) + " ETH";
}

document.getElementById('sendMoney').addEventListener('click', async () => {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    if (!recipient || !amount) {
        alert("Please enter recipient address and amount.");
        return;
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: accounts[0],
            to: recipient,
            value: (parseFloat(amount) * 10**18).toString(16)
        }]
    });

    alert("Transaction Sent!");
});
