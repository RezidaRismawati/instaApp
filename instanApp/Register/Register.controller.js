var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
var oThis = this

sap.ui.controller("instanApp.Register.Register", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf it_admin_entry.UX_MAIN.Login
     */

    onInit: function () {
        var oThis = this
        this.modelArray = [];
        oRouter.getRoute("Login").attachMatched(function(oEvent) {
            //For refresh
            if(window.localStorage.getItem("User") != null){
                sap.m.URLHelper.redirect("Dashboard.html")
            }
        })
        console.log('Load OK');
    },
    onAfterRendering: function () {
        
    },
    
    onLogin: function () {
        var userName = SAPUI.GetCore('idLogin--txtUserName');
        var password = SAPUI.GetCore('idLogin--txtPassword');
        /* var userName = SAPUI.GetCore(oThis.createId('txtUserName'));
        var password = SAPUI.GetCore(oThis.createId('txtPassword')); */
        /* var userName = SAPUI.GetCore('Login--txtUserName');
        var password = SAPUI.GetCore('Login--txtPassword'); */
        var errMessage = "Fill form correctly"
        var paramLogin = {};
        var wsUrl = WS_SY + "WS_UC_Auth";

        if (userName.getValue() == "" || password.getValue() == "") {
            if (userName.getValue() == "") {
                //add error dialog
                userName.setValueStateText(errMessage)
                userName.setValueState(sap.ui.core.ValueState.Error);
            }
            if (password.getValue() == "") {
                password.setValueStateText(errMessage)
                password.setValueState(sap.ui.core.ValueState.Error);
            }

            SAPUI.ErrorMessageView('SY002')

        } else {
            //--------------------- Locking ---------------------
            var datax=[];
            datax.push({
                ObjectLocking   :'User',
                Value           : userName.getValue()
            });
            // var statLockingA=Global.LockingTCode(datax,"Display","index_01");
            // if(!statLockingA){
            //     return;
            // }
            // //--------------------- Locking ---------------------
    
            paramLogin = {
                Username: userName.getValue(),
                Password: password.getValue()
            };
    
            var param = Global.dynamicParam("Login", paramLogin);
    
            $.ajax({
                url: wsUrl,
                type: 'post',
                dataType: 'json',
                data: param,
                success: function(result) {
                    onSuccess(result, oThis);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
                }
            });
        }

        function onSuccess(result, oThis) {
            var resultData = Global.dynamicDeserialize(result);
            console.log(resultData);
            try {
                switch (resultData[0].Return) {
                    case 1:
                        //--------------------- Locking ---------------------
                        window.localStorage.setItem("User", resultData[0].User);
                        /* statLockingB=Global.LockingTCode(datax,"Create","index_01");
                        if(!statLockingB){
                            return;
                        } else {
                            // window.localStorage.setItem("User", resultData[0].User);
                            window.localStorage.setItem("UserType", resultData[0].UserType);
                            oThis.onSearchTcode()
                            // sap.m.URLHelper.redirect("Dashboard.html");
                        } */
                        //--------------------- Locking ---------------------
                        sap.m.URLHelper.redirect("Dashboard.html");
                        break;
                    case 2:
                        throw "Password not valid";
                        break;
                    case 3:
                        throw "Username not valid";
                        break;
                    case 4:
                        throw "Lock";
                        break;
                    case 5:
                        throw "Inactive user";
                        break;
                    default:
                }
            } catch (error) {
                switch (error){
                    case "Username not valid":
                        SAPUI.ErrorMessageView("SY011", "");
                        break;
                    case "Password not valid":
                        SAPUI.ErrorMessageView("SY012", "");
                        break
                    case "Lock":
                        SAPUI.ErrorMessageView("SY013", "");
                        break
                    case "Inactive user":
                        SAPUI.ErrorMessageView("SY038", "");
                        break
                    }
                }
            }
    },

    onRedirect: async function () {
    },

    onChangePassword: function () {
    },

    onMultipleLoginInfo: function () {
    },

    onSearcTcode: function () {

    },

    onValueValidation: function () {

    },

    onPressBtnChange: function () {
    },

    onPassNew: function () {
    },

    onPressAccept: function () {
    }
});