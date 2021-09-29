sap.ui.jsview("instanApp.Register.Register", {
    
    getControllerName: function () {
        return "instanApp.Register.Register";
    },

    createContent: function (oController) {
        var oThis = this

        var txfUsername = new sap.m.Input(oThis.createId("txtUserName"), {
            enabled: true,
            editable: true,
            placeholder: "Username",
            textAlign: sap.ui.core.TextAlign.Center,
            layoutData: new sap.ui.layout.GridData('', {
                span: 'XL12 L12 M12 S12',
            }),
            change: function (oEvent) {
                var upper = this.getValue().toUpperCase()
                this.setValue(upper)

            }
        }).addStyleClass("login-input");

        var txfPassword = new sap.m.Input(oThis.createId("txtPassword"), {
            type: sap.m.InputType.Password,
            placeholder: "Password",
            textAlign: sap.ui.core.TextAlign.Center,
            layoutData: new sap.ui.layout.GridData('', {
                span: 'XL12 L12 M12 S12',
            }),
        }).addStyleClass("login-input");

        var lnkRegister = new sap.m.Link(oThis.createId("lnkRegister"), {
            text: "Register",
            href: "Register.html",
        });

        var content = new sap.m.FlexBox('', {
            alignItems: sap.m.FlexAlignItems.Center,
            justifyContent: sap.m.FlexJustifyContent.Center,
            height: "100%",
            items: [
                new sap.m.FlexBox('flexLogin', {
                    alignContent: sap.m.FlexAlignContent.Center,
                    alignItems: sap.m.FlexAlignItems.Center,
                    justifyContent: sap.m.FlexJustifyContent.Center,
                    direction: sap.m.FlexDirection.Column,
                    height: "22rem",
                    items: [
                        new sap.ui.layout.Grid('grid1Login', {
                            content: [
                                new sap.ui.commons.Image({
                                    src: "asset/image/loginLogo.png",
                                    width: "25rem",
                                    alt: "instaApp"
                                }),
                            ],
                        }).addStyleClass("title-img"),
                        new sap.ui.layout.Grid('', {
                            content: [
                                txfUsername,
                                txfPassword,
                            ],
                        }),
                        new sap.ui.layout.Grid('', {
                            content: [
                                new sap.ui.commons.Button(oThis.createId("btnLogin"), {
                                    text: "Login",
                                    press: oController.onLogin,
                                    layoutData: new sap.ui.layout.GridData('', {
                                        span: 'XL12 L12 M12 S12',
                                    })
                                }).addStyleClass("login-button"),
                                lnkRegister,                               
                            ]
                        }),
                    ]
                }).addStyleClass("login-flexbox")
            ]
        }).addStyleClass("outer-container")

        txfUsername.attachBrowserEvent('keypress', function(e){  
			// check key code checkCapsLock
			checkCapsLock(e)
			if(e.which == 13){  
				oController.onLogin();
			}  
		});

		txfPassword.attachBrowserEvent('keypress', function(e){  
			// check key code checkCapsLock
			checkCapsLock(e)
			if(e.which == 13){  
				oController.onLogin();
			}  
        });
        
        function checkCapsLock( e ) {
			var capsLockON;
			keyCode = e.keyCode?e.keyCode:e.which;
			shiftKey = e.shiftKey?e.shiftKey:((keyCode == 16)?true:false);
			if(((keyCode >= 65 && keyCode <= 90) && !shiftKey)||((keyCode >= 97 && keyCode <= 122) && shiftKey)) {
				capsLockON = true;
			} else {
			   capsLockON = false;
			}
			if (capsLockON){
				sap.m.MessageToast.show('CAPSLOCK IS ON',{
					  duration: 200})
			}else{ 
			}
		 }

        var pnlLogin = SAPUI.PanelM("pnlLogin", "", "", false, false, 'Transparent')
        for (i = 0; i < content.length; i++) {
            pnlLogin.addContent(content[i])
        }
        return content
    }

});