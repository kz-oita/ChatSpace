$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
        `<div class="main-chat__message-lists__content" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-lists__content__info">` +
            `<div class="main-chat__message-lists__content__info__name">` +
              message.user_name +
            `</div>` +
            `<div class="main-chat__message-lists__content__info__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="main-chat__message-lists__content__text">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        var html =
          `<div class="main-chat__message-lists__content" data-message-id=` + message.id + `>` +
            `<div class="main-chat__message-lists__content__info">` +
              `<div class="main-chat__message-lists__content__info__name">` +
                message.user_name +
              `</div>` +
              `<div class="main-chat__message-lists__content__info__date">` +
                message.created_at +
              `</div>` +
            `</div>` +
            `<div class="main-chat__message-lists__content__text">` +
              `<p class="lower-message__content">` +
                message.content +
              `</p>` +
            `</div>` +
          `</div>`
      } else if (message.image) {
        var html = 
          `<div class="main-chat__message-lists__content" data-message-id=` + message.id + `>` +
            `<div class="main-chat__message-lists__content__info">` +
              `<div class="main-chat__message-lists__content__info__name">` +
                message.user_name +
              `</div>` +
              `<div class="main-chat__message-lists__content__info__date">` +
                message.created_at +
              `</div>` +
            `</div>` +
            `<div class="main-chat__message-lists__content__text">` +
              `<img src="` + message.image + `" class="lower-message__image" >` +
            `</div>` +
          `</div>`
      };
    return html;
    };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-lists').append(html);
      $('.main-chat__message-lists').animate({ scrollTop: $('.main-chat__message-lists')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.main-chat__message-lists__content:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !==0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-lists').append(insertHTML);
        $('.main-chat__message-lists').animate({ scrollTop: $('.main-chat__message-lists')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error')
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});