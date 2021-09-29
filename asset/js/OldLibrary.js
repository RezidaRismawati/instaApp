/**
 * Old Library
 */ 

var SAPUI = {
//Footer informasi(error message footer)
    FooterInformation: function(msgHeader){
        var wsUrl = urlWebservice + "ZUX_Message_v2";
        var oModel = new sap.ui.model.json.JSONModel();         
        var objectJSON = JSON.stringify(msgHeader)
        // console.log(objectJSON)

        $.ajax({
            url: wsUrl,
            type: "POST",
            dataType: 'json',
            data: objectJSON,
            success: function (result) {
                console.log(JSON.stringify(result))
                var countId = result.ZUX_Message_v2Result.length
                if(countId>0){
                    for(var i = 0; i< countId; i++){
                        labelMsg.setText(result.ZUX_Message_v2Result[i].Desc)
                        labelIcon.setIcon("asset/icon/"+result.ZUX_Message_v2Result[i].Icon+".png")
                        TxvCntDiagnosi.setText(result.ZUX_Message_v2Result[i].Diagnosis)
                        TxvCntProcedure.setText(result.ZUX_Message_v2Result[i].Procedure)
                    }
                }
                else{
                    labelMsg.setText("")
                    labelIcon.setIcon("")
                }
            }                   
        });
    },
    

    /* function untuk menampilkan error message
     * @idError			string => id error message
     * @additionalValue string => value yang di set secara dinamis
     * @routing			string => halaman tujuan
     * @pThis			object => this yang akan digunakan untuk menampilkan informasi pada footer
     **/
    ErrorMessageAll: function(idError, additionalValue, routing, pThis) {
        var wsUrl		= urlWebservice + "ZUX_Message_v3",
        	msgHeader	= [],
        	msgItem		= new Object();
        
        if(pThis != null) {
        	
        	var toolbarFooter	= pThis.getView().getContent()[0].getContent()[0].getFooter(),
	        	contentFooter	= toolbarFooter.getContent(),
	        	labelIcon		= contentFooter[1],
	        	labelMsg		= contentFooter[2];
        	
        } else {
        	
        	titleCut = (titleCut.length == 1) ? "0" + titleCut : titleCut;
        	
        	var labelMsg	= sap.ui.getCore().byId("lblmsg" + titleCut),		
            	labelIcon	= sap.ui.getCore().byId("lblIcon" + titleCut);		
        }
        
        msgItem["idMessage"]	= idError;
        msgItem["Value"]		= additionalValue;      
        msgItem["idLang"]		= languageUX5;
        msgHeader.push(msgItem);

        var oModel		= new sap.ui.model.json.JSONModel(),
        	objectJSON	= JSON.stringify(msgHeader),
        	isTable		= 0
        
       var tes = $.ajax({
            url		: wsUrl,
            type	: "POST",
            dataType: "json",
            data	: objectJSON,
            async	: false,
            success	: function (result) { 
                var countId = result.ZUX_Message_v3Result.length
                
                if (countId > 0) {
                    for(i = 0; i < countId; i++) {
                        if (result.ZUX_Message_v3Result[i].ViewType == "F") {
                            labelMsg.setText(result.ZUX_Message_v3Result[i].Desc)
                            labelIcon.setIcon("asset/icon/"+result.ZUX_Message_v3Result[i].Icon+".png")
                            TxvCntDiagnosi.setText(result.ZUX_Message_v3Result[i].Diagnosis)
                            TxvCntProcedure.setText(result.ZUX_Message_v3Result[i].Procedure)
                        } else if (result.ZUX_Message_v3Result[i].ViewType == "D") {
                            labelMsg.setText("")
                            labelIcon.setIcon("")

                            var icon = "asset/icon/"+result.ZUX_Message_v3Result[i].Icon+".png",
                            	message = result.ZUX_Message_v3Result[i].Desc,
                            	header = result.ZUX_Message_v3Result[i].msgType,
                            	ppStyle;

                            jQuery.sap.require("sap.ui.commons.MessageBox");

                            if(header == "Error") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.ERROR;
                            } else if(header == "Warning") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.WARNING;
                            } else if(header == "Information") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.INFORMATION;
                            } else {
                                ppStyle = sap.ui.commons.MessageBox.Icon.NONE;
                            }
                            
                            function fnCallbackMessageBox() {
                            	if(routing != null){
                                    var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
                					oRouter.navTo(routing);
                            	}
                            }

                            sap.ui.commons.MessageBox.show(
                                    message,
                                    ppStyle,
                                    header,
                                    [sap.ui.commons.MessageBox.Action.OK],
                        			fnCallbackMessageBox
                            );
                        } else if (result.ZUX_Message_v3Result[i].ViewType == "T") {
                            isTable = 1;
                        }
                    }
                    
                    if (isTable) {
                        var dialog		= SAPUI.Dialog("", "Error Message", "50%", "", true),
                        	tabel		= SAPUI.Table("", "auto", 5, "Single", "Paginator", true),
                        	dataObject	= { data : [] };

                        for(var i = 0; i< countId; i++){
                            if(result.ZUX_Message_v3Result[i].msgType == "Error"){
                                dataObject.data.push({ 
                                    Desc	: result.ZUX_Message_v3Result[i].Desc,
                                    msgType : result.ZUX_Message_v3Result[i].msgType,
                                    icon	: "asset/icon/"+result.ZUX_Message_v3Result[i].Icon+".png"
                                })                              
                            } else if(result.ZUX_Message_v3Result[i].msgType == "Warning") {
                                dataObject.data.push({ 
                                    Desc	: result.ZUX_Message_v3Result[i].Desc,
                                    msgType	: result.ZUX_Message_v3Result[i].msgType,
                                    icon	: "asset/icon/"+result.ZUX_Message_v3Result[i].Icon+".png"
                                })  
                            } else {
                                dataObject.data.push({ 
                                    Desc	: result.ZUX_Message_v3Result[i].Desc,
                                    msgType	: result.ZUX_Message_v3Result[i].msgType,
                                    icon	: "asset/icon/"+result.ZUX_Message_v3Result[i].Icon+".png"
                                })  
                            }
                        }

                        var clmnIcon1 = new sap.ui.commons.Label({
                            textAlign	: "Center",
                            icon		: "{icon}"
                        });

                        var clmnDesc = SAPUI.Column("Message", "TextView", "Desc", "400px", "Left");
                        var clmnType = SAPUI.Column("Type", "TextView", "msgType", "100px", "Left");

                        tabel.addColumn(
                            new sap.ui.table.Column({
                            	label	: "Icon",
                                template: clmnIcon1,
                                width	: "50px"
                            })
                        );
                        
                        tabel.addColumn(clmnType)
                        tabel.addColumn(clmnDesc)

                        dialog.addContent(tabel)
                        dialog.addButton(
                            new sap.ui.commons.Button({
                                text	: "OK", 
                                press	: function(){
                                    dialog.close();
                                }
                            })
                        );

                        labelMsg.setText("")
                        labelIcon.setIcon("")

                        var oModel = new sap.ui.model.json.JSONModel([]);
                        // oModel.setData(result);
                        oModel.setData(dataObject);
                        console.log(dataObject);
                        tabel.setModel(oModel);
                        tabel.bindRows("/data");
                        dialog.open();
                    }
                    
                } else {
                    labelMsg.setText("")
                    labelIcon.setIcon("")
                }
            }                   
        })
    }, 
    
    
    
    
  //Error Message All validation DB (blm fix)
    ErrorMessageAllDB: function(WSName,pValidasi) {
        var wsUrl = WS_PP + WSName;
        var msgHeader = [];
        var msgItem = new Object();
         
        var oModel = new sap.ui.model.json.JSONModel();         
        var objectJSON = JSON.stringify(pValidasi);
        console.log(objectJSON)
        var isTable = 0
        var WSResult=WSName+"Result"
        
        var tes= $.ajax({
            url: wsUrl,
            type: "POST",
            dataType: 'json',
            data: objectJSON,
            async:false,
            success: function (result) {
            	console.log(result[WSResult])
            	var parseJSON=JSON.parse(result[WSResult]) 
            	console.log(parseJSON[0])
             
            	var countId=parseJSON.length
             
                if (countId > 0) {
                    for(var i = 0; i < countId; i++) {
                        if (parseJSON[i].ViewType == "F") {
                            labelMsg.setText(parseJSON[i].Desc)
                            labelIcon.setIcon("asset/icon/"+parseJSON[i].Icon+".png")
                            TxvCntDiagnosi.setText(parseJSON[i].Diagnosis)
                            TxvCntProcedure.setText(parseJSON[i].Procedure)
                        } else if (parseJSON[i].ViewType == "D") {
                            labelMsg.setText("")
                            labelIcon.setIcon("")

                            var icon = "asset/icon/"+parseJSON[i].Icon+".png"
                            var message = parseJSON[i].Desc
                            var header = parseJSON[i].msgType
                            var ppStyle;

                            jQuery.sap.require("sap.ui.commons.MessageBox");

                            if(header == "Error") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.ERROR;
                            } else if(header == "Warning") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.WARNING;
                            } else if(header == "Information") {
                                ppStyle = sap.ui.commons.MessageBox.Icon.INFORMATION;
                            } else {
                                ppStyle = sap.ui.commons.MessageBox.Icon.NONE;
                            }                       

                            sap.ui.commons.MessageBox.show(
                                    message,
                                    ppStyle,
                                    header
                            );
                        } else if (parseJSON[i].ViewType == "T") {
                            isTable = isTable + 1
                        }
                    }
                    
                    if (isTable > 0) {
                        var dialog = SAPUI.Dialog("", "Error Message", "50%", "", true)
                        var tabel = SAPUI.Table("", "auto", 5, "Single", "Paginator", true)
                        var dataObject = { data : [] };

                        for(var i = 0; i< countId; i++){
                            if(parseJSON[i].msgType == "Error"){
                                dataObject.data.push({ 
                                    Desc: parseJSON[i].Desc,
                                    msgType :parseJSON[i].msgType,
                                    icon:"asset/icon/"+parseJSON[i].Icon+".png"
                                })                              
                            } else if(parseJSON[i].msgType == "Warning") {
                                dataObject.data.push({ 
                                    Desc: parseJSON[i].Desc,
                                    msgType :parseJSON[i].msgType,
                                    icon:"asset/icon/"+parseJSON[i].Icon+".png"
                                })  
                            } else {
                                dataObject.data.push({ 
                                    Desc: parseJSON[i].Desc,
                                    msgType :parseJSON[i].msgType,
                                    icon:"asset/icon/"+parseJSON[i].Icon+".png"
                                })  
                            }
                        }

                        var clmnIcon1 = new sap.ui.commons.Label({
                            textAlign: "Center",
                            icon: "{icon}"
                        });

                        var clmnDesc = SAPUI.Column("Message", "TextView", "Desc", "400px", "Left");
                        var clmnType = SAPUI.Column("Type", "TextView", "msgType", "100px", "Left");

                        tabel.addColumn(
                            new sap.ui.table.Column({ label: "Icon",
                                template:  clmnIcon1,
                                width:"50px"
                            })
                        );
                        tabel.addColumn(clmnType)
                        tabel.addColumn(clmnDesc)

                        dialog.addContent(tabel)
                        dialog.addButton(
                            new sap.ui.commons.Button({
                                text: "OK", 
                                press:function(){
                                    dialog.close();
                                }
                            })
                        );

                        labelMsg.setText("")
                        labelIcon.setIcon("")

                        var oModel = new sap.ui.model.json.JSONModel([]);
                        // oModel.setData(result);
                        oModel.setData(dataObject);
                        console.log(dataObject)
                        tabel.setModel(oModel);
                        tabel.bindRows("/data");
                        dialog.open()
                    }
                } else {
                    labelMsg.setText("")
                    labelIcon.setIcon("")
                }
            }                   
        });
 
    }, 
    
    
    //Error message dialog versi lama
    DialogErrorMessage: function(msgHeader){
        var wsUrl = urlWebservice + "ZUX_Message_v2";
        var oModel = new sap.ui.model.json.JSONModel();         
        var objectJSON = JSON.stringify(msgHeader)

        $.ajax({
            url: wsUrl,
            type: "POST",
            dataType: 'json',
            data: objectJSON,
            success: function (result) {
                console.log(JSON.stringify(result))
                var countId = result.ZUX_Message_v2Result.length
                if(countId > 0) {
                    for(var i = 0; i < countId; i++) {
                        labelMsg.setText("")
                        labelIcon.setIcon("")

                        var icon = "asset/icon/"+result.ZUX_Message_v2Result[i].Icon+".png"
                        var message = result.ZUX_Message_v2Result[i].Desc
                        var header = result.ZUX_Message_v2Result[i].msgType
                        var ppStyle;

                        jQuery.sap.require("sap.ui.commons.MessageBox");

                        if(header == "Error"){
                            ppStyle = sap.ui.commons.MessageBox.Icon.ERROR;
                        } else if (header == "Warning") {
                            ppStyle = sap.ui.commons.MessageBox.Icon.WARNING;
                        } else if(header == "Information") {
                            ppStyle = sap.ui.commons.MessageBox.Icon.INFORMATION;
                        } else {
                            ppStyle = sap.ui.commons.MessageBox.Icon.NONE;
                        }                       

                        sap.ui.commons.MessageBox.show(
                                message,
                                ppStyle,
                                header
                        );
                    }
                } else {
                    labelMsg.setText("")
                    labelIcon.setIcon("")
                }
            }                   
        });
    },

    /* not use
	 * vlidasi khusus JR /SR
	 * */
	 ErrorMessageJRSR: function(functWS,validMethod, pValid) {
//			return SAPUI.ErrorMessageJRSR("WS_ZPP026","ValidPlain",pValid)
	        var wsUrl = WS_PP + functWS; 
	        labelMsg = sap.ui.getCore().byId("lblmsg"+titleCut)		
	     	labelIcon = sap.ui.getCore().byId("lblIcon"+titleCut)		 
	  
	        var prmValidJr=Global.dynamicParam(validMethod,pValid)
	        var result="";
	        var returnResult=functWS+"Result"
 
	       var tes= $.ajax({
	            url: wsUrl,
	            type: "POST",
	            dataType: 'json',
	            data: prmValidJr,
	            async:false,
	            success: function (result) {  
	            	var resultData=Global.dynamicDeserialize(result)
 
	                var countId = resultData[0].length 
	                if(resultData[0].Result != 1){
	                if(resultData[0].ViewType=="F"){
	                	labelMsg.setText(resultData[0].Desc)
                        labelIcon.setIcon("asset/icon/"+resultData[0].Icon+".png")
                        TxvCntDiagnosi.setText(resultData[0].Diagnosis)
                        TxvCntProcedure.setText(resultData[0].Procedure)
                         
	                }else if (resultData[0].ViewType == "D") {
                        labelMsg.setText("")
                        labelIcon.setIcon("")

                        var icon = "asset/icon/"+resultData[0].Icon+".png"
                        var message = resultData[0].Desc
                        var header = resultData[0].msgType
                        var ppStyle;

                        jQuery.sap.require("sap.ui.commons.MessageBox");

                        if(header == "Error") {
                            ppStyle = sap.ui.commons.MessageBox.Icon.ERROR;
                        } else if(header == "Warning") {
                            ppStyle = sap.ui.commons.MessageBox.Icon.WARNING;
                        } else if(header == "Information") {
                            ppStyle = sap.ui.commons.MessageBox.Icon.INFORMATION;
                        } else {
                            ppStyle = sap.ui.commons.MessageBox.Icon.NONE;
                        }
                        
                         
                        sap.ui.commons.MessageBox.show(
                                message,
                                ppStyle,
                                header
                        ); 
                    } else if (resultData[0].ViewType == "T") {
                        isTable = isTable + 1 
                    } 
	                }
	                else{ 
	                	result=resultData[0].Result;
	                } 
	            },
	            
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('Error');
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
	        }).responseJSON[returnResult]
	        
	        var getReturn=JSON.parse(tes) 
	        result = getReturn[0].Result
	        console.log(getReturn)

	         
	        return result
	    }, 

    //screen varian
    ScreenVarian: function(tcode, screen){
        console.log(tcode,screen)
        // set screen varian
        // var tcode = tcodeSessionUX5;
        var wsUrl = urlWebservice + "GetVarianTCode";
        var idComponen;
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/plain, charset=utf-8",
            dataType: "json",
            crossDomain: true,
            data:  '{tcode:"'+tcode+'", screen:"'+screen+'"}',
            success: function (result) {
                for (i = 0 ; i < result.GetVarianTCodeResult.length ; i++) {
                    idComponen = SAPUI.GetCore(result.GetVarianTCodeResult[i].idcomp);

                    switch(result.GetVarianTCodeResult[i].componentType) {
                        case "RadioButton":
                            idComponen.setSelectedIndex(parseInt(result.GetVarianTCodeResult[i].value));
                            break;
                        case "CheckBox":
                            idComponen.setChecked(result.GetVarianTCodeResult[i].value == "true");
                            break;
                        case "Label":
                            idComponen.setText(result.GetVarianTCodeResult[i].value);
                            break;
                        case "Button":
                            idComponen.setText(result.GetVarianTCodeResult[i].value);
                            break;
                        default:
                            idComponen.setValue(result.GetVarianTCodeResult[i].value);
                    } 

                    if(result.GetVarianTCodeResult[i].componentType == "Label") {
                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
                    } else if (result.GetVarianTCodeResult[i].componentType == "Button") {
                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);   
                    } else {
                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);                           
                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
                    }                       
                }                    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    },
    ASP: function(pNumberRange, pAction, pEdit, pViewName, pControllerName, pUrl){

        if(Server1=="PRD") {
            //var upload="<iframe src='http://"+serverhostname+":26738/Default.aspx?nr="+pNumberRange+"&action="+pAction+"&edit="+pEdit+"&view="+pViewName+"&controller="+pControllerName+"&url="+pUrl+"'height='550px' width='100%'></iframe>"
            var upload="<iframe src='http://"+serverhostname+"/WebSite/Default.aspx?nr="+pNumberRange+"&action="+pAction+"&edit="+pEdit+"&view="+pViewName+"&controller="+pControllerName+"&url="+pUrl+"'height='550px' width='100%'></iframe>"
        } else if(Server1=="DEV") {   
            //var upload="<iframe src='http://"+serverhostname+":26738/Default.aspx?nr="+pNumberRange+"&action="+pAction+"'height='500px' width='100%'></iframe>"
            //var upload="<iframe src='http://"+serverhostname+":8080/WebSite/Default.aspx?nr="+pNumberRange+"&action="+pAction+"'height='500px' width='100%'></iframe>"
        } else if(Server1=="QA") { 
            //var upload="<iframe src='http://"+serverhostname+":26738/Default.aspx?nr="+pNumberRange+"&action="+pAction+"'height='500px' width='100%'></iframe>"
            //var upload="<iframe src='http://"+serverhostname+":8080/WebSite/Default.aspx?nr="+pNumberRange+"&action="+pAction+"'height='500px' width='100%'></iframe>"
        }

        return new sap.ui.core.HTML({
            preferDOM : true,
            content: upload
        });
    },
    
    
}