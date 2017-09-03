/*
standard tracking code - updated 4/22 to not track to tracking.aimediagroup.com if in proxy, and if 'lite' function is called, to track using proxy pixel.
update 11/16/15 - cookie times
update 3/18/2016 added startSecureTrackOrder, startSecureTrackAddon
update 1/21/2017 added
*/

(function(){
	/* old GD function
	function gd(){
		var host = window.location.hostname.split(".");
		var tld = host.pop(), domain = host.pop();  // order is important
		return "." + domain + "." + tld;
	}
	*/
	/* new gd function*/
	function gd() {
  	var domain = window.location.hostname;
    var parts = domain.split('.').reverse();
    var cnt = parts.length;
    if (cnt >= 3) {
        // see if the second level domain is a common SLD.
        if (parts[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i)) {
            return '.'+ parts[2] + '.' + parts[1] + '.' + parts[0];
        }
    }
    return '.'+parts[1]+'.'+parts[0];
}
	function rc(v) {
		var n='aitrk=',ca=document.cookie.split(';');
		for(var i=0;i<ca.length;i++){
			var c=ca[i];
			while (c.charAt(0)==' ') c=c.substring(1,c.length);
			if(c.indexOf(n)==0) {
				 sc(c.substring(n.length,c.length));
				return c.substring(n.length,c.length);
				}
		}
		return null;
	}
	function sc(v) {
		var d = new Date();
		d.setDate((d.getDate()+30));
		document.cookie="aitrk="+v+"; path=/; expires="+d.toGMTString()+"; domain="+ gd();
	}
	function qs(){
		var pairs=window.location.search.substr(1).split("&"), o={};
		for(var i=0, l=pairs.length; i<l; i++){
			var t=pairs[i].split("=");
			o[t[0]] = t[1];
		}
		return o;
	}

	//	Exposed functions
	
	_setAitrkCookie  = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var o=qs(), cid, l=window.location, hp=l.protocol, hn=l.hostname, pn=l.pathname, pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if(ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid && cid != ""){
			/*
			var img = new Image();
			img.onload = function(e){ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);
			*/			
		}
	};
	
	
	
	
	
	_startTrack = function(td, pn){
		var o = qs(), cid, r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startTrack image loaded.");*/};
			img.src = "http://" + td + "/pushImage.asp?" + pn+'&r='+encodeURIComponent(r);		
		}
	};
	_startSecureTrack = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var o=qs(), cid, l=window.location, hp=l.protocol, hn=l.hostname, pn=l.pathname, pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if(ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);			
		}
		
	};
	//tracks in proxy - hostname is just the TLD
	_startSecureTrackInProxy = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var o=qs(), cid, l=window.location, hp=l.protocol, hn=gd().replace(/./,''), pn=l.pathname, pp='', r = document.referrer;		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if(ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);			
		}
		
	};
	_startSecureTrackFull = function(a){
	
		var o=qs(), cid, l=window.location, hp=l.protocol, hn=l.hostname, pn=l.pathname, pp=l.search, r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
			
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);			
		}
	};	
	//only tracks in proxy, creates a jpg file. pixel proxy is set on the www.domainname.com domain of the site, not the proxy.
	_startLiveSecureTrack = function(a, ot){
		/* commented out until import issues can be fixed 
		ot=(ot && ot!='undefined')?ot:'';
		var o=qs(), cid, l=window.location, hp=l.protocol, hn='www'+gd(), pn=l.pathname, pp='', r = document.referrer;
		
		pn = pn+'.jpg';
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if(ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){}
		else{
		
		if(cid && cid != "" && ot!=''){
			//cid = cid+'-livePix';
			var img = new Image();
			img.onload = function(e){ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);			
		}
		}
		*/
	};
	_startSecureTrackLite = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn='', pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if (ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);		
		}
		else{
		
		if(cid && cid != "" && ot!=''){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'http://' + hn + '/proxy-static/includes/trk.php?'+ot;
		}
		
		
		}
	};
	//order tracking for csc
	_startSecureTrackOrder = function(a, ot, pid,  pval, psu){
		ot=(ot && ot!='undefined')?ot:'';
		var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn='', pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if (ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'orderType='+ot;
		if (pid) pp+=(pp.indexOf('?')>-1?'&':'?')+'productId='+pid;
		if (pval) pp+=(pp.indexOf('?')>-1?'&':'?')+'productValue='+pval;
		if (psu) pp+=(pp.indexOf('?')>-1?'&':'?')+'psu='+psu;
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);		
		}
		else{
		
		if(cid && cid != "" && ot!=''){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'http://' + hn + '/proxy-static/includes/trk.php?orderType='+ot;
		}
		
		
		}
	};	
	
	_startSecureTrackIOA =	function (a,  info, oid, amt, quant){

	var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn='', pp='', r = document.referrer;
	cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
	
	pp+=(pp.indexOf('?')>-1?'&':'?')+'ailead=true&orderInfo=';	
	
	//add the rest of the items
	
    for(var index in info) {
	pp+=index+':'+info[index] +';';
	}
    pp = pp.replace(/;$/, '');  
      
      
      
     // add the quant,oid and & smt to the string
    if (quant) pp+=(pp.indexOf('?')>-1?'&':'?')+'quant='+quant;        
    if (oid) pp+=(pp.indexOf('?')>-1?'&':'?')+'oid=OID_'+oid;
	if (amt) pp+=(pp.indexOf('?')>-1?'&':'?')+'amt=AMT_'+amt;
	
	if(cid && cid != "" ){
				
		var img = new Image();
		img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
		img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pp)+'&r='+encodeURIComponent(r);		
	}


    };
	
	
	
	
	//order tracking for sales
	_startSecureTrackSale = function(a, items){

	var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname,  pp='', r = document.referrer;
	cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
	
	pp+=(pp.indexOf('?')>-1?'&':'?')+'ailead=true';
	
	//add the rest of the items
	for(var index in items) {  console.log( index + " : " + items[index]); 
		pp+=(pp.indexOf('?')>-1?'&':'?')+ index+'='+items[index];
	}
	
	
	if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
		//add in a "test" value to the aitrk value
		cid = "aileadTest-"+cid;
		var img = new Image();
		img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
		img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pp)+'&r='+encodeURIComponent(r);		
	}
	else{
	//if the user is in proxy
	if(cid && cid != "" && ot!=''){
		var img = new Image();
		img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
		img.src = 'http://' + hn + '/proxy-static/includes/trk.php'+pp;
	}
	
	
	}
};
	
	
	//order tracking for csc - add ons
	_startSecureTrackAddon = function(a, ot, pid,  pval){
		ot=(ot && ot!='undefined')?ot:'';
		var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn='', pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if (ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'addOn='+ot;
		if (pid) pp+=(pp.indexOf('?')>-1?'&':'?')+'addOnID='+pid;
		if (pval) pp+=(pp.indexOf('?')>-1?'&':'?')+'addOnValue='+pval;
		
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);		
		}
		else{
		
		if(cid && cid != "" && ot!=''){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'http://' + hn + '/proxy-static/includes/trk.php?orderType='+ot;
		}
		
		
		}
	};	
	_startSecureTrackEmail = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn='', pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if (ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'emailfrom='+ot+'&thankyou=tru';
		if(cid && cid != "" && (hn.indexOf('aiprx')==-1)){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrackLite image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p=/'+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);		
		}
		else{
		
		if(cid && cid != "" && ot!=''){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrack image loaded."); */};
			img.src = 'http://' + hn + '/proxy-static/includes/trk.php?'+ot;
		}
		
		
		}
	};
	_startSecureTrackd = function(a, ot){
		ot=(ot && ot!='undefined')?ot:'';
		var cid, o=qs(), l=window.location, hp=l.protocol, hn=l.hostname, pn=l.pathname, pp='', r = document.referrer;
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(pp.indexOf('requestid')>=0) pp = '';
		if (ot) pp+=(pp.indexOf('?')>-1?'&':'?')+'page='+ot;
		if(cid){ 
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSecureTrackd image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/trackingSecure.asp?a='+a+'&t='+hp+'&h='+hn+'&c='+cid+'&p='+encodeURIComponent(pn+pp)+'&r='+encodeURIComponent(r);
		}
	};
	_startSale = function(td, sv, tv, sa, oi){
		var cid, o=qs(), r = document.referrer; 
		if(o.saleValue){ sa=parseFloat(o.saleValue,10) || sa; }
		cid = o.aitrk && sc(o.aitrk) && o.aitrk || rc(cid);
		if(cid && cid != ""){
			var img = new Image();
			img.onload = function(e){ /* console.log("_startSale image loaded.");*/ };
			img.src = 'https://tracking.aimediagroup.com/pushSale.asp?bu='+td+'&sv='+sv+'&tv='+tv+'&sa='+sa+'&oi='+oi+'&r='+encodeURIComponent(r);	
		}
	};
})();

//exposed function to check if ai code is already on the page..
function _checkAi(){return true;}
//console.log("aipx_secure.js code loaded the referrer we are seeing is: " + document.referrer);