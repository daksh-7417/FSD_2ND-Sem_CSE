function calculateSum() {
    const inputVal = document.getElementById("numberInput").value;
    const n = parseInt(inputVal);
    const outputSpan = document.getElementById("output");

    if (isNaN(n) || n < 1) {
        outputSpan.innerText = "0";
        return;
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    outputSpan.innerText = sum.toLocaleString();
}
