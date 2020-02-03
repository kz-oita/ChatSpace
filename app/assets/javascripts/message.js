$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__message-list__info">
        <div class="main-chat__message-list__info__name">
          ${message.user_name}
        </div>
        <div class="main-chat__message-list__info__date">
          ${message.created_at}
        </div>
      </div>
      <div class="main-chat__message-list__text">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
      <img src=${message.image} >`
    return html;
  } else {
      var html =
        `<div class="main-chat__message-list__info">
          <div class="main-chat__message-list__info__name">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__text">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>`
    return html;
    };
  }
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
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
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
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
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