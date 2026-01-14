const display = document.getElementById("display");

let current = "";
let lastResult = null;

// Update display safely
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Add number or operator
function append(value) {
    if (current.length > 30) return;
    current += value;
    updateDisplay(current);
}

// Clear all
function clearAll() {
    current = "";
    lastResult = null;
    updateDisplay("0");
}

// Delete one character
function deleteLast() {
    current = current.slice(0, -1);
    updateDisplay(current);
}

// Calculate expression
function evaluate() {
    try {
        if (!current) return;

        const result = Function("return " + current)();
        current = String(result);
        lastResult = result;

        updateDisplay(result);
    } catch {
        updateDisplay("ERROR");
        current = "";
    }
}

// Button clicks
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) append(value);
        if (action === "clear") clearAll();
        if (action === "delete") deleteLast();
        if (action === "equal") evaluate();
    });
});

// Keyboard support
document.addEventListener("keydown", e => {
    const key = e.key;

    if (!isNaN(key)) append(key);
    if (["+", "-", "*", "/"].includes(key)) append(key);
    if (key === ".") append(".");
    if (key === "Enter") evaluate();
    if (key === "Backspace") deleteLast();
    if (key === "Escape") clearAll();
});
