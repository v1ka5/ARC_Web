var boss_login={init:function(){var UserName=$('#UserName');var PasswordLabel=$('label[for=Password]');function user_name_changed(){if(UserName.val().match(/^\d+$/))PasswordLabel.html(i18n.seccode4);else PasswordLabel.html(i18n.password);}
function mouse_event(){setTimeout(user_name_changed,100);}
UserName.change(user_name_changed);UserName.keyup(user_name_changed);UserName.on('cut',mouse_event);UserName.on('paste',mouse_event);}}
$(boss_login.init);