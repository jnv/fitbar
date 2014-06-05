$(function(){
  'use strict';
  console.log('ohai');
  var notifCnt = 0;
  function addNotification() {
    notifCnt++;
    setNotficationIndicator();
  }
  function resetNotification() {
    notifCnt = 0;
    setNotficationIndicator();
  }

  function setNotficationIndicator() {
    var $ind = $('.notifications-indicator');

    $ind.text(notifCnt);
    $ind.toggleClass('active', (notifCnt > 0));
  }

  // $('#js-addnotification').click(addNotification);
  // $('#js-resetnotification').click(resetNotification);

  window.setTimeout(function(){
    addNotification();
  }, '2567');


  $('.js-logged-in').hide();
  // $('.js-logged-in,.js-logged-out').toggle();
  $('[data-login],[data-logout]').click(function(e){
    e.preventDefault();
    $('.js-logged-in,.js-logged-out').toggle();
  });
});
