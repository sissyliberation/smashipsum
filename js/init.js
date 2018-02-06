$(document).ready(function(){
	$("#smashIpsumBtn").on('click', function() {

    var params = {
			numParagraphs:  $("#numParagraphs").val(),
			minSentences:   $("#minSentences").val(),
			maxSentences:   $("#maxSentences").val(),
      smash64:  {
        characters: $("#smash64characters").is(":checked"),
        stages:     $("#smash64stages").is(":checked"),
        items:      $("#smash64items").is(":checked"),
        general:    $("#smash64general").is(":checked") 
      },
      melee:  {
      	characters: $("#meleecharacters").is(":checked"),
      	stages:     $("#meleestages").is(":checked"),
      	items:      $("#meleeitems").is(":checked"),
      	general:    $("#meleegeneral").is(":checked") 
      },
      brawl:  {
      	characters: $("#brawlcharacters").is(":checked"),
      	stages:     $("#brawlstages").is(":checked"),
      	items:      $("#brawlitems").is(":checked"),
      	general:    $("#brawlgeneral").is(":checked") 
      }
    };

    $.get( "api/get/", params, function( data ) {
      $("#SmashIpsum").html('');
      $("#SmashIpsum").append(data);
    });
	});

	$("#smashIpsumBtn").click();
});