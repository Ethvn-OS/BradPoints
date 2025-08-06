// Check if Chart.js is loaded
console.log('Chart.js check:', typeof Chart);
console.log('Window object check:', typeof window.Chart);

if (typeof Chart === 'undefined') {
    console.error('❌ Chart.js is NOT loaded!');
} else {
    console.log('✅ Chart.js is loaded successfully');
}

// Chart.js Implementation - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for chart canvas...'); // Debug

    const ctx = document.getElementById('myChart');

    if (ctx) {
        console.log('Canvas found! Dimensions:', ctx.offsetWidth, 'x', ctx.offsetHeight); // Debug

        // Show loading state
        const loadingCtx = ctx.getContext('2d');
        loadingCtx.fillStyle = '#666';
        loadingCtx.font = '16px Arial';
        loadingCtx.textAlign = 'center';
        loadingCtx.fillText('Loading chart...', ctx.width/2, ctx.height/2);

        fetch("http://localhost/BradPoints/php-backend/script.php")
        .then((response) => {
            console.log('Fetch response status:', response.status); // Debug
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Chart data received:', data); // Debug

            // Clear loading state
            loadingCtx.clearRect(0, 0, ctx.width, ctx.height);

            if (data && Array.isArray(data) && data.length > 0) {
                createChart(data, 'bar');
            } else {
                console.warn('No valid chart data available');
                showNoDataChart();
            }
        })
        .catch((error) => {
            console.error('Error fetching chart data:', error);
            showErrorChart(error.message);
        });
    } else {
        console.error('Canvas element #myChart not found in DOM!');
        console.log('Available elements with IDs:',
            Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        );
    }
});

function createChart(chartData, type) {
    console.log('Creating chart with data:', chartData); // Debug

    const ctx = document.getElementById('myChart');

    // Destroy existing chart if it exists
    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    try {
        window.myChartInstance = new Chart(ctx, {
            type: type,
            data: {
                labels: chartData.map(row => `${row.rating} Star${row.rating != 1 ? 's' : ''}`),
                datasets: [{
                    label: 'Number of Ratings',
                    data: chartData.map(row => parseInt(row.num_rating)),
                    backgroundColor: '#99201f',
                    borderColor: '#333',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#666',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#666',
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#333',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Customer Rating Distribution',
                        color: '#a22221',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: 20
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        console.log('Chart created successfully!'); // Debug

    } catch (error) {
        console.error('Error creating chart:', error);
        showErrorChart('Failed to create chart: ' + error.message);
    }
}

function showNoDataChart() {
    const ctx = document.getElementById('myChart');
    const canvasCtx = ctx.getContext('2d');

    // Clear canvas
    canvasCtx.clearRect(0, 0, ctx.width, ctx.height);

    // Draw no data message
    canvasCtx.fillStyle = '#999';
    canvasCtx.font = 'bold 18px Arial';
    canvasCtx.textAlign = 'center';
    canvasCtx.fillText('No rating data available yet', ctx.width/2, ctx.height/2 - 10);

    canvasCtx.fillStyle = '#666';
    canvasCtx.font = '14px Arial';
    canvasCtx.fillText('Ratings will appear here once customers leave feedback', ctx.width/2, ctx.height/2 + 20);
}

function showErrorChart(message) {
    const ctx = document.getElementById('myChart');
    const canvasCtx = ctx.getContext('2d');

    // Clear canvas
    canvasCtx.clearRect(0, 0, ctx.width, ctx.height);

    // Draw error message
    canvasCtx.fillStyle = '#dc3545';
    canvasCtx.font = 'bold 16px Arial';
    canvasCtx.textAlign = 'center';
    canvasCtx.fillText('Error loading chart', ctx.width/2, ctx.height/2 - 10);

    canvasCtx.fillStyle = '#666';
    canvasCtx.font = '12px Arial';
    canvasCtx.fillText(message, ctx.width/2, ctx.height/2 + 15);
}

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

// Quantity and order logic for cashierprod.html
if (document.getElementById('orderForm')) {
    const orderData = {};
    const addedOrdersDiv = document.querySelector('.addedOrders');
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const points = parseInt(this.getAttribute('data-points'));
            if (!orderData[id]) {
                orderData[id] = { qty: 0, name, points };
            }
            orderData[id].qty++;
            document.getElementById('qty-' + id).textContent = orderData[id].qty;
            updateOrders();
        });
    });
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (orderData[id] && orderData[id].qty > 0) {
                orderData[id].qty--;
                document.getElementById('qty-' + id).textContent = orderData[id].qty;
                updateOrders();
            }
        });
    });
    function updateOrders() {
        let html = '';
        let total = 0;
        Object.keys(orderData).forEach(id => {
            if (orderData[id].qty > 0) {
                html += `<div><b>${orderData[id].name}</b> x ${orderData[id].qty} = <span style='color:#a22221;'>${orderData[id].qty * orderData[id].points} pts</span></div>`;
                total += orderData[id].qty * orderData[id].points;
            }
        });
        addedOrdersDiv.innerHTML = html || '<span style="color:#aaa;">No items added yet.</span>';
        document.getElementById('totalPoints').textContent = 'Total points: ' + total;
        document.getElementById('orderData').value = JSON.stringify(Object.values(orderData).filter(o => o.qty > 0));
    }
    // Initialize all quantities to 0
    document.querySelectorAll('.quantity-display').forEach(span => span.textContent = '0');
    updateOrders();
}

/*
backgroundColor: [
                        '#FF6B6B', // 1 star - Red
                        '#FFA726', // 2 stars - Orange
                        '#FFEE58', // 3 stars - Yellow
                        '#66BB6A', // 4 stars - Light Green
                        '#42A5F5'  // 5 stars - Blue
                    ].slice(0, chartData.length),
*/