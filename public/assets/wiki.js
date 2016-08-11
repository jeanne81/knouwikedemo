// var ipAddr = req.headers["x-forwarded-for"];
// if (ipAddr){
//   var list = ipAddr.split(",");
//   ipAddr = list[list.length-1];
// } else {
//   ipAddr = req.connection.remoteAddress;
// }
var dt = new Date();

$(document).ready(function(){
  $('#contentsform').on('submit', function(){
      var item = CKEDITOR.instances['editor1'].getData();
      var title = $('#title').val();
      var date = dt;

      var wikidata = {title: title, item: item, date: date};

      $.ajax({
        type: 'POST',
        url: '/editer',
        data: wikidata,
        success: function(data){
          //do something with the data via front-end framework
          // location.reload();
          // alert(ipAddr);
          window.location.href = '/result/' + title;
        }
      });

      return false;

  });

  $('#contentsform2').on('submit', function(){
      var item = CKEDITOR.instances['editor1'].getData();
      var title = $('#title').val();
      var date = dt;

      var wikidata = {title: title, item: item, date: date};

      $.ajax({
        type: 'POST',
        url: '/edit_confirm',
        data: wikidata,
        success: function(data){
          //do something with the data via front-end framework
          // location.reload();
          // alert(ipAddr);
          window.location.href = '/result/' + title;
        }
      });

      return false;

  });

  // $('#headerSearch').on('submit', function(){
  //   alert('test2');
  //   var inputTitle = $('#inputTitle').val();
  //   var writerIP = '123123';
  //   var result = {title: inputTitle, writer: writerIP};
  //   $.ajax({
  //     type: 'POST',
  //     url: '/result',
  //     data: result,
  //     success: function(data){
  //       alert('test');
  //     }
  //   })
  // });

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
