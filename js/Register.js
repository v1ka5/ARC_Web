﻿var register={init:function(){if(!$("#flash").is(':empty')){$("#flash").animatescroll({scrollSpeed:500,easing:'easeInOutSine'});}
var registerButton=$('#RegisterButton');$('#AcceptTermsAndConditions').change(function(){if($(this).prop('checked')){registerButton.removeAttr("disabled");}else{registerButton.attr('disabled','disabled');}});}};$(register.init);