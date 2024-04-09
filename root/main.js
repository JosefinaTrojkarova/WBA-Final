document.querySelector('#nav-logo').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enable smooth scrolling
    });
  });
  