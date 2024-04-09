(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  
// Fetch form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var successMessage = document.getElementById("successMessage");

  var nameError = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var messageError = document.getElementById("messageError");
  var isValid = true;

   if (name === "") {
    nameError.textContent = "Please enter your name";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  if (email === "") {
    emailError.textContent = "Please enter your email";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (message === "") {
    messageError.textContent = "Please enter your message";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  if (isValid) {

    const json = JSON.stringify({
      name,
      email,
      message,
      access_key: '9428efba-8e43-4229-8e50-674405152606'
    });

    successMessage.style.display = "block";
    successMessage.color = "black !important";
    successMessage.textContent = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              successMessage.style.color = "green";
              successMessage.textContent = json.message;
            } else {
                console.log(response);
                successMessage.textContent = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            successMessage.style.color = "red";
            successMessage.textContent = "Something went wrong!";
        })
        .then(function() {
          contactForm.reset();
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 3000);
        });
  }

  // event.preventDefault(); // Prevent form submission

  // // Fetch form values
  // var name = document.getElementById("name").value;
  // var email = document.getElementById("email").value;
  // var message = document.getElementById("message").value;

  // // Validate form fields
  // var nameError = document.getElementById("nameError");
  // var emailError = document.getElementById("emailError");
  // var messageError = document.getElementById("messageError");
  // var isValid = true;

  // if (name === "") {
  //   nameError.textContent = "Please enter your name";
  //   isValid = false;
  // } else {
  //   nameError.textContent = "";
  // }

  // if (email === "") {
  //   emailError.textContent = "Please enter your email";
  //   isValid = false;
  // } else {
  //   emailError.textContent = "";
  // }

  // if (message === "") {
  //   messageError.textContent = "Please enter your message";
  //   isValid = false;
  // } else {
  //   messageError.textContent = "";
  // }

  // If form is valid, send the email
  // if (isValid) {
  //   var link = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new";
  //   window.location.href = link;
  //   // document.getElementById("successMessage").style.display = "block"; // Show success message

  //   // // Reset form fields
  //   // document.getElementById("name").value = "";
  //   // document.getElementById("email").value = "";
  //   // document.getElementById("message").value = "";
  // }
});


