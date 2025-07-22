let userName = "<?php echo addslashes($user_data['user_name']); ?>";

window.onload = function() {
    document.getElementById('username-placeholder').textContent = userName;
}

function changeQty(id, delta) {
    let input = document.getElementById('qty_' + id);
    let val = parseInt(input.value) + delta;
    if (val < 0) {
        val = 0;
    }
    input.value = val;
}

const orders = {};
const addedOrdersDiv = document.querySelector('.addedOrders');
const totalPointsH3 = document.getElementById('totalPoints');

function updateOrdersDisplay() {
    addedOrdersDiv.innerHTML = '';

    let totalPoints = 0;

    for (const id in orders) {
        const order = orders[id];
        if (order.qty > 0) {
            const line = document.createElement('div');
            line.textContent = `${order.name} x ${order.qty} = ${order.qty * order.points} points`;
            addedOrdersDiv.appendChild(line);
            totalPoints += order.qty * order.points;
        }
    }
    totalPointsH3.textContent = `Total points: ${totalPoints}`;
}

document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const points = parseInt(this.dataset.points);
        if (!orders[id]) orders[id] = {name, points, qty: 0};
        orders[id].qty++;
        updateOrdersDisplay();
    });
});

document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.dataset.id;
        if (orders[id] && orders[id].qty > 0) {
            orders[id].qty--;
            updateOrdersDisplay();
        }
    });
});

// On submit, serialize the orders to a hidden input
document.getElementById('orderForm').addEventListener('submit', function(e) {
    document.getElementById('orderData').value = JSON.stringify(orders);
});

//function to show the dropdown menu
function dropDownMenu() {
    const userIcon = document.getElementById('userIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function toggleForm() {
    const divForm = document.getElementById('addProductForm');
    divForm.style.display = (divForm.style.display === 'none') ? 'block' : 'none';
}

//function to sort tables in admin

function sortTable(tableId, colIndex) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Determine if column is numeric
    const isNumeric = rows.length > 0 && !isNaN(rows[0].children[colIndex].textContent.trim());
    const currentSorted = tbody.getAttribute('data-sorted-col');
    const currentOrder = tbody.getAttribute('data-sorted-order');
    const newOrder = (currentSorted == colIndex && currentOrder == 'asc') ? 'desc' : 'asc';

    // Remove sort indicators from all headers
    const ths = table.querySelectorAll('th');
    ths.forEach((th, i) => {
        const icon = th.querySelector('i.fas');
        if (icon) {
            icon.classList.remove('fa-sort-up', 'fa-sort-down');
            icon.classList.add('fa-sort');
        }
    });
    // Add sort indicator to the active header
    const activeTh = ths[colIndex];
    const activeIcon = activeTh.querySelector('i.fas');
    if (activeIcon) {
        activeIcon.classList.remove('fa-sort');
        activeIcon.classList.add(newOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down');
    }

    const sortedRows = rows.sort((a, b) => {
        let valA = a.children[colIndex].textContent.trim();
        let valB = b.children[colIndex].textContent.trim();
        if (isNumeric) {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }
        if (valA < valB) return newOrder === 'asc' ? -1 : 1;
        if (valA > valB) return newOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Clear current rows
    tbody.innerHTML = '';
    // Append sorted rows
    sortedRows.forEach(row => tbody.appendChild(row));
    // Update sort attributes
    tbody.setAttribute('data-sorted-col', colIndex);
    tbody.setAttribute('data-sorted-order', newOrder);
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // 🛑 Stop the form from submitting no matter what

        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const isValidUsername = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/.test(username);
        const isValidPassword = password.length >= 8;
        const isMatch = password === confirmPassword;
        const isValidEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

        if (isValidUsername && isValidPassword && isMatch && isValidEmail) {
            // Submit the form manually since we prevented it earlier
            form.submit(); // ✅ Let it submit if everything is valid
        } else {
            // You can also add code here to show error messages if needed
            console.log("Form has validation errors.");
        }
    })
})

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent immediate submission

    const modal = document.getElementById("confirmModal");
    modal.style.display = "flex";

    // If user clicks "Yes"
    document.getElementById("confirmYes").onclick = () => {
        modal.style.display = "none";
        alert("Order successful!"); // This appears first
        e.target.submit(); // Then submit the form
    };

    // If user clicks "No"
    document.getElementById("confirmNo").onclick = () => {
        modal.style.display = "none";
    };
});