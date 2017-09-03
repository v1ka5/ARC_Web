var boss_captcha={init:function(){function get_cap(){$("#cap").attr('src','/captcha?'+new Date().getTime());return false;}
$(document).on('click','#cap_link',function(){$('#Cap').val('');get_cap();});$('#cap_link').click();$('#Cap').val('');}}
$(boss_captcha.init());