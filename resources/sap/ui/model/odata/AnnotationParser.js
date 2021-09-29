/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/ui/Device","sap/ui/thirdparty/jquery"],function(a,L,D,q){"use strict";var A={EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var t={Binary:true,Bool:true,Date:true,DateTimeOffset:true,Decimal:true,Duration:true,Float:true,Guid:true,Int:true,String:true,TimeOfDay:true,LabelElementReference:true,EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var M={And:true,Or:true,Eq:true,Ne:true,Gt:true,Ge:true,Lt:true,Le:true,If:true,Collection:true};var b={merge:function(T,s){var c,d;var S=["annotationsAtArrays","propertyAnnotations","EntityContainer","annotationReferences"];for(c in s){if(S.indexOf(c)!==-1){continue;}b._mergeAnnotation(c,s,T);}for(var i=1;i<S.length;++i){var e=S[i];T[e]=T[e]||{};for(c in s[e]){for(d in s[e][c]){T[e][c]=T[e][c]||{};b._mergeAnnotation(d,s[e][c],T[e][c]);}}}if(s.annotationsAtArrays){T.annotationsAtArrays=(T.annotationsAtArrays||[]).concat(s.annotationsAtArrays);}},_mergeAnnotation:function(n,m,T){if(Array.isArray(m[n])){T[n]=m[n].slice(0);}else{T[n]=T[n]||{};for(var k in m[n]){T[n][k]=m[n][k];}}},parse:function(m,x,s){var c={},d,e,f,T,g,h,l,n,p,r,u,v,w,y,z,B,C,E,F,G,H,i,I,J=[];b._parserData={};b._oXPath=b.getXPath();b._parserData.metadataInstance=m;b._parserData.serviceMetadata=m.getServiceMetadata();b._parserData.xmlDocument=b._oXPath.setNameSpace(x);b._parserData.schema={};b._parserData.aliases={};b._parserData.url=s?s:"metadata document";b._parserData.annotationsAtArrays=J;d=b._oXPath.selectNodes("//d:Schema",b._parserData.xmlDocument);for(i=0;i<d.length;i+=1){e=b._oXPath.nextNode(d,i);b._parserData.schema.Alias=e.getAttribute("Alias");b._parserData.schema.Namespace=e.getAttribute("Namespace");}var K={};var N=b._parseReferences(K);if(N){c.annotationReferences=K;c.aliasDefinitions=b._parserData.aliases;}f=b._oXPath.selectNodes("//d:Term",b._parserData.xmlDocument);if(f.length>0){T={};for(I=0;I<f.length;I+=1){g=b._oXPath.nextNode(f,I);h=b.replaceWithAlias(g.getAttribute("Type"));T["@"+b._parserData.schema.Alias+"."+g.getAttribute("Name")]=h;}c.termDefinitions=T;}b._parserData.metadataProperties=b.getAllPropertiesMetadata(b._parserData.serviceMetadata);if(b._parserData.metadataProperties.extensions){c.propertyExtensions=b._parserData.metadataProperties.extensions;}l=b._oXPath.selectNodes("//d:Annotations ",b._parserData.xmlDocument);for(I=0;I<l.length;I+=1){n=b._oXPath.nextNode(l,I);if(n.hasChildNodes()===false){continue;}p=n.getAttribute("Target");r=p.split(".")[0];if(r&&b._parserData.aliases[r]){p=p.replace(new RegExp(r,""),b._parserData.aliases[r]);}u=p;v=null;var O=null;if(p.indexOf("/")>0){u=p.split("/")[0];var S=b._parserData.serviceMetadata.dataServices&&b._parserData.serviceMetadata.dataServices.schema&&b._parserData.serviceMetadata.dataServices.schema.length;if(S){for(var j=b._parserData.serviceMetadata.dataServices.schema.length-1;j>=0;j--){var P=b._parserData.serviceMetadata.dataServices.schema[j];if(P.entityContainer){var Q=u.split('.');for(var k=P.entityContainer.length-1;k>=0;k--){if(P.entityContainer[k].name===Q[Q.length-1]){O=p.replace(u+"/","");break;}}}}}if(!O){v=p.replace(u+"/","");}}if(v){if(!c.propertyAnnotations){c.propertyAnnotations={};}if(!c.propertyAnnotations[u]){c.propertyAnnotations[u]={};}if(!c.propertyAnnotations[u][v]){c.propertyAnnotations[u][v]={};}w=b._oXPath.selectNodes("./d:Annotation",n);for(var R=0;R<w.length;R+=1){y=b._oXPath.nextNode(w,R);z=b.replaceWithAlias(y.getAttribute("Term"));var U=n.getAttribute("Qualifier")||y.getAttribute("Qualifier");if(U){z+="#"+U;}if(y.hasChildNodes()===false){var o={};b.enrichFromPropertyValueAttributes(o,y);if(q.isEmptyObject(o)){o.Bool="true";}c.propertyAnnotations[u][v][z]=o;}else{c.propertyAnnotations[u][v][z]=b.getPropertyValue(y);}}}else{var V;if(O){if(!c["EntityContainer"]){c["EntityContainer"]={};}if(!c["EntityContainer"][u]){c["EntityContainer"][u]={};}V=c["EntityContainer"][u];}else{if(!c[u]){c[u]={};}V=c[u];}B=u.replace(b._parserData.aliases[r],r);w=b._oXPath.selectNodes("./d:Annotation",n);for(var W=0;W<w.length;W+=1){y=b._oXPath.nextNode(w,W);var X=V;if(O){if(!V[O]){V[O]={};}X=V[O];}b._parseAnnotation(u,n,y,X);}C=b._oXPath.selectNodes("//d:Annotations[contains(@Target, '"+B+"')]//d:PropertyValue[contains(@Path, '/')]//@Path",b._parserData.xmlDocument);for(i=0;i<C.length;i+=1){E=b._oXPath.nextNode(C,i);F=E.value;if(c.propertyAnnotations){if(c.propertyAnnotations[u]){if(c.propertyAnnotations[u][F]){continue;}}}G=F.split('/');if(b.findNavProperty(u,G[0])){if(!c.expand){c.expand={};}if(!c.expand[u]){c.expand[u]={};}c.expand[u][G[0]]=G[0];}}H=b._oXPath.selectNodes("//d:Annotations[contains(@Target, '"+B+"')]//d:Path[contains(., '/')]",b._parserData.xmlDocument);for(i=0;i<H.length;i+=1){E=b._oXPath.nextNode(H,i);F=b._oXPath.getNodeText(E);if(c.propertyAnnotations&&c.propertyAnnotations[u]&&c.propertyAnnotations[u][F]){continue;}if(!c.expand){c.expand={};}if(!c.expand[u]){c.expand[u]={};}G=F.split('/');if(b.findNavProperty(u,G[0])){if(!c.expand){c.expand={};}if(!c.expand[u]){c.expand[u]={};}c.expand[u][G[0]]=G[0];}}}}if(J.length){c.annotationsAtArrays=J.map(function(Y){return b.backupAnnotationAtArray(Y,c);});}delete b._parserData;return c;},backupAnnotationAtArray:function(e,m){var o=e,s,Q,S=[];function i(){return Array.prototype.filter.call(e.parentNode.childNodes,function(n){return n.nodeType===1;}).indexOf(e);}while(o.nodeName!=="Annotations"){o=o.parentNode;}s=o.getAttribute("Qualifier");while(e!==o){switch(e.nodeName){case"Annotation":Q=e.getAttribute("Qualifier")||s;S.unshift(e.getAttribute("Term")+(Q?"#"+Q:""));break;case"Collection":break;case"PropertyValue":S.unshift(e.getAttribute("Property"));break;case"Record":if(e.parentNode.nodeName==="Collection"){S.unshift(i());}break;default:if(e.parentNode.nodeName==="Apply"){S.unshift("Value");S.unshift(i());S.unshift("Parameters");}else{S.unshift(e.nodeName);}break;}e=e.parentNode;}S.unshift(o.getAttribute("Target"));S=S.map(function(v){return typeof v==="string"?b.replaceWithAlias(v):v;});b.syncAnnotationsAtArrays(m,S,true);return S;},restoreAnnotationsAtArrays:function(m){if(m.annotationsAtArrays){m.annotationsAtArrays.forEach(function(s){b.syncAnnotationsAtArrays(m,s);});}},syncAnnotationsAtArrays:function(m,s,w){var i,n=s.length-2,c=s[n+1],p=m,P=s[n],S=P+"@"+c;for(i=0;i<n;i+=1){p=p&&p[s[i]];}if(p&&Array.isArray(p[P])){if(!(S in p)){p[S]=p[P][c];}if(!(c in p[P])){p[P][c]=p[S];}}else if(w){L.warning("Wrong path to annotation at array",s,"sap.ui.model.odata.AnnotationParser");}},_parseAnnotation:function(s,o,c,d){var Q=c.getAttribute("Qualifier")||o.getAttribute("Qualifier");var T=b.replaceWithAlias(c.getAttribute("Term"));if(Q){T+="#"+Q;}var v=b.getPropertyValue(c,s);v=b.setEdmTypes(v,b._parserData.metadataProperties.types,s,b._parserData.schema);d[T]=v;if(Array.isArray(d)){b._parserData.annotationsAtArrays.push(c);}},_parseReferences:function(m){var f=false;var n,i;var x=b._oXPath;var s="//edmx:Reference/edmx:Include[@Namespace and @Alias]";var o=x.selectNodes(s,b._parserData.xmlDocument);for(i=0;i<o.length;++i){f=true;n=x.nextNode(o,i);b._parserData.aliases[n.getAttribute("Alias")]=n.getAttribute("Namespace");}var r="//edmx:Reference[@Uri]/edmx:IncludeAnnotations[@TermNamespace]";var R=x.selectNodes(r,b._parserData.xmlDocument);for(i=0;i<R.length;++i){f=true;n=x.nextNode(R,i);var T=n.getAttribute("TermNamespace");var c=n.getAttribute("TargetNamespace");var d=n.parentNode.getAttribute("Uri");if(c){if(!m[c]){m[c]={};}m[c][T]=d;}else{m[T]=d;}}return f;},getAllPropertiesMetadata:function(o){var c={},P={},d={},e=false,n,E,C,f={},g={},h={},r=false,s,u,v,T,w,R={types:P};if(!o.dataServices.schema){return R;}for(var i=o.dataServices.schema.length-1;i>=0;i-=1){c=o.dataServices.schema[i];if(c.entityType){n=c.namespace;E=c.entityType;C=c.complexType;for(var j=0;j<E.length;j+=1){f=E[j];h={};g={};if(f.property){for(var k=0;k<f.property.length;k+=1){s=f.property[k];if(s.type.substring(0,n.length)===n){if(C){for(var l=0;l<C.length;l+=1){if(C[l].name===s.type.substring(n.length+1)){if(C[l].property){for(var m=0;m<C[l].property.length;m+=1){u=C[l].property[m];g[C[l].name+"/"+u.name]=u.type;}}}}}}else{v=s.name;T=s.type;if(s.extensions){for(var p=0;p<s.extensions.length;p+=1){w=s.extensions[p];if((w.name==="display-format")&&(w.value==="Date")){T="Edm.Date";}else{r=true;if(!h[v]){h[v]={};}if(w.namespace&&!h[v][w.namespace]){h[v][w.namespace]={};}h[v][w.namespace][w.name]=w.value;}}}g[v]=T;}}}if(!P[n+"."+f.name]){P[n+"."+f.name]={};}P[n+"."+f.name]=g;if(r){if(!d[n+"."+f.name]){e=true;}d[n+"."+f.name]={};d[n+"."+f.name]=h;}}}}if(e){R={types:P,extensions:d};}return R;},setEdmTypes:function(p,P,T,s){function c(d){var o,e='';if(p[d]){o=p[d];if(o.Value&&o.Value.Path){e=b.getEdmType(o.Value.Path,P,T,s);if(e){p[d].EdmType=e;}}else if(o.Path){e=b.getEdmType(o.Path,P,T,s);if(e){p[d].EdmType=e;}}else if(o.Facets){p[d].Facets=b.setEdmTypes(o.Facets,P,T,s);}else if(o.Data){p[d].Data=b.setEdmTypes(o.Data,P,T,s);}else if(d==="Data"){p.Data=b.setEdmTypes(o,P,T,s);}else if(o.Value&&o.Value.Apply){p[d].Value.Apply.Parameters=b.setEdmTypes(o.Value.Apply.Parameters,P,T,s);}else if(o.Value&&o.Type&&(o.Type==="Path")){e=b.getEdmType(o.Value,P,T,s);if(e){p[d].EdmType=e;}}}}if(Array.isArray(p)){for(var v=0;v<p.length;v+=1){c(v);}}else{for(var V in p){c(V);}}return p;},getEdmType:function(p,P,T,s){var i=p.indexOf("/");if(i>-1){var c=p.substr(0,i);var n=b.findNavProperty(T,c);if(n){var m=b._parserData.metadataInstance._getEntityTypeByNavPropertyObject(n);if(m){T=m.entityType;p=p.substr(i+1);}}}if((p.charAt(0)==="@")&&(p.indexOf(s.Alias)===1)){p=p.slice(s.Alias.length+2);}if(p.indexOf("/")>=0){if(P[p.slice(0,p.indexOf("/"))]){T=p.slice(0,p.indexOf("/"));p=p.slice(p.indexOf("/")+1);}}return P[T]&&P[T][p];},enrichFromPropertyValueAttributes:function(m,n){var I={"Property":true,"Qualifier":true,"Term":true,"xmlns":true};for(var i=0;i<n.attributes.length;i+=1){var N=n.attributes[i].name;if(!I[N]&&(N.indexOf("xmlns:")!==0)){var v=n.attributes[i].value;if(N==="EnumMember"&&v.indexOf(" ")>-1){var V=v.split(" ");m[N]=V.map(b.replaceWithAlias).join(" ");}else{m[N]=b.replaceWithAlias(v);}}}return m;},_getRecordValues:function(n){var N=[];var x=b._oXPath;for(var i=0;i<n.length;++i){var o=x.nextNode(n,i);var v=b.getPropertyValues(o);var T=o.getAttribute("Type");if(T){v["RecordType"]=b.replaceWithAlias(T);}N.push(v);}return N;},_getTextValues:function(n){var N=[];var x=b._oXPath;for(var i=0;i<n.length;i+=1){var o=x.nextNode(n,i);var v={};var T=x.getNodeText(o);v[o.nodeName]=b._parserData.aliases?b.replaceWithAlias(T):T;N.push(v);}return N;},_getTextValue:function(n){var x=b._oXPath;var v="";if(n.nodeName in A){v=b.replaceWithAlias(x.getNodeText(n));}else{v=x.getNodeText(n);}if(n.nodeName!=="String"){v=v.trim();}return v;},getPropertyValue:function(d,s){var i;var x=b._oXPath;var p=d.nodeName==="Collection"?[]:{};if(d.hasChildNodes()){var r=x.selectNodes("./d:Record",d);var R=b._getRecordValues(r);var c=x.selectNodes("./d:Collection/d:Record | ./d:Collection/d:If/d:Record",d);var C=b._getRecordValues(c);var P=R.concat(C);if(P.length>0){if(c.length===0&&r.length>0){p=P[0];}else{p=P;}}else{var o=x.selectNodes("./d:Collection/d:AnnotationPath | ./d:Collection/d:NavigationPropertyPath | ./d:Collection/d:PropertyPath",d);if(o.length>0){p=b._getTextValues(o);}else{var e=x.selectNodes("./d:*[not(local-name() = \"Annotation\")]",d);if(e.length>0){for(i=0;i<e.length;i++){var f=x.nextNode(e,i);var v;var n=f.nodeName;var g=f.parentNode.nodeName;if(n==="Apply"){v=b.getApplyFunctions(f);}else{v=b.getPropertyValue(f);}if(M[g]){if(!Array.isArray(p)){p=[];}var V={};V[n]=v;p.push(V);}else if(n==="Collection"){p=v;}else{if(p[n]){L.warning("Annotation contained multiple "+n+" values. Only the last "+"one will be stored: "+x.getPath(f));}p[n]=v;}}b.enrichFromPropertyValueAttributes(p,d);}else if(d.nodeName in t){p=b._getTextValue(d);}else{b.enrichFromPropertyValueAttributes(p,d);}}}var N=x.selectNodes("./d:Annotation",d);if(N.length>0){for(i=0;i<N.length;i++){var h=x.nextNode(N,i);b._parseAnnotation(s,d,h,p);}}}else if(d.nodeName in t){p=b._getTextValue(d);}else if(d.nodeName.toLowerCase()==="null"){p=null;}else{b.enrichFromPropertyValueAttributes(p,d);}return p;},getPropertyValues:function(p){var P={},i;var x=b._oXPath;var o=x.selectNodes("./d:Annotation",p);var c=x.selectNodes("./d:PropertyValue",p);function g(p,w,N){var j,k=p;while(k.nodeName!=="Annotation"){k=k.parentNode;}j=k.parentNode;return(w+" '"+N+"' is defined twice; "+"Source = "+b._parserData.url+", Annotation Target = "+j.getAttribute("Target")+", Term = "+k.getAttribute("Term"));}if(o.length===0&&c.length===0){P=b.getPropertyValue(p);}else{for(i=0;i<o.length;i++){var d=x.nextNode(o,i);var T=b.replaceWithAlias(d.getAttribute("Term"));a(!P[T],function(){return g(p,"Annotation",T);});P[T]=b.getPropertyValue(d);}for(i=0;i<c.length;i++){var e=x.nextNode(c,i);var s=e.getAttribute("Property");a(!P[s],function(){return g(p,"Property",s);});P[s]=b.getPropertyValue(e);var f=x.selectNodes("./d:Apply",e);for(var n=0;n<f.length;n+=1){var h=x.nextNode(f,n);P[s]={};P[s]['Apply']=b.getApplyFunctions(h);}}}return P;},getApplyFunctions:function(c){var x=b._oXPath;var m={Name:c.getAttribute('Function'),Parameters:[]};var p=x.selectNodes("./d:*",c);for(var i=0;i<p.length;i+=1){var P=x.nextNode(p,i);var d={Type:P.nodeName};if(P.nodeName==="Apply"){d.Value=b.getApplyFunctions(P);}else if(P.nodeName==="LabeledElement"){d.Value=b.getPropertyValue(P);d.Name=d.Value.Name;delete d.Value.Name;}else if(M[P.nodeName]){d.Value=b.getPropertyValue(P);}else{d.Value=x.getNodeText(P);}m.Parameters.push(d);}return m;},findNavProperty:function(e,p){var m=b._parserData.serviceMetadata;for(var i=m.dataServices.schema.length-1;i>=0;i-=1){var o=m.dataServices.schema[i];if(o.entityType){var n=o.namespace+".";var E=o.entityType;for(var k=E.length-1;k>=0;k-=1){if(n+E[k].name===e&&E[k].navigationProperty){for(var j=0;j<E[k].navigationProperty.length;j+=1){if(E[k].navigationProperty[j].name===p){return E[k].navigationProperty[j];}}}}}}return null;},replaceWithAlias:function(v,r){if(r===undefined){r=1;}for(var s in b._parserData.aliases){if(v.indexOf(s+".")>=0&&v.indexOf("."+s+".")<0){v=v.replace(s+".",b._parserData.aliases[s]+".");r--;if(r===0){return v;}}}return v;},getXPath:function(){var x={};var p=b._parserData;if(D.browser.msie){x={setNameSpace:function(o){o.setProperty("SelectionNamespaces",'xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" xmlns:d="http://docs.oasis-open.org/odata/ns/edm"');o.setProperty("SelectionLanguage","XPath");return o;},selectNodes:function(x,i){return i.selectNodes(x);},nextNode:function(n){return n.nextNode();},getNodeText:function(n){return n.text;}};}else{x={setNameSpace:function(o){return o;},nsResolver:function(c){var n={"edmx":"http://docs.oasis-open.org/odata/ns/edmx","d":"http://docs.oasis-open.org/odata/ns/edm"};return n[c]||null;},selectNodes:function(P,i){var c=p.xmlDocument.evaluate(P,i,this.nsResolver,7,null);c.length=c.snapshotLength;return c;},nextNode:function(n,i){return n.snapshotItem(i);},getNodeText:function(n){return n.textContent;}};}x.getPath=function(n){var P="";var I="getAttribute"in n?n.getAttribute("id"):"";var T=n.tagName?n.tagName:"";if(I){P='id("'+I+'")';}else if(n instanceof Document){P="/";}else if(T.toLowerCase()==="body"){P=T;}else if(n.parentNode){var c=1;for(var i=0;i<n.parentNode.childNodes.length;++i){if(n.parentNode.childNodes[i]===n){P=x.getPath(n.parentNode)+"/"+T+"["+c+"]";break;}else if(n.parentNode.childNodes[i].nodeType===1&&n.parentNode.childNodes[i].tagName===T){++c;}}}else{L.error("Wrong Input node - cannot find XPath to it: "+T);}return P;};return x;}};return b;});
