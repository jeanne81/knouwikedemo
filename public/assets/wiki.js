$(document).ready(function(){
  $('#contentsform').on('submit', function(){
      var item = CKEDITOR.instances['editor1'].getData();
      var wikidata = {item: item};
      $.ajax({
        type: 'POST',
        url: '/editer',
        data: wikidata,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
