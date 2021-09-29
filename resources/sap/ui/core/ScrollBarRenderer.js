/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device',"sap/ui/dom/getScrollbarSize"],function(D,g){"use strict";var S={};S.render=function(r,s){var a=r;var R=sap.ui.getCore().getConfiguration().getRTL();a.addClass("sapUiScrollBar");var b;if(D.support.touch){b="sapUiScrollBarTouch";a.addClass(b);}var v=s.getVertical();var c=s.getSize();var C=s.getContentSize();var B=g(b);var w=B.width;var h=B.height;if(D.browser.edge){if(!w){w="15";}if(!h){h="15";}}if(v){a.write("<div");a.writeControlData(s);a.write(" style=\"overflow:hidden;width:"+w+"px");if(c){a.write(";height:"+c);}a.write("\"");a.writeClasses();a.write(">");a.write("<div ");a.writeAttribute("id",s.getId()+"-sb");a.write(" style=\"width:"+w*2+"px;height:100%;overflow-y:scroll;overflow-x:hidden");if(R){a.write(";margin-right:-"+w+"px");}else{a.write(";margin-left:-"+w+"px;");}a.write("\">");a.write("<div");a.writeAttribute("id",s.getId()+"-sbcnt");a.write(" style=\"width:"+w+"px");if(C){a.write(";height:"+C);}a.write("\"");a.write(">");a.write("</div>");a.write("</div>");a.write("<div> <span id="+s.getId()+"-ffsize"+" style='position: absolute; top: -9000px; left: -9000px; visibility: hidden; line-height: normal;'> FF Size</span></div>");a.write("</div>");}else{a.write("<div");a.writeControlData(s);a.write(" style=\"overflow:hidden;height:"+h+"px");if(c){a.write(";width:"+c);}a.write("\"");a.writeClasses();a.write(">");a.write("<div ");a.writeAttribute("id",s.getId()+"-sb");a.write(" style=\"height:"+h*2+"px;margin-top:-"+h+"px;overflow-x:scroll;overflow-y:hidden\">");a.write("<div");a.writeAttribute("id",s.getId()+"-sbcnt");a.write(" style=\"height:"+h+"px");if(C){a.write(";width:"+C);}a.write("\"");a.write(">");a.write("</div>");a.write("</div>");a.write("</div>");}};return S;},true);
