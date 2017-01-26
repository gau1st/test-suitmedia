$(document).ready(function(){
   //
   // Start Day Night
   //
   /* Declare the variable */

   // html
   var $body = $("body");
   var $p = $("p");
   var $li = $("li");
   var $h1 = $("h1");
   var $h2 = $("h2");
   var $h3 = $("h3");
   var $h4 = $("h4");

   // article
   var $dayNightButton = $(".day-night-button");

   // container
   var $contentContainer = $("#content-container");

   // navigation
   var $navigation = $("nav li a");
   var $burgerNav = $("#burger-nav");
   var $burgerSvg = $(".burger-svg");

   // fin section
   var $finLine = $(".fin .line");

   // form section
   var $labelError = $("label.error");
   var $labelDesc = $("label.desc");

   /* Default mode  */
   var isDay = true;
   var isNight = document.cookie.replace(/(?:(?:^|.*;\s*)isNight\s*\=\s*([^;]*).*$)|^.*$/, "$1");

   /* if cookie say "isNight = true" then set night mode for default mode */
   if (isNight=="true") {
      $("*").css("transition", "0s");
      $body.toggleClass("night");
      $dayNightButton.toggleClass("night");
      $contentContainer.toggleClass("night");
      $navigation.toggleClass("night");
      $burgerNav.toggleClass("night");
      $burgerSvg.toggleClass("night");
      $finLine.toggleClass("night");
      $labelError.toggleClass("night");
      $labelDesc.toggleClass("night");
      $p.toggleClass("night");
      $li.toggleClass("night");
      $h1.toggleClass("night");
      $h2.toggleClass("night");
      isDay = false;
      setTimeout(function() {
         $("*").css("transition", "0.8s");
      }, 1000);
   }

   /* Action button when $dayNightButton clicked */
   $dayNightButton.on("click", function(){
      /* Toggle every element with 'night' class  */
      $body.toggleClass("night");
      $dayNightButton.toggleClass("night");
      $contentContainer.toggleClass("night");
      $navigation.toggleClass("night");
      $burgerNav.toggleClass("night");
      $burgerSvg.toggleClass("night");
      $finLine.toggleClass("night");
      $labelError.toggleClass("night");
      $labelDesc.toggleClass("night");
      $p.toggleClass("night");
      $li.toggleClass("night");
      $h1.toggleClass("night");
      $h2.toggleClass("night");

      if (isDay) {
         /* Set cookie value to 'isNight = true' if default mode is day (isDay = True)  */
         document.cookie = "isNight="+true;
         isDay = false;
         $dayNightButton.text("Day Mode");
      } else {
         /* Delete cookie value if default mode is night (isDay = False)  */
         document.cookie = 'isNight=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
         isDay = true;
         $dayNightButton.text("Night Mode");
      }

   });
   //
   // End Day Night
   //

   //
   // Start JSON Ajax
   //
   $.getJSON('comments.json', function (data) {
      console.log(data);
      var items = data.comments.map(function (item) {
         return "<div class=\"photo-area\"><div class=\"image-box\"><img src=\""+item.avatar+"\" /></div></div><div class=\"comment-area\"><h1>"+item.name+"</h1><h2>"+item.data+"</h2><p>"+item.comment+"</p></div>"
      });

      $(".comments").empty();
      if (items.length) {
         var content = '<li>' + items.join('</li><li>') + '</li>';
         var list = $('<ul />').html(content);
         $(".comments").append(list);
      }
   });
   //
   // END JSON Ajax
   //

   //
   // Start Burger Navigation
   //
   $("#burger-nav").on("click", function(){
      $("header nav ul").toggleClass("open");
   });
   //
   // End Burger Navigation
   //


   //
   // Start form process
   //

   // Declare Variable from form section element
   var $reset = $("#reset");
   var $submit = $("#submit");
   var $nameInput = $("input[name=\"name\"]");
   var $emailInput = $("input[name=\"email\"]");
   var $messageInput = $("textarea[name=\"message\"]");
   var $nameError = $("#name-error");
   var $emailError = $("#email-error");
   var $messageError = $("#message-error");

   /* Email validator function */
   function emailValidator(element) {
      var emailvalid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(emailvalid.test(element.val()) ) {
         return true;
      } else {
         return false;
      }
   }

   /* Clear form function */
   function clearForm() {
      $nameInput.val("");
      $nameInput.removeClass("error");
      $nameInput.removeClass("valid");
      $nameError.removeClass("show");

      $emailInput.val("");
      $emailInput.removeClass("error");
      $emailInput.removeClass("valid");
      $emailError.removeClass("show");

      $messageInput.val("");
      $messageInput.removeClass("error");
      $messageInput.removeClass("valid");
      $messageError.removeClass("show");
   }

   //
   // Start reset form process
   //
   $reset.click(function() {
      $nameInput.focus();

      // Clear Form
      clearForm();

      return false;
   });
   //
   // End reset form process
   //

   //
   // Start submit form process
   //

   $submit.click(function() {
      // Declare variable for field validation with default value 'false'
      var isNameValid = false;
      var isEmailValid = false;
      var isMessageValid = false;

      // Check Name validation
      if ($nameInput.val()!="") {
         $nameInput.addClass("valid");
         $nameInput.removeClass("error");
         $nameError.removeClass("show");
         isNameValid = true;
      } else {
         $nameInput.addClass("error");
         $nameInput.removeClass("valid");
         $nameError.text("Field may not empty.");
         $nameError.addClass("show");
      }

      // Check Email validation
      if ($emailInput.val()!="") {
         if (!emailValidator($emailInput)) {
            $emailInput.addClass("error");
            $emailInput.removeClass("valid");
            $emailError.text("Your email not valid.");
            $emailError.addClass("show");
         } else {
            $emailInput.addClass("valid");
            $emailInput.removeClass("error");
            $emailError.removeClass("show");
            isEmailValid = true;
         }
      } else {
         $emailInput.addClass("error");
         $emailInput.removeClass("valid");
         $emailError.text("Field may not empty.");
         $emailError.addClass("show");
      }

      // Check Message validation
      if ($messageInput.val()!="") {
         $messageInput.addClass("valid");
         $messageInput.removeClass("error");
         $messageError.removeClass("show");
         isMessageValid = true;
      } else {
         $messageInput.addClass("error");
         $messageInput.removeClass("valid");
         $messageError.text("Field may not empty.");
         $messageError.addClass("show");
      }

      // If all fields valid
      if (isNameValid && isEmailValid && isMessageValid) {
         clearForm();
         alert("Thank you very much <3");
      }

      return false;
   });
   //
   // End submit form process
   //

   //
   // Start form process
   //
});
