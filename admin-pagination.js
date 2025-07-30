// Admin Dashboard Pagination
let currentPage = {
    voucher: 1,
    redemption: 1
};

let entriesPerPage = {
    voucher: 5,
    redemption: 5
};

let allData = {
    voucher: [],
    redemption: []
};

// Sorting state
let sortState = {
    voucher: { column: -1, direction: 'asc' },
    redemption: { column: -1, direction: 'asc' }
};

// Initialize pagination
document.addEventListener('DOMContentLoaded', function() {
    // Initialize both tables
    initializePagination('voucher');
    initializePagination('redemption');
    
    // Add event listeners for entries per page buttons
    document.querySelectorAll('.entries-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Determine which table this button belongs to
            var section = this.closest('.dashboard-section');
            var tableId = section.querySelector('.admin-table').id;
            var tableType = tableId.includes('voucher') ? 'voucher' : 'redemption';
            var entries = parseInt(this.dataset.entries);
            
            // Update active button for this section only
            var selector = section.querySelector('.entries-selector');
            selector.querySelectorAll('.entries-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update entries per page and reset to page 1
            entriesPerPage[tableType] = entries;
            currentPage[tableType] = 1;
            
            // Re-render table
            renderTable(tableType);
        });
    });
});

function initializePagination(tableType) {
    renderTable(tableType);
}

function renderTable(tableType) {
    var data = allData[tableType];
    var tbody, pageInfo;
    
    // Get the correct elements based on table type
    if (tableType === 'voucher') {
        tbody = document.getElementById('voucher-summary-tbody');
        pageInfo = document.getElementById('voucher-page-info');
    } else {
        tbody = document.getElementById('redemption-history-tbody');
        pageInfo = document.getElementById('redemption-page-info');
    }
    
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No data available</td></tr>';
        pageInfo.textContent = 'Page 1 of 1';
        return;
    }
    
    var startIndex = (currentPage[tableType] - 1) * entriesPerPage[tableType];
    var endIndex = startIndex + entriesPerPage[tableType];
    var pageData = data.slice(startIndex, endIndex);
    var totalPages = Math.ceil(data.length / entriesPerPage[tableType]);
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows
    pageData.forEach(function(item) {
        var row = document.createElement('tr');
        if (tableType === 'voucher') {
            row.innerHTML = 
                '<td>' + item.reward_name + '</td>' +
                '<td>' + item.number_of_redemptions + '</td>';
        } else {
            row.innerHTML = 
                '<td>' + item.user_id + '</td>' +
                '<td>' + item.cashier_id + '</td>' +
                '<td>' + item.reward_id + '</td>' +
                '<td>' + item.redemption_id + '</td>' +
                '<td><span class="status-badge status-' + item.status.toLowerCase() + '">' + item.status + '</span></td>';
        }
        tbody.appendChild(row);
    });
    
    // Update page info
    pageInfo.textContent = 'Page ' + currentPage[tableType] + ' of ' + totalPages;
    
    // Update pagination buttons
    var paginationId = tableType + '-pagination';
    var prevBtn = document.querySelector('#' + paginationId + ' .pagination-btn:first-child');
    var nextBtn = document.querySelector('#' + paginationId + ' .pagination-btn:last-child');
    
    if (prevBtn) prevBtn.disabled = currentPage[tableType] <= 1;
    if (nextBtn) nextBtn.disabled = currentPage[tableType] >= totalPages;
}

function previousPage(tableType) {
    if (currentPage[tableType] > 1) {
        currentPage[tableType]--;
        renderTable(tableType);
    }
}

function nextPage(tableType) {
    var data = allData[tableType];
    var totalPages = Math.ceil(data.length / entriesPerPage[tableType]);
    
    if (currentPage[tableType] < totalPages) {
        currentPage[tableType]++;
        renderTable(tableType);
    }
}

// Enhanced sorting function
function sortTable(tableId, columnIndex) {
    var tableType = tableId.includes('voucher') ? 'voucher' : 'redemption';
    var currentSort = sortState[tableType];
    
    // If clicking the same column, toggle direction
    if (currentSort.column === columnIndex) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        // New column, start with ascending
        currentSort.column = columnIndex;
        currentSort.direction = 'asc';
    }
    
    // Sort the data
    var data = allData[tableType];
    data.sort(function(a, b) {
        var aValue, bValue;
        
        if (tableType === 'voucher') {
            // Voucher table columns: reward_id, reward_name, number_of_redemptions
            switch(columnIndex) {
                case 0: // reward_name
                    aValue = String(a.reward_name || '').toLowerCase();
                    bValue = String(b.reward_name || '').toLowerCase();
                    break;
                case 1: // number_of_redemptions
                    aValue = parseInt(a.number_of_redemptions || 0);
                    bValue = parseInt(b.number_of_redemptions || 0);
                    break;
                default:
                    aValue = '';
                    bValue = '';
            }
        } else {
            // Redemption table columns: id, user_id, cashier_id, reward_id, redemption_id, status
            switch(columnIndex) {
                case 0: // id
                    aValue = String(a.id || '');
                    bValue = String(b.id || '');
                    break;
                case 1: // user_id
                    aValue = String(a.user_id || '');
                    bValue = String(b.user_id || '');
                    break;
                case 2: // cashier_id
                    aValue = String(a.cashier_id || '');
                    bValue = String(b.cashier_id || '');
                    break;
                case 3: // reward_id
                    aValue = String(a.reward_id || '');
                    bValue = String(b.reward_id || '');
                    break;
                case 4: // redemption_id
                    aValue = String(a.redemption_id || '');
                    bValue = String(b.redemption_id || '');
                    break;
                case 5: // status
                    aValue = String(a.status || '').toLowerCase();
                    bValue = String(b.status || '').toLowerCase();
                    break;
                default:
                    aValue = '';
                    bValue = '';
            }
        }
        
        // Compare values
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return currentSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            if (aValue < bValue) return currentSort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        }
    });
    
    // Update sort indicators in table headers
    updateSortIndicators(tableId, columnIndex, currentSort.direction);
    
    // Reset to first page and re-render
    currentPage[tableType] = 1;
    renderTable(tableType);
}

// Update sort indicators in table headers
function updateSortIndicators(tableId, columnIndex, direction) {
    var table = document.getElementById(tableId);
    if (!table) return;
    
    var headers = table.querySelectorAll('th');
    
    // Remove all sort indicators
    headers.forEach(function(header) {
        header.classList.remove('sort-asc', 'sort-desc');
        var text = header.textContent.replace(' ▲', '').replace(' ▼', '');
        header.textContent = text;
    });
    
    // Add sort indicator to current column
    var currentHeader = headers[columnIndex];
    if (currentHeader) {
        var indicator = direction === 'asc' ? ' ▲' : ' ▼';
        currentHeader.textContent = currentHeader.textContent + indicator;
        currentHeader.classList.add(direction === 'asc' ? 'sort-asc' : 'sort-desc');
    }
}

// Function to set data from PHP
function setTableData(voucherData, redemptionData) {
    allData.voucher = voucherData || [];
    allData.redemption = redemptionData || [];
    
    // Reset sort states
    sortState.voucher = { column: -1, direction: 'asc' };
    sortState.redemption = { column: -1, direction: 'asc' };
    
    // Re-initialize pagination with new data
    initializePagination('voucher');
    initializePagination('redemption');
} 