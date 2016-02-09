(function(tweenui) {
var timeline;
function startPlaying() { timeline.play(0); }
function g(name) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"); var results = regex.exec(window.location.search); if(results == null) return ""; else return decodeURIComponent(results[1].replace(/\+/g, " ")); }
var res = function() { var bd = document.getElementsByTagName('body')[0];bd.style.webkitTransform = 'scale(' + window.innerWidth/460 + ')';bd.style.transform = 'scale(' + window.innerWidth/460 + ')';}
if (g('s')==1) { window.onresize = res; }
var loadcnt = 3;
function tui_go() {
--loadcnt; if (loadcnt==0) {
var l = g("l"); var ctl = document.getElementById("tui-ctl");
if (l!="" && ctl) { if (g('a')==1) { l = l + encodeURIComponent(ctl.href) } ctl.href=l; }
if (typeof(tweenui.exp) == "function") { tweenui.exp(); }
TweenLite.set(document.getElementById("tui-ct"), {css: {alpha: 0}});
if (g('s')==1) { res(); }
startPlaying();
}
}
tweenui.init = function() {
timeline = new TimelineLite({paused:true, onComplete:startPlaying});
TweenLite.defaultOverwrite = "none";
timeline.insert(new TweenLite({}, 0.0, {}), 4.0);
var layer_1 = document.getElementById("tui-11");
timeline.insert(TweenLite.to(layer_1, 0.9849246231155779, {css: {autoAlpha: 1.0}, ease: Power1.easeOut}), 1.949748743718593);
timeline.insert(TweenLite.to(layer_1, 0.5, {css: {autoAlpha: 0.0}, ease: Power1.easeOut}), 3.5);
TweenLite.set(layer_1, {css: {autoAlpha: 0.0, x: -21, y: 10, scale: 0.69, rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0}});
var layer_2 = document.getElementById("tui-7");
timeline.insert(TweenLite.to(layer_2, 0.44221105527638194, {css: {y: 22, x: 104}, ease: Power1.easeOut}), 0.0);
timeline.insert(TweenLite.to(layer_2, 0.5, {css: {autoAlpha: 0.0}, ease: Power1.easeOut}), 1.51);
TweenLite.set(layer_2, {css: {autoAlpha: 1.0, x: 115, y: -57, scale: 1.0, rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0}});
var layer_3 = document.getElementById("tui-9");
timeline.insert(TweenLite.to(layer_3, 0.44221105527638194, {css: {y: 83, x: 90}, ease: Power1.easeOut}), 0.0);
timeline.insert(TweenLite.to(layer_3, 0.5, {css: {autoAlpha: 0.0}, ease: Power1.easeOut}), 1.47);
TweenLite.set(layer_3, {css: {autoAlpha: 1.0, x: 459, y: 79, scale: 1.0, rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0}});
var layer_4 = document.getElementById("tui-8");
timeline.insert(TweenLite.to(layer_4, 0.44221105527638194, {css: {y: 145, x: 133}, ease: Power1.easeOut}), 0.0);
timeline.insert(TweenLite.to(layer_4, 0.5, {css: {autoAlpha: 0.0}, ease: Power1.easeOut}), 1.53);
TweenLite.set(layer_4, {css: {autoAlpha: 1.0, x: 136, y: 230, scale: 1.0, rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0}});
var layer_5 = document.getElementById("tui-12");
timeline.insert(TweenLite.to(layer_5, 0.5025125628140703, {css: {y: -266, x: -746}, ease: Power1.easeOut}), 1.7487437185929648);
timeline.insert(TweenLite.to(layer_5, 0.5, {css: {autoAlpha: 0.40816326530612246}, ease: Power1.easeOut}), 0.0);
TweenLite.set(layer_5, {css: {autoAlpha: 0.0, x: -278, y: -269, scale: 0.51, rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0}});
tui_go();
}
WebFontConfig = {google: { families: ['Open Sans'] }, active: function() { tui_go(); },inactive: function() { tui_go(); } };(function() {var wf = document.createElement('script');wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +'://ajax.googleapis.com/ajax/libs/webfont/1.0.31/webfont.js';wf.type = 'text/javascript';wf.async = 'true';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(wf, s);})();
var imgcnt = 2;
tweenui.imgcntd = function(e) { var id = e.id.replace(/[^0-9.]/g, "");e.parentNode.removeChild(e);document.getElementById('tui-' + id).appendChild(e); --imgcnt; if (imgcnt==0) { tui_go(); }}
}(window.tweenui = window.tweenui || {}));