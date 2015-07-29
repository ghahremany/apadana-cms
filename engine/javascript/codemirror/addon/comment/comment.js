!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function n(e){var n=e.search(i);return-1==n?0:n}var t={},i=/[^\s\u00a0]/,l=e.Pos;e.commands.toggleComment=function(e){for(var n=1/0,t=e.listSelections(),i=null,o=t.length-1;o>=0;o--){var r=t[o].from(),a=t[o].to();r.line>=n||(a.line>=n&&(a=l(n,0)),n=r.line,null==i?e.uncomment(r,a)?i="un":(e.lineComment(r,a),i="line"):"un"==i?e.uncomment(r,a):e.lineComment(r,a))}},e.defineExtension("lineComment",function(e,o,r){r||(r=t);var a=this,m=a.getModeAt(e),c=r.lineComment||m.lineComment;if(!c)return void((r.blockCommentStart||m.blockCommentStart)&&(r.fullLines=!0,a.blockComment(e,o,r)));var f=a.getLine(e.line);if(null!=f){var g=Math.min(0!=o.ch||o.line==e.line?o.line+1:o.line,a.lastLine()+1),s=null==r.padding?" ":r.padding,d=r.commentBlankLines||e.line==o.line;a.operation(function(){if(r.indent)for(var t=f.slice(0,n(f)),o=e.line;g>o;++o){var m=a.getLine(o),u=t.length;(d||i.test(m))&&(m.slice(0,u)!=t&&(u=n(m)),a.replaceRange(t+c+s,l(o,0),l(o,u)))}else for(var o=e.line;g>o;++o)(d||i.test(a.getLine(o)))&&a.replaceRange(c+s,l(o,0))})}}),e.defineExtension("blockComment",function(e,n,o){o||(o=t);var r=this,a=r.getModeAt(e),m=o.blockCommentStart||a.blockCommentStart,c=o.blockCommentEnd||a.blockCommentEnd;if(!m||!c)return void((o.lineComment||a.lineComment)&&0!=o.fullLines&&r.lineComment(e,n,o));var f=Math.min(n.line,r.lastLine());f!=e.line&&0==n.ch&&i.test(r.getLine(f))&&--f;var g=null==o.padding?" ":o.padding;e.line>f||r.operation(function(){if(0!=o.fullLines){var t=i.test(r.getLine(f));r.replaceRange(g+c,l(f)),r.replaceRange(m+g,l(e.line,0));var s=o.blockCommentLead||a.blockCommentLead;if(null!=s)for(var d=e.line+1;f>=d;++d)(d!=f||t)&&r.replaceRange(s+g,l(d,0))}else r.replaceRange(c,n),r.replaceRange(m,e)})}),e.defineExtension("uncomment",function(e,n,o){o||(o=t);var r,a=this,m=a.getModeAt(e),c=Math.min(0!=n.ch||n.line==e.line?n.line:n.line-1,a.lastLine()),f=Math.min(e.line,c),g=o.lineComment||m.lineComment,s=[],d=null==o.padding?" ":o.padding;e:if(g){for(var u=f;c>=u;++u){var h=a.getLine(u),v=h.indexOf(g);if(v>-1&&!/comment/.test(a.getTokenTypeAt(l(u,v+1)))&&(v=-1),-1==v&&(u!=c||u==f)&&i.test(h))break e;if(v>-1&&i.test(h.slice(0,v)))break e;s.push(h)}if(a.operation(function(){for(var e=f;c>=e;++e){var n=s[e-f],t=n.indexOf(g),i=t+g.length;0>t||(n.slice(i,i+d.length)==d&&(i+=d.length),r=!0,a.replaceRange("",l(e,t),l(e,i)))}}),r)return!0}var p=o.blockCommentStart||m.blockCommentStart,C=o.blockCommentEnd||m.blockCommentEnd;if(!p||!C)return!1;var b=o.blockCommentLead||m.blockCommentLead,k=a.getLine(f),L=c==f?k:a.getLine(c),x=k.indexOf(p),R=L.lastIndexOf(C);if(-1==R&&f!=c&&(L=a.getLine(--c),R=L.lastIndexOf(C)),-1==x||-1==R||!/comment/.test(a.getTokenTypeAt(l(f,x+1)))||!/comment/.test(a.getTokenTypeAt(l(c,R+1))))return!1;var O=k.lastIndexOf(p,e.ch),M=-1==O?-1:k.slice(0,e.ch).indexOf(C,O+p.length);if(-1!=O&&-1!=M&&M+C.length!=e.ch)return!1;M=L.indexOf(C,n.ch);var E=L.slice(n.ch).lastIndexOf(p,M-n.ch);return O=-1==M||-1==E?-1:n.ch+E,-1!=M&&-1!=O&&O!=n.ch?!1:(a.operation(function(){a.replaceRange("",l(c,R-(d&&L.slice(R-d.length,R)==d?d.length:0)),l(c,R+C.length));var e=x+p.length;if(d&&k.slice(e,e+d.length)==d&&(e+=d.length),a.replaceRange("",l(f,x),l(f,e)),b)for(var n=f+1;c>=n;++n){var t=a.getLine(n),o=t.indexOf(b);if(-1!=o&&!i.test(t.slice(0,o))){var r=o+b.length;d&&t.slice(r,r+d.length)==d&&(r+=d.length),a.replaceRange("",l(n,o),l(n,r))}}}),!0)})});