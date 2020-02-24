$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id} >
                    <div class="message__title">
                      <div class="message__title--name">
                      ${message.user_name}
                      </div>
                      <div class="message__title--date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="message__lower">
                      <div class="message__lower--text">
                      ${message.content}
                      </div>
                      <img class="message__image" src=${message.image} >
                    </div>
                  </div>`
    } else {
      var html = `<div class="message" data-message-id=${message.id} >
                    <div class="message__title">
                      <div class="message__title--name">
                      ${message.user_name}
                      </div>
                      <div class="message__title--date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="message__lower">
                      <div class="message__lower--text">
                      ${message.content}
                      </div>
                    </div>
                  </div>`
    }
    return html
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
      $(".maincontents").append(html);
      $('.maincontents').animate({ scrollTop: $('.maincontents')[0].scrollHeight});
      $('form')[0].reset();
      $('.messagesubmit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.maincontents').append(insertHTML);
      $('.maincontents').animate({ scrollTop: $('.maincontents')[0].scrollHeight});
    }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});