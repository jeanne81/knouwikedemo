$(document).ready(function(){
  $('#contentsform').on('submit', function(){
    alert('sdfsdf');
      var item = CKEDITOR.instances['editor1'].getData();
      var title = $('#title').val();
      var wikidata = {title: title, item: item};
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

  $('#headerSearch').on('submit', function(){
    alert('sd33fsdf');
    var inputTitle = $('#inputTitle').val();
    var writerIP = '123123';
    var result = {title: inputTitle, writer: writerIP};
    $.ajax({
      type: 'POST',
      url: '/header',
      data: result,
      success: function(data){
        console.log('succecss headerSearch');
      }
    })
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
