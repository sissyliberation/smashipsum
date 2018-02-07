$(document).ready(function(){
	$("#smashIpsumBtn").on('click', function() {

    var params = {
			numParagraphs:  $("#numParagraphs").val(),
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
        stages:     $("#pmstages").is(":checked")
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