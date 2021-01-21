$("#countrysearch").on("click", function(){
  $('.mix').addClass('hidden');
});

$(function() {

  $("#main").mixItUp();

  var inputText;
  var $matching = $();

  // Delay function
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $("#countrysearch").keyup(function(){
    // Delay function invoked to make sure user stopped typing
    delay(function(){
      inputText = $("#countrysearch").val().toLowerCase();
      
      // Check to see if input field is empty
      if ((inputText.length) > 0) {            
        $( '.mix').each(function() {
          $this = $("this");
          
           // add item to be filtered out if input text matches items inside the title   
           if($(this).find('.countryname').children('h5').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $("#main").mixItUp('filter', $matching);
      }

      else {
        // resets the filter to show all item if input is empty
        $("#main").mixItUp('filter', 'all');
       // $('.mix').removeClass('hidden');
      }
    }, 200 );
  });

})