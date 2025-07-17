// Simple pagination for users page (customers and cashiers)

document.addEventListener('DOMContentLoaded', function() {
    simplePaginateTable('customer-table', 'customer-pagination', 'customer-page-info', 10);
    simplePaginateTable('cashier-table', 'cashier-pagination', 'cashier-page-info', 10);
});

function simplePaginateTable(tableId, paginationId, pageInfoId, entriesPerPage) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const pageInfo = document.getElementById(pageInfoId);
    const pagination = document.getElementById(paginationId);
    const prevBtn = pagination.querySelector('.pagination-btn:first-child');
    const nextBtn = pagination.querySelector('.pagination-btn:last-child');
    let currentPage = 1;
    let totalPages = Math.ceil(rows.length / entriesPerPage) || 1;

    function showPage(page) {
        // Hide all rows
        rows.forEach(row => row.style.display = 'none');
        // Show only the rows for this page
        const start = (page - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        rows.slice(start, end).forEach(row => row.style.display = '');
        // Update page info
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        // Enable/disable buttons
        prevBtn.disabled = page <= 1;
        nextBtn.disabled = page >= totalPages;
    }

    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // If entries selector exists, hook it up
    const entriesBtns = pagination.parentElement.querySelectorAll('.entries-btn');
    if (entriesBtns.length) {
        entriesBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                entriesBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                entriesPerPage = parseInt(this.dataset.entries) || 10;
                totalPages = Math.ceil(rows.length / entriesPerPage) || 1;
                currentPage = 1;
                showPage(currentPage);
            });
        });
    }

    // Initial display
    showPage(currentPage);
} 