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
    const tableBody = document.getElementById(tableId);
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    const isNumeric = !isNaN(rows[0].children[colIndex].textContent.trim());
    const currentSorted = tableBody.getAttribute("data-sorted-col");
    const currentOrder = tableBody.getAttribute("data-sorted-order");

    const newOrder = (currentSorted == colIndex && currentOrder == "asc") ? "desc" : "asc";

    const sortedRows = rows.sort((a, b) => {
        let valA = a.children[colIndex].textContent.trim();
        let valB = b.children[colIndex].textContent.trim();

        if (isNumeric) {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }

        if (valA < valB) return newOrder === "asc" ? -1 : 1;
        if (valA > valB) return newOrder === "asc" ? 1 : -1;
        return 0;
    });

    // Clear current rows
    tableBody.innerHTML = "";

    // Append sorted rows
    sortedRows.forEach(row => tableBody.appendChild(row));

    // Update sort attributes
    tableBody.setAttribute("data-sorted-col", colIndex);
    tableBody.setAttribute("data-sorted-order", newOrder);
}