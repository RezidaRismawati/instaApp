/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var W={};W.render=function(r,w){this.startWizard(r,w);this.renderProgressNavigator(r,w);this.renderWizardSteps(r,w);this.endWizard(r);};W.startWizard=function(r,w){var s=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("WIZARD_LABEL");r.write("<article");r.writeControlData(w);r.addClass("sapMWizard");r.writeClasses();r.addStyle("width",w.getWidth());r.addStyle("height",w.getHeight());r.writeAccessibilityState({"label":s});r.writeStyles();r.write(">");};W.renderProgressNavigator=function(r,w){r.write("<header class='sapMWizardHeader'>");r.renderControl(w.getAggregation("_progressNavigator"));r.write("</header>");};W.renderWizardSteps=function(r,w){r.write("<section class='sapMWizardStepContainer'");r.writeAttribute("id",w.getId()+"-step-container");r.write(">");var R=this._getStepsRenderingOrder(w);R.forEach(r.renderControl);r.write("</section>");};W.endWizard=function(r){r.write("</article>");};W._getStepsRenderingOrder=function(w){if(!w.getEnableBranching()){return w.getSteps();}var s=w.getSteps().slice(),i,r,j,S;var c=function(a,i,r){var o=sap.ui.getCore().byId(a);if(s.indexOf(o)<s.indexOf(r)){var b=s.indexOf(o),t=s[b];s[b]=r;s[i]=t;i=0;}return i;};for(i=0;i<s.length;i++){r=s[i];S=r.getSubsequentSteps();if(S.length<1&&r.getNextStep()){S=[r.getNextStep()];}for(j=0;j<S.length;j++){i=c(S[j],i,r);}}return s;};return W;},true);
