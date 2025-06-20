let userName = "<?php echo addslashes($user_data['user_name']); ?>";

window.onload = function() {
    document.getElementById('username-placeholder').textContent = userName;
}