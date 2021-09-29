/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/core/ComponentContainer","sap/ui/core/mvc/XMLView","sap/ui/rta/command/CommandFactory","sap/ui/dt/DesignTime","sap/ui/dt/OverlayRegistry","sap/ui/dt/ElementDesignTimeMetadata","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/ChangePersistence","sap/ui/model/Model",'sap/ui/fl/FlexControllerFactory','sap/ui/fl/registry/Settings','sap/ui/rta/ControlTreeModifier',"sap/ui/thirdparty/jquery","sap/ui/fl/library",'sap/ui/thirdparty/sinon','sap/ui/thirdparty/sinon-qunit'],function(U,C,X,a,D,O,E,b,c,M,F,S,d,q,l,s){"use strict";var e=function(m,o){if(e._only&&(m.indexOf(e._only)<0)){return;}if(typeof o.xmlView==="string"){o.xmlView={viewContent:o.xmlView};}var f=s.sandbox.create();QUnit.module(m,{});QUnit.test("When using the 'controlEnablingCheck' function to test if your control is ready for UI adaptation at runtime",function(n){n.ok(o.afterAction,"then you implement a function to check if your action has been successful: See the afterAction parameter.");n.ok(o.afterUndo,"then you implement a function to check if the undo has been successful: See the afterUndo parameter.");n.ok(o.afterRedo,"then you implement a function to check if the redo has been successful: See the afterRedo parameter.");n.ok(o.xmlView,"then you provide an XML view to test on: See the.xmlView parameter.");var x=new DOMParser().parseFromString(o.xmlView.viewContent,"application/xml").documentElement;n.ok(x.tagName.match("View$"),"then you use the sap.ui.core.mvc View tag as the first tag in your view");n.ok(o.action,"then you provide an action: See the action parameter.");n.ok(o.action.name,"then you provide an action name: See the action.name parameter.");n.ok(o.action.controlId,"then you provide the id of the control to operate the action on: See the action.controlId.");});var g="sap.ui.rta.control.enabling.comp";var h=false;var A=true;var i=U.extend(g,{metadata:{manifest:{"sap.app":{"id":g,"type":"application"},"getEntry":function(){return{type:"application"};}}},createContent:function(){var v=q.extend({},o.xmlView);v.id=this.createId("view");if(v.async===undefined){v.async=this.getComponentData().async;}var V=sap.ui.xmlview(v);return V;}});function j(n){this.oUiComponent=new i({id:"comp",componentData:{async:n}});this.oUiComponentContainer=new C({component:this.oUiComponent});this.oUiComponentContainer.placeAt(o.placeAt||"content");this.oView=this.oUiComponent.getRootControl();if(o.model instanceof M){this.oView.setModel(o.model);}sap.ui.getCore().applyChanges();return Promise.all([this.oView.loaded(),o.model&&o.model.getMetaModel()&&o.model.getMetaModel().loaded()]);}function k(n){this.oControl=this.oView.byId(o.action.controlId);return this.oControl.getMetadata().loadDesignTime(this.oControl).then(function(p){var P;if(o.action.parameter){if(typeof o.action.parameter==="function"){P=o.action.parameter(this.oView);}else{P=o.action.parameter;}}else{P={};}sap.ui.getCore().applyChanges();this.oDesignTime=new D({rootElements:[this.oView]});return new Promise(function(r){this.oDesignTime.attachEventOnce("synced",function(){this.oControlOverlay=O.getOverlay(this.oControl);var t=new a({flexSettings:{layer:o.layer||"CUSTOMER"}});var u=this.oControlOverlay.getDesignTimeMetadata();if(o.action.name==="move"){var v=O.getOverlay(P.movedElements[0].element);var R=v.getRelevantContainer();this.oControl=R;u=v.getParentAggregationOverlay().getDesignTimeMetadata();}else if(o.action.name==="addODataProperty"){var w=u.getActionDataFromAggregations("addODataProperty",this.oControl);n.equal(w.length,1,"there should be only one aggregation with the possibility to do addODataProperty action");var x=this.oControlOverlay.getAggregationOverlay(w[0].aggregation);u=x.getDesignTimeMetadata();}t.getCommandFor(this.oControl,o.action.name,P,u).then(function(y){this.oCommand=y;n.ok(y,"then the registration for action to change type, the registration for change and control type to change handler is available and "+o.action.name+" is a valid action");r();}.bind(this)).catch(function(y){throw new Error(y);});}.bind(this));}.bind(this));}.bind(this));}if(!o.jsOnly){QUnit.module(m+" on async views",{beforeEach:function(){f.stub(S,"getInstance").returns(Promise.resolve({_oSettings:{recordUndo:false}}));},afterEach:function(){this.oUiComponentContainer.destroy();this.oDesignTime.destroy();this.oCommand.destroy();f.restore();}});QUnit.test("When applying the change directly on the XMLView",function(n){var p=[];this.stub(c.prototype,"getChangesForComponent").returns(Promise.resolve(p));this.stub(c.prototype,"getCacheKey").returns(Promise.resolve("etag-123"));return j.call(this,h).then(function(){return k.call(this,n);}.bind(this)).then(function(){var r=this.oCommand.getPreparedChange();p.push(r);this.oUiComponentContainer.destroy();return j.call(this,A);}.bind(this)).then(function(r){var v=r[0];o.afterAction(this.oUiComponent,v,n);}.bind(this));});}QUnit.module(m,{beforeEach:function(n){f.stub(c.prototype,"getChangesForComponent").returns(Promise.resolve([]));f.stub(c.prototype,"getCacheKey").returns(c.NOTAG);f.stub(S,"getInstance").returns(Promise.resolve({_oSettings:{recordUndo:false}}));return j.call(this,h).then(function(){return k.call(this,n);}.bind(this));},afterEach:function(){f.restore();this.oUiComponentContainer.destroy();this.oDesignTime.destroy();this.oCommand.destroy();}});QUnit.test("When executing the underlying command on the control at runtime",function(n){var p=n.async();this.oCommand.execute().then(function(){sap.ui.getCore().applyChanges();o.afterAction(this.oUiComponent,this.oView,n);p();}.bind(this));});QUnit.test("When executing and undoing the command",function(n){var p=n.async();this.oCommand.execute().then(this.oCommand.undo.bind(this.oCommand)).then(function(){var r=this.oCommand.getPreparedChange();if(this.oCommand.getAppComponent){var t=this.oCommand.getAppComponent();var u=d.bySelector(r.getSelector(),t);var v=F.createForControl(t);v.removeFromAppliedChangesOnControl(r,t,u);}}.bind(this)).then(function(){sap.ui.getCore().applyChanges();o.afterUndo(this.oUiComponent,this.oView,n);p();}.bind(this));});QUnit.test("When executing, undoing and redoing the command",function(n){var p=n.async();this.oCommand.execute().then(this.oCommand.undo.bind(this.oCommand)).then(function(){var r=this.oCommand.getPreparedChange();if(this.oCommand.getAppComponent){var t=this.oCommand.getAppComponent();var u=d.bySelector(r.getSelector(),t);var v=F.createForControl(t);return v.removeFromAppliedChangesOnControl(r,t,u);}}.bind(this)).then(this.oCommand.execute.bind(this.oCommand)).then(function(){sap.ui.getCore().applyChanges();o.afterRedo(this.oUiComponent,this.oView,n);p();}.bind(this));});};e.skip=function(){};e.only=function(m){e._only=m;};return e;});
