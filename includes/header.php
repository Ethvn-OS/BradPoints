<header class="site-header">
  <div class="site-left">Welcome back, <?php echo $user_data['user_name']; ?>!</div>
  <p class="slogan">It's a good day to visit your nearest Braddex.</p>
  <div class="profile-dropdown">
    <img src="assets/userprofile.jpeg" alt="User Icon" class="user-icon" id="userIcon" onclick="dropDownMenu()">
    <ul class="dropdown-menu" id="dropdownMenu">
      <li><a href="#">Profile</a></li>
      <li><a href="#">Edit Profile</a></li>
      <li><a href="#">About BradPoints</a></li>
      <li><a href="logout.php">Log Out</a></li>
    </ul>
  </div>
</header>