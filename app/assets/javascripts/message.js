$(function(){
  var last_message_id = $('.message:last').data("message-id");
  console.log(last_message_id);

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="message">
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
                  </div>`//メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `<div class="message">
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
                  </div>`//メッセージに画像が含まれない場合のHTMLを作る
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
});