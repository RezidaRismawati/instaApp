/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./AdapterConstants","sap/ui/model/json/JSONModel","sap/ui/base/SyncPromise"],function(B,A,J,S){"use strict";var a=B.extend("sap.ui.model.meta.BaseAdapter",{oMetaModel:undefined,sModelName:undefined,constructor:function(m,p){this.constants=A;this.mMetadataContext=m;this.oModel=m.model;this.oMetaModel=this.oModel.getMetaModel();this.modelName=m.modelName;this.contextName=m.contextName;this.path=m.path;this.metaPath=m.metaPath;this._mProperties={};this._mPropertyBag={};this._mCustomPropertyBag={};this.init();this.enhance(p);},enhance:function(p){if(p){for(var P in p){this.putProperty(P,p[P]);}}},init:function(){if(!this.metaPath){this.oMetaContext=this.oMetaModel.getMetaContext(this.path);this.metaPath=this.oMetaContext.getPath();}else{this.oMetaContext=this.oMetaModel.createBindingContext(this.metaPath);}},getModelName:function(){return this.modelName;},putProperty:function(p,g,b,c){if(!g){return;}if(!c){c=this;}Object.defineProperty(this,p,{configurable:true,get:function(){if(this._mCustomPropertyBag[p]){return this._mCustomPropertyBag[p];}if(!this._mPropertyBag.hasOwnProperty(p)){this._mPropertyBag[p]=new S(function(r,d){if(typeof g=='function'){r(g.apply(c,b));}else{r(g);}});}return this._mPropertyBag[p];},set:function(v){this._mCustomPropertyBag[p]=v;}});},convertToSimpleBinding:function(v,t){var p="{";if(this.modelName){p=p+"model: '"+this.modelName+"',";}if(this.sContextPath&&v.startsWith(this.sContextPath)){v=v.replace(this.sContextPath,"");}p=p+"path: '"+escape(v)+"'";if(t){p=p+", type: '"+t+"'";}p=p+"}";return p;},getContext:function(){return this.contextName;},setValue:function(p,v){this.putProperty(p,this._identity,[v],this);},_identity:function(v){return v;},parentPromise:function(p,m){return new Promise(function(r,b){sap.ui.require([p],function(P){var o=new P(m);r(o);});});},getAdapterModel:function(){if(!this._oAdapterModel){this._oAdapterModel=new J(this);}return this._oAdapterModel;},updateContextPath:function(c){var C=c.getBindingContext(this.model);var s=C?this.removeKeys(C.getPath())+"/":null;if(s&&s!=this.sContextPath){this.sContextPath=s;this._mPropertyBag={};}},removeKeys:function(p){return p;},sibling:function(s){if(!s){return null;}var m={model:this.oModel,path:s};var c=this.getMetadata().getClass();var o=new c(m);o.sContextPath=this.sContextPath;return o;}});return a;});
