var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
function onReady(){"use strict";var e,o,a,t,n=$("#nav_state"),r=$("#nav_trigger"),l=$("#lego-top"),i=$("#lego-middle"),s=$("#lego-bottom"),y=$("#reveal_content"),g=$(".info--closed"),d=$("#identity-perso"),m=$("#identity-svg"),p=$("#arrows"),c=$("#courbe"),f=$(".header-tel"),u=$("#famille-2"),w=$("#main");t=new TimelineMax({}),t.fromTo(w,1,{x:200},{x:0,ease:Power2.easeOut}).to(u,.3,{opacity:1}),TweenMax.to(f,.8,{rotationX:"360deg",backgroundColor:"#fff",ease:Power3.easeIn,repeat:-1,repeatDelay:5,yoyo:!0}),a=new TimelineMax({delay:1}),a.to(p,1,{opacity:1,ease:Bounce.easeOut}).fromTo(c,2,{drawSVG:"0% 0%"},{drawSVG:"0% 100%",ease:Power2.easeOut}),o=new TimelineMax({delay:1,yoyo:!0,repeat:-1,repeatDelay:4}),TweenMax.to(d,2,{opacity:1,delay:1}),o.to(m,1.8,{rotation:"5deg",transformOrigin:"center top"}).to(m,1.8,{rotation:"-5deg",transformOrigin:"center top"}).to(m,1.8,{rotation:"5deg",transformOrigin:"center top"});var T=new TimelineMax({delay:1,yoyo:!0});T.fromTo($("#fil"),5,{drawSVG:"0%"},{drawSVG:"100%"}).staggerFromTo($(".mot-anim"),1,{autoAlpha:0},{autoAlpha:1},.8,"-=4.8"),e=new TimelineMax({delay:1}),e.fromTo(i,.6,{autoAlpha:0,y:-100},{autoAlpha:1,y:0,ease:Power2.easeIn}).fromTo(s,.6,{autoAlpha:0,y:-100},{autoAlpha:1,y:0,ease:Power2.easeIn}).fromTo(l,.6,{autoAlpha:0,y:-100},{autoAlpha:1,y:0,ease:Power2.easeIn}),r.on("click",function(){r.toggleClass("nav-trigger--on"),n.toggleClass("nav--open")}),y.on("click",function(){g.toggleClass("info--open"),y.toggleClass("reveal-close")})}$(document).ready(onReady);
}

/*
     FILE ARCHIVED ON 04:07:55 Nov 17, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:07:39 Apr 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.655
  exclusion.robots: 0.049
  exclusion.robots.policy: 0.037
  esindex: 0.012
  cdx.remote: 5.656
  LoadShardBlock: 110.206 (3)
  PetaboxLoader3.datanode: 115.75 (4)
  PetaboxLoader3.resolve: 120.079 (2)
  load_resource: 129.062
*/