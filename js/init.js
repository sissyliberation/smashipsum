$(document).ready(function(){

  // https://bulma.io/documentation/components/navbar/
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

	$("#smashIpsumBtn").on('click', function() {

    var params = {
			numParagraphs:  $("#numParagraphs").val(),
			minWords:       $("#minWords").val(),
      maxWords:       $("#maxWords").val(),
      minSentences:   $("#minSentences").val(),
      maxSentences:   $("#maxSentences").val(),
      smash64:  {
        characters: $("#smash64characters").is(":checked"),
        stages:     $("#smash64stages").is(":checked"),
        items:      $("#smash64items").is(":checked")
      },
      melee:  {
      	characters: $("#meleecharacters").is(":checked"),
      	stages:     $("#meleestages").is(":checked"),
      	items:      $("#meleeitems").is(":checked") 
      },
      brawl:  {
        characters: $("#brawlcharacters").is(":checked"),
        stages:     $("#brawlstages").is(":checked"),
        items:      $("#brawlitems").is(":checked")
      },
      pm:  {
        characters: $("#pmcharacters").is(":checked"),
        stages:     $("#pmstages").is(":checked"),
        items:      $("#pmitems").is(":checked")
      },
      smash4:  {
        characters: $("#smash4characters").is(":checked"),
        stages:     $("#smash4stages").is(":checked"),
        items:      $("#smash4items").is(":checked")      }
    };

    $.get( "api/get/", params, function( data ) {
      $("#SmashIpsum").html('');
      $("#SmashIpsum").append(data);
    });
	});

	$("#smashIpsumBtn").click();
});