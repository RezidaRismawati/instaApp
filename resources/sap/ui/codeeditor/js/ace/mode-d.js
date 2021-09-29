ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var D=function(){this.$rules={"start":[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},D.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]};};o.inherits(D,T);D.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"};};D.getStartRule=function(s){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:s};};D.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s};};e.DocCommentHighlightRules=D;});ace.define("ace/mode/d_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var D=r("./doc_comment_highlight_rules").DocCommentHighlightRules;var T=r("./text_highlight_rules").TextHighlightRules;var a=function(){var k=("this|super|import|module|body|mixin|__traits|invariant|alias|asm|delete|"+"typeof|typeid|sizeof|cast|new|in|is|typedef|__vector|__parameters");var b=("break|case|continue|default|do|else|for|foreach|foreach_reverse|goto|if|"+"return|switch|while|catch|try|throw|finally|version|assert|unittest|with");var t=("auto|bool|char|dchar|wchar|byte|ubyte|float|double|real|"+"cfloat|creal|cdouble|cent|ifloat|ireal|idouble|"+"int|long|short|void|uint|ulong|ushort|ucent|"+"function|delegate|string|wstring|dstring|size_t|ptrdiff_t|hash_t|Object");var c=("abstract|align|debug|deprecated|export|extern|const|final|in|inout|out|"+"ref|immutable|lazy|nothrow|override|package|pragma|private|protected|"+"public|pure|scope|shared|__gshared|synchronized|static|volatile");var s=("class|struct|union|template|interface|enum|macro");var d={token:"constant.language.escape",regex:"\\\\(?:(?:x[0-9A-F]{2})|(?:[0-7]{1,3})|(?:['\"\\?0abfnrtv\\\\])|"+"(?:u[0-9a-fA-F]{4})|(?:U[0-9a-fA-F]{8}))"};var f=("null|true|false|"+"__DATE__|__EOF__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|"+"__FILE__|__MODULE__|__LINE__|__FUNCTION__|__PRETTY_FUNCTION__");var g=("/|/\\=|&|&\\=|&&|\\|\\|\\=|\\|\\||\\-|\\-\\=|\\-\\-|\\+|"+"\\+\\=|\\+\\+|\\<|\\<\\=|\\<\\<|\\<\\<\\=|\\<\\>|\\<\\>\\=|\\>|\\>\\=|\\>\\>\\=|"+"\\>\\>\\>\\=|\\>\\>|\\>\\>\\>|\\!|\\!\\=|\\!\\<\\>|\\!\\<\\>\\=|\\!\\<|\\!\\<\\=|"+"\\!\\>|\\!\\>\\=|\\?|\\$|\\=|\\=\\=|\\*|\\*\\=|%|%\\=|"+"\\^|\\^\\=|\\^\\^|\\^\\^\\=|~|~\\=|\\=\\>|#");var h=this.$keywords=this.createKeywordMapper({"keyword.modifier":c,"keyword.control":b,"keyword.type":t,"keyword":k,"keyword.storage":s,"punctation":"\\.|\\,|;|\\.\\.|\\.\\.\\.","keyword.operator":g,"constant.language":f},"identifier");var i="[a-zA-Z_\u00a1-\uffff][a-zA-Z\\d_\u00a1-\uffff]*\\b";this.$rules={"start":[{token:"comment",regex:"\\/\\/.*$"},D.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"star-comment"},{token:"comment.shebang",regex:"^\\s*#!.*"},{token:"comment",regex:"\\/\\+",next:"plus-comment"},{onMatch:function(v,j,l){l.unshift(this.next,v.substr(2));return"string";},regex:'q"(?:[\\[\\(\\{\\<]+)',next:'operator-heredoc-string'},{onMatch:function(v,j,l){l.unshift(this.next,v.substr(2));return"string";},regex:'q"(?:[a-zA-Z_]+)$',next:'identifier-heredoc-string'},{token:"string",regex:'[xr]?"',next:"quote-string"},{token:"string",regex:'[xr]?`',next:"backtick-string"},{token:"string",regex:"[xr]?['](?:(?:\\\\.)|(?:[^'\\\\]))*?['][cdw]?"},{token:["keyword","text","paren.lparen"],regex:/(asm)(\s*)({)/,next:"d-asm"},{token:["keyword","text","paren.lparen","constant.language"],regex:"(__traits)(\\s*)(\\()("+i+")"},{token:["keyword","text","variable.module"],regex:"(import|module)(\\s+)((?:"+i+"\\.?)*)"},{token:["keyword.storage","text","entity.name.type"],regex:"("+s+")(\\s*)("+i+")"},{token:["keyword","text","variable.storage","text"],regex:"(alias|typedef)(\\s*)("+i+")(\\s*)"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F_]+(l|ul|u|f|F|L|U|UL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d[\\d_]*(?:(?:\\.[\\d_]*)?(?:[eE][+-]?[\\d_]+)?)?(l|ul|u|f|F|L|U|UL)?\\b"},{token:"entity.other.attribute-name",regex:"@"+i},{token:h,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:g},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\.|\\:"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],"star-comment":[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:'comment'}],"plus-comment":[{token:"comment",regex:"\\+\\/",next:"start"},{defaultToken:'comment'}],"quote-string":[d,{token:"string",regex:'"[cdw]?',next:"start"},{defaultToken:'string'}],"backtick-string":[d,{token:"string",regex:'`[cdw]?',next:"start"},{defaultToken:'string'}],"operator-heredoc-string":[{onMatch:function(v,j,l){v=v.substring(v.length-2,v.length-1);var n={'>':'<',']':'[',')':'(','}':'{'};if(Object.keys(n).indexOf(v)!=-1)v=n[v];if(v!=l[1])return"string";l.shift();l.shift();return"string";},regex:'(?:[\\]\\)}>]+)"',next:'start'},{token:'string',regex:'[^\\]\\)}>]+'}],"identifier-heredoc-string":[{onMatch:function(v,j,l){v=v.substring(0,v.length-1);if(v!=l[1])return"string";l.shift();l.shift();return"string";},regex:'^(?:[A-Za-z_][a-zA-Z0-9]+)"',next:'start'},{token:'string',regex:'[^\\]\\)}>]+'}],"d-asm":[{token:"paren.rparen",regex:"\\}",next:"start"},{token:'keyword.instruction',regex:'[a-zA-Z]+',next:'d-asm-instruction'},{token:"text",regex:"\\s+"}],'d-asm-instruction':[{token:'constant.language',regex:/AL|AH|AX|EAX|BL|BH|BX|EBX|CL|CH|CX|ECX|DL|DH|DX|EDX|BP|EBP|SP|ESP|DI|EDI|SI|ESI/i},{token:'identifier',regex:'[a-zA-Z]+'},{token:'string',regex:'".*"'},{token:'comment',regex:'//.*$'},{token:'constant.numeric',regex:'[0-9.xA-F]+'},{token:'punctuation.operator',regex:'\\,'},{token:'punctuation.operator',regex:';',next:'d-asm'},{token:'text',regex:'\\s+'}]};this.embedRules(D,"doc-",[D.getEndRule("start")]);};a.metaData={comment:'D language',fileTypes:['d','di'],firstLineMatch:'^#!.*\\b[glr]?dmd\\b.',foldingStartMarker:'(?x)/\\*\\*(?!\\*)|^(?![^{]*?//|[^{]*?/\\*(?!.*?\\*/.*?\\{)).*?\\{\\s*($|//|/\\*(?!.*?\\*/.*\\S))',foldingStopMarker:'(?<!\\*)\\*\\*/|^\\s*\\}',keyEquivalent:'^~D',name:'D',scopeName:'source.d'};o.inherits(a,T);e.DHighlightRules=a;});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/d",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/d_highlight_rules","ace/mode/folding/cstyle"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var D=r("./d_highlight_rules").DHighlightRules;var F=r("./folding/cstyle").FoldMode;var M=function(){this.HighlightRules=D;this.foldingRules=new F();this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/d";}).call(M.prototype);e.Mode=M;});
