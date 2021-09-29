var ClientIP = window.localStorage.getItem("ActivityIP");
var userSession = window.localStorage.getItem("userSession"); //buat new session
var ActivityIP = window.localStorage.getItem("ActivityIP");
var AppStatus = window.localStorage.getItem("AppStatus");
var U5312UX5 = window.localStorage.getItem("userNameux5"); //user name
var t0123nUX5 = window.localStorage.getItem("tokenux5");
var tcodeSessionUX5 = window.localStorage.getItem("tcodeux5"); //search auto complete
var languageUX5 = window.localStorage.getItem("languageux5");
var X_TcodeUX5 = window.sessionStorage.getItem("tcodeIndukux5"); //tode induk
//var X_Varian = window.localStorage.getItem("tcodeVariant");
var X_VarianUX5 = window.sessionStorage.getItem("tcodeVariantux5"); //tcode variant
var userTypeUX5 = window.localStorage.getItem("userTypeux5");
var iconLanguage = window.localStorage.getItem("iconLang");
var stModul = window.localStorage.getItem("modul");
var windowSessionUX5 = window.sessionStorage.getItem("typeSession");
var windowSessionUX51 = window.sessionStorage.getItem("typeSession1");
var userPlant = window.sessionStorage.getItem("userPlant");
var userGroup = window.sessionStorage.getItem("userGroup");

//User-------------------------------------------------------
var UserLS = window.localStorage.getItem("userNameLS"); //user name
var userTypeLS = window.localStorage.getItem("userTypeLS"); //user type
var languageLS = window.localStorage.getItem("languageLS"); //language
const COMPANY = "PT Trias Sentosa, Tbk.";
var AllThis = this

var SAPUI = {
    /*
     * untuk desain default disetiap halaman
     *  
     * */
    XShell: function (title, isShowSubHeader, pageConten, mtrHeader, isShowFooter, thisView, isShowHeader) {
        var oThis = this

        /* function backToLogin(){
            console.log("Active");
            var datax=[];
            datax.push({
                ObjectLocking   :'User',
                Value           : JSON.parse(window.localStorage.getItem("LockingUser")).User
            });
            
            if(!Global.LockingInspection(JSON.parse(window.localStorage.getItem("LockingUser")).User,"index_01",datax)){
                window.localStorage.clear();
                window.sessionStorage.clear();
                sap.m.URLHelper.redirect("index.html");
            } else {
                //Jika tidak maintenance
                if (!Global.IsMaintenance()) {
                    //Jika sedang lock suatu tcode
                    if (!(window.sessionStorage.getItem("LockingTCode") === null)) {
                        var lockingTcode = JSON.parse(window.sessionStorage.getItem("LockingTCode"));
                        var tcode = lockingTcode.Tcode;
                        var user = lockingTcode.User;
                        var data = lockingTcode.Tbl_DataLock;
                        
                        Global.ChangeLockingTcode(user, tcode, data);
                    }
                } else { //Jika maintenance                                        
                    setMaintenance();
                }
            }
        }

        function setMaintenance(){
            console.log(title.getText());
            clearInterval(intvMaintenance);
            if(title.getText() != "Maintenance"){                
                openDialog();
                intvMaintenance = setInterval(backToMaintenance,(5 * 5 * 1000));
                window.localStorage.setItem("Maintenance", "Active");
            }else{
                intvMaintenance = setInterval(backToDashboard,(1 * 5 * 1000));                
            }
        }

        var statusMaintenance=window.localStorage.getItem("Maintenance");
        console.log(statusMaintenance);
        if(statusMaintenance=="Active"){
            setMaintenance();
        }else{
            var x=setInterval(backToLogin,(1 * 5 * 1000));
        }
        //Locking Inspect */

        function openDialog() {
            try{
                var oDialog1 = SAPUI.Dialog("", "Information", "auto", "auto", true);
                var oText = new sap.ui.commons.TextView({text: "WMS Application will perform Maintenance,\n Please finish your task.\n\n Maintenance will start in 60 seconds."});
                var btnOk = new SAPUI.Button('', 'Ok', '', 'sap-icon://accept', false, 'Accept')
                btnOk.attachPress(function () {
                    oDialog1.close();
                })
                oDialog1.addContent(oText);
                oDialog1.addButton(btnOk);
                oDialog1.open();
            }catch(ex){
                sap.m.URLHelper.redirect("Maintenance.html");
            }            
        };

        function backToDashboard(){
            if (!Global.IsMaintenance()) {
                window.localStorage.removeItem("Maintenance");
                sap.m.URLHelper.redirect("Dashboard.html");
            }
        }

        function backToMaintenance(){
            window.localStorage.setItem("Maintenance", "Active");
            sap.m.URLHelper.redirect("Maintenance.html");
        }

        //Is user logout?
        function backToLogin() {
            if(window.localStorage.getItem("User") == null){
                console.log("Not Active");
                window.localStorage.clear();
				window.sessionStorage.clear();  
                sap.m.URLHelper.redirect("index.html");
            }
        }    
        //End of is user logout

        //Is maintenance?
        function setMaintenance() {
            if(Global.IsMaintenance()){
                if(title.getText() != "Maintenance"){
                    // Jika sekarang bukan buka halaman Maintenance, maka
                    // cek dulu sudah ada flag maintenance belum
                    clearInterval(intvMaintenance)
                    var x = window.localStorage.getItem("Maintenance");
                    if (x != 'Active') {
                        // Kalau belum ada, maka
                        // kasih peringatan kalau akan ada kegiatan maintenance
                        openDialog();
                        // Set timeout (x) detik untuk diarahkan langsung ke halaman maintenance
                        setTimeout(backToMaintenance,(60 * 1000));
                    } else {
                        // Kalau ada, maka
                        // paksa ke halaman maintenance
                        backToMaintenance()
                    }                    
                }else{
                    // Jika sekarang buka halaman Maintenance, maka
                    // setiap (x) detik sekali, cek apa sudah siap bailk ke dashboard
                    setInterval(backToDashboard,(5 * 1000));                
                }
            }
        }    
        //End of is maintenance

        if(title.getText() == "Maintenance"){
            var stillMaintenace = Global.IsMaintenance()
            if (!stillMaintenace) {
                backToDashboard()
            }
        }

        var maintenance = Global.IsMaintenance()
        if(maintenance){
            setMaintenance()
        }

        setInterval(backToLogin, (2 * 1000)); // Setiap 2 detik sekali, user masih aktif (ada) atau tidak        
        var intvMaintenance = setInterval(setMaintenance, (2 * 1000)); // Setiap 2 detik sekali, ada maintenance atau tidak
        
        if (isShowHeader == undefined) {
            isShowHeader = false
        }
    
        // header top bar
        usr = new sap.ui.unified.ShellHeadUserItem({
            image: "sap-icon://person-placeholder",
            username: UserLS,
            showPopupIndicator: true,
            press: function () {
                if (tp3.isOpen()) {
                    tp3.close();
                } else {
                    tp3.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                }
            },

        })
        //

        //UserInformation
        var dialogUserInfo = SAPUI.Dialog("", "User Info", "200px", "200px", true),
            panel = SAPUI.Panel("", "", "", true, true),
            User = SAPUI.TextView("", "User", "User", 'auto', true),
            User1 = SAPUI.TextView("", U5312UX5, "User", 'auto', true),
            Database = SAPUI.TextView("", "Database", "Database", 'auto', true),
            Database1 = SAPUI.TextView("", Server1, "User", 'auto', true),
            WebServices = SAPUI.TextView("", "Web Service", "User", 'auto', true),
            WebServices1 = SAPUI.TextView("", Server1, "User", 'auto', true),
            TCode = SAPUI.TextView("", "Transaction", "User", 'auto', true),
            TCode1 = SAPUI.TextView("", X_VarianUX5, "User", 'auto', true),
            oLayoutUserInfo = SAPUI.Matrix("", "auto", true, [], 2)

        oLayoutUserInfo.createRow(User, User1)
        oLayoutUserInfo.createRow(Database, Database1)
        oLayoutUserInfo.createRow(WebServices, WebServices1)
        oLayoutUserInfo.createRow(TCode, TCode1)

        panel.addContent(oLayoutUserInfo)

        dialogUserInfo.addContent(oLayoutUserInfo)

        var UserInfo = SAPUI.Button("", "User Info", "User Info", "sap-icon://hint", true, "Emph")
        UserInfo.attachPress(function () {
            dialogUserInfo.open();
        })

        var oLayoutHeader = SAPUI.Matrix("", "auto", true, [], 2),

            btnChangePasswd = SAPUI.Button("", "Change Password", "", "sap-icon://key", true, "Emph")

        oLayoutHeader.createRow(btnChangePasswd)
        // oLayoutHeader.createRow(UserInfo)

        if (userTypeUX5 == 'OPERATOR') {
            UserInfo.setVisible(false)
        } else if (userTypeUX5 == 'ADMIN') {
            UserInfo.setVisible(false)
        }
        //

        var tp3 = new sap.ui.ux3.ToolPopup({
            icon: "sap-icon://log",
            inverted: false,
            content: [oLayoutHeader],
            autoClose: true,
            opener: usr,
        });

        btnChangePasswd.attachPress(oThis.ChangePassword);

        if (languageUX5 == 'en') {
            btnChangePasswd.setText("Change Password")
        } else {
            btnChangePasswd.setText("Ubah Kata Sandi")
        }

        var baseTitle = title.getId().split("_");
        titleCut = baseTitle[(baseTitle.length - 1)];

        //--------------------------Footer Error Message------------------------
        labelZero = new sap.ui.commons.Label({});
        labelIcon = new sap.ui.commons.Label({ id: "lblIcon" + titleCut });

        labelIcon.addStyleClass("footerbar1");
        labelMsg = new sap.ui.commons.TextView({
            id: "lblmsg" + titleCut,
            text: "",
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Default,
            design: sap.ui.commons.TextViewDesign.Bold
        });

        // Dialog error message
        DlgErroMsg = SAPUI.Dialog("", "Detail Informasi", "50%", "50%", true);

        TxvTtlDiagnosi = new sap.ui.commons.TextView({
            text: 'Diagnosis',
            tooltip: 'Diagnosis',
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Critical,
            design: sap.ui.commons.TextViewDesign.Bold
        }).addStyleClass("customsize");

        iconDiagnos = SAPUI.Icon("sap-icon://show-edit", "1.5rem", "#1a237e");
        iconProcedure = SAPUI.Icon("sap-icon://activities", "1.5rem", "#1a237e");
        TxvCntDiagnosi = SAPUI.TextView("", "tes", "", "auto", true);

        TxvCntDiagnosi.setDesign(sap.ui.commons.TextViewDesign.H4);

        TxvtlProcedure = new sap.ui.commons.TextView({
            text: 'Procedure',
            tooltip: 'Procedure',
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Positive,
            design: sap.ui.commons.TextViewDesign.Bold
        }).addStyleClass("customsize");

        TxvCntProcedure = SAPUI.TextView("", "tes", "", "auto", true);
        TxvCntProcedure.setDesign(sap.ui.commons.TextViewDesign.H4);

        mtrxCntDlg = SAPUI.Matrix("", "auto", false, ['auto', 'auto'], 2);

        mtrxCntDlg.createRow(iconDiagnos, TxvTtlDiagnosi);
        mtrxCntDlg.createRow("", TxvCntDiagnosi);
        mtrxCntDlg.createRow("");
        mtrxCntDlg.createRow(iconProcedure, TxvtlProcedure);
        mtrxCntDlg.createRow("", TxvCntProcedure);

        DlgErroMsg.addContent(mtrxCntDlg);

        labelMsg.attachBrowserEvent('click', function () {
            DlgErroMsg.open()
        })

        //footer error message
        var footer = new sap.m.Toolbar({
            content: [
                labelZero,
                labelIcon,
                labelMsg
            ],
            height: "7%"
        }).addStyleClass("Footer")
        //------------------------------------------------------------------------

        //-------------------------Sub Header Bar Page------------------------------------
        var searchBar = SAPUI.AutoComplete("", "Enter a TCode", 10, "15%", true, true);

        searchBar.setPlaceholder("Cari Tcode...");
        searchBar.attachBrowserEvent('keypress', function (e) {
            var valser = searchBar
            if (e.which == 13) {
                SAPUI.SearchTcode(valser)
            }
        });

        searchBar.setDisplaySecondaryValues(true);
        searchBar.addStyleClass("searchBar")
        Global.AutoCompleteList(searchBar, "SearchTcode", U5312UX5)


        //button cari 
        var btnCari = SAPUI.Button("", "", "Cari Tcode", "sap-icon://accept", false, "Accept")
        btnCari.addStyleClass("roundedbuttonsearch")
        btnCari.attachPress(function () {
            var valser = searchBar
            SAPUI.SearchTcode(valser)
        });

        //button back
        var btnBack = SAPUI.Button("", "", "Back", "sap-icon://nav-back", false, "Accept")
        btnBack.attachPress(function () {
            Global.UniversalBack()
        })
        btnBack.addStyleClass("roundedbuttonback")

        //button back to dashboard
        var btnDashboard = SAPUI.Button("", "", "Kembali Ke Dashboard", "sap-icon://sys-cancel-2", false, "Accept")
        btnDashboard.attachPress(function () {
            Global.DeleteSession();
            sessionStorage.removeItem("tcodeVariantux5");
            sap.m.URLHelper.redirect("Dashboard.html");
        })
        btnDashboard.addStyleClass("roundedbuttoncancel")

        // title.addStyleClass("bgSubheaderText") 

        //export
        var lblExport = SAPUI.Label("", "Export To", "", "auto")
        lblExport.addStyleClass("customfontcolor")
        var cmbExport = SAPUI.ComboBox("", "33%")

        var oItemBlank = new sap.ui.core.ListItem();
        oItemBlank.setText("");
        cmbExport.addItem(oItemBlank);

        var oItemCSV = new sap.ui.core.ListItem();
        oItemCSV.setText("CSV");

        var oItemXLSX = new sap.ui.core.ListItem();
        oItemXLSX.setText("XLSX");

        var oItemXLS = new sap.ui.core.ListItem();
        oItemXLS.setText("XLS");

        var oItemPDF = new sap.ui.core.ListItem();
        oItemPDF.setText("PDF");

        if (thisView != undefined) {
            if (typeof thisView.getController().ontoExportCSV === "function") {
                cmbExport.addItem(oItemCSV);
            }

            if (typeof thisView.getController().fnJSONToXLSXConvertor === "function") {
                cmbExport.addItem(oItemXLSX);
            }

            if (typeof thisView.getController().fnJSONToXLSConvertor === "function") {
                cmbExport.addItem(oItemXLS);
            }

            if (typeof thisView.getController().onToPDF === "function") {
                cmbExport.addItem(oItemPDF);
            }
        }

        cmbExport.attachChange(function () {
            var tipe = cmbExport.getValue()
            if (tipe == "CSV") {
                thisView.getController().onToExport("csv");
                // thisView.getController().ontoExportCSV();
                cmbExport.setSelectedKey("")
            } else if (tipe == "XLSX") {
                thisView.getController().onToExport("xlsx");
                cmbExport.setSelectedKey("")
            } else if (tipe == "XLS") {
                thisView.getController().onToExport("xls");
                cmbExport.setSelectedKey("")
            } else if (tipe == "PDF") {
                thisView.getController().onToExport("pdf");
                cmbExport.setSelectedKey("")
            }
        });

        var exportTo = []
        if (thisView != undefined) {
            // if (typeof thisView.getController === "function") {
                searchBar.setWidth("50%")
                exportTo = [lblExport, cmbExport]
            // }
        }

        var BtnHeader = [],
            oCustomHeader = new sap.m.Bar({
                design: sap.m.BarDesign.Footer,
                contentLeft: [title],
                contentMiddle: [],
                contentRight: [exportTo]
            }).addStyleClass("bgSubheader");
        //-------------------------Sub Header Bar Page-----------------------------------

        var title1 = SAPUI.Title("", "WASTE CONTROL APPLICATION")

        //------------------------Header Bar Menu Dinamis Page---------------------------

        var oSubHeader = new sap.m.Bar({
            contentLeft: [mtrHeader]
        }).addStyleClass("sapUiSizeCompact");
        //------------------------Header Bar Menu Dinamis Page---------------------------
        var idUniqueShell = "myShellAll" + SAPUI.getRouteName()

        var headItems = []
        var pageNow = "" + location.href.split("/").slice(-1);
		if (pageNow.includes("Dashboard.html")) {
            headItems = [ //redirect to home dashboard   
                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Menu",
                    icon: "sap-icon://menu2",
                    visible: true,
                    showSeparator: false,
                    press: function () {
                        var oShell = this.getParent().getParent();
                        var bState = oShell.getShowPane();
                        oShell.setShowPane(!bState);
                        if (bState) { // tutup
                            // alert("yes")
                            $('#' + idUniqueShell + '-container-pane').css('width', '0px');
                            $('#' + idUniqueShell + '-container-canvas').css('left', '0px');
                        } else { // buka
                            // alert("no")
                            $('#' + idUniqueShell + '-container-pane').css('width', '400px');
                            $('#' + idUniqueShell + '-container-canvas').css('left', '400px');
                        }
                    }
                }),
                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Home",
                    icon: "sap-icon://home",
                    visible: "false",
                    showSeparator: false,
                    press: function () {
                        sap.m.URLHelper.redirect("Dashboard.html");
                        //delete all session storage
                        sessionStorage.clear();
                    }
                }),
            ]
        } else {
            headItems = [ //redirect to home dashboard   
                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Menu",
                    icon: "sap-icon://menu2",
                    visible: true,
                    showSeparator: false,
                    press: function () {
                        var oShell = this.getParent().getParent();
                        var bState = oShell.getShowPane();
                        oShell.setShowPane(!bState);
                        if (bState) { // tutup
                            // alert("yes")
                            $('#' + idUniqueShell + '-container-pane').css('width', '0px');
                            $('#' + idUniqueShell + '-container-canvas').css('left', '0px');
                        } else { // buka
                            // alert("no")
                            $('#' + idUniqueShell + '-container-pane').css('width', '400px');
                            $('#' + idUniqueShell + '-container-canvas').css('left', '400px');
                        }
                    }
                }),
                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Home",
                    icon: "sap-icon://home",
                    visible: "false",
                    showSeparator: false,
                    press: function () {
                        sap.m.URLHelper.redirect("Dashboard.html");
                        //delete all session storage
                        sessionStorage.clear();
                    }
                }),

                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Back",
                    icon: "sap-icon://nav-back",
                    visible: "false",
                    showSeparator: false,
                    press: function () {
                        Global.UniversalBack()
                    }
                }),
            ]
        }

        return new sap.ui.unified.Shell({
            id: idUniqueShell,
            // icon: "asset/image/trias1.png",
            headItems: headItems,
            headEndItems: [
                //close active session jika pada browser utama akan melakukan logout
                // new sap.ui.unified.ShellHeadItem({
                //     icon: "sap-icon://system-exit",
                //     tooltip: "Close Session",
                //     press: function () {
                //         oThis.CloseSession()
                //         // sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
                //         //     "Do you want to log off ?" : "Do you want to close this tab?",
                //         //     oThis.CloseSession, "Confirmation");
                //     }
                // }).setVisible(true),
                //create session window
                new sap.ui.unified.ShellHeadItem({
                    icon: "sap-icon://create-session",
                    tooltip: "Create Session",
                    showSeparator: false,
                    press: function () {
                        SAPUI.CreateSession();

                    }
                }),
                //logout
                new sap.ui.unified.ShellHeadItem({
                    icon: "sap-icon://log",
                    tooltip: "Logout",
                    showSeparator: false,
                    press: function () {
                        Global.Logout();
                    }
                }),

                // //change language
                // new sap.ui.unified.ShellHeadItem({
                //     icon: iconLanguage,
                //     tooltip: "Language",
                //     press: function () {
                //         if (languageUX5 == 'en') {
                //             window.localStorage.setItem("languageux5", "ind");
                //             window.localStorage.setItem("iconLang", "asset/icon/EN.png");
                //         } else {
                //             window.localStorage.setItem("languageux5", "en");
                //             window.localStorage.setItem("iconLang", "asset/icon/ID.png");
                //         }

                //         location.reload();
                //     }
                // })
            ],
            search: title1,
            user: usr,
            content: new sap.m.Page({
                customHeader: oSubHeader,
                showHeader: isShowHeader,
                showSubHeader: isShowSubHeader,
                //                showFooter			: isShowFooter,
                showFooter: false,
                content: pageConten,
                footer: [footer],
                subHeader: oCustomHeader,
                enableScrolling: true,
                floatingFooter: true
            }),
            paneContent: [
                SAPUI.GetSidebar()
            ]
        }).addStyleClass("customheadersheel");
    },
    /*
     * untuk desain default dihalaman dashboard
     *  
     * */
    XShellDashboard: function (title, isShowSubHeader, pageConten, mtrHeader, isShowFooter, toolbar, isShowHeader) {
        var oThis = this
        Global.onCheckAuth(window.location.pathname)
        // window.addEventListener('focus', function () {
        //     var token = Global.tokenParser();
        //     if (token !== null) {
        //         setTimeout(function () {
        //             Global.onFocusInsSession(token.tcode);
        //         }, 1000);
        //     }
        //     // console.log('focused');
        // });
        // window.addEventListener('blur', function () {
        //     // console.log('not focused');
        // });
        // get IP client
        Global.GetClientIP();
        if (isShowHeader == undefined) {
            isShowHeader = false
        }
        var tabindex = window.newtab;
        var token_now = window.token_now;

        if (tabindex !== undefined) {
            console.log('newTab value receive', tabindex);
            window.sessionStorage.tab = tabindex;
        }

        if (token_now !== undefined) {
            console.log('new token receive', token_now);
            window.sessionStorage.token_now = token_now;
        }
        console.log(isShowHeader)
        // send notif ke user
        // Global.SMSNotif();
        // Global.CekKickUser();
        // untuk cek url agar bisa lakukan cek session
        var halaman = "" + location.href.split("/").slice(-1);
        console.log("halaman: " + halaman);

        //ceksession hanya dilakukan jika masuk ke halaman dashboard
        if (halaman == "Dashboard.html") { } else {
            // Global.CekKickSession()
        }
        if (localStorage.getItem("userNameLS") === null) {
            UserLS = "No User"
        }


        // header top bar
        usr = new sap.ui.unified.ShellHeadUserItem({
            image: "sap-icon://person-placeholder",
            username: UserLS,
            showPopupIndicator: true,
            press: function () {
                if (tp3.isOpen()) {
                    tp3.close();
                } else {
                    tp3.open(sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.BeginBottom);
                }
            },

        })
        ////////////////////////////////////////////////////////////////



        ////////////////////////UserInformation/////////////////////////////////////////////////
        var dialogUserInfo = SAPUI.Dialog("", "User Info", "200px", "200px", true),
            panel = SAPUI.Panel("", "", "", true, true),
            User = SAPUI.TextView("", "User", "User", 'auto', true),
            User1 = SAPUI.TextView("", U5312UX5, "User", 'auto', true),
            Database = SAPUI.TextView("", "Database", "Database", 'auto', true),
            Database1 = SAPUI.TextView("", Server1, "User", 'auto', true),
            WebServices = SAPUI.TextView("", "Web Service", "User", 'auto', true),
            WebServices1 = SAPUI.TextView("", Server1, "User", 'auto', true),
            TCode = SAPUI.TextView("", "Transaction", "User", 'auto', true),
            TCode1 = SAPUI.TextView("", X_VarianUX5, "User", 'auto', true),
            oLayoutUserInfo = SAPUI.Matrix("", "auto", true, [], 2)

        oLayoutUserInfo.createRow(User, User1)
        oLayoutUserInfo.createRow(Database, Database1)
        oLayoutUserInfo.createRow(WebServices, WebServices1)
        oLayoutUserInfo.createRow(TCode, TCode1)

        panel.addContent(oLayoutUserInfo)

        dialogUserInfo.addContent(oLayoutUserInfo)

        var UserInfo = SAPUI.Button("", "User Info", "User Info", "sap-icon://hint", true, "Emph")
        UserInfo.attachPress(function () {
            dialogUserInfo.open();
        })

        var oLayoutHeader = SAPUI.Matrix("", "auto", true, [], 2),

            btnChangePasswd = SAPUI.Button("", "Change Password", "", "sap-icon://key", true, "Emph")

        oLayoutHeader.createRow(btnChangePasswd)
        // oLayoutHeader.createRow(UserInfo)

        if (userTypeUX5 == 'OPERATOR') {
            UserInfo.setVisible(false)
        } else if (userTypeUX5 == 'ADMIN') {
            UserInfo.setVisible(false)
        }

        ///////////////////////////////////////////////////////

        var tp3 = new sap.ui.ux3.ToolPopup({
            icon: "sap-icon://log",
            inverted: false,
            content: [oLayoutHeader],
            autoClose: true,
            opener: usr,
        });

        btnChangePasswd.attachPress(oThis.ChangePassword);

        if (languageUX5 == 'en') {
            btnChangePasswd.setText("Change Password")
        } else {
            btnChangePasswd.setText("Ubah Kata Sandi")
        }


        var baseTitle = title.getId().split("_");
        titleCut = baseTitle[(baseTitle.length - 1)];

        //--------------------------Footer Error Message------------------------
        labelZero = new sap.ui.commons.Label({});
        labelIcon = new sap.ui.commons.Label({ id: "lblIcon" + titleCut });

        labelIcon.addStyleClass("footerbar1");
        labelMsg = new sap.ui.commons.TextView({
            id: "lblmsg" + titleCut,
            text: "",
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Default,
            design: sap.ui.commons.TextViewDesign.Bold
        });

        // Dialog error message
        DlgErroMsg = SAPUI.Dialog("", "Detail Informasi", "50%", "50%", true);

        TxvTtlDiagnosi = new sap.ui.commons.TextView({
            text: 'Diagnosis',
            tooltip: 'Diagnosis',
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Critical,
            design: sap.ui.commons.TextViewDesign.Bold
        }).addStyleClass("customsize");

        iconDiagnos = SAPUI.Icon("sap-icon://show-edit", "1.5rem", "#1a237e");
        iconProcedure = SAPUI.Icon("sap-icon://activities", "1.5rem", "#1a237e");
        TxvCntDiagnosi = SAPUI.TextView("", "tes", "", "auto", true);

        TxvCntDiagnosi.setDesign(sap.ui.commons.TextViewDesign.H4);

        TxvtlProcedure = new sap.ui.commons.TextView({
            text: 'Procedure',
            tooltip: 'Procedure',
            wrapping: true,
            width: 'auto',
            textAlign: 'Left',
            semanticColor: sap.ui.commons.TextViewColor.Positive,
            design: sap.ui.commons.TextViewDesign.Bold
        }).addStyleClass("customsize");

        TxvCntProcedure = SAPUI.TextView("", "tes", "", "auto", true);
        TxvCntProcedure.setDesign(sap.ui.commons.TextViewDesign.H4);

        mtrxCntDlg = SAPUI.Matrix("", "auto", false, ['auto', 'auto'], 2);

        mtrxCntDlg.createRow(iconDiagnos, TxvTtlDiagnosi);
        mtrxCntDlg.createRow("", TxvCntDiagnosi);
        mtrxCntDlg.createRow("");
        mtrxCntDlg.createRow(iconProcedure, TxvtlProcedure);
        mtrxCntDlg.createRow("", TxvCntProcedure);

        DlgErroMsg.addContent(mtrxCntDlg);

        labelMsg.attachBrowserEvent('click', function () {
            DlgErroMsg.open()
        })

        //footer error message
        var footer = new sap.m.Toolbar({
            content: [
                labelZero,
                labelIcon,
                labelMsg
            ],
            height: "7%"
        }).addStyleClass("Footer")
        //------------------------------------------------------------------------

        //-------------------------Sub Header Bar Page------------------------------------
        var searchBar = SAPUI.AutoComplete("", "Enter a TCode", 10, "15%", true, true);

        searchBar.setPlaceholder("Cari Tcode...");
        searchBar.attachBrowserEvent('keypress', function (e) {
            var valser = searchBar
            if (e.which == 13) {
                SAPUI.SearchTcode(valser)
            }
        });

        searchBar.setDisplaySecondaryValues(true);
        searchBar.addStyleClass("searchBar")
        Global.AutoCompleteList(searchBar, "SearchTcode", U5312UX5)


        //button cari 
        var btnCari = SAPUI.Button("", "", "Cari Tcode", "sap-icon://accept", false, "Accept")
        btnCari.addStyleClass("roundedbuttonsearch")
        btnCari.attachPress(function () {
            var valser = searchBar
            SAPUI.SearchTcode(valser)
        });

        //button back
        var btnBack = SAPUI.Button("", "", "Back", "sap-icon://nav-back", false, "Accept")
        btnBack.attachPress(function () {
            Global.UniversalBack()
            // if (parseInt(titleCut) > 1){		
            // 	titleCut = (parseInt(titleCut) - 1).toString()		
            // }		
            // function GoBackWithRefresh(event) {		
            //    if ('referrer' in document) {		
            //        window.location = document.referrer;		
            //        /* OR */		
            //        //location.replace(document.referrer);		
            //    } else {		
            //        window.history.back();		
            //    }		
            // }		
            // GoBackWithRefresh()
        })
        btnBack.addStyleClass("roundedbuttonback")

        //button back to dashboard
        var btnDashboard = SAPUI.Button("", "", "Kembali Ke Dashboard", "sap-icon://sys-cancel-2", false, "Accept")
        btnDashboard.attachPress(function () {
            Global.DeleteSession();
            sessionStorage.removeItem("tcodeVariantux5");
            sap.m.URLHelper.redirect("Dashboard.html");
        })
        btnDashboard.addStyleClass("roundedbuttoncancel")

        title.addStyleClass("bgSubheaderText")

        var BtnHeader = [title],
            oCustomHeader = new sap.m.Bar({
                design: sap.m.BarDesign.Footer,
                contentLeft: [btnBack],
                contentMiddle: [],
                contentRight: []
            }).addStyleClass("bgSubheader");
        //-------------------------Sub Header Bar Page-----------------------------------



        //------------------------Header Bar Menu Dinamis Page---------------------------

        var oSubHeader = new sap.m.Bar({
            contentLeft: [mtrHeader]
        }).addStyleClass("sapUiSizeCompact");
        //------------------------Header Bar Menu Dinamis Page---------------------------
        var title1 = SAPUI.Title("", "TRST IT INVENTORY")

        //==========GET TILE DATA================

        //==========================

        return new sap.ui.unified.Shell({
            id: "myShell1",
            icon: "asset/image/trias1.png",
            headItems: [ //redirect to home dashboard
                new sap.ui.unified.ShellHeadItem({

                    tooltip: "Menu",
                    icon: "sap-icon://menu",
                    visible: true,
                    press: function () {
                        var oShell = this.getParent().getParent();
                        var bState = oShell.getShowPane();
                        oShell.setShowPane(!bState);
                        if (bState) { // tutup
                            // alert("yes")
                            $('#myShell1-container-pane').css('width', '0px');
                            $('#myShell1-container-canvas').css('left', '0px');
                        } else { // buka
                            // alert("no")
                            $('#myShell1-container-pane').css('width', '400px');
                            $('#myShell1-container-canvas').css('left', '400px');
                        }
                        // $('#myShell1-container-pane').css('width', '300px')
                        // oItem.setShowMarker(!bState);
                        // oItem.setSelected(!bState);
                    }
                }),
                new sap.ui.unified.ShellHeadItem({
                    tooltip: "Home",
                    icon: "sap-icon://home",
                    visible: "false",
                    press: function () {
                        sap.m.URLHelper.redirect("Dashboard.html");
                        //delete all session storage
                        sessionStorage.clear();
                    }
                }),
            ],

            headEndItems: [
                //close active session jika pada browser utama akan melakukan logout
                new sap.ui.unified.ShellHeadItem({
                    icon: "sap-icon://system-exit",
                    tooltip: "Close Session",
                    press: function () {
                        oThis.CloseSession()
                        // sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
                        //     "Do you want to log off ?" : "Do you want to close this tab?",
                        //     oThis.CloseSession, "Confirmation");
                    }
                }).setVisible(true),
                //create session window
                new sap.ui.unified.ShellHeadItem({
                    icon: "sap-icon://create-session",
                    tooltip: "Create Session",
                    press: function () {
                        oThis.CreateSession();

                    }
                }),
                //logout
                new sap.ui.unified.ShellHeadItem({
                    icon: "sap-icon://log",
                    tooltip: "Logout",
                    press: function () {
                        Global.Logout();
                    }
                }),
                // //change language
                // new sap.ui.unified.ShellHeadItem({
                //     icon: iconLanguage,
                //     tooltip: "Language",
                //     press: function () {
                //         if (languageUX5 == 'en') {
                //             window.localStorage.setItem("languageux5", "ind");
                //             window.localStorage.setItem("iconLang", "asset/icon/EN.png");
                //         } else {
                //             window.localStorage.setItem("languageux5", "en");
                //             window.localStorage.setItem("iconLang", "asset/icon/ID.png");
                //         }

                //         location.reload();
                //     }
                // })
            ],
            search: title1,
            user: usr,
            content: new sap.m.Page({
                customHeader: oSubHeader,
                showHeader: isShowHeader,
                showSubHeader: isShowSubHeader,
                //                showFooter			: isShowFooter,
                showFooter: false,
                content: pageConten,
                footer: [footer],
                subHeader: oCustomHeader,
                enableScrolling: true,
                floatingFooter: true
            }),
            paneContent: [
                this.GetSidebar()
            ]
        })

        //function untuk konfirmasi keluar browser

    },

    /**
     * ! Experimental version
     * * Using the latest openui version (1.69.1)
     * * with addition in data-sap-ui-libs => sap.f, sap.tnt
     * * Adding styling (f.shellbar.css)
     * ? 
     * @param  {string} shell.title *
     * @param  {sap.control object} shell.content
     * @param  {boolean} isDashboard
     * TODO : Refactor this method
     */
    FShell: function (shell, isDashboard = false) {
        var oThis = this
        var { title, content } = shell

        // SECTION Global Function
        Global.onCheckAuth(window.location.pathname)
        Global.GetClientIP();

        // SECTION Title
        var titleHeader = oThis.Title('', title)

        // SECTION Popover (After Click Profile)
        var popover = new sap.m.Popover({
            customHeader: oThis.Title('', UserLS),
            placement: sap.m.PlacementType.Bottom,
            content:
                [
                    new sap.m.Button({
                        icon: "sap-icon://key",
                        text: 'Change Password',
                        type: sap.m.ButtonType.Transparent,
                        press: evt => {
                            oThis.ChangePassword()
                        }
                    }),
                    new sap.m.Button({
                        icon: "sap-icon://log",
                        text: 'Logout',
                        type: sap.m.ButtonType.Transparent,
                        press: evt => {
                            Global.Logout()
                        }
                    })
                ]
        }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover')

        // SECTION Profile (Avatar)
        var profile = new sap.f.Avatar('', {
            initials: oThis.getInitialName()
        })

        // SECTION ShellBar
        var shellbar = new sap.f.ShellBar("", {
            secondTitle: 'TRST IT Inventory',
            showMenuButton: true,
            showNavButton: true,
            homeIcon: "asset/image/trias1.png",
            profile: profile,
            additionalContent: [
                new sap.m.Button('', {
                    icon: "sap-icon://system-exit",
                    tooltip: "Close Current Session",
                    press: _ => {
                        oThis.CloseSession()
                    }
                }),
                new sap.m.Button('', {
                    icon: "sap-icon://create-session",
                    tooltip: "Create New Session",
                    press: _ => {
                        oThis.CreateSession()
                    }
                }),
            ],
            navButtonPressed: evt => {
                Global.UniversalBack()
            },
            menuButtonPressed: evt => {
                var bExpanded = sidebar.getExpanded()
                var element = $("div.sapTntToolPageContentWrapper > div.sapTntToolPageMain")
                if (bExpanded) {
                    element
                        .css("padding-left", "3rem")
                } else {
                    element
                        .css("padding-left", "25rem")
                }

                sidebar.setExpanded(!bExpanded)
                page.setSideExpanded(!page.getSideExpanded())
            },
            avatarPressed: evt => {
                popover.openBy(profile)
            },
            homeIconPressed: evt => {
                sap.m.URLHelper.redirect("Dashboard.html");
                sessionStorage.clear();
            },
        })

        var mtrShellbar = SAPUI.Matrix('')

        // SECTION If Shell for Dashboard
        if (isDashboard) {
            mtrShellbar
                .createRow(shellbar)
        } else {
            mtrShellbar.createRow(shellbar)
                .createRow(new sap.m.Bar({
                    design: sap.m.BarDesign.Footer,
                    contentLeft: titleHeader,
                    contentMiddle: [],
                    contentRight: []
                }))
        }

        // SECTION Sidebar
        var sidebar = new sap.tnt.SideNavigation("", {
            item: new sap.tnt.NavigationList("", {
                width: "100%",
                items: {
                    templateShareable: false,
                    template: new sap.tnt.NavigationListItem("navList", {
                        text: '{Description}',
                        icon: "sap-icon://building",
                        enabled: true,
                        expanded: false,
                        select: evt => {
                            const isExpanded = evt.getSource().getExpanded()
                            evt.getSource().setExpanded(!isExpanded)
                        },
                        items: {
                            templateShareable: false,
                            template: new sap.tnt.NavigationListItem("", {
                                text: '{Description}',
                                enabled: true,
                                select: evt => {
                                    let route = evt.getSource().getBindingContext().getProperty("pressGnt")
                                    alert(route)
                                }
                            }),
                            path: 'content'
                        }
                    }),
                    path: '/'
                }
            }),
        })
            .setModel(oThis.GetSidebarModel())

        // SECTION Return the page
        var page = new sap.tnt.ToolPage('', {
            sideExpanded: false,
            header: new sap.tnt.ToolHeader('', {
                asyncMode: true,
                width: "100%",
                height: "100%",
                content: mtrShellbar,
            }),
            sideContent: sidebar,
            mainContents: content,

        })
        return page
    },

    Line: function(pID, pHeight){
        return new sap.ui.commons.HorizontalDivider({
            id: pID,
            // height: pHeight
        }).addStyleClass("lineStyle")
    },

    getInitialName: function () {
        let initial = '_'
        switch (userTypeLS) {
            case 'ADMIN':
                initial = 'A'
                break
            case 'USER':
                initial = 'U'
                break
            case 'BEACUKAI':
                initial = 'BC'
                break
            case 'SUPERADMIN':
                initial = 'SA'
                break
        }
        return initial
    },

    // Insert Executed Report Log
    insExcRptLog: function(route){
        var trxTcodes = this.getTcodeDiv()["transaction"]
        var rptTcodes = this.getTcodeDiv()["report"]
        var tcode = route.split("_")
        
        if(rptTcodes.includes(tcode[0]) || trxTcodes.includes(tcode[0])){
            if(tcode[1] == '02'){
                Global.InsLogActivity(tcode[0], `Transaction ${tcode[0]} Executed`)
            }
        }
    },

    // Return tcode per-division
    getTcodeDiv: function(){
        var result = {
            report: [],
            transaction: []
        }
        var dataTree = JSON.parse(window.localStorage.getItem("dataTile")).Tiles

        dataTree[0]["ContentPanel"].forEach(row => {
            result["report"].push(row["pressGnt"])
        })

        dataTree[1]["ContentPanelRptAd"].forEach(row => {
            result["report"].push(row["pressGnt"])
        })

        dataTree[2]["ContentTrx"].forEach(row => {
            result["transaction"].push(row["pressGnt"])
        })
        return result
    },

    getRouteName: function () {
        var hash = window.location.hash
        var href = window.location.href
        var name = ""

        if (hash == "#/" || hash == "") {
            let splitHref = href.split("/")
            let route = splitHref[splitHref.length - 1]
            name = route.replace("#", "")
            name = name.replace(".html", "")
        } else {
            let splitHref = href.split("/")
            let route = splitHref[splitHref.length - 1]
            name = route
        }

        return name
    },

    CloseSession: function () {
        sap.ui.commons.MessageBox.confirm(Global.tabCount() == 1 ?
            "Do you want to log off ?" : "Do you want to close this tab?",
            function (bResult) {
                if (bResult) {
                    if (Global.tabCount() == 1) {
                        Global.DeleteSession(false, true);
                    } else {
                        Global.tabCounter(false);
                        // Global.DeleteSession(false);
                        window.open('', '_self').close()
                    }
                    return false;
                }
            }, "Confirmation");

    },
    // Create New Session
    CreateSession: function () {
        var url = window.location.href
        console.log(url)
        var nextURL = ''
        // Global.tabCounter();
        
        if(url.indexOf("WebContent") == -1) {
            if(url.includes("WMS")) {
                var n = url.indexOf("WMS");
                var char = "WMS"
                var length = char.length
                nextURL = url.substring(0, n + parseInt(length)) + '/Dashboard.html';
            } else {
                var char = url.split("//");
                var char2 = char[1].split("/");
                nextURL = "http://" + char2[0];
            }
            
            // jika aplikasi dijalankan dari publishan
            var win = window.open(nextURL, '_blank');
            win.focus();   
        } else {
            // jika aplikasi dijalankan localhost
            var n = url.indexOf("WebContent");
            nextURL = url.substring(0, n) + 'WebContent/Dashboard.html';
            var win = window.open(nextURL, '_blank');
            win.focus();
        }
    },
    GetSidebarModel: function () {
		var data2 = []

        var wsUrl = WS_SY + "WS_UC_DisplayView";

        var paramTile = {
            Username: window.localStorage.getItem("User")
        } 
        var param = Global.dynamicParam("DisplayTile", paramTile);

        $.ajax({
            url: wsUrl,
            type: 'post',
            dataType: 'json',
            data: param,
            success: function(result) {
                
                var parseResult = JSON.parse(result.WS_UC_DisplayViewResult);
                var result = parseResult.Table;

                //Build Group
                var group = "";
                for (var i = 0; i < result.length; i++) {
                    if (group !== result[i].Type) {
                        var obj = {
                            Group	: result[i].Type,
                            // Ditambahkan keypair "Text" sebagai bahan binding untuk Navigation Panel
                            Text	: result[i].Type
                        }
                        data2.push(obj);
                        group = result[i].Type;
                    } 
                }

                //Build Content
                for (var i = 0; i < data2.length; i++) {
                    var content = []

                    for (var j = 0; j < result.length; j++) {
                        // Ditambahkan keypair "Text" sebagai bahan binding untuk Navigation Panel
                        result[j].Text = result[j].Title
                        if (data2[i].Group === result[j].Type) {
                            var obj = result[j]
                            content.push(obj)
                        }
                    }

                    data2[i].Content = content;
                }
                // console.log(data2)

                dataMenu = {
                    data : data2
                }

                console.log("Menu", dataMenu)
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(dataMenu);                
                sap.ui.getCore().setModel(oModel);
            },
        })
    },


    // Sidebar Tree
    GetSidebar: function () {
        SAPUI.GetSidebarModel()

        var oTree = new sap.m.Tree("");
        var oTreeItemTemplate = new sap.m.StandardTreeItem("");

        oTree.setWidth("100%");
        oTree.setHeaderText("Navigation")
        oTree.setIncludeItemInSelection(true)

        oTreeItemTemplate.addStyleClass("treeSidebar")
        oTreeItemTemplate.setType("Active")
        oTreeItemTemplate.bindProperty("title", "Text");
        oTreeItemTemplate.bindProperty("tooltip", "TransactionCode");

        oTree.bindAggregation("items", "/data", oTreeItemTemplate);

        var dataHeadMenu = []

        oTree.attachToggleOpenState(function (e) {
            var treeIndex = e.getParameters().itemIndex
            var exp = e.getParameters().expanded
            var head = oTree.getItems()[treeIndex].getTitle()
            
            // 1. Check if head menu is exist or not
            if (dataHeadMenu.length) {
                var newData = true
                for (let index = 0; index < dataHeadMenu.length; index++) {
                    const element = dataHeadMenu[index];
                    if (element['Head'] == head) {
                        newData = false
                        break
                    }
                }
                if (newData) {
                    dataHeadMenu.push({
                        Head: head,
                        isExpanded: false
                    })
                }
            } else {
                dataHeadMenu.push({
                    Head: head,
                    isExpanded: false
                })
            }
            
            // 2. Check is expanded or not
            for (let index = 0; index < dataHeadMenu.length; index++) {
                const element = dataHeadMenu[index];
                if (element['Head'] == head) {
                    if (element['isExpanded'] == false) {
                        oTree.expand(treeIndex)
                    } else {
                        oTree.collapse(treeIndex)
                    }
                    element['isExpanded'] = exp;
                }
            }
        })

        oTreeItemTemplate.attachPress(function (e) {
            var treeIndex = parseInt(e.getSource().sId.split("-").pop())
            var head = e.getSource().getBindingContext().getProperty("Group")
            var tcode = e.getSource().getBindingContext().getProperty("TransactionCode")
            
            if (head != undefined) {
                // 1. Check if head menu is exist or not
                if (dataHeadMenu.length) {
                    var newData = true
                    for (let index = 0; index < dataHeadMenu.length; index++) {
                        const element = dataHeadMenu[index];
                        if (element['Head'] == head) {
                            newData = false
                            break
                        }
                    }
                    if (newData) {
                        dataHeadMenu.push({
                            Head: head,
                            isExpanded: false
                        })
                    }
                } else {
                    dataHeadMenu.push({
                        Head: head,
                        isExpanded: false
                    })
                }
                
                // 2. Check is expanded or not
                for (let index = 0; index < dataHeadMenu.length; index++) {
                    const element = dataHeadMenu[index];
                    if (element['Head'] == head) {
                        if (element['isExpanded'] == false) {
                            oTree.expand(treeIndex)
                            element['isExpanded'] = true
                        } else {
                            oTree.collapse(treeIndex)
                            element['isExpanded'] = false
                        }
                    }
                }
            } else {
                var redirect = tcode + '.html'
                sap.m.URLHelper.redirect(redirect);
            }
        })

        
        //==========================
        return oTree
    },

    PrintLabel: function () {
        var doc = jsPDF('L', 'mm', 'a5').setFillColor(48, 240, 0)
        let width = doc.internal.pageSize.width
        let height = doc.internal.pageSize.height

        doc.ellipse(width / 2, height / 2, 70, 70, 'DF')
        doc.setProperties({
            title: 'Label KITE',
            subject: 'Print Label For KITE',
            author: 'IT-INV',
            keywords: 'generated, javascript, web 2.0, ajax',
            creator: 'TRST'
        });
        // doc.autoPrint()

        var string = doc.output('datauristring');

        //--------untuk preview dari jspdfnya sendiri----------------//
        var dlgAdd = SAPUI.Dialog("", "Print", "100%", "100%", true)
        var iframe = "<iframe width='100%' height='99%' src='" + string + "'></iframe>"

        var html = new sap.ui.core.HTML({
            preferDOM: true,
            content: iframe
        });
        dlgAdd.addContent(html);
        dlgAdd.open()
    },
    // Get Tile
    GetTile: async function () {
        this.UserLS = window.localStorage.getItem("userNameLS")
        this.languageLS = window.localStorage.getItem("userTypeLS")
        this.userTypeLS = Number(window.localStorage.getItem("userTypeLS"))
        var wsUrl = WS_User + "WS_UC_Misc";

        var reqTrx = {
            url: wsUrl,
            method: "DspTileDashboard",
            body: { // param utk Tile Dashboard row 5 - transaction
                UserIn: this.UserLS,
                LangIn: this.languageLS,
                TypeIn: 2
            }
        }

        // var reqSumTgl = {
        // 	url: wsUrl,
        // 	method: "DspTileDashboardSummary",
        // 	body: {                  // param utk Tile Dashboard row 2
        // 		mode: 1
        // 	}
        // }

        // var reqSum = {
        // 	url: wsUrl,
        // 	method: "DspTileDashboardSummary",
        // 	body: {	                 // param utk Tile Dashboard row 1
        // 		mode: 2
        // 	}
        // }

        var reqRptAd = {
            url: wsUrl,
            method: "DspTileDashboard",
            body: { // param utk Tile Dashboard row 4 - report Additional
                UserIn: this.UserLS,
                LangIn: this.languageLS,
                TypeIn: 5
            }
        }

        var reqDev = {
            url: wsUrl,
            method: "DspTileDashboard",
            body: { // param utk Tile Dashboard row 3 - report
                UserIn: this.UserLS,
                LangIn: this.languageLS,
                TypeIn: 1
            }
        }

        var [
            dataTrx,
            // dataSumTgl,
            // dataSum,
            dataRptAd,
            data
        ] = await Promise.all([
            fetchApi(reqTrx),
            // fetchApi(reqSumTgl),
            // fetchApi(reqSum),
            fetchApi(reqRptAd),
            fetchApi(reqDev)
        ])

        // var dataTrx    = await fetchApi(reqTrx)
        // var dataSumTgl = await fetchApi(reqSumTgl)
        // var dataSum    = await fetchApi(reqSum)
        // var dataRptAd  = await fetchApi(reqRptAd)
        // var data       = await fetchApi(reqDev)

        data[0].forEach(row => {
            row["cuttedSubHeaderGnt"] = Global.left(row["subHeaderGnt"])
        })
        
        // var headDash = "Dashboard";
        var headReport = "Report";
        var headReportAd = "Report Additional";
        var headTrx = "Transaction";

        // if (dataSum[0] == "") {
        //     headDash = ""
        // } else 

        data[0].length == 0 ? headReport = "" : headReport
        dataRptAd[0].length == 0 ? headReportAd = "" : headReport
        dataTrx[0].length == 0 ? headTrx = "" : headReport 

        console.log(userTypeLS);
        if (userTypeLS == 'BEACUKAI') {
            // mengolah data nya 
            var dataTile = {
                Tiles: [
                    {
                        HeaderPanel: headReport,
                        ContentPanel: data[0]
                    }
                ]
            }
        } else {
            // mengolah data nya 
            var dataTile = {
                Tiles: [
                    // {
                    //     HeaderSummary: headDash,
                    //     ContentSummary: dataSum[0]
                    // },
                    // {
                    //     HeaderSummaryTgl: "",
                    //     ContentSummaryTgl: dataSumTgl[0]
                    // }, 
                    {
                        HeaderPanel: headReport,
                        ContentPanel: data[0]
                    },
                    {
                        HeaderPanelRptAd: headReportAd,
                        ContentPanelRptAd: dataRptAd[0]
                    },
                    {
                        HeaderTrx: headTrx,
                        ContentTrx: dataTrx[0]
                    }
                ]
            }
        }
        // return dataTile
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(dataTile, true);
        window.localStorage.setItem("dataTile", JSON.stringify(oModel.getData()));
    },
    // Change Password
    ChangePassword: function () {
        var dlgChangePasswd = SAPUI.Dialog("", "Ganti Password", "470px", "240px", true)

        var mtrDialog = SAPUI.Matrix("", "", false, [], 4);

        var lblDlgUser = SAPUI.Label("", "User", "Bold", "150px");
        var lblDlgDot1 = SAPUI.Label("", ":");
        var txtDlgUser = SAPUI.TextView("", UserLS, "User", 'auto', true);
        txtDlgUser.setEnabled(false)

        var lblDlgOldPassword = SAPUI.Label("", "Old Password", "Bold", "150px");
        var lblDlgDot2 = SAPUI.Label("", ":");
        // var txfDlgOldPassword = SAPUI.TextFieldNoUpper("", "", "230px")
        var txfDlgOldPassword = SAPUI.PasswordField("", "230px")

        var lblDlgNewPassword = SAPUI.Label("", "New Password", "Bold", "150px");
        var lblDlgDot3 = SAPUI.Label("", ":");
        // var txfDlgNewPassword = SAPUI.TextFieldNoUpper("", "", "230px")
        var txfDlgNewPassword = SAPUI.PasswordField("", "230px")

        var lblDlgConfNewPassword = SAPUI.Label("", "Confirm New Password", "Bold", "150px");
        var lblDlgDot4 = SAPUI.Label("", ":");
        // var txfDlgConfNewPassword = SAPUI.TextFieldNoUpper("", "", "230px")
        var txfDlgConfNewPassword = SAPUI.PasswordField("", "230px")

        var btnDlgUpdate = SAPUI.Button("", "Update", "", "", false, "Accept")
        var btnDlgCancel = SAPUI.Button("", "Cancel", "", "", false, "Reject")

        mtrDialog.createRow(lblDlgUser, lblDlgDot1, txtDlgUser)
        mtrDialog.createRow(lblDlgOldPassword, lblDlgDot2, txfDlgOldPassword /*,lblDlgValue*/)
        mtrDialog.createRow(lblDlgNewPassword, lblDlgDot3, txfDlgNewPassword /*,lblDlgValue*/)
        mtrDialog.createRow(lblDlgConfNewPassword, lblDlgDot4, txfDlgConfNewPassword)

        dlgChangePasswd.addContent(mtrDialog)
        dlgChangePasswd.addButton(btnDlgUpdate)
        dlgChangePasswd.addButton(btnDlgCancel)

        dlgChangePasswd.open()
        btnDlgUpdate.attachPress(async function () {

            var oldValPasswd = txfDlgOldPassword.getValue();
            var newValPasswd = txfDlgNewPassword.getValue();
            var newConfValPasswd = txfDlgConfNewPassword.getValue();

            if (isNotEmpty(oldValPasswd) && isNotEmpty(newValPasswd)) {
                if (validPass(newValPasswd)) {
                    if(newValPasswd == newConfValPasswd){
                        var wsUrl = WS_User + "WS_UC_Auth";

                        var req = {
                            url: wsUrl,
                            body: {
                                UsernameIn: UserLS,
                                OldPasswordIn: oldValPasswd,
                                NewPasswordIn: newValPasswd
                            },
                            method: "ChangePassword"
                        }

                        var res = await fetchApi(req)

                        switch (res[0].Return) {
                            case 1:
                                dlgChangePasswd.close()
                                SAPUI.MessageBox("Change Password Success", "Berhasil Ganti Password", "SUCCESS", "")
                                break;
                            case 2:
                                SAPUI.MessageBox("Old password wrong", "Password Lama Salah", "WARNING", "");
                                break;
                            case 3:
                                SAPUI.MessageBox("User doesnt Exist", "Pengguna Tidak Ada", "WARNING", "");
                                break;
                            default:
                                SAPUI.MessageBox("Process Failed", "Proses Gagal", "WARNING", "");
                                console.log(res[0])
                                break;
                        }
                    } else {
                        SAPUI.MessageBox("Confirm New Password didn't match", "Confirm New Password tidak sesuai", "WARNING", "")                        
                    }
                }
            } else {
                SAPUI.MessageBox("Fill in all Required Field", "Isi Semua Field yang Dibutuhkan", "WARNING", "")
            }

            function isNotEmpty(pComponen) {
                return pComponen !== ""
            }

            function validPass(pComponen) {
                var passInput = pComponen

                var numbers = /[0-9]/g;
                var upperCaseLetters = /[A-Z]/g;

                var score = 20

                if (passInput != "") {
                    console.log(passInput)
                    if (passInput.length >= 8) {
                        console.log(score)
                        if (passInput.match(upperCaseLetters)) {
                            score = score + 40
                            console.log(score)
                        }

                        if (passInput.match(numbers)) {
                            score = score + 40
                            console.log(score)
                        }

                        if (score == 60) {
                            return true
                        } else if (score == 100) {
                            return true
                        }
                    }

                    if (score == 20) {
                        SAPUI.MessageBox("The Password Is Must More Than 8 Letter Use Uppercase or Numbers",
                            "Password harus berisi 8 huruf gunakan huruf besar atau angka", "WARNING", "")
                        txfDlgOldPassword.setValue("")
                        txfDlgNewPassword.setValue("")
                        txfDlgConfNewPassword.setValue("")
                        score = 0
                    }
                    return false
                }
                return false
            }

            function openMsgBox() {
                function fnCallbackMessageBox(sResult) {
                    dlgChangePasswd.close()
                }

                jQuery.sap.require("sap.ui.commons.MessageBox");

                // open a fully configured message box
                sap.ui.commons.MessageBox.show("Success",
                    sap.ui.commons.MessageBox.Icon.SUCCESS,
                    "", [sap.ui.commons.MessageBox.Action.OK],
                    fnCallbackMessageBox,
                    sap.ui.commons.MessageBox.Action.OK);
            }

        })
        btnDlgCancel.attachPress(function () {
            dlgChangePasswd.close()
        })
    },
    //search tcode 
    SearchTcode: function (searchBar) {
        var loading = SAPUI.BusyDialog();
        var listSession = [];
        window.sessionStorage.setItem("tcodeVariantux5", searchBar.getValue());
        ///  get tcode variant  
        var wsUrlTcode = WS_User + "WS_UC_Authorization";
        var tcodeInduk = "";

        var objTcode = {
            user: U5312UX5,
            lang: languageUX5,
            varianUser: searchBar.getValue(),
            mode: "GetTcodeInduk"
        };
        var objTcodeAuthor = {
            user: U5312UX5,
            lang: languageUX5,
            varianUser: searchBar.getValue(),
            mode: "Authorization"
        };
        var paramTcode = Global.dynamicParam("DspTcodeInduk", objTcode);
        var paramAuthor = Global.dynamicParam("DspTcodeInduk", objTcodeAuthor);
        loading.open()
        $.ajax({
            url: wsUrlTcode,
            type: "POST",
            dataType: 'json',
            data: paramAuthor,
            success: function (result) {
                loading.close();
                console.log(result)
                Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                authTcode = Finalresult.Result
                console.log(authTcode)
                if (authTcode == 1) {
                    Global.DeleteSession(false);
                    getTcodeInduk()
                } else {
                    SAPUI.MessageBox("You dont have Autorized!", "Anda tidak memiliki ijin masuk tcode ini", "ERROR", "Status")
                    searchBar.setValue("")
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
            }
        })

        function getTcodeInduk() {
            //cek tcode autorization  
            var authTcode = "";
            $.ajax({
                url: wsUrlTcode,
                type: "POST",
                dataType: 'json',
                data: paramTcode,
                success: function (result) {
                    console.log(result)
                    Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                    tcodeInduk = Finalresult.Result;
                    Global.InsertSessionUser(searchBar.getValue(), tcodeInduk);
                    //					goToTcode(searchTcode,tcodeInduk);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            });
        }

        function goToTcode(tcodeInduk) {

            var wsUrl = WS_User + "WS_UC_UserActivity";

            var objParamUCSession = {
                username: U5312UX5,
                ip: ClientIP,
                server: "PRD",
                transaction: searchBar.getValue()
            };

            var dynamicParamDev = Global.dynamicParam("InsertSession", objParamUCSession);
            console.log(dynamicParamDev)

            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: dynamicParamDev,
                success: function (result) {
                    var resultParse = Global.dynamicDeserialize(result);
                    console.log(resultParse)
                    if (resultParse[0].Return == '1') {
                        console.log(tcodeInduk)
                        sap.m.URLHelper.redirect(tcodeInduk + ".html");
                    } else {
                        console.log("kesalahan insert session")

                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            });
        }
    },
    Title: function (pID, pTitle) {
        return new sap.m.Title({
            id: pID,
            text: pTitle,
            width: "100%",
            textAlign: "Center",

        })
    },
    UTitle: function (pID, pTitle) {
        return new sap.ui.core.Title({
            id: pID,
            text: pTitle
        })
    },
    Icon: function (pSrc, pSize, pColor) {
        return new sap.ui.core.Icon({
            src: pSrc,
            size: pSize,
            color: pColor
        })
    },

    Icon2: function (pID, pSrc, pSize, pColor) {
        return new sap.ui.core.Icon({
            id: pID,
            src: pSrc,
            size: pSize,
            color: pColor
        })
    },

    Menu: function (pID, pAriaDescription, pTooltip) {
        return new sap.ui.commons.Menu({
            id: pID,
            ariaDescription: pAriaDescription,
            tooltip: pTooltip
        })
    },
    ButtonUnpack: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Unpack HU",
            tooltip: "",
            icon: "sap-icon://decline",
            lite: false,
            style: "Reject"
        });
    },
    MenuBar: function (pID, pWidth, pDesign) {
        var ppDesign;

        switch (pDesign) {
            case "Header":
                ppDesign = sap.ui.commons.MenuBarDesign.Header;
                break;
            case "Standard":
                ppDesign = sap.ui.commons.MenuBarDesign.Standard;
                break;
            default:
                ppDesign = sap.ui.commons.MenuBarDesign.Standard;
        }

        return new sap.ui.commons.MenuBar({
            id: pID,
            width: pWidth,
            design: ppDesign
        })
    },
    MenuButton: function (pID, pText, pIcon, pTooltip) {
        return new sap.ui.commons.MenuButton({
            id: pID,
            text: pText,
            icon: pIcon,
            tooltip: pTooltip
        })
    },
    MenuItem: function (pID, pText, pIcon, pTooltip) {
        return new sap.ui.commons.MenuItem({
            id: pID,
            text: pText,
            icon: pIcon,
            tooltip: pTooltip
        })
    },
    ProgressIndicator: function (pID, pWidth, pPercentValue, pTooltip, pShowValue, pBarColor) {
        var ppBarColor;

        switch (pBarColor) {
            case "Critical":
                ppBarColor = sap.ui.core.BarColor.CRITICAL;
                break;
            case "Negative":
                ppBarColor = sap.ui.core.BarColor.NEGATIVE;
                break;
            case "Neutral":
                ppBarColor = sap.ui.core.BarColor.NEUTRAL;
                break;
            case "Positive":
                ppBarColor = sap.ui.core.BarColor.POSITIVE;
                break;
            default:
                ppDesign = sap.ui.core.BarColor.NEUTRAL;
        }

        return new sap.ui.commons.ProgressIndicator({
            id: pID,
            width: pWidth,
            percentValue: pPercentValue,
            tooltip: pTooltip,
            showValue: pShowValue,
            barColor: ppBarColor
        })
    },
    SegmentedButton: function () {
        return new sap.ui.commons.SegmentedButton({
            id: pID
        })
    },
    SplitButton: function (pID, pLite, pStyle, pStyled, pIconFirst, pText, pIcon) {
        var ppStyle;

        switch (pStyle) {
            case "Accept":
                ppStyle = sap.ui.commons.ButtonStyle.Accept;
                break;
            case "Default":
                ppStyle = sap.ui.commons.ButtonStyle.Default;
                break;
            case "Emph":
                ppStyle = sap.ui.commons.ButtonStyle.Emph;
                break;
            case "Reject":
                ppStyle = sap.ui.commons.ButtonStyle.Reject;
                break;
            default:
                ppStyle = sap.ui.core.BarColor.Default;
        }

        return new sap.suite.ui.commons.SplitButton({
            id: pID,
            lite: pLite,
            style: ppStyle,
            styled: pStyled,
            iconFirst: pIconFirst,
            text: pText,
            icon: pIcon
        })
    },
    SwicthOffApp: async function () {
        var path = window.location.pathname
        var wsUrl = WS_User + "WS_UC_Misc";

        var req = {
            url: wsUrl,
            method: "DspGetMaintenance",
            body: {}
        }

        var resultParse = await fetchApix(req);
        console.log("Maintenance "+path+": ",resultParse)
        var version = resultParse[0][0].Version

        if (version == 2){
            sap.m.MessageToast.show("Maintenance Notice:\nWebsite will be under maintenance in a few minutes.", {
                duration: 5000,                  // default
                width: "20em",                   // default
                my: "end top",                // default
                at: "end top",                // default
                of: window,                      // default
                offset: "0 0",                   // default
                collision: "fit fit",            // default
                onClose: null,                   // default
                autoClose: true,                 // default
                animationTimingFunction: "ease", // default
                animationDuration: 1000,         // default
                closeOnBrowserNavigation: true   // default
            });
        } else if (version == 0){
            if(path.includes("index.html")){
                sap.m.URLHelper.redirect("Maintenance.html");
            } else if (path.includes("Maintenance.html")){
                setInterval(intervalCheck,30000)
                async function intervalCheck(){
                    var resultParse = await fetchApix(req);
                    var version = resultParse[0][0].Version
                    console.log("state: "+version)

                    if (version == 1){
                        sap.m.URLHelper.redirect("index.html");
                    }
                }
            } else {
                alert("Website is under maintenance")
                Global.Logout();
            }
        } else{
            if (path.includes("Maintenance.html")){
                sap.m.URLHelper.redirect("index.html");
            }
        }

        async function fetchApix(req) {
            const {url, body, method} = req
 
            var readySend = sanitize( // Sanitize User Inputs
                dynamicParam( // Parsing to Acceptable Format for WS
                    method,
                    typeof body == 'string' ?  // Check if body require to Parse (Must Object)
                        JSON.parse(body) : body
                )
            )

            return fetch(url, {
                method: 'post', // All http method always post
                body: readySend
            })
            .then(res => {
                if (res.ok) return res.json()
                else // if not ok then throw error
                    var error = {
                        message: res.statusText,
                        name: res.status,
                    }
                    throw error
            })
            .then(res => {
                // Deserialize result to Acceptable format for frontend
                return dynamicDeserialize(res)
            })
            .catch(e => {
                // SAPUI.MessageBoxAlert(`Hubungi IT, Terjadi error ${e.name}: "${e.message}"`)
                console.log('Fetch Api Error', e)
            })
        }

        function dynamicDeserialize(ajaxResult){
            var tempResult,
                retVal = new Array();

            for (var key in ajaxResult) {
                tempResult = (ajaxResult[key] != "") ? JSON.parse(ajaxResult[key]) : new Object();
            }

            if ("exceptionErrorStatus" in tempResult) {
               alert("Web Service error: " + tempResult.message);
                return retVal;
            }
    
            for (var tempKey in tempResult) {
                retVal.push(tempResult[tempKey]);
            }
    
            return retVal;
        }

        function dynamicParam (strMethod, objParam, objParamTable) {
            if (objParamTable == undefined) {
                return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + '}';
            } else {
                return '{"Method": "' + strMethod + '", "dynamicParam": ' + JSON.stringify(objParam) + ', "ParamTable": ' + JSON.stringify(objParamTable) + '}';
            }
        }
    },
    CheckAppStatus: function () {
        // myTimer();
        // myTimerCrtd();
        var wsUrl = urlWebservice + "CheckAppStatus";
        var myVar, reDire;
        /*$.ajax({
            url: wsUrl,
            type: "POST",
            dataType: 'json',
            data: '',
            success: function (result) {

                console.log("result>> : "+result);
                var status = result.CheckAppStatusResult[0].Status;
                //alert(status);
                console.log("Status>> : "+status);
                if(status === "Active"){
                    myVar = setInterval(myTimer, 50000);
                    xStatus = result
                    //alert(status)
                }else{
                    xStatus = result.CheckAppStatusResult[0].Status
                    var x = result.CheckAppStatusResult[0].JamOff
                    //alert(x);
                    //openDialog();
                    //clearInterval(myVar);
                    sap.m.URLHelper.redirect("Maintenance.html");
                }

                 console.log("ZStatus : "+xStatus);
            }                   
        });*/

        myVar = setInterval(myTimer, 50000);

        var oDialog = new sap.ui.commons.Dialog({
            title: "Warning...!!!",
            width: "100px",
            height: "200px",
            resizable: true
        });

        // function openDialog() {
        //     var oDialog1 = new sap.ui.commons.Dialog();
        //     oDialog1.setTitle("Notice...!!!");
        //     var oText = new sap.ui.commons.TextView({text: "Aplikasi Admin Entry Akan Dilakukan Maintenance, Silahkan selesaikan pekerjaan Anda yang belum selesai. Satu menit dari sekarang aplikasi tidak bisa di akses"});
        //     oDialog1.addContent(oText);
        //     oDialog1.addButton(
        //         new sap.ui.commons.Button({
        //             text: "OK", 
        //             press:function(){
        //             //alert("Close");
        //                 oDialog1.close();
        //             }
        //         })
        //     );
        //     oDialog1.open();
        // };

        function openDialog() {
            var msgHeader = [];
            msgItem = new Object();
            msgItem["idMessage"] = "99";
            msgItem["Value"] = "";
            msgItem["idLang"] = "en";
            msgHeader.push(msgItem);

            var objectJSON = JSON.stringify(msgHeader)

            var wsUrl = urlWebservice + "ZUX_Message_v2";

            var dialog = SAPUI.Dialog("", "Notice...!!!", "", "", true)
            var mtrx = SAPUI.Matrix("", "", false, ["auto"], 2);
            var label = SAPUI.Label("", "", "", "300px")
            var labelTimer = SAPUI.Label("", "", "", "300px")
            mtrx.createRow(label, labelTimer);
            dialog.addContent(mtrx);

            dialog.addButton(
                new sap.ui.commons.Button({
                    text: "OK",
                    press: function () {
                        dialog.close();
                    }
                })
            );

            dialog.open();

            /// Get Message Maintenance              
            $.ajax({
                url: wsUrl,
                type: 'post',
                dataType: 'json',
                data: objectJSON,
                success: function (result) {
                    console.log(JSON.stringify(result))
                    var countId = result.ZUX_Message_v2Result.length
                    if (countId > 0) {

                        label.setText(result.ZUX_Message_v2Result[0].Desc)

                        /// Get Timer
                        $.ajax({
                            url: urlWebservice + "CheckAppStatus",
                            type: "POST",
                            dataType: 'json',
                            data: '',
                            success: function (result) {
                                var jamOn = result.CheckAppStatusResult[0].JamOn;

                                var timer = Global.CountDown(jamOn, labelTimer, "webrun:C:\\FireFox\\restartFirefox.bat")
                            }
                        });
                    } else {
                        alert("failed")
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error');
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        };

        function reDirect() {
            //alert("Tes");
            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: '',
                success: function (result) {
                    //console.log("result>> : "+result);
                    var status = result.CheckAppStatusResult[0].Status;
                    console.log("Status>> : " + status);
                    if (status === "Active") {
                        clearInterval(reDire);

                        //alert(status)
                    } else {
                        //alert("Not Active")
                        sap.m.URLHelper.redirect("webrun:C:\\FireFox\\restartFirefox.bat");
                        //sap.m.URLHelper.redirect("Maintenance.html");
                    }
                }
            });
            //sap.m.URLHelper.redirect("index.html");
        }

        function myTimer() {
            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: '',
                success: function (result) {
                    //console.log("result>> : "+result);
                    var status = result.CheckAppStatusResult[0].Status;

                    console.log("Status>> : " + status);
                    if (status === "Active") {
                        //SAPUI.GetClientIP();
                        //alert(status)
                    } else {
                        //alert(status)
                        //console.log("Status>> : "+status);
                        window.localStorage.setItem("AppStatus", status);
                        openDialog();
                        clearInterval(myVar);
                        //reDire = setInterval(reDirect, 50000);
                        //alert(AppStatus);

                        //sap.m.URLHelper.redirect("index.html");
                    }
                }
            });
        }
    },
    //check koneksi sql
    CheckConSQL: function () {

        var wsUrl = urlWebservice + "CheckConSQL";
        var myVar, reDire;

        function myTimer() {
            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: '',
                success: function (result) {
                    if (result.CheckConSQLResult == "0") {
                        sap.m.URLHelper.redirect("SQLError.html");
                    }
                }
            })
        }

        myVar = setInterval(myTimer, 50000);

        function myTimer() {
            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: '',
                success: function (result) {
                    if (result.CheckConSQLResult == "0") {
                        sap.m.URLHelper.redirect("SQLError.html");
                    }
                }
            })
        }
    },
    //get IP User

    //multilanguage
    MultiLanguage: function (languageUX5, formName) {
        var wsUrl = WS_User + "WS_UC_Misc";
        var objParam = {
            language: languageUX5,
            formName: formName
        }

        pGetLang = Global.dynamicParam("GetLanguage", objParam)

        $.ajax({
            url: wsUrl,
            type: "POST",
            dataType: 'json',
            data: pGetLang,
            success: function (result) {
                var data = Global.dynamicDeserialize(result)

                for (var i = 0; i < data.length; i++) {

                    switch (data[i].controlType) {
                        case "Label":
                            SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                            break;
                        case "CheckBox":
                            SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                            break;
                        case "Title":
                            SAPUI.GetCore(data[i].controlName).setText(data[i].language)
                            break;

                        case "Panel":
                            var title = SAPUI.UTitle("", data[i].languageUX5)
                            SAPUI.GetCore(data[i].controlName).setTitle(title)
                            break;
                        case "Column":
                            var label = new sap.ui.commons.Label({ text: data[i].languageUX5, textAlign: "Center" })
                            SAPUI.GetCore(data[i].controlName).setLabel(label)
                            break;
                        case "Title":
                            if (X_VarianUX5 === '' || X_VarianUX5 === null) {
                                SAPUI.GetCore(data[i].controlName).setText(data[i].languageUX5)
                            } else {
                                SAPUI.GetCore(data[i].controlName).setText(data[i].languageUX5 + " (" + X_VarianUX5 + ")")
                            }

                            break;
                        default:
                            SAPUI.GetCore(data[i].controlName).setText(data[i].languageUX5)
                            break;
                    }
                }
            }
        });
    },
    //insert tcode
    tcodeActivity: function (Tcode) {
        var wsUrl = urlWebservice + "InsertActivity";
        var param = '{"username":"' + U5312UX5 +
            '", "tcode":"' + Tcode +
            '", "server":"' + Server1 +
            '", "IP":"' + ClientIP +
            '"}';
        console.log(param)
        $.ajax({
            url: wsUrl,
            type: 'post',
            dataType: 'json',
            data: param,
            success: function (result) {
                console.log(result)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    },
    //komponen dialog error message
    DialogErrMessage: function (result, navToPages) {
        var arrMsg = [],
            arrDiagnosis = [],
            arrProcedure = [],
            dlgErrorMessage = SAPUI.Dialog("", "", "40%", "", true),
            CC = "itux@trst.co.id"
            //department = getDepartment()

        dlgErrorMessage.attachClosed(function () {
            callbackNavToPage(navToPages)
        })

        var pnlMessage = SAPUI.Panel("", "", "auto", false, false)
        pnlMessage.setExpandable(true)
        pnlMessage.setExpanded(true)
        pnlMessage.setHeaderToolbar(new sap.m.Toolbar({
            design: sap.m.ToolbarDesign.Transparent,
            content: [/* new sap.ui.core.Icon({
                //					src : iconSrc,
                //					color: "#1a237e",
                size: "1.5rem",

            }).addStyleClass("sizeIcon"), */
            new sap.m.Title({
                text: "Message"
            }).addStyleClass("colorTitlePanel")
            ],
            active: true,
            press: function () {
                if (pnlMessage.getExpanded()) {
                    pnlMessage.setExpanded(false)

                } else {
                    pnlMessage.setExpanded(true)
                    pnlDiagnosa.setExpanded(false)
                    pnlProc.setExpanded(false)
                }

            }
        }))

        var pnlDiagnosa = SAPUI.Panel("", "", "auto", false, false)
        pnlDiagnosa.setExpandable(true)
        pnlDiagnosa.setExpanded(false)
        pnlDiagnosa.setHeaderToolbar(new sap.m.Toolbar({
            design: sap.m.ToolbarDesign.Transparent,
            content: [/* new sap.ui.core.Icon({
                src: "sap-icon://message-error",
                color: "#1a237e",
                size: "1.5rem",

            }).addStyleClass("sizeIcon"), */
            new sap.m.Title({
                text: "Diagnosa"
            }).addStyleClass("colorTitlePanel")
            ],
            active: true,
            press: function () {
                if (pnlDiagnosa.getExpanded()) {
                    pnlDiagnosa.setExpanded(false)

                } else {
                    pnlDiagnosa.setExpanded(true)
                    pnlMessage.setExpanded(false)
                    pnlProc.setExpanded(false)
                }

            }
        }))

        var pnlProc = SAPUI.Panel("", "", "auto", false, false)
        pnlProc.setExpandable(true)
        pnlProc.setExpanded(false)
        pnlProc.setHeaderToolbar(new sap.m.Toolbar({
            design: sap.m.ToolbarDesign.Transparent,
            content: [/* new sap.ui.core.Icon({
                src: "sap-icon://message-error",
                color: "#1a237e",
                size: "1.5rem",

            }).addStyleClass("sizeIcon"), */
            new sap.m.Title({
                text: "Procedure"
            }).addStyleClass("colorTitlePanel")
            ],
            active: true,
            press: function () {
                if (pnlProc.getExpanded()) {
                    pnlProc.setExpanded(false)

                } else {
                    pnlProc.setExpanded(true)
                    pnlDiagnosa.setExpanded(false)
                    pnlMessage.setExpanded(false)
                }

            }
        }))        

        if (result.length > 1) {

            separateResultToModel(result)
            ErrMsgMultiple()
            dlgErrorMessage.addContent(pnlMessage)
            dlgErrorMessage.addContent(pnlDiagnosa)
            dlgErrorMessage.addContent(pnlProc)


        } else {
            
            ErrMsgSingle()            

            if (result[0].Type != "I") {
                //					icon.setSrc(iconSrc)
                dlgErrorMessage.setTitle("Error")
                dlgErrorMessage.addContent(pnlMessage)
                dlgErrorMessage.addContent(pnlDiagnosa)
                dlgErrorMessage.addContent(pnlProc)
            } else {
                //					icon.setSrc(iconSrc)
                dlgErrorMessage.setTitle("Information")
                dlgErrorMessage.addContent(pnlMessage)
            }

        }

        function callbackNavToPage(navToPages) {
            if ((navToPages == "") || (navToPages == undefined)) {
            } else {
                var isExisthtml = navToPages.includes(".html")
                if (isExisthtml) {
                    sap.m.URLHelper.redirect(navToPages);
                } else {
                    var isPreviousPage = navToPages.includes("previousPage-")
                    if (isPreviousPage) {
                        var numBack = (navToPages.split('-').pop()) * (-1)
                        window.history.go(numBack);
                    } else {
                        if (navToPages == "previousPage") {
                            window.history.back();
                        } else if (navToPages == "refreshPage") {
                            window.location.reload();
                        } else {
                            SAPUI.Route(navToPages)
                        }
                    }
                }
            }
        }


        dlgErrorMessage.addButton(new sap.ui.commons.Button({
            text: "Accept",
            style: "Accept",
            icon: "sap-icon://accept",
            press: function () {
                dlgErrorMessage.close();

            }
        }))
        // dlgErrorMessage.addButton(new sap.ui.commons.Button({
        //     text: "Kirim Email",
        //     style: "Accept",
        //     press: function () {
        //         window.location.href = "mailto:" + department.Email +
        //             "?Subject=TRST INVENTORY : " + department.Department +
        //             "&cc=" + CC +
        //             "&body=Dear " + department.PIC + "%0D%0A";

        //     }
        // }))


        dlgErrorMessage.open()

        function separateResultToModel(result) {
            for (i = 0; i < result.length; i++) {
                arrMsg.push({
                    /* Icon: result[i].Icon,
                    No: result[i].No, */
                    Description: result[i].Description,
                })
                arrDiagnosis.push({
                    /* No: result[i].No, */
                    Diagnosis: result[i].Diagnosis,
                })
                arrProcedure.push({
                    /* No: result[i].No, */
                    Procedure: result[i].Procedure,
                })
            }
        }

        function getDepartment() {

            var wsUrl = WS_User + "WS_UC_Misc",
                Modul = "ITHelpdesk";
            pDepartment = {

                Department: Modul

            },
                pJSON = Global.dynamicParam("Support", pDepartment)


            var getDepartment = $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: "json",
                data: pJSON,
                async: false,
                success: function (result) {

                }
            }).responseJSON.WS_UC_MiscResult
            var result = JSON.parse(getDepartment);
            return result[0]
        }


        function setJumlahColumnmatrixLayout(column) {
            var jmlhColumn
            var content

            if (column == "") {
                jmlhColumn = 0
            } else {
                jmlhColumn = column
            }

            return new sap.ui.commons.layout.MatrixLayout({
                layoutFixed: false,
                width: '100%',
                columns: jmlhColumn
            })
        }

        function ErrMsgSingle() {

            var tvErrMsg = SAPUI.TextView("", "", "", "auto", true).setText(result[0].Message),
                tvDiagnosis = SAPUI.TextView("", "", "", "auto", true).setText(result[0].Diagnosis),
                tvProcedur = SAPUI.TextView("", "", "", "auto", true).setText(result[0].Procedure),

                /* iconNotify = new sap.ui.commons.Image({
                    src: "asset/icon/" + result[0].Icon + ".png"
                }), */
                mError, mDiagnosis, mProcedure
                // mError = setJumlahColumnmatrixLayout(2).createRow(iconNotify, tvErrMsg)
                /* mError = new sap.ui.commons.layout.MatrixLayout({
                    // id: pID,
                    // width: pWidth,
                    // layoutFixed: pLayoutFixed,
                    // widths: ["9%","91%"],
                    widths: ["9%","91%"],
                    columns: 2
                })//.createRow(iconNotify, tvErrMsg)
                .createRow("", tvErrMsg) */
            mError = setJumlahColumnmatrixLayout().createRow(tvErrMsg)
            mDiagnosis = setJumlahColumnmatrixLayout().createRow(tvDiagnosis)
            mProcedure = setJumlahColumnmatrixLayout().createRow(tvProcedur)
            pnlMessage.addContent(mError)
            pnlDiagnosa.addContent(mDiagnosis)
            pnlProc.addContent(mProcedure)

        }

        function ErrMsgMultiple() {
            var modelMsg = new sap.ui.model.json.JSONModel(),
                modelDgns = new sap.ui.model.json.JSONModel(),
                modelProc = new sap.ui.model.json.JSONModel(),
                dlgProcedure = SAPUI.Dialog("", "Detail", "30%", "50%", true)

            var tblMsgList = SAPUI.Table("", "100%", 0, "Single", "Paginator", false),
                clMark = SAPUI.Column("Mark", "IconImageByData", "Icon", "22%", "Center", "Center", "", "", {
                    colTarget: "Icon",
                    data: [
                        { "error": "error" }, //Path Icon: WebContent/asset/icon
                        { "informasi": "informasi" },
                        { "informasi2": "informasi2" },
                        { "warning": "warning" },
                    ]
                });
            clmnItem1 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center"),
                clmnPesan = SAPUI.Column("Pesan", "TextView", "Desc", "100%", "Center", "Center")
            tblMsgList.addColumn(clMark)
            tblMsgList.addColumn(clmnItem1)
            tblMsgList.addColumn(clmnPesan)

            var tblDgnsList = SAPUI.Table("", "100%", 0, "Single", "Paginator", false),
                clmnItem2 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center", ""),
                clmnPesan = SAPUI.Column("Diagnosis", "TextView", "Diagnosis", "100%", "Center", "Center", "")
            tblDgnsList.addColumn(clmnItem2)
            tblDgnsList.addColumn(clmnPesan)

            var tblProcList = SAPUI.Table("", "auto", 0, "Single", "Paginator", false),
                clmnItem3 = SAPUI.Column("Item", "TextView", "No", "21%", "Center", "Center", ""),
                clmnProcedure = SAPUI.Column("Procedure", "TextView", "Procedure", "100%", "Center", "Center", "")

            tblProcList.addColumn(clmnItem3)
            tblProcList.addColumn(clmnProcedure)

            tblMsgList.setModel(modelMsg)
            tblDgnsList.setModel(modelDgns)
            tblProcList.setModel(modelProc)

            modelMsg.setData({ Message: arrMsg })
            modelDgns.setData({ Diagnosa: arrDiagnosis })
            modelProc.setData({ Procedure: arrProcedure })


            tblMsgList.bindRows("/Message")
            tblDgnsList.bindRows("/Diagnosa")
            tblProcList.bindRows("/Procedure")
            tblMsgList.setVisibleRowCount(tblMsgList.getModel().getData().Message.length)
            tblDgnsList.setVisibleRowCount(tblDgnsList.getModel().getData().Diagnosa.length)
            tblProcList.setVisibleRowCount(tblProcList.getModel().getData().Procedure.length)
            pnlMessage.addContent(tblMsgList)
            pnlDiagnosa.addContent(tblDgnsList)
            pnlProc.addContent(tblProcList)

            tblProcList.attachRowSelectionChange(function () {
                var idx = this.getSelectedIndex()

                if (this.isIndexSelected(idx)) {
                    var cxt = this.getContextByIndex(idx);
                    var path = cxt.sPath;
                    var obj = this.getModel().getProperty(path);

                    alert(obj.Procedure)
                }

            })

        }

    },

    //komponen dialog error message 
	DialogErrMessage2:function(result, fn, param, idView){
		console.log(result)
		
		var arrMsg = [], arrDiagnosis = [], arrProcedure = [],
        dlgErrorMessage = SAPUI.Dialog("", "", "400px", "", true);

        dlgErrorMessage.setShowCloseButton(false);

        if(result[0].Type.replace(/\n/g, '').trim() == "E"){
            dlgErrorMessage.addStyleClass('DialogStyleErr')
        }
        else if(result[0].Type.replace(/\n/g, '').trim() == "W"){
            dlgErrorMessage.addStyleClass('DialogStyleWarn')
        }
        
        ErrMsgSingle()
	  
		function callbackOK(fn, idView){
        
			console.log(fn)
			if((fn == "") || (fn == undefined)){
				dlgErrorMessage.close(); 
			}else{
                var oController = sap.ui.getCore().byId(idView).getController();
                dlgErrorMessage.close(); 
				oController[fn](param);
			}
		}
        
        var btnOK = SAPUI.Button("", "OK", "", "", "Gray", "80px", "22px");
        dlgErrorMessage.addButton(btnOK);
        btnOK.attachPress(function() {
            callbackOK(fn, idView);
        });
    			
    	dlgErrorMessage.open()  
    	
    	function separateResultToModel(result){
			for(i=0;i<result.length;i++){
				arrMsg.push({
					Icon:result[i].Icon,
					No:result[i].No,
					Message:result[i].Message, 
				})
				arrDiagnosis.push({
					No:result[i].No,
					Diagnosis:result[i].Diagnosis, 
				})
				arrProcedure.push({
					No:result[i].No,
					Procedure:result[i].Procedure, 
				})
			}			 			
        }	
        
        function ErrMsgSingle(){
			var tvErrMsg		=SAPUI.TextView("", "error", "", "auto", true).setText(result[0].Message).addStyleClass("LabelStyle"),  
				tvDiagnosis		=SAPUI.TextView("", "salah", "", "auto", true).setText(result[0].Diagnosis).addStyleClass("LabelStyle"), 
				tvProcedur		=SAPUI.TextView("", "benerin", "", "auto", true).setText(result[0].Procedure).addStyleClass("LabelStyle");
            var tvLblDiagnosis  =SAPUI.TextView("", "Diagnosis", "", "auto", true).addStyleClass("LabelStyle"),
                tvLblProcedure  =SAPUI.TextView("", "Procedure", "", "auto", true).addStyleClass("LabelStyle");

                tvLblDiagnosis.setDesign(sap.ui.commons.TextViewDesign.Bold);
                tvLblProcedure.setDesign(sap.ui.commons.TextViewDesign.Bold);

                var line1 = SAPUI.Line();
                var line2 = SAPUI.Line();
				var mtrError = SAPUI.Matrix("", "auto", false, [], 1);
                mtrError.createRow(tvErrMsg);
                mtrError.createRow("");
                mtrError.createRow("");
                var mtrDiagnosis = SAPUI.Matrix("", "100%", false, [], 1); 
                mtrDiagnosis.createRow(tvLblDiagnosis);
                // mtrDiagnosis.createRow(line1);
                mtrDiagnosis.createRow(tvDiagnosis);
                mtrDiagnosis.createRow("");
                
                var mtrProcedure = SAPUI.Matrix("", "100%", false, [], 1);
                mtrProcedure.createRow(tvLblProcedure);
                // mtrProcedure.createRow(line2);
                mtrProcedure.createRow(tvProcedur);
                mtrProcedure.createRow("");

                dlgErrorMessage.addContent(mtrError)
                dlgErrorMessage.addContent(mtrDiagnosis)
                dlgErrorMessage.addContent(mtrProcedure)

                console.log(result[0].Type)

                if(result[0].Type.replace(/\n/g, '').trim() == "I" ){
                    dlgErrorMessage.setTitle("Information");
                } else if (result[0].Type.replace(/\n/g, '').trim() == "W") {
                    dlgErrorMessage.setTitle("Warning");
                } else {
                    dlgErrorMessage.setTitle("Error");
                }
		}
	},
    /* 3 juli 2018 (Revisi 21 Januari 2020)
     * error message FINAL untuk yang menggunakan id message
     * pIdError (string) -> id error message di table ZUX_message
     * pAdditionalValue (string) -> additional value yang digunakan untuk mengganti karakter & di desc error message
     * */
    ErrorMessageView: async function (pIdError, pAdditionalValue, navToPages) {
        var wsUrl = WS_SY + "WS_UC_ErrorMessageView"
    	var languageUX = "EN"
    	var modul = "MM"
        var CC = "itux@trst.co.id"
        
        console.log(pIdError)
        if(pIdError == ""){
            //alert("ID kosong")
            SAPUI.MessageDialog({
                Type: "E",
                Message: "ID kosong.",
            })
        }
        
    	console.log(pAdditionalValue)
    	if(pAdditionalValue != undefined || pAdditionalValue != "" ){
    		/* if(pAdditionalValue.length > 1){ 
    			pAdditionalValue = pAdditionalValue.join("+")
    		}else{
    			pAdditionalValue = pAdditionalValue+"+"
            } */
            pAdditionalValue = pAdditionalValue+"+"
    	} else {
    		pAdditionalValue = ""
    	}
    	console.log(pAdditionalValue)
    	
    	var errMsg = {
    			idMessage	:pIdError,
    			idLang		:languageUX,
    			Value		:pAdditionalValue,
    			Department	:modul
    	}
    	console.log(errMsg)

    	var pErrMsg = Global.dynamicParam("ErrorMessageView", errMsg) 
    	    	
    	var getErrorMsg = $.ajax({
    		url		: wsUrl,
    		type	: "POST",
    		dataType: "json",
    		data	: pErrMsg,
    		async	: false,
    		success	: function (result) {
    	  
    		},
    		error: function(jqXHR, textStatus, errorThrown) {
                SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
            }
    	}).responseJSON    	
    	
    	var result = Global.dynamicDeserialize(getErrorMsg);
    	console.log(result)
    	if(result[0].length == 0){ 
    	}else{
    		result[0].forEach(function(item){

    			for(var key in item){

    				if(key=="Desc" || key=="Diagnosis" || key=="Procedure" ){ 

    					item[key]=stringNewLine(item[key])	

                        if (item[key] == "") {
                            item[key] = "-";
                        }
    				} 
    			}
 
            })   
            console.log(result[0])
    		SAPUI.DialogErrMessage(result[0],navToPages)
    	}
    	
    	//replace string &br dijadikan new line ("\n")
    	function stringNewLine(result){
    		var finalResult = ""
            if (result == null) result = ""; 

            var isExistBr = result.includes("&br")


            if(isExistBr == true){
                var splitResult = result.split("&br")
                for (var i = 0; i < splitResult.length; i++) {
                    finalResult = finalResult + splitResult[i] + "\n"    
                }
                // var result1 = splitResult[0]
                // var result2 = splitResult[1]
                // finalResult = result1 +"\n"+result2
            }else{
                finalResult = result
            }
    		return finalResult
    	}
    },

    ErrorMessageView2: async function (pIdError, pAdditionalValue, navToPages) {
        // Eksekusi dapatkan error message
        if ((pAdditionalValue != undefined) || (pAdditionalValue != "")) {
            if (pAdditionalValue.length > 1) {
                pAdditionalValue = pAdditionalValue.join("+")
            } else {
                pAdditionalValue = pAdditionalValue + "+"
            }
        } else {
            pAdditionalValue = ""
        }

        var wsUrl = WS_SY + "WS_UC";
		var param = {
            idMessage: pIdError,
            idLang: 'EN',
        }

		var pAjax = Global.dynamicParam("DisplayMessage", param)

        $.ajax({
			url: wsUrl,
			type: "POST",
			dataType: 'json',
			data: pAjax,
			success: function (result) {
				var deserilizeResult = Global.dynamicDeserialize(result)

				if (deserilizeResult[0].length == 0) { } else {
                    deserilizeResult[0].forEach(function (item) {
                        item.idMessage = pIdError
                    })
                    //SAPUI.DialogErrMessage(result[0], navToPages)
                    SAPUI.MessageDialog(deserilizeResult[0][0])
                }
			},
			error: function (jqXHR, textStatus, errorThrown) {
				SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown)
			}
		})
    },
    /**
     * function untuk menghandle error message dari SP 
     * result -> JSON deserilize result 
     * navToPages -> parameter untuk mengisi ke halaman mana ketika tombol OK ditekan
     */
    ErrorMessageDB: function (result, navToPages) {
        console.log("ENTER ErrorMessageDB", result)

        if (result[0].length == 0) {
            SAPUI.ErrorMessageView("SY020", [])
        } else {

            //get nama kolom ke 0
            //check obj Name untuk menentukan apakah masuk error message apa tidak
            var checkObjName = Object.keys(result[0][0])[0],

                filteredErrMsg = [],
                filteredList = []
            arrreplace = [],
                finalReplace = [],
                language = "EN"

            //cek jika kolom ke 0 adalah idMessage 
            if (checkObjName == "idMessage") {

                //cek & filter error message sesuai dengan bahasa yang dipilih
                for (i = 0; i < result[0].length; i++) {
                    //get value from key idLang [1]
                    var checkObjValue = Object.values(result[0][i])[1]

                    if (checkObjValue == language) {
                        filteredErrMsg.push(result[0][i])
                    }
                }
                //push hasil error message ke array agar bisa di foreach 
                filteredErrMsg.forEach(function (item) {

                    for (var key in item) {
                        if (key == "Desc" || key == "Procedure" || key == "Diagnosis") {
                            var value = item[key]
                            if (value != null) {
                                value = stringNewLine(item[key]) 
                            }
                            item[key] = value
                        }


                    }

                })
                SAPUI.DialogErrMessage(filteredErrMsg, navToPages)

                return false


            } else {

                return true
            }
        }

        function stringNewLine(result) {

            var finalResult = ""

            var isExistBr = result.includes("&br")

            if (isExistBr == true) {

                var splitResult = result.split("&br")

                var result1 = splitResult[0],

                    result2 = splitResult[1]

                finalResult = result1 + "\n" + result2
            } else {

                finalResult = result
            }

            return finalResult


        }


    },

    ErrorMessageDB2:function(result, fn, param, idView){
		console.log("ENTER ErrorMessageDB", result)
		 
		if(result[0].length==0){
			SAPUI.ErrorMessageView("SY020",[])
		}else{

			//get nama kolom ke 0
			//check obj Name untuk menentukan apakah masuk error message apa tidak
			var checkObjName=Object.keys(result[0][0])[0],

			filteredErrMsg=[],
			filteredList=[]
			arrreplace	=[],
			finalReplace=[],
			language	="EN"

				//cek jika kolom ke 0 adalah idMessage 
				if(checkObjName=="idMessage"){

					//cek & filter error message sesuai dengan bahasa yang dipilih
					for(i=0;i<result[0].length;i++){ 
						//get value from key idLang [1]
						var checkObjValue= Object.values(result[0][i])[1].replace(/\n/g, '')

						if(checkObjValue.trim()===language.trim()){
							filteredErrMsg.push(result[0][i]) 
						} 
					}  
					//push hasil error message ke array agar bisa di foreach 
					filteredErrMsg.forEach(function(item){

						for(var key in item){ 
							if(key=="Message" || key=="Procedure" || key=="Diagnosis"){ 

								item[key]=stringNewLine(item[key])	

                                if (item[key] == "") {
                                    item[key] = "-";
                                }
							}


						}

					})   
					SAPUI.DialogErrMessage2(filteredErrMsg, fn, param, idView) 

					return false
				}else{
					return true
				} 
        }
        
		function stringNewLine(result){

            var finalResult=""
            
            if (result == null) result = ""; 

				var isExistBr=result.includes("&br") 

				if(isExistBr==true){

                    var splitResult=result.split("&br")
                    for (var i = 0; i < splitResult.length; i++) {
                        finalResult = finalResult + splitResult[i] + "\n"    
                    }
					// var result1=splitResult[0],

					// result2=splitResult[1]

					// finalResult=result1 +"\n"+result2
				}else{

					finalResult=result
				} 

			return finalResult
		}
    },

    //screen varian
    ScreenVarian: function (tcode, screen) {
        if (tcode != null) {
            console.log(tcode, screen)
            // set screen varian
            // var tcode = tcodeSessionUX5;

            var wsUrl = WS_User + "WS_UC_Misc";

            var objParamUCVariant = {
                Tcode: tcode,
                ScreenNumber: screen
            };

            var dynamicParamDev = Global.dynamicParam("DspScreenVariant", objParamUCVariant);
            console.log(dynamicParamDev)

            $.ajax({
                url: wsUrl,
                type: "POST",
                dataType: 'json',
                data: dynamicParamDev,
                success: function (result) {
                    var resultParse = Global.dynamicDeserialize(result);
                    console.log(resultParse[0])

                    for (i = 0; i < resultParse[0].length; i++) {
                        idComponen = SAPUI.GetCore(resultParse[0][i].IDComponent);

                        //  					console.log(resultParse[i])

                        switch (resultParse[0][i].ComponentType) {
                            case "RadioButton":
                                idComponen.setSelectedIndex(parseInt(resultParse[0][i].Value));
                                break;
                            case "CheckBox":
                                idComponen.setChecked(resultParse[0][i].Value == "true");
                                break;
                            case "Label":
                                idComponen.setText(resultParse[0][i].Value);
                                break;
                            case "Button":
                                idComponen.setText(resultParse[0][i].Value);
                                break;
                            case "TextField":
                                idComponen.setValue(resultParse[0][i].Value);
                                break;
                            case "ValueHelpField":
                                idComponen.setValue(resultParse[0][i].Value);
                                break;
                            default:

                        }

                        //  					var Editable

                        if (resultParse[0][i].ComponentType == "Label") {
                            idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                        } else if (resultParse[0][i].ComponentType == "Button") {
                            idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                            idComponen.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                        } else if (resultParse[0][i].ComponentType == "Panel") {
                            idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                        } else if (resultParse[0][i].ComponentType == "Column") {
                            var idComponen2 = idComponen.getTemplate();
                            idComponen2.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                            idComponen2.setEditable((resultParse[0][i].Editable).toLowerCase() == 'true');
                            idComponen.setTemplate(idComponen2);
                        } else {
                            //  						console.log(resultParse[0][i].Editable.toLowerCase())
                            //  						console.log((resultParse[0][i].Editable).toLowerCase()=='true')
                            idComponen.setEditable((resultParse[0][i].Editable).toLowerCase() == 'true');
                            idComponen.setEnabled((resultParse[0][i].Enable).toLowerCase() == 'true');
                            idComponen.setVisible((resultParse[0][i].Visible).toLowerCase() == 'true');
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    loading.close()
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            });
        }
    },
    //        var wsUrl = urlWebservice + "GetVarianTCode";
    //        var idComponen;
    //        $.ajax({
    //            type: "POST",
    //            url: wsUrl,
    //            contentType: "text/plain, charset=utf-8",
    //            dataType: "json",
    //            crossDomain: true,
    //            data:  '{tcode:"'+tcode+'", screen:"'+screen+'"}',
    //            success: function (result) {
    //            	console.log(result)
    //                for (i = 0 ; i < result.GetVarianTCodeResult.length ; i++) {
    //                    idComponen = SAPUI.GetCore(result.GetVarianTCodeResult[i].idcomp);
    //                    
    //                    console.log(result.GetVarianTCodeResult[i])
    //
    //                    switch(result.GetVarianTCodeResult[i].componentType) {
    //                    case "RadioButton":
    //                        idComponen.setSelectedIndex(parseInt(result.GetVarianTCodeResult[i].value));
    //                        break;
    //                    case "CheckBox":
    //                        idComponen.setChecked(result.GetVarianTCodeResult[i].value == "true");
    //                        break;
    //                    case "Label":
    //                        idComponen.setText(result.GetVarianTCodeResult[i].value);
    //                        break;
    //                    case "Button":
    //                        idComponen.setText(result.GetVarianTCodeResult[i].value);
    //                        break;
    //                    case "TextField":
    //                        idComponen.setValue(result.GetVarianTCodeResult[i].value);
    //                        break;
    //                    case "ValueHelpField":
    //                        idComponen.setValue(result.GetVarianTCodeResult[i].value);
    //                        break;
    //                    default:
    //
    //                    } 
    //
    //                    if(result.GetVarianTCodeResult[i].componentType == "Label") {
    //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
    //                    } else if (result.GetVarianTCodeResult[i].componentType == "Button") {
    //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
    //                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);   
    //                    } else if (result.GetVarianTCodeResult[i].componentType == "Panel") {
    //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible); 
    //                    }
    //                    else {
    //                    	idComponen.setEditable(result.GetVarianTCodeResult[i].editable);
    //                        idComponen.setEnabled(result.GetVarianTCodeResult[i].enable);                           
    //                        idComponen.setVisible(result.GetVarianTCodeResult[i].visible);
    //                    }                       
    //                }                    
    //            },
    //            error: function(jqXHR, textStatus, errorThrown) {
    //                console.log('Error');
    //                console.log(jqXHR);
    //                console.log(textStatus);
    //                console.log(errorThrown);
    //            }
    //        })
    //    },
    //komponen Toolbar
    Toolbar: function (pID, pWidth, pDesign, pStandalone) {
        var ppDesign;

        switch (pDesign) {
            case "Flat":
                ppDesign = sap.ui.commons.ToolbarDesign.Flat;
                break;
            case "Standard":
                ppDesign = sap.ui.commons.ToolbarDesign.Standard;
                break;
            case "Transparent":
                ppDesign = sap.ui.commons.ToolbarDesign.Transparent;
                break;
            default:
                ppDesign = sap.ui.commons.ToolbarDesign.Transparent;
        }

        return new sap.ui.commons.Toolbar({
            id: pID,
            width: pWidth,
            design: ppDesign,
            standalone: pStandalone
        })
    },
    //messagebox success
    MessageBoxSuccess: function (pMessage) {
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.success(pMessage)
    },
    //messagebox alert
    MessageBoxAlert: function (pMessage) {
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.alert(pMessage)
    },
    MessageBoxError: function (pMessage) {
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.error(pMessage)
    },
    MessageBoxWarning: function (pMessage) {
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.warning(pMessage)
    },
    //messagebox confirm
    MessageBoxConfirm: function (pMessage, pHeader, fnCallbackConfirm) {
        // sap.m.MessageBox.confirm(pMessage, fnCallbackConfirm, pHeader);
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.confirm(pMessage, {
            title: "Confirm", // default
            onClose: null,
            styleClass: "sapUiSizeCompact",
            initialFocus: null,
            textDirection: sap.ui.core.TextDirection.Inherit,
            actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
            onClose: fnCallbackConfirm
            // onClose: function(oAction) {
            //     if (oAction == "YES") {
            //         alert("tes")
            //     }else{
            //         alert("no")
            //     }
            // } 
        });
    },
    //messagebox Show
    MessageBoxShow: function (pMessage, pHeader, fnCallbackConfirm, pIcon) {
        var ppIcon;

        switch (pStyle) {
            case "Error":
                ppIcon = sap.ui.commons.MessageBox.Icon.ERROR;
                break;
            case "Information":
                ppIcon = sap.ui.commons.MessageBox.Icon.INFORMATION;
                break;
            case "None":
                ppIcon = sap.ui.commons.MessageBox.Icon.NONE;
                break;
            case "Question":
                ppIcon = sap.ui.commons.MessageBox.Icon.QUESTION;
                break;
            case "Succes":
                ppIcon = sap.ui.commons.MessageBox.Icon.SUCCESS;
                break;
            case "Warning":
                ppIcon = sap.ui.commons.MessageBox.Icon.WARNING;
                break;
            case "Critical":
                ppIcon = sap.ui.commons.MessageBox.Icon.CRITICAL;
                break;
            default:
                ppIcon = sap.ui.commons.MessageBox.Icon.QUESTION;
        }

        jQuery.sap.require("sap.ui.commons.MessageBox");
        sap.ui.commons.MessageBox.show(
            pMessage,
            ppIcon,
            pHeader, [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
            fnCallbackMessageBox,
            sap.ui.commons.MessageBox.Action.YES
        );
        // function openMessageBox() {
        //     jQuery.sap.require("sap.m.MessageBox");
        //          sap.m.MessageBox.show(
        //           "Please Confirm to Submit", {
        //              icon: sap.m.MessageBox.Icon.INFORMATION,
        //              title: "Dear User",
        //            actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        //            onClose: function(oAction){
        //            if(oAction === sap.m.MessageBox.Action.YES){
        //            alert("YES");
        //            }

        //            },
        //            }
        //          );
        //     }

        //     // to call the above function, we create a simple button
        //     new sap.m.Button({text:"Show MessageBox", press : openMessageBox}).placeAt("content");
    },
    //message box 
    MessageBox: function (pMessageEn, pMessageIn, pStyle, pHeader) {
        if (languageUX5 == "en")
            sap.ui.commons.MessageBox.show(pMessageEn, pStyle, pHeader);
        else
            sap.ui.commons.MessageBox.show(pMessageIn, pStyle, pHeader);
    },
    //tab strip
    TabStrip: function (pID, pHeight, pWidth, pSelectedIndex) {
        return new sap.ui.commons.TabStrip({
            id: pID,
            height: pHeight,
            width: pWidth,
            selectedIndex: pSelectedIndex
        })
    },
    Tab: function (pID, pText) {
        return new sap.ui.commons.Tab({
            id: pID,
            text: pText
        })
    },
    /* Image: function (pSrc, pWdth, pHeight, pDecorative, pAlt) {
        return new sap.ui.commons.Image({
            src: pSrc,
            width: pWdth,
            height: pHeight,
            decorative: pDecorative,
            alt: pAlt,
        })
    }, */
    Image: function (pSrc, pWidth, pHeight, pDecorative, pAlt, pID) {
        return new sap.m.Image({
            id: pID,
            src: pSrc,
            width: pWidth,
            height: pHeight,
            decorative: pDecorative,
            alt: pAlt,
        })
    },
    Carousel: function (pID, pWdth, pHeight, pPage) {
        return new sap.m.Carousel({
            id: pID,
            width: pWdth,
            height: pHeight,
            pages: pPage,
        })
    },
    Link: function (pText, pTooltip, pHref) {
        return new sap.ui.commons.Link({
            text: pText,
            tooltip: pTooltip,
            href: pHref
        })
    },
    CheckBox: function (pID, pText, pTooltip, pChecked) {
        return new sap.ui.commons.CheckBox({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            checked: pChecked
        });
    },
    CheckBoxM: function (pID, pText, pTooltip, pSelected) {
        return new sap.m.CheckBox({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            selected: pSelected
        });
    },
    PasswordField: function (pID, pWidth) {
        return new sap.ui.commons.PasswordField({
            id: pID,
            width: pWidth
        });
    },
    RadioButton: function (pID, pText, pTooltip, pGroupName) {
        return new sap.ui.commons.RadioButton({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            groupName: pGroupName
        })
    },
    RadioButtonGroup: function (pID, pWidth, pColumns, pSelectedIndex) {
        return new sap.ui.commons.RadioButtonGroup({
            id: pID,
            width: pWidth,
            columns: pColumns,
            selectedIndex: pSelectedIndex
        })
    },
    ItemRDB: function (pID, pText, pTooltip, pKey) {
        return new sap.ui.core.Item({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            key: pKey
        });
    },
    Item: function (pText, pTooltip, pKey) {
        return new sap.ui.core.Item({
            text: pText,
            tooltip: pTooltip,
            key: pKey
        });
    },
    TextArea: function (pID, pValue, pTooltip, pCols, pRows) {
        return new sap.m.TextArea({
            id: pID,
            value: pValue,
            tooltip: pTooltip,
            cols: pCols,
            rows: pRows
        });
    },
    ComboBox: function (pID, pWidth, pPlaceholder) {
        return new sap.m.ComboBox({
            id: pID,
            width: pWidth,
            placeholder: pPlaceholder,
            //displaySecondaryValues: true
        }).addStyleClass("sapUiSizeCompact")
    },
    HorizontalDivider: function () {
        return new sap.ui.commons.HorizontalDivider({ type: "Page" });
    },
    HorizontalLayout: function (pID, pWidth) {
        return new sap.ui.layout.HorizontalLayout({ 
            id: pID,
            width: pWidth
        });
    },
    Dialog: function (pID, pTitle, pWidth, pHeight, pModal) {
        return new sap.ui.commons.Dialog({
            id: pID,
            title: pTitle,
            width: pWidth,
            height: pHeight,
            modal: pModal,
            resizable: false
        });
    },
    DialogM: function (pID, pTitle, pWidth, pHeight) {
        return new sap.m.Dialog({
            id: pID,
            title: pTitle,
            width: pWidth,
            height: pHeight,
            resizable: false
        });
    },

    MessageDialog: function (messagedata, redirect, location) {
        // Functions
        // 1. Replace string &br dijadikan new line ("\n")
        function stringNewLine(result) {
            var finalResult = ""
            if ((result != '') && (result != undefined) && (result != null)) {
                var isExistBr = result.includes("&br")
                if (isExistBr == true) {
                    var splitResult = result.split("&br")
                    var result1 = splitResult[0]
                    var result2 = splitResult[1]
                    finalResult = result1 + "\n" + result2
                } else {
                    finalResult = result
                }
            }            
            return finalResult
        }
        
        // - Deklarasi komponen -
        var dlgMessage = SAPUI.Dialog('', "", "auto", "auto", true)
        var mtrMessage = SAPUI.Matrix('', 'auto', true, ["100px","150px"], 2)
        var tvHeadMessage = new SAPUI.TextView('', 'Message', '', 'auto',false).setDesign(sap.ui.commons.TextViewDesign.Bold)
        var tvHeadDiagnosis = new SAPUI.TextView('', 'Diagnosis', '', 'auto',false).setDesign(sap.ui.commons.TextViewDesign.Bold)
        var tvHeadProcedure = new SAPUI.TextView('', 'Procedure', '', 'auto',false).setDesign(sap.ui.commons.TextViewDesign.Bold)
        var tvBodyMessage = new SAPUI.TextView('', '', '', 'auto',false)
        var tvBodyDiagnosis = new SAPUI.TextView('', '', '', 'auto',false)
        var tvBodyProcedure = new SAPUI.TextView('', '', '', 'auto',false)
        var btnOk = new SAPUI.Button('', 'Ok', '', 'sap-icon://accept', false, 'Accept')

        // - Deklarasi event button -
        btnOk.attachPress(function () {
            dlgMessage.close()
            if (redirect) {
                
                if ((location != '') && (location != undefined)) {
                    sap.m.URLHelper.redirect(location);
                } else {
                    window.history.back();
                }
            }    
        })
        // - End deklarasi event button -

        // - Deklarasi event dialog -
        dlgMessage.attachClosed(function () {
            if (redirect) {
                if ((location != '') && (location != undefined)) {
                    sap.m.URLHelper.redirect(location);
                } else {
                    window.history.back();
                }
            }   
        })
        // - End deklarasi event dialog -
        
        // - Proses isi dan tampilkan message - 
        var type = messagedata.Type
        var message = stringNewLine(messagedata.Message)
        var diagnosis = stringNewLine(messagedata.Diagnosis)
        var procedure = stringNewLine(messagedata.Procedure)
        tvBodyMessage.setText(message)
        tvBodyDiagnosis.setText(diagnosis)
        tvBodyProcedure.setText(procedure)

        // - Susun dialog notification -
        if (type == 'I') {
            dlgMessage.setTitle('Information')
        } else {
            dlgMessage.setTitle('Error')
        }
        
        if (message) {
            mtrMessage.createRow(tvHeadMessage)
            mtrMessage.createRow(tvBodyMessage)
        }
        if (diagnosis) {
            mtrMessage.createRow("")
            mtrMessage.createRow(tvHeadDiagnosis)
            mtrMessage.createRow(tvBodyDiagnosis)
        }
        if (procedure) {
            mtrMessage.createRow("")
            mtrMessage.createRow(tvHeadProcedure)
            mtrMessage.createRow(tvBodyProcedure)
        }
        dlgMessage.addContent(mtrMessage)
        dlgMessage.addButton(btnOk)

        dlgMessage.open()
    },
    
    /**
     * Crete onExec funvtion in your controller to catch callback 
     * @param  {} fnCallback : function => will retur rValue (boolean)
     * @param  {} title : string
     * @param  {} msg : string
     */
    ConfirmExec: function(fnCallback, title = "Execution Confirmation", msg = "Apakah anda yakin ?"){
        return sap.ui.commons.MessageBox.confirm(msg, fnCallback, title)
        // return dialog
    },
    Panel: function (pID, pTitle, pWidth, pExpandable, pExpanded) {
        pWidth = (pWidth != "", "100%", pWidth);

        return new sap.m.Panel({
            id: pID,
            width: pWidth,
            expandable: pExpandable,
            expanded: pExpanded,
            expandAnimation: true,
            busyIndicatorDelay: 0,
            backgroundDesign: sap.m.BackgroundDesign.Translucent,
            headerText: pTitle


        }).addStyleClass("sapMPanelIsi");
    },
    PanelM: function (pID, pHeaderText, pWidth, pExpandable, pExpanded, pBackgroundDesign, pContent) {
        var ppBackgroundDesign;

        switch (pBackgroundDesign) {
            case "Solid":
                ppBackgroundDesign = sap.m.BackgroundDesign.Solid;
                break;
            case "Translucent":
                ppBackgroundDesign = sap.m.BackgroundDesign.Translucent;
                break;
            case "Transparent":
                ppBackgroundDesign = sap.m.BackgroundDesign.Transparent;
                break;
            default:
                ppBackgroundDesign = sap.m.BackgroundDesign.Translucent;
        }

        return new sap.m.Panel({
            id: pID,
            width: pWidth,
            expandable: pExpandable,
            expanded: pExpanded,
            backgroundDesign: ppBackgroundDesign,
            headerText: pHeaderText,
            content: pContent
        });
    },
    Matrix: function (pID, pWidth, pLayoutFixed, pWidths, pColumns) {
        return new sap.ui.commons.layout.MatrixLayout({
            id: pID,
            width: pWidth,
            layoutFixed: pLayoutFixed,
            widths: pWidths,
            columns: pColumns
        })
    },
    MatrixLayoutRow: function () {
        return new sap.ui.commons.layout.MatrixLayoutRow();
    },
    MatrixLayoutCell: function () {
        return new sap.ui.commons.layout.MatrixLayoutCell();
    },
    ScrollContainer: function (pID, pWidth, pHeight) {
        return new sap.m.ScrollContainer({
            id: pID,
            width       : pWidth,
            height      : pHeight,
            vertical    : true,
            horizontal  : true,
			focusable   : true,
        });
    },
    Label: function (pID, pText, pDesign, pWidth) {
        var ppDesign;
        //ppDesign = (pDesign == "", ppDesign=sap.ui.commons.LabelDesign.Standard, sap.ui.commons.LabelDesign.Bold);
        switch (pDesign) {
            case "Bold":
                ppDesign = sap.ui.commons.LabelDesign.Bold;
                break;
            default:
                ppDesign = sap.ui.commons.LabelDesign.Standard;
        }

        return new sap.ui.commons.Label({
            id: pID,
            text: pText,
            design: ppDesign,
            width: pWidth
        })
    },
    Label: function(pID, pText, pDesign, pWidth){
        var ppDesign;
        //ppDesign = (pDesign == "", ppDesign=sap.ui.commons.LabelDesign.Standard, sap.ui.commons.LabelDesign.Bold);
        switch(pDesign) {         
        case "Bold":
            ppDesign = sap.ui.commons.LabelDesign.Bold;
            break;
        default:
            ppDesign = sap.ui.commons.LabelDesign.Standard;
        } 

        return new sap.ui.commons.Label({
            id: pID,
            text: pText,
            design : ppDesign,
            width: pWidth
        })
    },
    Label2: function(pID, pText, pDesign, pWidth){
        var ppDesign;
        //ppDesign = (pDesign == "", ppDesign=sap.ui.commons.LabelDesign.Standard, sap.ui.commons.LabelDesign.Bold);
        switch(pDesign) {         
        case "Bold":
            ppDesign = sap.ui.commons.LabelDesign.Bold;
            break;
        default:
            ppDesign = sap.ui.commons.LabelDesign.Standard;
        } 

        return new sap.ui.commons.Label({
            id: pID,
            text: pText,
            design : ppDesign,
            width: pWidth
        }).addStyleClass("LabelStyle")
    },
    Button: function (pID, pText, pTooltip, pIcon, pLite, pStyle) {
        var ppStyle;

        switch (pStyle) {
            case "Accept":
                ppStyle = sap.ui.commons.ButtonStyle.Accept;
                break;
            case "Default":
                ppStyle = sap.ui.commons.ButtonStyle.Default;
                break;
            case "Emph":
                ppStyle = sap.ui.commons.ButtonStyle.Emph;
                break;
            case "Reject":
                ppStyle = sap.ui.commons.ButtonStyle.Reject;
                break;
            default:
                ppStyle = sap.ui.commons.ButtonStyle.Default;
        }

        return new sap.ui.commons.Button({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            icon: pIcon,
            lite: pLite,
            style: ppStyle
        });
    },
    ButtonToolbar: function (pID, pText, pTooltip, pIcon, pType) {
        return new sap.m.Button({
            id: pID,
            text: pText,
            tooltip: pTooltip,
            icon: pIcon,
            type: pType,
        });
    },
    ToolbarM: function (pID) {
        return new sap.m.Toolbar({
            id: pID,
            enabled: true,
            content: [
                new sap.m.ToolbarSpacer()
            ]
        });
    },
    ButtonSave: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "",
            icon: "sap-icon://save",
            lite: false,
            style: "Accept",
            // press:function(){
            //     Global.LogTime(Global.getQueryVariable("NumberRange"))
            // }
        }).addStyleClass("roundedbuttoncari")
    },
    ButtonExecute: function (pID, text = "Execute") {
        return new sap.ui.commons.Button({
            id: pID,
            text,
            tooltip: "",
            icon: "sap-icon://begin",
            lite: false,
            style: "Accept"
        });
    },
    ButtonPreparation: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Preparation",
            tooltip: "Preparation",
            icon: "sap-icon://arrow-down",
            lite: false,
            style: "Accept"
        });
    },
    ButtonErrorLog: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Show Error Log",
            tooltip: "Show Error Log",
            icon: "sap-icon://accept",
            lite: false,
            style: "Accept"
        });
    },
    ButtonPreparationCancel: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Preparing Cancellation",
            tooltip: "Preparing Cancellation",
            icon: "sap-icon://arrow-down",
            lite: false,
            style: "Accept"
        });
    },
    ButtonPrint: function (pID, pText) {
        return new sap.ui.commons.Button({
            id: pID,
            text: pText,
            tooltip: "",
            icon: "sap-icon://print",
            lite: false,
            style: "Accept"
        });
    },
    ButtonToggle: function (pID, pText) {
        return new sap.m.ToggleButton({
            id: pID,
            text: pText,
            tooltip: pText,
            icon: "sap-icon://multi-select",
            //          lite: false,
            //          type: "Accept"
        })
    },
    ButtonStop: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Stop",
            tooltip: "",
            icon: "sap-icon://stop",
            lite: false,
            style: "Accept"
        });
    },
    ButtonMaterial: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Material",
            tooltip: "",
            icon: "sap-icon://org-chart",
            lite: false,
            style: "Accept"
        });
    },
    ButtonRelease: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Release",
            tooltip: "",
            icon: "sap-icon://flag",
            lite: false,
            style: "Accept"
        });
    },
    ButtonHeader: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Header",
            tooltip: "",
            icon: "sap-icon://header",
            lite: false,
            style: "Accept"
        });
    },
    ButtonDetermineCost: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Determine Cost",
            tooltip: "",
            icon: "sap-icon://simulate",
            lite: false,
            style: "Accept"
        });
    },
    ButtonCancelJR: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Cancel JR",
            tooltip: "",
            icon: "sap-icon://cancel",
            lite: false,
            style: "Accept"
        });
    },
    ButtonChangeWinder: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Change Winder",
            tooltip: "",
            icon: "sap-icon://request",
            lite: false,
            style: "Accept"
        });
    },
    ButtonOK: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "OK",
            tooltip: "",
            icon: "sap-icon://accept",
            lite: false,
            style: "Accept"
        });
    },
    ButtonCancel: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Batal",
            tooltip: "",
            icon: "sap-icon://decline",
            lite: false,
            style: "Reject"
        });
    },
    ButtonLock: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "",
            icon: "sap-icon://locked",
            lite: false,
            style: "Default"
        });
    },
    ButtonCheck: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "Check",
            icon: "sap-icon://synchronize",
            lite: false,
            style: "Accept"
        });
    },
    ButtonDone: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Done",
            tooltip: "",
            icon: "",
            lite: false,
            style: "Accept",
            press: function () {
                Global.LogTime(Global.getQueryVariable("NumberRange"))
            }
        });
    },
    ButtonClose: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Close",
            tooltip: "",
            icon: "",
            lite: false,
            style: "Reject",

        });
    },
    ButtonUpload: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Upload",
            tooltip: "",
            icon: "",
            lite: false,
            style: "Accept"
        });
    },
    ButtonDownload: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Download",
            tooltip: "",
            icon: "",
            lite: false,
            style: "Accept"
        });
    },
    //button donwload data export to csv
    ButtonDownloadCsv: function (pID, pTable) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Export",
            tooltip: "",
            icon: "sap-icon://download",
            lite: false,
            style: "Accept",
            press: function () {
                var table = sap.ui.getCore().byId(pTable);
                var data = sap.ui.getCore().getModel("tabelModel").getData();
                var getCountData = table.getBinding("rows").getLength();
                var wsUrl = urlWebservice + "LogDownload";
                $.ajax({
                    url: wsUrl,
                    type: 'post',
                    dataType: 'json',
                    data: "{'User':'" + U5312UX5 + "', 'Tvarian':'" + X_VarianUX5 + "', 'Data':'" + getCountData + "', 'server':'" + Server1 + "' ,'IP2':'" + ClientIP + "'}",
                    success: function (result) {
                        console.log(result)

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Error');
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
                console.log("button download" + getCountData)
            }
        });
    },
    //button cancel order dengna memanggil fungsi GLobal.cancel
    ButtonCancelAdmin: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "Cancel",
            icon: "sap-icon://cancel",
            lite: false,
            style: "Reject",
            press: function () {
                Global.CancelAdmin(Global.getQueryVariable("NumberRange"))
            }

        });
    },
    //button pending order dengna memanggil fungsi GLobal.pending
    ButtonPendingAdmin: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "Pending",
            icon: "sap-icon://pending",
            lite: false,
            style: "Accept",
            press: function () {
                Global.PendingAdmin(Global.getQueryVariable("NumberRange"))
            }
        });
    },
    ButtonSortandFilter: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "Sort and Filter",
            tooltip: "Sort and Filter",
            icon: "sap-icon://filter",
            lite: false,
            style: "Default"
        });
    },
    ButtonYes: function(pID){
        return new sap.ui.commons.Button({
            id: pID,
            text: "Yes",
            tooltip : "",
            icon : "sap-icon://accept",
            lite: false,
            style: "Accept"
        });
    },
    ButtonNo: function(pID){
        return new sap.ui.commons.Button({
            id: pID,
            text: "No",
            tooltip : "",
            icon : "sap-icon://decline",
            lite: false,
            style: "Reject"
        });
    },
    TextView: function (pID, pText, pToolTip, pWidth, pWrapping) {
        return new sap.ui.commons.TextView({
            id: pID,
            text: pText,
            tooltip: pToolTip,
            width: pWidth,
            wrapping: pWrapping,
        });
    },
    TextM: function (pID, pText, pToolTip, pWidth, pWrapping) {
        return new sap.m.Text({
            id: pID,
            text: pText,
            tooltip: pToolTip,
            width: pWidth,
            wrapping: pWrapping,
        });
    },
    ValueHelpField: function (pID, pValue, pTooltip, pIconURL, pWidth) {
        // new sap.ui.commons.ValueHelpField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            tooltip: pTooltip,
            //            iconURL: pIconURL,
            width: pWidth,
            showValueHelp: true,
            change: function () {
                Global.Uppercase(this)
            },
        }).addStyleClass("sapUiSizeCompact")
    },

    ValueHelpFieldNum: function (pID, pValue, pTooltip, pIconURL, pWidth) {
        // new sap.ui.commons.ValueHelpField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            tooltip: pTooltip,
            //            iconURL: pIconURL,
            width: pWidth,
            showValueHelp: true,
            change: function () {
                Global.Uppercase(this)
            },
        }).attachBrowserEvent('keypress', e => {
            e = (e) ? e : window.event;
            let charCode = (e.which) ? e.which : e.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
        }).addStyleClass("sapUiSizeCompact")
    },

    ValueHelpFieldRequired: function(pID, pValue, pTooltip, pIconURL, pWidth, pRequired){     
        return new sap.m.Input({
            id: pID,
            value: pValue,
            tooltip: pTooltip, 
//            iconURL: pIconURL,
            width: pWidth,
            showValueHelp:true,
            required: pRequired,
            change: function(){
                Global.Uppercase(this)
                var usrval = this.getValue();
                if (this.getRequired()) {
                    if (usrval == '') {
                        this.setValueState(sap.ui.core.ValueState.Error);
                        this.setValueStateText("Fill this correctly");
                    } else {
                        this.setValueState(sap.ui.core.ValueState.None);
                    }
                }
            },
        }).addStyleClass("sapUiSizeCompact")
    },

    ValueHelpField2: function (pID, pValue, pTooltip, pIconURL, pWidth) {
        return new sap.m.Input({
            id: pID,
            value: pValue,
            tooltip: pTooltip,
            //            iconURL: pIconURL,
            width: pWidth,
            showValueHelp: true,
            change: function () {
                Global.Lowercase(this)
            },
        }).addStyleClass("sapUiSizeCompact")
    },
    //komponen untuk get time yang dimasukkan ke dalam komponen textfield
    TextTime: function (pID, pWidth, pEnabled, pEditable) {
        var time = Global.GetTime();

        return new sap.m.Input({
            id: pID,
            value: time,
            width: pWidth,
            enabled: pEnabled,
            editable: pEditable
        }).addStyleClass("sapUiSizeCompact")
    },
    TimePicker: function (pID, pWidth, pEnabled, pEditable) {
        // var time = Global.GetDateTimeServer("Time");
        var convertedValue = new Date(new Date().toDateString() + ' ' ).toTimeString().split(' ')[0]
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }

        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }
        //        console.log(convertedValue)
        return new sap.m.TimePicker({
            id: pID,
            // value: "23:00:00",
            valueFormat: "HH:mm:ss",
            displayFormat: "HH:mm:ss"
        }).setWidth(pWidth)
            .setEnabled(pEnabled)
            .setEditable(pEditable)
            .addStyleClass("sapUiSizeCompact")
    },
    TextField: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable,
            change: function (e) {
                var usrval = this.getValue().toUpperCase();
                this.setValue(usrval)
            }
        }).addStyleClass("sapUiSizeCompact")
    },

    TextFieldNumber: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable
        })
            .attachBrowserEvent('keypress', e => {
                e = (e) ? e : window.event;
                let charCode = (e.which) ? e.which : e.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
            })
            .addStyleClass("sapUiSizeCompact")
    },

    TextFieldNoUpper: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable
        }).addStyleClass("sapUiSizeCompact")
    },

    /*
     * Auto Formatted to comma thousand 
     * */
    TextFieldComma: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable,
            change: function () {
                var usrval = formatNumber(this.getValue());
                this.setValue(usrval)
            }
        }).addStyleClass("sapUiSizeCompact")

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
    },
    TextFieldRequired: function(pID, pValue, pPlaceholder, pWidth, pMaxLength, pEnabled, pEditable, pRequired){
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            placeholder: pPlaceholder,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable,
            required: pRequired,
            liveChange: function(){
                //Global.Uppercase(this)
                var usrval = this.getValue();
                this.setValue(usrval)
                if (this.getRequired()) {
                    if (usrval == '') {
                        this.setValueState(sap.ui.core.ValueState.Error);
                        this.setValueStateText("Fill this correctly");
                    } else {
                        this.setValueState(sap.ui.core.ValueState.None);
                    }
                }
            }
        }).addStyleClass("sapUiSizeCompact")
    },
    TextField2: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {

        return new sap.m.Input({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable,
            change: function () {
                var usrval = this.getValue().toCamelCase();
                this.setValue(usrval)
            }
        });
    },
    TextField3: function(pID, pValue, pPlaceholder, pWidth, pMaxLength, pEnabled, pEditable){
        // new sap.ui.commons.TextField
        return new sap.m.Input({
            id: pID,
            value: pValue,
            placeholder: pPlaceholder,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable,
            change: function(){
                var usrval = this.getValue().toUpperCase();
                this.setValue(usrval)
            }
        }).addStyleClass("sapUiSizeCompact")
    },
    DatePicker: function (pID, pWidth, pEnabled, pEditable) {
        var oModelDate2 = new sap.ui.model.json.JSONModel();
        oModelDate2.setData({
            myDate: new Date()
        });
        sap.ui.getCore().setModel(oModelDate2, pID + "oModelDate2");

        var year = new Date().getFullYear();
        var month = new Date().getMonth(); //month Index from 0, August 7
        var totalDayOfTwoMonthAgo = new Date(year, month - 1, 0).getDate(); //juni -1
        var totalDayOfThisMonth = new Date(year, month + 1, 0).getDate();

        var oneMonthAgo = new Date();
        oneMonthAgo.setDate(totalDayOfTwoMonthAgo);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2)

        var oneMonth = new Date();
        oneMonth.setDate(totalDayOfThisMonth);
        oneMonth.setMonth(oneMonth.getMonth())

        var dateNow = new Date()
        dateNow.getDate()

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate2>/myDate",
                type: new sap.ui.model.type.Date({
                    pattern: "dd.MM.yyyy",
                    strictParsing: true
                }, {
                    minimum: oneMonthAgo,
                    maximum: oneMonth
                })
            },
            displayFormat: "dd.MM.yyyy"
        }).setValueFormat("yyyyMMdd").addStyleClass("sapUiSizeCompact");
        // var date = Global.GetDate();
        // var oModelDate = new sap.ui.model.json.JSONModel();
        // oModelDate.setData({
        //     dateValue: new Date()
        // });
        // if (pEnabled === true) {
        //     pEnabled = true
        // } else {
        //     pEnabled = false
        // }

        // if (pEditable === true) {
        //     pEditable = true
        // } else {
        //     pEditable = false
        // }

        // sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");


        // return new sap.m.DatePicker({
        //     id: pID,
        //     width: pWidth,
        //     value: {
        //         path: pID + "oModelDate>/dateValue",
        //         type: new sap.ui.model.type.Date({ pattern: "dd.MM.yyyy", strictParsing: true })
        //     },
        //     displayFormat: "dd.MM.yyyy"
        // }).setValueFormat("yyyyMMdd")
        //     .addStyleClass("sapUiSizeCompact")
        //     .setEnabled(true)
        //     .setEditable(true)
    },
    //ambil tanggal bulan sekarang dan bulan kemarin
    DatePicker2: function (pID, pWidth) {

        var oModelDate2 = new sap.ui.model.json.JSONModel();
        oModelDate2.setData({
            myDate: new Date()
        });
        sap.ui.getCore().setModel(oModelDate2, pID + "oModelDate2");

        var year = new Date().getFullYear();
        var month = new Date().getMonth(); //month Index from 0, August 7
        var totalDayOfTwoMonthAgo = new Date(year, month - 1, 0).getDate(); //juni -1
        var totalDayOfThisMonth = new Date(year, month + 1, 0).getDate();

        var oneMonthAgo = new Date();
        oneMonthAgo.setDate(totalDayOfTwoMonthAgo);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2)

        var oneMonth = new Date();
        oneMonth.setDate(totalDayOfThisMonth);
        oneMonth.setMonth(oneMonth.getMonth())

        var dateNow = new Date()
        dateNow.getDate()

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate2>/myDate",
                type: new sap.ui.model.type.Date({
                    pattern: "MM.yyyy",
                    strictParsing: true
                }, {
                        minimum: oneMonthAgo,
                        maximum: oneMonth
                    })
            },
            displayFormat: "MM.yyyy"
        }).setValueFormat("yyyyMM");
    },
    //datepicker untuk ambil tanggal max 1 bulan dari tanggal skrg
    DatePicker3: function (pID, pWidth, pEnabled, pEditable) {
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }
        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        var date = Global.GetDate();

        var oModelDate = new sap.ui.model.json.JSONModel();
        oModelDate.setData({
            dateValue: new Date()
        });

        var oneMonthAgo = new Date();
        var date = new Date()
        var date2 = date.getDate();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - date2)

        sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate>/dateValue",
                type: new sap.ui.model.type.Date({ pattern: "dd.MM.yyyy", strictParsing: true }, { minimum: oneMonthAgo })
            },
            minDate: oneMonthAgo,
            displayFormat: "dd.MM.yyyy"
        }).setValueFormat("yyyyMMdd")
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    //datepicker untuk nilai default kosong
    DatePicker4: function (pID, pWidth, pEnabled, pEditable) {
        var date = Global.GetDate();
        var oModelDate = new sap.ui.model.json.JSONModel();
        oModelDate.setData({
            dateValue: null
        });
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }
        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate>/dateValue",
                type: new sap.ui.model.type.Date({ pattern: "dd-MM-yyyy", strictParsing: true })
            },
            displayFormat: "dd-MM-yyyy",
            valueFormat: "dd-MM-yyyy"
        })
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    //datepicker tidak boleh ambil bulan mundur dari bulan sekarang
    DatePicker5: function (pID, pWidth) {

        var oModelDate2 = new sap.ui.model.json.JSONModel();
        oModelDate2.setData({
            myDate: new Date()
        });
        sap.ui.getCore().setModel(oModelDate2, pID + "oModelDate2");

        var year = new Date().getFullYear();
        var month = new Date().getMonth(); //month Index from 0, August 7
        var totalDayOfTwoMonthAgo = new Date(year, month - 1, 0).getDate(); //juni -1
        var totalDayOfThisMonth = new Date(year, month + 1, 0).getDate();

        var oneMonthAgo = new Date();
        oneMonthAgo.setDate(totalDayOfTwoMonthAgo);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

        var oneMonth = new Date();
        oneMonth.setDate(totalDayOfThisMonth);
        oneMonth.setMonth(oneMonth.getMonth())

        var dateNow = new Date()
        dateNow.getDate()

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate2>/myDate",
                type: new sap.ui.model.type.Date({
                    pattern: "dd.MM.yyyy",
                    strictParsing: true
                }
                    // {
                    //     minDate : oneMonthAgo,
                    //     maxDate : oneMonth
                    // }
                )
            },
            minDate: oneMonthAgo,
            maxDate: oneMonth,
            displayFormat: "dd.MM.yyyy"
        }).setValueFormat("yyyyMMdd")
    },
    //datepicker untuk nilai default kosong untuk IT Inv
    DatePickerInv: function (pID, pWidth, pEnabled, pEditable) {
        var date = Global.GetDate();
        var oModelDate = new sap.ui.model.json.JSONModel();
        oModelDate.setData({
            dateValue: null
        });
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }
        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            value: {
                path: pID + "oModelDate>/dateValue",
                type: new sap.ui.model.type.Date({ pattern: "dd.MM.yyyy", strictParsing: true })
            },
            displayFormat: "dd.MM.yyyy",
            valueFormat: "dd.MM.yyyy"
        })
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    DatePickerRequired: function (pID, pWidth, pEnabled, pEditable, pRequired) {
        var date = Global.GetDate();
        var oModelDate = new sap.ui.model.json.JSONModel();
        oModelDate.setData({
            dateValue: new Date()
        });
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }

        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            required: pRequired,
            displayFormat: "dd.MM.yyyy",
            value: {
                path: pID + "oModelDate>/dateValue",
                type: new sap.ui.model.type.Date({ pattern: "dd.MM.yyyy", strictParsing: true })
            },
            change: function(){
                //Global.Uppercase(this)
                var usrval = this.getValue();
                this.setValue(usrval)
                if (this.getRequired()) {
                    if (usrval == '') {
                        this.setValueState(sap.ui.core.ValueState.Error);
                        this.setValueStateText("Fill this correctly");
                    } else {
                        this.setValueState(sap.ui.core.ValueState.None);
                    }
                }
            }
        }).setValueFormat("yyyyMMdd")
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    DatePickerM: function (pID, pWidth, pEnabled, pEditable, pRequired) {
        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }

        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            required: pRequired,
            displayFormat: "dd.MM.yyyy",
            change: function(){
                //Global.Uppercase(this)
                var usrval = this.getValue();
                this.setValue(usrval)
                if (this.getRequired()) {
                    if (usrval == '') {
                        this.setValueState(sap.ui.core.ValueState.Error);
                        this.setValueStateText("Fill this correctly");
                    } else {
                        this.setValueState(sap.ui.core.ValueState.None);
                    }
                }
            }
        }).setValueFormat("yyyyMMdd")
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    PeriodePickerM: function (pID, pWidth, pEnabled, pEditable, pRequired) {
        var oModelDate = new sap.ui.model.json.JSONModel();
        oModelDate.setData({
            dateValue: new Date()
        });

        if (pEnabled === true) {
            pEnabled = true
        } else {
            pEnabled = false
        }

        if (pEditable === true) {
            pEditable = true
        } else {
            pEditable = false
        }

        sap.ui.getCore().setModel(oModelDate, pID + "oModelDate");
        
        return new sap.m.DatePicker({
            id: pID,
            width: pWidth,
            required: pRequired,
            displayFormat: "MM.yyyy",
            value: {
                path: pID + "oModelDate>/dateValue",
                type: new sap.ui.model.type.Date({ pattern: "MM.yyyy", strictParsing: true })
            },
            change: function(){
                //Global.Uppercase(this)
                var usrval = this.getValue();
                this.setValue(usrval)
                if (this.getRequired()) {
                    if (usrval == '') {
                        this.setValueState(sap.ui.core.ValueState.Error);
                        this.setValueStateText("Fill this correctly");
                    } else {
                        this.setValueState(sap.ui.core.ValueState.None);
                    }
                }
            }
        }).setValueFormat("MM.yyyy")
            .addStyleClass("sapUiSizeCompact")
            .setEnabled(pEnabled)
            .setEditable(pEditable)
    },
    TextFieldPassword: function (pID, pValue, pWidth, pMaxLength, pEnabled, pEditable) {
        return new sap.ui.commons.TextField({
            id: pID,
            value: pValue,
            width: pWidth,
            maxLength: pMaxLength,
            enabled: pEnabled,
            editable: pEditable
        });
    },
    //komponen file uploader
    /* FileUploader: function (pID, pIcon, pButtonOnly, pIconOnly, pWidth) {
        return new sap.ui.commons.FileUploader({
            id: pID,
            icon: pIcon,
            buttonOnly: pButtonOnly,
            iconOnly: pIconOnly,
            width: pWidth,
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        });
    }, */
    FileUploader: function (pID, pIcon, pButtonOnly, pIconOnly, pWidth, pName, pMultipleSelect, pUploadOnChange) {
        return new sap.ui.unified.FileUploader({
            id: pID,
            icon: pIcon,
            buttonOnly: pButtonOnly,
            iconOnly: pIconOnly,
            width: pWidth,
            name: pName,
            multiple: pMultipleSelect,
            uploadOnChange: pUploadOnChange,            
            //mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    },
    //komponen table
    Table: function (pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData) {
        var ppSelectionMode, ppNavigationMode;
        switch (pSelectionMode) {
            case "Multi":
                ppSelectionMode = sap.ui.table.SelectionMode.Multi;
                break;
            case "MultiToggle":
                ppSelectionMode = sap.ui.table.SelectionMode.MultiToggle;
                break;
            case "None":
                ppSelectionMode = sap.ui.table.SelectionMode.None;
                break;
            case "Single":
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
                break;
            default:
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
        }
        switch (pNavigationMode) {
            case "Paginator":
                ppNavigationMode = sap.ui.table.NavigationMode.Paginator;
                break;
            case "Scrollbar":
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
                break;
            default:
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
        }

        return new sap.ui.table.Table({
            id: pID,
            width: pWidth,
            //            columnHeaderVisible:false,
            //            fixedRowCount:1,
            //            fixedColumnCount:0,
            //            alternateRowColors:true,
            //            enableColumnFreeze:true,
            visibleRowCount: pVisibleRowCount,
            // visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            // firstVisibleRow: 3,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            selectionMode: ppSelectionMode,
            // navigationMode: sap.ui.table.NavigationMode.Paginator,
            showNoData: pShowNoData
        });
    },

    Table2: function(pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData){
        var ppSelectionMode, ppNavigationMode;
        switch(pSelectionMode) {
            case "Multi":
                ppSelectionMode = sap.ui.table.SelectionMode.Multi;
                break;
            case "MultiToggle":
                ppSelectionMode = sap.ui.table.SelectionMode.MultiToggle;
                break;
            case "None":
                ppSelectionMode = sap.ui.table.SelectionMode.None;
                break;
            case "Single":
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
                break;
            default:
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
        } 
        switch(pNavigationMode) {
            case "Paginator":
                ppNavigationMode = sap.ui.table.NavigationMode.Paginator;
                break;
            case "Scrollbar":
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
                break;
            default:
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
        } 

        return new sap.ui.table.Table({
            id: pID,
            width: pWidth, 
            rowHeight: 50,
//            columnHeaderVisible:false,
//            fixedRowCount:1,
//            fixedColumnCount:0,
//            alternateRowColors:true,
//            enableColumnFreeze:true,
            visibleRowCount:pVisibleRowCount,
            // visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            // firstVisibleRow: 3,
            selectionBehavior:sap.ui.table.SelectionBehavior.Row,
            selectionMode: ppSelectionMode,
            // navigationMode: sap.ui.table.NavigationMode.Paginator,
            showNoData:pShowNoData
        }).addStyleClass('tableStyle');
    },

    TableM: function (pID, pSelectionMode, pShowNoData) {
        var ppSelectionMode, ppNoData;
        switch (pSelectionMode) {
            case "None":
                ppSelectionMode = sap.m.ListMode.None;
                break;
            case "SingleSelect":
                ppSelectionMode = sap.m.ListMode.SingleSelect;
                break;
            case "SingleSelectLeft":
                ppSelectionMode = sap.m.ListMode.SingleSelectLeft;
                break;
            case "SingleSelectMaster":
                ppSelectionMode = sap.m.ListMode.SingleSelectMaster;
                break;
            case "MultiSelect":
                ppSelectionMode = sap.m.ListMode.MultiSelect;
                break;
            case "Delete":
                ppSelectionMode = sap.m.ListMode.Delete;
                break;
            default:
                ppSelectionMode = sap.m.ListMode.None;
        }

        if (pShowNoData) {
            ppNoData = 'No Data'
        } else {
            ppNoData = ''
        }

        return new sap.m.Table(pID, {
            mode: ppSelectionMode,
            noDataText: ppNoData,
            headerDesign: sap.m.ListHeaderDesign.Standard,
            includeItemInSelection: true,
			sticky: ["ColumnHeaders"],
        });
    },
    //untuk komponen toolbar space
    ToolbarSpacer: function () {
        return new sap.m.ToolbarSpacer();
    },
    //untuk get ID komponen
    GetCore: function (pId) {
        return sap.ui.getCore().byId(pId);
    },
    //09-01-2018
    //Fungsi untuk mendapatkan komponen (valueHelpField, Date, TextField, dll) yang di dalam tabel.
    GetComponentInTable: function (idTable, indexRow, indexCol) {
        var oTable = SAPUI.GetCore(idTable);
        var idComponent = oTable.getRows()[indexRow].getCells()[indexCol].getId();
        var component = SAPUI.GetCore(idComponent);

        return component;
    },
    /** fungsi komponen kolom
     * @pLabelText untuk mengisi title kolom
     * @pTemplate template komponen yang akan digunakan textfield, valuehelp, textview
     * @pWidth untuk mengisi width kolom
     * @phAlign untuk mengisi alignment title kolom
     * @pTextAlign untuk mengisi alignment content / isi kolom
     * @pID untuk mengisi id komponen kolom
     * @pMaxLength untuk mengisi max length dari komponen misal textfield 
     * @pComponen untuk mengisi komponen IconByData
     * @Field untuk mengisi parameter SP valuhelp Field 
     * @OnProses untuk mengisi parameter SP OnProses 
     * @value untuk mengisi parameter SP value , isi inputan "" -> jika tidak ada filter,"param"-> jika ada satu filter , ["",""] -> jika filter lebih dari 2
     * @table untuk mengambil id table yang akan digunakan untuk komponen valuehelpfield
     * @Mode untuk parameter jika komponen valuehelp menggunkan library berbeda
     * 
     */

    Column: function (pLabelText, pTemplate, pBind, pWidth, phAlign, pTextAlign, pID, pMaxLength, pComponen, Field, OnProses, pValue, pTable, pKeyBindKolom, arrKolom, pKeyBindKolomDua, arrKolomDua) {
        var ppTemplate;
        var ppTextAlign;

        switch (phAlign) {
            case "Left":
                phAlign = sap.ui.core.HorizontalAlign.Left;
                break;
            case "Right":
                phAlign = sap.ui.core.HorizontalAlign.Right;
                break;
            case "Center":
                phAlign = sap.ui.core.HorizontalAlign.Center;
                break;
            default:
                phAlign = sap.ui.core.HorizontalAlign.Left;
        }

        switch (pTextAlign) {
            case "Left":
                ppTextAlign = sap.ui.core.TextAlign.Left;
                break;
            case "Right":
                ppTextAlign = sap.ui.core.TextAlign.Right;
                break;
            case "Center":
                phAlign = sap.ui.core.HorizontalAlign.Center;
                break;
            default:
                ppTextAlign = sap.ui.core.TextAlign.Right;
        }

        //console.log("template " + pTemplate)

        switch (pTemplate) {
            case "IconImageByData":
                //=====================================================================================
                //Path Icon : WebContent/asset/icon

                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.Label();
                } else {

                    var ico = new Array();

                    function createIcon(nIdx) {
                        var oKey = Object.keys(pComponen.data[nIdx]); // get object variable name
                        var iconName = pComponen.data[nIdx][oKey]; // get object value

                        var tmpIco = new sap.ui.commons.Label("", {
                            icon: ("asset/icon/" + iconName + ".png"),
                            visible: {
                                path: pComponen.colTarget,
                                formatter: function (val) {
                                    return val == oKey;
                                }
                            }
                        });
                        return tmpIco;
                    }

                    for (var i = 0; i < pComponen.data.length; i++) {

                        ico[i] = createIcon(i);
                    }


                    ppTemplate = new sap.ui.layout.HorizontalLayout("", { content: ico });
                }
                break;
            case "IconByData":
                //=====================================================================================
                //Path Icon : WebContent/asset/icon

                if (pBind == "") {
                    ppTemplate = new sap.ui.core.Icon();
                } else {

                    var ico = new Array();

                    function createIcon(nIdx) {
                        var oKey = Object.keys(pComponen.data[nIdx]); // get object variable name
                        var iconName = pComponen.data[nIdx][oKey]; // get object value

                        var tmpIco = new sap.ui.core.Icon("", {
                            src: ("sap-icon://" + iconName),
                            visible: {
                                path: pComponen.colTarget,
                                formatter: function (val) {
                                    return val == oKey;
                                }
                            }
                        });
                        return tmpIco;
                    }

                    for (var i = 0; i < pComponen.data.length; i++) {

                        ico[i] = createIcon(i);
                    }

                    ppTemplate = new sap.ui.layout.HorizontalLayout("", { content: ico });
                }
                break;
            case "Icon":
                //=====================================================================================

                if (pBind == "") {
                    ppTemplate = new sap.ui.core.Icon();

                } else {

                    var ico = new Array();

                    function createIcon(nIdx) {
                        var tmpIco = new sap.ui.core.Icon("", {
                            src: ("sap-icon://" + pComponen[nIdx]),
                            visible: {
                                path: pBind,
                                formatter: function (val) {
                                    return val == nIdx + 1;
                                }
                            }
                        });
                        return tmpIco;
                    }

                    for (var i = 0; i < pComponen.length; i++) {
                        ico[i] = createIcon(i);
                    }

                    ppTemplate = new sap.ui.layout.HorizontalLayout("", { content: ico });
                }

                break;
            case "IconImage":
                //=====================================================================================
                //Path : WebContent/asset/icon

                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.Label();
                } else {

                    var ico = new Array();

                    function createIcon(nIdx) {
                        var tmpIco = new sap.ui.commons.Label("", {
                            icon: ("asset/icon/" + pComponen[nIdx] + ".png"),
                            visible: {
                                path: pBind,
                                formatter: function (val) {
                                    return val == nIdx + 1;
                                }
                            }
                        });
                        return tmpIco;
                    }

                    for (var i = 0; i < pComponen.length; i++) {
                        ico[i] = createIcon(i);
                    }

                    ppTemplate = new sap.ui.layout.HorizontalLayout("", { content: ico });
                }
                break;
            case "TextView":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.TextView().setTextAlign(ppTextAlign);
                } else {
                    ppTemplate = new sap.ui.commons.TextView().setTextAlign(ppTextAlign).setWrapping(true).bindProperty("text", pBind);
                }
                break;
            case "TextViewMerge":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.TextView();
                } else {
                    ppTemplate = new sap.ui.commons.TextView('', {}).setTextAlign(ppTextAlign).setWrapping(true).bindProperty("text", pBind)
                }
                break;
            case "RadioButtonGroup":
                if (pBind == "") {
                    ppTemplate = pComponen;
                } else {
                    ppTemplate = pComponen.bindProperty("selectedIndex", pBind);
                }
                break;
            case "RadioButton":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.RadioButton();
                } else {
                    ppTemplate = new sap.ui.commons.RadioButton().bindProperty("selected", pBind);
                }
                break;
            case "ValueHelpField":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        showValueHelp: true
                    }).addStyleClass("sapUiSizeCompact")
                } else {
                    var idF4;

                    var oDialog = SAPUI.Dialog("", "Select Data", "400px", "auto", true);
                    var oTable = SAPUI.Table("", "100%", 10, "Single", "Scroll")

                    var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Emph")
                    var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")


                    var oModel = new sap.ui.model.json.JSONModel([]);
                    var pValFilter
                    if (pValue == "" || pValue == undefined || pValue.length == 0) {
                        pValFilter = ""
                    } else {
                        pValFilter = pValue
                    }
                    console.log(pValFilter, pValFilter.length)

                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        showValueHelp: true,
                        valueHelpRequest: function (oEvent) {
                            //ambil id cell table yang di klik
                            idF4 = oEvent.getParameter("id")
                            var valFilter

                            var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                            var idxModel = this.getBindingContext().getPath().split("/")[1];
                            /*cara untuk ambil row data dari cell yang diklik di table*/
                            /*cara1
                            var tes=oEvent.getSource().getBindingContext().getPath()
                             //cara 2
                            var currentRowContext = oEvent.getSource().getBindingContext().getObject();
                            console.log(tes)*/

                            if (isArray(pValFilter)) {
                                var combineValFilter = []

                                var model = this.getModel()
                                //get row data from selected cell table
                                var path = oEvent.getSource().getBindingContext().getPath();
                                var obj = model.getProperty(path);

                                for (var i = 0; i < pValFilter.length; i++) {
                                    combineValFilter.push(obj[pValFilter[i]])
                                }
                                valFilter = combineValFilter
                            } else {
                                valFilter = pValFilter
                            }
                            if (pTable == undefined) {
                                console.log("bukan kolom")
                                Global.F4Filter("", "", pLabelText, Field, OnProses, valFilter, idF4)
                            } else {
                                console.log("kolom")
                                
                                if(pKeyBindKolomDua == undefined)
                                {
                                    Global.F4FilterKolom(pLabelText, Field, OnProses, valFilter, idF4, pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                                } else {
                                    Global.F4FilterKolomDua(pLabelText, Field, OnProses, valFilter, idF4, pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel, pKeyBindKolomDua, arrKolomDua)
                                }                    		
                            }
                        },
                        change: function (e) {
                            Global.Uppercase(this)
                            var idxSelectedRow = this.getBindingContext().getPath().split("/")[2];
                            var idxModel = this.getBindingContext().getPath().split("/")[1];                                                  
                            Global.F4FilterGetTextRowTbl(this, "", this, Field, "", "", "", "", "", pTable, pKeyBindKolom, idxSelectedRow, arrKolom, idxModel)
                        },
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact");

                    //cek if value == array
                    function isArray(arr) {
                        return arr instanceof Array;
                    }

                }
                break;
            case "ValueHelpField2":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({ showValueHelp: true, }).addStyleClass("sapUiSizeCompact")
                } else {

                    var idF4;
                    var oDialog = SAPUI.Dialog("", "Select Data", "400px", "auto", true);
                    var oTableF4 = SAPUI.Table("", "100%", 10, "Single", "Paginator")
                    var RadButtontable = SAPUI.RadioButtonGroup("", "100%", 1, 0)
                    // RadButtontable.setEditable(false)
                    var Item1 = SAPUI.Item("", "", "key")
                    // var Scrap = SAPUI.Item("Scrap", "", "key2") 
                    RadButtontable.addItem(Item1);
                    // RadButtontable.addItem(Scrap);

                    var colKey = SAPUI.Column("Characteristic Value", "RadioButtonGroup", "pakai", "100%", "Begin", "Left", "", 20, "", RadButtontable);
                    var colDesc = SAPUI.Column("Description", "TextView", "desc", "100%", "Left");
                    var btnOK = SAPUI.Button("", "OK", "", "sap-icon://accept", false, "Accept")
                    var btnCancel = SAPUI.Button("", "Cancel", "", "sap-icon://sys-cancel", false, "Reject")

                    var oModel = new sap.ui.model.json.JSONModel();
                    var oData = [{
                        "key": "",
                        "desc": ""
                    }, {
                        "key": "",
                        "desc": ""
                    }, {
                        "key": "",
                        "desc": ""
                    }, {
                        "key": "",
                        "desc": ""
                    }]
                    oModel.setData({ modelData: oData });
                    oTableF4.setModel(oModel);
                    oTableF4.bindRows("/modelData");

                    oTableF4.addColumn(colKey)
                    oTableF4.addColumn(colDesc)
                    oDialog.addContent(oTableF4)
                    oDialog.addButton(btnOK)
                    oDialog.addButton(btnCancel)

                    btnOK.attachPress(function (oEvent) {
                        var oContext = oTableF4.getContextByIndex(oTableF4.getSelectedIndex());

                        if (oContext) {
                            var oSel = oContext.getModel().getProperty(oContext.getPath());
                            SAPUI.GetCore(idF4).setValue(oSel["key"]);
                            oDialog.close()
                        };
                    })

                    btnCancel.attachPress(function (oEvent) {
                        oDialog.close();
                    })

                    ppTemplate = new sap.m.Input({
                        showValueHelp: true,
                        valueHelpRequest: function (oEvent) {
                            idF4 = oEvent.getParameter("id")
                            console.log("f4 : " + idF4)
                            oDialog.open()
                        }
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }
                break;
            case "ValueHelpFieldDefault": //ValueHelp yang digunakan ketika butuh dependency dari table tersebut
                if(pBind == ""){
                    ppTemplate = new sap.m.Input({
                        showValueHelp:true
                    }).addStyleClass("sapUiSizeCompact")
                } else { 
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        showValueHelp:true,
                        change: function(){
                             Global.Uppercase(this)
                        },
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact");
                }                   
                break;
            case "CheckBox":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.CheckBox("", {});
                } else {
                    /* ppTemplate = new sap.ui.commons.CheckBox("", {
                        visible: "{" + pBind + "Visible}",
                    }) */
                    ppTemplate = new sap.ui.commons.CheckBox("", {})
                        .bindProperty("checked", pBind)
                        .bindProperty("enabled", "FlagEnable")
                        .bindProperty("editable", "FlagEnable")
                }

                break;
            case "CheckBox2": // Addition in ZPP060F
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.CheckBox("", {});
                } else {
                    ppTemplate = new sap.ui.commons.CheckBox("", {})
                        .bindProperty("checked", pBind)
                        .bindProperty("enabled", "FlagEnable")
                        .bindProperty("editable", "FlagEnable")
                }

                break;
            case "ComboBox":
                if (pBind == "") {
                    ppTemplate = new sap.m.ComboBox().addStyleClass("sapUiSizeCompact");
                } else {
                    ppTemplate = new sap.m.ComboBox().addStyleClass("sapUiSizeCompact").bindProperty("value", pBind);
                }

                break;
            case "TextField":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Uppercase(this)
                        },
                    }).addStyleClass("sapUiSizeCompact");
                } else {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Uppercase(this)
                        },
                        visible: {
                            path: pBind,
                            formatter: function (val) {
                                return val !== false || typeof val === 'string';
                            }
                        }
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }

                break;
            case "TextNumeric":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Numeric(this)

                        }
                    }).addStyleClass("sapUiSizeCompact")
                } else {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Numeric(this)
                        }
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }
                break;
            case "TextArea":
                if (pBind == "") {
                    ppTemplate = new sap.m.TextArea({


                    }).addStyleClass("sapUiSizeCompact")
                } else {
                    ppTemplate = new sap.m.TextArea({

                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }
                break;
            case "TextFieldComma":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            // this.setValue(formatNumber(this.getValue()))
                            if (this.getValue() != '' && this.getValue() != undefined) {
                                this.setValue(Global.onConvertNumber(this.getValue(), false))
                                this.setValue(Global.onConvertNumber(this.getValue(), true))                                
                            }
                        }
                    }).setTextAlign("Right").addStyleClass("sapUiSizeCompact")
                } else {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            // this.setValue(formatNumber(this.getValue()))
                            if (this.getValue() != '' && this.getValue() != undefined) {
                                this.setValue(Global.onConvertNumber(this.getValue(), false))
                                this.setValue(Global.onConvertNumber(this.getValue(), true))                                
                            }
                        }
                    }).bindProperty("value", pBind).setTextAlign("Right").addStyleClass("sapUiSizeCompact")
                }
                function formatNumber(num) {
                    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                }
                break;
            case "TextFieldNoUpper":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                    }).addStyleClass("sapUiSizeCompact")
                } else {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }
                break;
            case "CantEmpty":
                if (pBind == "") {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Empty(this)
                        }
                    }).addStyleClass("sapUiSizeCompact");
                } else {
                    ppTemplate = new sap.m.Input({
                        maxLength: pMaxLength,
                        change: function () {
                            Global.Empty(this)
                        }
                    }).bindProperty("value", pBind).addStyleClass("sapUiSizeCompact")
                }
                break;
            case "DatePicker":
                // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd.MM.yyyy" }); 
                var oModelDate = new sap.ui.model.json.JSONModel();
                oModelDate.setData({
                    dateValue: new Date()
                });
                if (pBind == "") {
                    var oDatePicker1 = new sap.m.DatePicker({
                        value: {
                            path: pID + "oModelDate>/dateValue",
                            type: new sap.ui.model.type.Date({
                                pattern: "dd.MM.yyyy",
                                strictParsing: true
                            })
                        },
                        displayFormat: "dd.MM.yyyy",
                        valueFormat: "dd.MM.yyyy"
                    }).addStyleClass("sapUiSizeCompact")
                    // oDatePicker1.attachChange(
                    //         function(oEvent){
                    //             var start_date = this.getDateValue()
                    //             var date = new Date(start_date);       
                    //             var dateStr = format(date);
                    //             this.setValue(dateStr)
                    //         }
                    // );                              
                    ppTemplate = oDatePicker1
                } else {
                    var oDatePicker1 = new sap.m.DatePicker({
                        value: {
                            path: pID + "oModelDate>/dateValue",
                            type: new sap.ui.model.type.Date({
                                pattern: "dd-MM-yyyy",
                                // strictParsing: true
                            })
                        },
                        displayFormat: "dd-MM-yyyy",
                        valueFormat: "yyyy-MM-dd"
                    }).addStyleClass("sapUiSizeCompact").bindProperty("value", pBind)
                    // var oDatePicker1 = new sap.m.DatePicker({displayFormat:"dd.MM.yyyy"}).addStyleClass("sapUiSizeCompact")
                    // oDatePicker1.attachChange(
                    //         function(oEvent){
                    //             var start_date = this.getDateValue()
                    //             var date = new Date(start_date);       
                    //             var dateStr = format(date);
                    //             this.setValue(dateStr)
                    //         }
                    // ).bindProperty("value", pBind)
                    ppTemplate = oDatePicker1;
                }
                break;
            case "DatePickerInv":
                // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd.MM.yyyy" }); 
                var oModelDate = new sap.ui.model.json.JSONModel();
                oModelDate.setData({
                    dateValue: new Date()
                });
                if (pBind == "") {
                    var oDatePicker1 = new sap.m.DatePicker({
                        value: {
                            path: pID + "oModelDate>/dateValue",
                            type: new sap.ui.model.type.Date({
                                pattern: "dd-MM-yyyy",
                                strictParsing: true
                            })
                        },
                        displayFormat: "dd-MM-yyyy",
                        valueFormat: "dd-MM-yyyy"
                    }).addStyleClass("sapUiSizeCompact")
                    // oDatePicker1.attachChange(
                    //         function(oEvent){
                    //             var start_date = this.getDateValue()
                    //             var date = new Date(start_date);       
                    //             var dateStr = format(date);
                    //             this.setValue(dateStr)
                    //         }
                    // );                              
                    ppTemplate = oDatePicker1
                } else {
                    var oDatePicker1 = new sap.m.DatePicker({
                        value: {
                            path: pID + "oModelDate>/dateValue",
                            type: new sap.ui.model.type.Date({
                                pattern: "dd-MM-yyyy",
                                strictParsing: true
                            })
                        },
                        displayFormat: "dd-MM-yyyy",
                        valueFormat: "dd-MM-yyyy"
                    }).addStyleClass("sapUiSizeCompact").bindProperty("value", pBind)
                    // var oDatePicker1 = new sap.m.DatePicker({displayFormat:"dd.MM.yyyy"}).addStyleClass("sapUiSizeCompact")
                    // oDatePicker1.attachChange(
                    //         function(oEvent){
                    //             var start_date = this.getDateValue()
                    //             var date = new Date(start_date);       
                    //             var dateStr = format(date);
                    //             this.setValue(dateStr)
                    //         }
                    // ).bindProperty("value", pBind)
                    ppTemplate = oDatePicker1;
                }
                break;
            case "Src":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.Image();
                } else {
                    ppTemplate = new sap.ui.commons.Image().bindProperty("src", pBind);
                }

                break;
            case "RadioButton":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.RadioButtonGroup({
                        selectedIndex: 0
                    });
                } else {
                    ppTemplate = new sap.ui.commons.RadioButtonGroup().bindProperty("selectedIndex", pBind);
                }

                break;
            case "AutoComplete":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.AutoComplete({
                        maxPopupItems: 5
                    });
                } else {
                    var oModel2 = new sap.ui.model.json.JSONModel();

                    ppTemplate = new sap.ui.commons.AutoComplete({
                        maxPopupItems: 5,
                        enabled: true,
                        editable: true,
                    }).bindProperty("value", pBind);

                    if (pComponen != "") {
                        // var filter2 = pComponen.getValue()
                        Global.AutoCompleteList(ppTemplate, filter, pComponen)
                    } else {
                        Global.AutoCompleteList(ppTemplate, filter, "")
                    }
                }
                break;
            case "Link":
                if (pBind == "") {
                    ppTemplate = new sap.ui.commons.Link({});
                } else {
                    ppTemplate = new sap.ui.commons.Link().bindProperty("text", pBind);
                }

                break;
            case "Button":
                ppTemplate = new sap.ui.commons.Button({
                    // id: pID,
                    text: pBind,
                    tooltip: "",
                    icon: "",
                    // lite: pLite,
                    style: sap.ui.commons.ButtonStyle.Emph
                });
                break;                
            case "TextColorV2":		
                ppTemplate = new sap.ui.commons.Button().setWidth("85px").bindProperty("text", pBind,		
                function(data){		
                    this.removeStyleClass('btnGreen');		
                    this.removeStyleClass('btnGray');		
                    this.removeStyleClass('btnYellow');		
                    
                    if(data==='X'){		
                        this.addStyleClass('btnYellow');
                        data="Inactive";                     
                    }else if(data==='Detail'){		
                        this.addStyleClass('btnBlue');
                        data="Detail";
                    }	
                    else{
                        this.addStyleClass('btnGreen');
                        data="Active";
                    }											
                            
                    return data;		
                }
                );
                break;
            case "FileUploader":		
                ppTemplate = new sap.ui.unified.FileUploader({
                    //id: pID,
                    icon: '',
                    buttonOnly: true,
                    iconOnly: false,
                    width: 'auto',
                    maximumFileSize: 50,
                    //mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                break;
            case "LabelTNT":
                if (pBind == "") {
                    ppTemplate = new sap.tnt.InfoLabel();
                } else {
                    ppTemplate = new sap.tnt.InfoLabel().bindProperty("text", pBind);
                }
                break;
            default:
                ppTemplate = new sap.ui.commons.TextView();
        }

        return new sap.ui.table.Column({
            id: pID,
            label: new sap.ui.commons.Label({ text: pLabelText, textAlign: "Center" }),
            template: ppTemplate,
            width: pWidth,
            hAlign: phAlign,
            sortProperty: pBind,
            filterProperty: pBind,

        });
    },

    ColumnM: function (pLabelText, pToolTip, pWidth, phAlign, pTextAlign, pID, pMergeDuplicates) {
        return new sap.m.Column(pID, {
            header: new sap.m.Label({ 
                text: pLabelText, 
                tooltip: pToolTip, 
                textAlign: pTextAlign 
            }),
            width: pWidth,
            hAlign: phAlign,
            vAlign: sap.ui.core.VerticalAlign.Middle,
            mergeDuplicates: pMergeDuplicates,
        });
    },
    ColumnListItem: function (pID) {
        return new sap.m.ColumnListItem(pID, {
            type: "Active",
        });
    },
    GenericTile: function (pID, pHeader, pSubHeader, pSize, pFrameType, pTooltip, pContent) {
        return new sap.m.GenericTile(pID, {
			header: pHeader,
			subheader: pSubHeader,
			size: pSize,
			frameType: pFrameType,
            tooltip: pTooltip,
            tileContent: new sap.m.TileContent({
				content: pContent
			}),
		})
    },
    TileContent: function (pID) {
        return new sap.m.TileContent(pID)
    },
    //fungsi untuk komponen valuestate
    ValueState: function (pID, pState) {
        var ppState

        switch (pState) {
            case "E":
                ppState = sap.ui.core.ValueState.Error;
                break;
            case "N":
                ppState = sap.ui.core.ValueState.None;
                break;
            case "S":
                ppState = sap.ui.core.ValueState.Success;
                break;
            case "W":
                ppState = sap.ui.core.ValueState.Warning;
                break;
            default:
                ppState = sap.ui.core.ValueState.None;
        }

        SAPUI.GetCore(pID).setValueState(ppState)
    },
    //notification bar footer
    BarNotifocation: function (pTitle, pLevel, pMessage) {
        return new sap.ui.ux3.NotificationBar('idnotif', {
            visibleStatus: "None",
            resizeEnabled: false,
            messageNotifier: new sap.ui.ux3.Notifier({
                title: pTitle,
                messages: new sap.ui.core.Message({
                    text: pMessage,
                    level: pLevel,
                })
            })
        });
    },
    //fungsi loading 
    Busy: function (pId) {
        return new sap.m.BusyDialog({
            title: "Please wait loading data..",
            showCancelButton: true,
        });
    },
    BusyIndicator: function (pId) {
        return new sap.m.BusyIndicator({
            text: "tes"
        })
    },
    BusyDialog: function () {

        // var timerVar = setInterval(countTimer, 1000);
        var totalSeconds = 0;

        var flbBusy = new sap.m.FlexBox('',{
            alignItems: sap.m.FlexAlignItems.Center,
            direction: sap.m.FlexDirection.Column,
        })

        // var mtrTabel = SAPUI.Matrix("", "100%", false, [], 1);
        var gambar = SAPUI.Image("asset/image/Loading3.gif", "auto", "125px", false, "")
        var txtViewContent = new sap.ui.commons.TextView({
            wrapping: false,
            // width : "700px",
            design: sap.ui.commons.TextViewDesign.H3,
            textAlign: "Center"
        });

        var txttimer = SAPUI.TextView("", "", "Jam", "auto", false)
        var txtwaitText = SAPUI.TextView("", "", "Tunggu", "auto", false)
        txttimer.addStyleClass("timer")
        txtwaitText.addStyleClass("animate-flicker2")
        txtwaitText.setVisible(false)
        tstart()

        txtViewContent.setText("LOADING")
        // gambar.addStyleClass("ld ld-slide-ltr")
        // mtrTabel.addStyleClass("mtrcentered")

        // txtViewContent.addStyleClass("animetes")

        /* txtViewContent.onAfterRendering = function () {
            var textWrapper = document.querySelector('.animetes');
            textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
            anim()
        } */

        function anim() {
            anime.timeline({ loop: true })
                .add({
                    targets: '.animetes .letter',
                    translateX: [40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 1200,
                    delay: function (el, i) {
                        return 500 + 30 * i;
                    }
                }).add({
                    targets: '.animetes .letter',
                    translateX: [0, -30],
                    opacity: [1, 0],
                    easing: "easeInExpo",
                    duration: 1100,
                    delay: function (el, i) {
                        return 100 + 30 * i;
                    }
                });
        }

        /* mtrTabel.createRow(gambar)
        mtrTabel.createRow(txtViewContent)
        // mtrTabel.createRow(txtwaitText)
        mtrTabel.createRow(txttimer) */

        flbBusy.addItem(gambar)
        flbBusy.addItem(txtViewContent)
        // mtrTabel.createRow(txtwaitText)
        flbBusy.addItem(txttimer)

        return new sap.m.Dialog({
            content: [flbBusy],
            type: sap.m.DialogType.Standard,
            showHeader: false,
            // width: '20%',
            //            escapeHandler:function(e){
            //            	e.preventDefault();
            //            },
        }).addStyleClass("customBusyDialog")



        function countTimer() {
            totalSeconds++;
            var hour = pad(parseInt(totalSeconds / 3600))
            var minute = pad(parseInt(totalSeconds / 60));
            var seconds = pad(totalSeconds % 60);

            var timerValue = minute + ":" + seconds

            var text1 = "Sedang di proses"
            var text2 = "Pemrosesan akan sedikit lama"
            var text3 = "Sedang di proses"
            txttimer.setText(timerValue)
            if (minute == 1) {
                txtwaitText.setVisible(true)
                txtwaitText.setText(text1)
            } else if (minute == 3) {
                txtwaitText.setText(text2)
            }

        }

        function tstart() {
            timerVar = setInterval(countTimer, 1000);
        }

        function tpuse() {
            clearInterval(timerVar);
        }

        function treset() {
            totalSeconds = -1;
            countTimer();
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }


    },
    //fungsi icon tab bar
    IconTabBar: function () {
        var myVar
        var iconTabBar = new sap.m.IconTabBar({
            expandable: false,
            expanded: false,
            // select :  function(){alert(this.getSelectedKey())},
            items: {
                path: 'id>/GetAdminActiveResult',
                template: new sap.m.IconTabFilter({
                    icon: "sap-icon://employee",
                    iconColor: "{id>Status}",
                    text: '{id>User}',
                    tooltip: 'Transaction Code :' + " " + '{id>TransactionCode}' + "\nOrder : " + '{id>Order}' + "\nBatch : " + '{id>Batch}' + "\nStatus : " + '{id>PasswordHashValue}' + "\nExtension : " + '{id>Extension}',
                    count: '{id>NumberRange}',

                })
            }
        });

        var wsUrlIcon = urlWebservice + "GetAdminActive";

        $.ajax({
            url: urlWebservice + "GetAdminActive",
            // url: "http://192.168.1.74:8080/IUXTool/Service1.svc/GetAdminActive",
            // url:wsUrlIcon,
            type: "POST",
            dataType: 'json',
            data: "{'User':'" + U5312UX5 + "'}",
            success: function (result) {
                //  alert(result.GetAdminActiveResult.length);

                var model = new sap.ui.model.json.JSONModel({})
                model.setData(result);
                iconTabBar.setModel(model, 'id');
            }
        });

        myVar = setInterval(myTimer, 10000);

        function myTimer() {
            $.ajax({
                url: urlWebservice + "GetAdminActive",
                // url: "http://192.168.1.74:8080/IUXTool/Service1.svc/GetAdminActive",
                // url:wsUrlIcon,
                type: "POST",
                dataType: 'json',
                data: "{'User':'" + U5312UX5 + "'}",
                success: function (result) {
                    // alert(result.GetAdminActiveResult.length);

                    var model = new sap.ui.model.json.JSONModel({})
                    model.setData(result);
                    iconTabBar.setModel(model, 'id');
                }
            });
        }

        return iconTabBar
    },
    //undefined admin jr
    SetIcon: function (object, icon) {

        var wsUrl = urlWebservice + "GetIcon";

        $.ajax({
            url: wsUrl,
            type: 'post',
            dataType: 'json',
            data: "{'Name':'" + icon + "'}",
            success: function (result) {
                object.setIcon(result.GetIconResult[0].Path)

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    },
    //komponen autocomplete
    AutoComplete: function (pID, pToolTip, pMaxPopUpItems, pWidth, pEnabled, pEditable) {
        return new sap.ui.commons.AutoComplete({
            id: pID,
            tooltip: pToolTip,
            maxPopupItems: pMaxPopUpItems,
            width: pWidth,
            enabled: pEnabled,
            editable: pEditable,
            change: function () {
                var usrval = this.getValue().toUpperCase();
                this.setValue(usrval)
            }
        });
    },
    //button back
    ButtonBack: function (pID) {
        return new sap.ui.commons.Button({
            id: pID,
            text: "",
            tooltip: "",
            icon: "sap-icon://sys-back",
            lite: false,
            style: "Accept",
            press: function () {
                window.history.back();
            }
        });
    },
    //id button, id table data select row ex."idXSTR_QC33_04_01--table"
    ButtonAllRow: function (pID, pTable) {

        return new sap.ui.commons.Button({
            id: pID,
            text: "Select All Row",
            tooltip: "",
            icon: "sap-icon://activities",
            lite: false,
            style: "Accept",
            press: function () {
                var table = sap.ui.getCore().byId(pTable);
                table.selectAll()
            }
        });
    },
    //id button, id table data select row ex."idXSTR_QC33_04_01--table"
    ButtonNoneRow: function (pID, pTable) {

        return new sap.ui.commons.Button({
            id: pID,
            text: "DeSelect All Row",
            tooltip: "",
            icon: "sap-icon://multiselect-none",
            lite: false,
            style: "Accept",
            press: function () {
                var table = sap.ui.getCore().byId(pTable);
                table.clearSelection()
            }
        });
    },
    //id button,id table data yang akan didownload
    ButtonDownloadData: function (pID, pTable) {

        return new sap.ui.commons.Button({
            id: pID,
            text: "Export",
            tooltip: "",
            icon: "sap-icon://download",
            lite: false,
            style: "Accept",
            press: function () {
                var table = sap.ui.getCore().byId(pTable);
                var data = sap.ui.getCore().getModel("tabelModel").getData();
                var getCountData = table.getBinding("rows").getLength();
                var wsUrl = urlWebservice + "LogDownload";
                $.ajax({
                    url: wsUrl,
                    type: 'post',
                    dataType: 'json',
                    data: "{'User':'" + U5312UX5 + "', 'Tvarian':'" + X_Varian + "', 'Data':'" + getCountData + "', 'Ip':'" + ClientIP + "'}",
                    success: function (result) {
                        console.log(result)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Error');
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
                console.log("button download" + getCountData)
            }
        });
    },
    //fungsi ambil waktu server
    TextTimeServer: function (pID) {

        var oModel = new sap.ui.model.json.JSONModel();
        var wsUrl = urlWebservice + "GetNistTime";
        //var wsUrl = "http://localhost:10344/Service1.svc/GetNistTime";
        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/plain, charset=utf-8",
            dataType: "json",
            data: "{'dateTime' : '" + pID + "'}",
            crossDomain: true,
            success: function (result) {
                pID.setValue(result.GetNistTimeResult)
            },
            error: function (jqXHR, textStatus, errorThrow) {
                console.log("Error");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrow);
            }
        })
    },
    //komponen tree table
    TreeTable: function (pID, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData) {
        var ppSelectionMode, ppNavigationMode;
        switch (pSelectionMode) {
            case "Multi":
                ppSelectionMode = sap.ui.table.SelectionMode.Multi;
                break;
            case "MultiToggle":
                ppSelectionMode = sap.ui.table.SelectionMode.MultiToggle;
                break;
            case "None":
                ppSelectionMode = sap.ui.table.SelectionMode.None;
                break;
            case "Single":
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
                break;
            default:
                ppSelectionMode = sap.ui.table.SelectionMode.Single;
        }

        switch (pNavigationMode) {
            case "Paginator":
                ppNavigationMode = sap.ui.table.NavigationMode.Paginator;
                break;
            case "Scrollbar":
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
                break;
            default:
                ppNavigationMode = sap.ui.table.NavigationMode.Scrollbar;
        }

        return new sap.ui.table.TreeTable({
            selectionMode: sap.ui.table.SelectionMode.Single,
            enableColumnReordering: true,
            expandFirstLevel: true,
            id: pID,
            width: pWidth,
            visibleRowCount: pVisibleRowCount,
            selectionMode: ppSelectionMode,
            showNoData: pShowNoData,
            toggleOpenState: function (oEvent) {
                var iRowIndex = oEvent.getParameter("rowIndex");
                var oRowContext = oEvent.getParameter("rowContext");
                var bExpanded = oEvent.getParameter("expanded");
            }
        })
    },
    //komponen kolom tree tabel
    ColumnTreeTable: function (pLabelText, pTemplate, pWidth, phAlign, pTextAlign, pID) {
        return new sap.ui.table.Column({
            id: pID,
            label: new sap.ui.commons.Label({ text: pLabelText, textAlign: pTextAlign }),
            template: pTemplate,
            width: pWidth,
            hAlign: phAlign,
        });
    },

    /*	function to formatted textfield From & textfield TO
     * @pComp1 textfield From
     * @pcomp2 textfield To
     * 
     * */
    ParamFormatTo: function (pComp1, pComp2) {
        var result = pComp1;
        if (pComp2 != "") {
            result += "|" + pComp2;
        }
        return result;

    },
    /*
     * function to formatted value to parameter IN and TO 
     * IN (SAPUI.ParamFormatIn("IN",['1','2','3','4','5']))  -> ["1,2,3,4,5"]
     * TO (SAPUI.ParamFormatIn("TO",['1','2'])) -> ["1|2"]
     *  */
    ParamFormatVH: function (pMode, pValue) {
        var result = pValue;
        var arrlength = pValue.length
        var joined
        var combine = []
        if (arrlength < 1) {
            result = 0
        } else {
            if (pMode == 'TO') {
                if (arrlength == 2) {
                    joined = pValue.join("|");
                    combine.push(joined)
                    result = combine
                } else {
                    console.log("parameter to lebih dari 2")
                }
            } else if (pMode == 'IN') {
                joined = pValue.join(",")
                combine.push(joined)
                result = combine
            }
        }
        return result;

    },
    /*function to formatted filter ValueHelpfield
     * SAPUI.ParamFilterVH([tes,tes2])
     * */
    ParamFilterVH: function (pValue) {
        var result = pValue;
        var arrlength = pValue.length
        var joined
        var combine
        if (arrlength < 1) {
            result
        } else {
            joined = pValue.join("-")
            combine = joined
            result = combine
        }
        return result
    },
    /*function to join parameter valuehelp more than one
     * @pArray parameter that cointain value inside array
     * */
    ParamInValuehelp: function (pArray) {
        var pArrayLength = pArray.length;
        var result = []
        for (var i = 0; i < pArrayLength; i++) {
            if (pArray[i] == pArray[pArrayLength - 1]) {
                result.push(pArray[i])
            } else {
                result.push(pArray[i] + "-")
            }
        }
        return result.join('')

        /*
         * 	var parray=["JROPP04","SRAAI",JRAABI]
            var tes=SAPUI.ParamInValuehelp(parray)
            console.log(tes)
        */


    },
    /*function to formatted value checkbox
     * @cbComp component Checkbox
     * 
     * */
    ParamFormatCheckbox: function (cbComp) {
        var result = "";
        if (cbComp.getChecked()) {
            result = "X"
        }
        return result;

    },
    Route: function (View) {
        var oRouter = sap.ui.core.routing.Router.getRouter("appRouter");
        this.insExcRptLog(View)
        oRouter.navTo(View);
    },
    // 14.08.2017
    // these codes will provide a dynamic changeable columns
    // example of use:
    // var oTable = SAPUI.TableLayout(this.createId("oTable"), "GANTI TRUNK", "auto", 15, "Single", "Scrollbar", false);
    // TableLayout: function(pID, pScreen, pWidth, pVisibleRowCount, pSelectionMode, pNavigationMode, pShowNoData){
    TableLayout: function (pLink, pResult, pTable, pObjWidth) {

        var pScreen = "" + pLink.split("/").slice(-1),
            oModel = new sap.ui.model.json.JSONModel(),
            oData = new sap.ui.model.json.JSONModel(),
            oDataRow = new sap.ui.model.json.JSONModel();
        oModelKosong = new sap.ui.model.json.JSONModel();

        oModel.setSizeLimit(999999);
        oData.setSizeLimit(999999);
        oDataRow.setSizeLimit(999999)

        if (!window.localStorage.getItem("saveLayout" + pScreen)) {

            $.ajax({
                type: "POST",
                url: WS_User + "getDefaultColumn",
                dataType: "json",
                data: "{'screen':'" + pScreen + "'}",
                crossDomain: true,
                success: function (result) {
                    var resultSet = result["getDefaultColumnResult"],
                        tempArr = [];

                    resultSet.forEach(function (item) {
                        tempArr.push({
                            id: item.id,
                            key: item.columnName,
                            description: item.displayedColumnName,
                            template: item.bindingType
                        })
                    });

                    oModel.setData({ columns: tempArr });
                    console.log(tempArr)
                    bindColumns(oModel);
                    //			    	

                    // baris kode untuk binding data ke tabel
                    oDataRow.setData({ dataRows: pResult });
                    sap.ui.getCore().setModel(oDataRow);

                    pTable.bindRows("/dataRows");

                },
                error: function (jqXHR, textStatus, errorThrow) {
                    console.log("Error");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrow);
                }
            });

        } else {
            var layout = window.localStorage.getItem("saveLayout" + pScreen);


            if (pResult == "") {
                oDataRow.setData({ dataRows: "" });
                oModel.setData(JSON.parse(layout));
                bindColumns(oModel);
            } else {
                oModel.setData(JSON.parse(layout));
                bindColumns(oModel);

                // baris kode untuk binding data ke tabel
                oDataRow.setData({ dataRows: pResult });
                bindColumns(oModel);
            }

            sap.ui.getCore().setModel(oDataRow);

            pTable.bindRows("/dataRows")
        }

        function bindColumns(pModel) {
            pTable.setModel(pModel, "tableModel");

            pTable.bindColumns("tableModel>/columns", function (sId, oContext) {
                var oColumnObj = oContext.getObject();

                return new sap.ui.table.Column({
                    // id			: oColumnObj.id,
                    label: oColumnObj.description,
                    template: new sap.ui.commons.TextView().bindProperty("text", oColumnObj.key),
                    sortProperty: oColumnObj.key,
                    filterProperty: oColumnObj.key,
                    autoResizable: true,
                    width: (pObjWidth != null && (oColumnObj.key in pObjWidth)) ? pObjWidth[oColumnObj.key] : "100%"
                });
            });

            window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(pTable.getModel("tableModel").getData()));
        }

        return pTable;
    },
    // 10.08.2017
    // this button will display a dialog which contains some choices of columns and
    // some functional buttons which could be used to rearrange the columns,
    // applying the changes, etc...
    // example of use:
    // var btnName = SAPUI.ButtonChangeLayout("button1", "GANTI TRUNK", oTable, "Change layout", "", "", false, "Accept");
    ButtonChangeLayout: function (pID, pLink, pTable, pText, pTooltip, pIcon, pLite, pStyle) {
        var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
            pBindPath = "tableModel>/columns",
            pScreen = "" + pLink.split("/").slice(-1);

        function attachPressOButton() {
            var oDialog = SAPUI.Dialog("", "Choose columns fo the table", "40%", "auto", true),
                pathProperty = pBindPath.split(">");

            var pArgs = {
                targetModel: pTable.getModel(pathProperty[0]),
                targetProperty: pathProperty[1],
                keyField: "key",
                descrField: "description",
                initialHeight: 350,
                idDialog: oDialog.getId()
            }

            initPointAndShootModel(pArgs);

            var leftPane = getLeftPane(pArgs.initialHeight),
                rightPane = getRightPane(pArgs.initialHeight);

            var oLayout = new sap.ui.commons.layout.MatrixLayout({
                columns: 4,
                height: "100%",
                width: "100%",
                widths: ["auto", "80px", "auto", "40px"],
                rows: new sap.ui.commons.layout.MatrixLayoutRow({
                    height: "100%",
                    cells: [
                        leftPane.oCell,
                        getSelectButtonsPane(pArgs),
                        rightPane.oCell,
                        getOrderButtonsPane(rightPane.id)
                    ]
                })
            });

            setButtonState();

            oDialog.addContent(oLayout);
            oDialog.open();
        }

        function getLeftPane(pHeight) {
            var oCell = SAPUI.MatrixLayoutCell(),
                obj = {},
                listBox = getListBox("left", "key", "description", "pointAndShootModel>/left/data", pHeight);

            oCell.addContent(listBox);

            obj.id = listBox.getId();
            obj.oCell = oCell;

            return obj;
        }

        function getRightPane(pHeight) {
            var oCell = SAPUI.MatrixLayoutCell(),
                obj = {},
                listBox = getListBox("right", "key", "description", "pointAndShootModel>/right/data", pHeight);

            oCell.addContent(listBox);

            obj.id = listBox.getId();
            obj.oCell = oCell;

            return obj;
        }

        function getListBox(pPosition, pKeyField, pDescriptionField, pBindpath, pHeight) {
            var oItemTemplate = new sap.ui.core.ListItem({
                text: "{pointAndShootModel>" + pDescriptionField + "}",
                key: "{pointAndShootModel>" + pKeyField + "}"
            });

            var oListBox = new sap.ui.commons.ListBox({
                width: "100%",
                height: pHeight - 65 + "px",
                allowMultiSelect: true,
                select: function (oEvent) {
                    sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pPosition + "/selectedKeys", oEvent.getSource().getSelectedKeys());
                    setButtonState();
                }
            });

            oListBox.bindAggregation("items", pBindpath, oItemTemplate);

            return oListBox;
        }

        function getSelectButtonsPane(pArgs) {
            var oModel = sap.ui.getCore().getModel("pointAndShootModel");
            var oCell = SAPUI.MatrixLayoutCell("Middle", "Center");

            var mtrButton = new sap.ui.commons.layout.MatrixLayout({
                width: "100%",
                layoutFixed: false,
                widths: ["auto", "auto", "auto"],
                columns: 3
            });

            ///////
            var buttonToRight = new sap.ui.commons.Button({
                text: "",
                tooltip: "Move to right",
                icon: "sap-icon://media-play",
                lite: false,
                style: sap.ui.commons.ButtonStyle.Accept
            });

            buttonToRight.getEnabled("{pointAndShootModel>/uiSettings/btnAddEnabled}");
            buttonToRight.attachPress(function () {
                swapItems("left", "right");
                setButtonState();
            });

            var buttonAllToRight = new sap.ui.commons.Button({
                text: "",
                tooltip: "Move all to right",
                icon: "sap-icon://media-forward",
                lite: false
            });

            buttonAllToRight.getEnabled("{pointAndShootModel>/uiSettings/btnAddAllEnabled}");
            buttonAllToRight.attachPress(function () {
                swapAllItems("left", "right");
                setButtonState();
            });

            ///////
            var buttonToLeft = new sap.ui.commons.Button({
                text: "",
                tooltip: "Move to left",
                icon: "sap-icon://media-reverse",
                lite: false,
                style: sap.ui.commons.ButtonStyle.Accept
            });

            buttonToLeft.getEnabled("{pointAndShootModel>/uiSettings/btnRemoveEnabled}");
            buttonToLeft.attachPress(function () {
                swapItems("right", "left");
                setButtonState();
            });

            var buttonAllToLeft = new sap.ui.commons.Button({
                text: "",
                tooltip: "Move all to left",
                icon: "sap-icon://media-rewind",
                lite: false
            });

            buttonAllToLeft.getEnabled("{pointAndShootModel>/uiSettings/btnRemoveAllEnabled}");
            buttonAllToLeft.attachPress(function () {
                swapAllItems("right", "left");
                setButtonState();
            });

            ///////
            var buttonApply = new sap.ui.commons.Button({
                text: "",
                tooltip: "Apply",
                icon: "sap-icon://accept",
                lite: false,
                style: sap.ui.commons.ButtonStyle.Accept
            });

            buttonApply.attachPress(function () {
                applySelection(pArgs);
                sap.ui.getCore().getElementById(pArgs.idDialog).close();
            });

            mtrButton.createRow(buttonToRight, "", buttonAllToRight);
            mtrButton.createRow(buttonToLeft, "", buttonAllToLeft);
            mtrButton.createRow(buttonApply, "", "");

            oCell.addContent(mtrButton);

            return oCell;
        }

        function applySelection(pArgs) {
            var aItems = sap.ui.getCore().getModel("pointAndShootModel").getProperty("/left/data");
            pArgs.targetModel.setProperty(pArgs.targetProperty, aItems);

            var obj = { columns: aItems };

            window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(obj));
        }

        function swapAllItems(pFrom, pTo) {
            var oModel = sap.ui.getCore().getModel("pointAndShootModel");
            var aAllItems = oModel.getProperty("/" + pFrom + "/data");
            var aKeys = [];

            aAllItems.forEach(function (obj) {
                aKeys.push(obj.key);
            });

            oModel.setProperty("/" + pFrom + "/selectedKeys", aKeys);

            swapItems(pFrom, pTo);
        }

        function getOrderButtonsPane(idRight) {
            var oCell = SAPUI.MatrixLayoutCell("Middle", "Center");
            var mtrButton = new sap.ui.commons.layout.MatrixLayout({
                width: "100%",
                layoutFixed: false,
                widths: ["100%"],
                columns: 1
            });

            var buttonUp = new sap.ui.commons.Button({
                text: "",
                tooltip: "",
                icon: "sap-icon://slim-arrow-up",
                lite: false,
                style: sap.ui.commons.ButtonStyle.Accept
            });

            buttonUp.getEnabled("{pointAndShootModel>/uiSettings/btnUpEnabled}");
            buttonUp.attachPress(function () {
                performMoveItems(-1, idRight);
            });

            var buttonDown = new sap.ui.commons.Button({
                text: "",
                tooltip: "",
                icon: "sap-icon://slim-arrow-down",
                lite: false,
                style: sap.ui.commons.ButtonStyle.Accept
            });

            buttonDown.getEnabled("{pointAndShootModel>/uiSettings/btnDownEnabled}");
            buttonDown.attachPress(function () {
                performMoveItems(1, idRight);
            });

            mtrButton.createRow(buttonUp);
            mtrButton.createRow(buttonDown);

            oCell.addContent(mtrButton);

            return oCell;
        }

        function performMoveItems(pDirection, idRight) {
            var aItems = sap.ui.getCore().getModel("pointAndShootModel").getProperty("/right/data");
            var oListbox = sap.ui.getCore().getElementById(idRight);

            var aSelectedIndices = oListbox.getSelectedIndices();
            var aNewSelectedIndices = pDirection == -1 ? moveItemsUp(aItems, aSelectedIndices) : moveItemsDown(aItems, aSelectedIndices);

            oListbox.fireSelect(aNewSelectedIndices);
            oListbox.setSelectedIndices(aNewSelectedIndices);

            setButtonState();
        }

        function moveItemsUp(pItems, pIndices) {
            var aNewIndices = [];

            for (var i = 0; i < pIndices.length; i++) {

                var newIndex = pIndices[i] - 1,
                    element = pItems[pIndices[i]];

                pItems.splice(pIndices[i], 1);
                pItems.splice(newIndex, 0, element);

                aNewIndices.push(newIndex);
            }

            return aNewIndices;
        }

        function moveItemsDown(pItems, pIndices) {
            var aNewIndices = [];

            for (var i = pIndices.length - 1; i >= 0; i--) {
                var newIndex = pIndices[i] + 1,
                    element = pItems[pIndices[i]];

                pItems.splice(pIndices[i], 1);
                pItems.splice(newIndex, 0, element);

                aNewIndices.push(newIndex);
            }

            return aNewIndices;
        }

        function initPointAndShootModel(pArgs) {

            $.ajax({
                type: "POST",
                url: WS_User + "getAvailableColumn",
                dataType: "json",
                data: "{'screen':'" + pScreen + "'}",
                crossDomain: true,
                success: function (result) {
                    var aRightData = [],
                        aAlreadySelectedKeys = getTargetKeys(pArgs),
                        oModel = new sap.ui.model.json.JSONModel();

                    oModel.setSizeLimit(1000);

                    result["getAvailableColumnResult"].forEach(function (item) {
                        aRightData.push({
                            id: item.id,
                            key: item.columnName,
                            description: item.displayedColumnName,
                            template: item.bindingType
                        })
                    });

                    oModel.setData({
                        left: {
                            data: [],
                            selectedKeys: []
                        },
                        right: {
                            data: aRightData,
                            selectedKeys: aAlreadySelectedKeys
                        },
                        uiSettings: {
                            btnAddEnabled: false,
                            btnAddAllEnabled: false,
                            btnRemoveEnabled: false,
                            btnRemoveAllEnabled: false,
                            btnUpEnabled: false,
                            btnDownEnabled: false
                        }
                    });

                    sap.ui.getCore().setModel(oModel, "pointAndShootModel");

                    swapItems("right", "left");
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    console.log("Error");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrow);
                }
            });

        }

        function getTargetKeys(pArgs) {
            var aTargetData = pArgs.targetModel.getProperty(pArgs.targetProperty),
                aTargetKeys = [];

            for (var i in aTargetData) {
                aTargetKeys.push(aTargetData[i][pArgs.keyField]);
            }

            return aTargetKeys;
        }

        function swapItems(pFrom, pTo) {
            var oModel = sap.ui.getCore().getModel("pointAndShootModel"),
                oSelectedKeys = oModel.getProperty("/" + pFrom + "/selectedKeys"),
                oItemsFrom = oModel.getProperty("/" + pFrom + "/data"),
                oItemsTo = oModel.getProperty("/" + pTo + "/data");

            var aItemsToBeMoved = [];
            oSelectedKeys.forEach(function (key) {
                var selectedObject = $.grep(oItemsFrom, function (obj) {
                    return obj.key === key;
                })[0];
                aItemsToBeMoved.push(selectedObject);
            });

            aItemsToBeMoved.forEach(function (item) {
                var index = oItemsFrom.indexOf(item);
                oItemsFrom.splice(index, 1);
            });

            oItemsTo.push.apply(oItemsTo, aItemsToBeMoved);

            sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pFrom + "/data", oItemsFrom);
            sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pTo + "/data", oItemsTo);
            sap.ui.getCore().getModel("pointAndShootModel").setProperty("/" + pFrom + "/selectedKeys", []);
        }

        function setButtonState() {
            var oModel = sap.ui.getCore().getModel("pointAndShootModel");

            if (typeof oModel !== "undefined") {
                oModel.setProperty("/uiSettings/btnAddEnabled", oModel.getProperty("/left/selectedKeys").length > 0);
                oModel.setProperty("/uiSettings/btnRemoveEnabled", oModel.getProperty("/right/selectedKeys").length > 0);
                oModel.setProperty("/uiSettings/btnAddAllEnabled", oModel.getProperty("/left/data").length > 0);
                oModel.setProperty("/uiSettings/btnRemoveAllEnabled", oModel.getProperty("/right/data").length > 0);

                if (oModel.getProperty("/right/selectedKeys").length > 0) {
                    var aRightData = oModel.getProperty("/right/data"),
                        aRightKeys = [];

                    for (var i in aRightData) {
                        aRightKeys.push(aRightData[i].key);
                    }

                    var iRightDataLength = oModel.getProperty("/right/data").length;
                    oModel.setProperty("/uiSettings/btnUpEnabled", aRightKeys.indexOf(oModel.getProperty("/right/selectedKeys")[0]) > 0);
                    oModel.setProperty("/uiSettings/btnDownEnabled", aRightKeys.indexOf(oModel.getProperty("/right/selectedKeys")[oModel.getProperty("/right/selectedKeys").length - 1]) < iRightDataLength - 1);
                } else {
                    oModel.setProperty("/uiSettings/btnUpEnabled", false);
                    oModel.setProperty("/uiSettings/btnDownEnabled", false);
                }
            }
        }

        oButton.attachPress(attachPressOButton);

        return oButton;
    },
    // 29.08.2017
    // this button will display a dialog which contains some choices of columns and
    // some functional buttons which could be used to rearrange the columns,
    // applying the changes, etc...
    // example of use:
    // var btnName = SAPUI.ButtonSaveLayout("button1", "GANTI TRUNK", "Change layout", "", "", false, "Accept");
    ButtonSaveLayout: function (pID, pLink, pText, pTooltip, pIcon, pLite, pStyle) {
        var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
            pScreen = "" + pLink.split("/").slice(-1),
            dialogSave = SAPUI.Dialog("", "Save Layout", "30%", "auto", true),
            matrixSaveLayout = SAPUI.Matrix("", "100%", false, ["40%", "60%"], 2),
            namaLayout = SAPUI.Label("", "Nama Layout", "Bold", "100%"),
            txfNamaLayout = SAPUI.TextField("", "", "100%", 100, true, true);

        matrixSaveLayout.createRow(namaLayout, txfNamaLayout);

        var namaDescription = SAPUI.Label("", "Nama Desciption", "Bold", "100%"),
            txfNamaDescription = SAPUI.TextField("", "", "100%", 100, true, true);

        matrixSaveLayout.createRow(namaDescription, txfNamaDescription);

        var oButtonSaveLayout = SAPUI.Button("", "Save Layout", "", "", false, "Accept");
        oButtonSaveLayout.attachPress(function () {
            saveLayout(txfNamaLayout, txfNamaDescription)
        });

        function saveLayout(name, desc) {

            var layoutName = name.getValue(),
                layoutDesc = desc.getValue(),
                pCol = "",
                col = JSON.parse(window.localStorage.getItem("saveLayout" + pScreen)).columns;

            col.forEach(function (item) {
                pCol += item.id + ",";
            });

            pCol = pCol.slice(0, -1);

            var param = '{"user":"' + U5312UX5 + '",' +
                '"screen":"' + pScreen + '",' +
                '"layoutName":"' + layoutName + '",' +
                '"layoutDescrip":"' + layoutDesc + '",' +
                '"savedColumn":"' + pCol + '"}';

            $.ajax({
                url: WS_User + "saveLayout",
                type: "POST",
                dataType: "json",
                data: param,
                success: function (result) {
                    //console.log(result);
                    (result.saveLayoutResult == "1") ?
                        SAPUI.MessageBoxSuccess("Layout berhasil disimpan.") : SAPUI.MessageBoxError(result.saveLayoutResult);

                    dialogSave.close();
                },
                error: function (jqXHR, textStatus, errorThrow) {

                    console.log("Error");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrow);
                }
            });
        }

        dialogSave.addContent(matrixSaveLayout);
        dialogSave.addButton(oButtonSaveLayout);

        oButton.attachPress(function () {
            dialogSave.open();
        });

        return oButton;
    },
    // 30.08.2017
    // this button will display a dialog which contains some choices of available layout options
    // that might be implemented on the used screen
    // example of use:
    // var btnName = SAPUI.ButtonSelectLayout("button1", "GANTI TRUNK", "oTable", "Change layout", "", "", false, "Accept");
    ButtonSelectLayout: function (pID, pLink, pTable, pText, pTooltip, pIcon, pLite, pStyle) {
        var oButton = SAPUI.Button(pID, pText, pTooltip, pIcon, pLite, pStyle),
            pScreen = "" + pLink.split("/").slice(-1);

        oButton.attachPress(function () {
            openTheDialog();
        });

        function openTheDialog() {
            var dialogSelectLayout = SAPUI.Dialog("", "Select Layout", "75%", "auto"),
                tblSelectLayout = SAPUI.Table("", "100%", 7, "Single", "Scrollbar", true);

            tblSelectLayout.addColumn(SAPUI.Column("Layout Name", "TextView", "layoutName", "auto", "Begin", "Begin"));
            tblSelectLayout.addColumn(SAPUI.Column("Description", "TextView", "layoutDescrip", "auto", "Begin", "Begin"));
            tblSelectLayout.addColumn(SAPUI.Column("Column", "TextView", "savedColumn", "50%", "Begin", "Begin"));

            var btnApplyLayout = SAPUI.Button("", "Apply", "", "", false, "Accept");
            btnApplyLayout.attachPress(function () {
                applyLayout(dialogSelectLayout, tblSelectLayout);
            });

            dialogSelectLayout.addContent(tblSelectLayout);
            dialogSelectLayout.addButton(btnApplyLayout);

            var oModel = new sap.ui.model.json.JSONModel(),
                param = "{'user':'" + U5312UX5 + "', 'screen':'" + pScreen + "'}";

            $.ajax({
                type: "POST",
                url: WS_User + "getSavedLayout",
                dataType: "json",
                data: param,
                success: function (result) {

                    oModel.setData(result);
                    tblSelectLayout.setModel(oModel);
                    tblSelectLayout.bindRows("/getSavedLayoutResult");

                    dialogSelectLayout.open();
                },
                error: function (jqXHR, textStatus, errorThrow) {
                    console.log("Error");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrow);
                }
            });
        }

        function applyLayout(pDialog, pTableLayout) {

            var idx = pTableLayout.getSelectedIndex()

            if (pTableLayout.isIndexSelected(idx)) {
                var cxt = pTableLayout.getContextByIndex(idx),
                    path = cxt.sPath,
                    obj = pTableLayout.getModel().getProperty(path),
                    param = "{'id':'" + obj.id + "'}";

                $.ajax({
                    type: "POST",
                    url: WS_User + "getSavedLayoutById",
                    dataType: "json",
                    data: param,
                    success: function (result) {
                        var tempArr = [];

                        result["getSavedLayoutByIdResult"].forEach(function (item) {
                            tempArr.push({ id: item.id, key: item.columnName, description: item.displayedColumnName, template: item.bindingType })
                        });

                        pTable.getModel("tableModel").setProperty("/columns", tempArr);

                        var obj = { columns: tempArr };
                        window.localStorage.setItem("saveLayout" + pScreen, JSON.stringify(obj));

                        pDialog.close();
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        console.log("Error");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrow);
                    }
                });
            }

        }

        return oButton;
    },


    // error handling untuk ajax yang error
    ajaxErrorHandling: function (jqXHR, textStatus, errorThrown) {
        var message, diagnosis, procedure
        //var param = {Type: "E"}
        var param = {}
        var result = []

        if (jqXHR.status == 0) {
            message = "Ajax Error"
            diagnosis = "Network Error"
            procedure = "Please call IT"
        } else if (textStatus == "parsererror") {
            message = "Ajax Error"
            diagnosis = "Error while inputing data"
            procedure = "Please re-input your data"
        } else {
            message = errorThrown
        }

        if (message != '' || message != undefined) {
            param['Message'] = message;
        }

        if (diagnosis != '' || diagnosis != undefined) {
            param['Diagnosis'] = diagnosis;
        }

        if (procedure != '' || procedure != undefined) {
            param['Procedure'] = procedure;
        }

        //SAPUI.MessageDialog(param)
        result.push(param)
        SAPUI.DialogErrMessage(result)
    },

    //cek authorisasi tcode //masih salah
    onAuthorizationTcode: function () {
        var halaman = "" + location.href.split("/").slice(-1);
        var tCodeRaw = halaman.split(".")
        var tCode = tCodeRaw[0]
        console.log("tcode: " + tCode);
        var listSession = [];
        window.sessionStorage.setItem("tcodeVariantux5", tCode);

        var wsUrlTcode = WS_User + "WS_UC_Authorization";
        try {
            var objTcodeAuthor = {
                user: U5312UX5,
                lang: languageUX5,
                varianUser: tCode,
                mode: "Authorization"
            };

            var objTcode = {
                user: U5312UX5,
                lang: languageUX5,
                varianUser: tCode,
                mode: "GetTcodeInduk"
            };

        } catch (error) {
            SAPUI.MessageBox("There is invalid parameter: " + error, "Ada value parameter yang tidak terisi: " + error, "ERROR", "Status")
        }

        var paramAuthor = Global.dynamicParam("DspTcodeInduk", objTcodeAuthor);
        var paramTcode = Global.dynamicParam("DspTcodeInduk", objTcode);

        var tcodeInduk = "";
        $.ajax({
            url: wsUrlTcode,
            type: "POST",
            dataType: 'json',
            data: paramAuthor,
            success: function (result) {
                console.log(result)
                try {
                    Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                    authTcode = Finalresult.Result
                    console.log(authTcode)

                    if (authTcode == 1) {
                        getTcodeInduk()
                    } else {
                        alert("You dont have Autorized!", "Anda tidak memiliki ijin masuk tcode ini")
                        if (U5312UX5 == "" || U5312UX5 == null || U5312UX5 == "No User") {
                            sap.m.URLHelper.redirect("index.html");
                        } else {
                            sap.m.URLHelper.redirect("Dashboard.html");
                        }
                    }
                } catch (error) {
                    alert("ada kesalahan hubungi IT: " + error)
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
            }
        })

        function getTcodeInduk() {
            //cek tcode autorization  
            var authTcode = "";
            $.ajax({
                url: wsUrlTcode,
                type: "POST",
                dataType: 'json',
                data: paramTcode,
                success: function (result) {

                    console.log(result)
                    Finalresult = JSON.parse(result.WS_UC_AuthorizationResult);
                    tcodeInduk = Finalresult.Result;
                    Global.InsertSessionUser(tCode, tcodeInduk)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SAPUI.ajaxErrorHandling(jqXHR, textStatus, errorThrown);
                }
            });
        }
    },

    ConvTglYyyymmdd: function (pTanggal) {
        var hariVisit = pTanggal.substring(0, 2)
        var bulanVisit = pTanggal.substring(3, 5)
        var tahunVisit = pTanggal.substring(6)

        var tanggal = tahunVisit + bulanVisit + hariVisit
        return tanggal
    },

    addColumnSorterAndFilter: function (oColumn, oType = 'tanggal') {
        var oTable = oColumn.getParent();
        var oCustomMenu = new sap.ui.commons.Menu();

        // ConvTglYyyymmdd
        // console.log(oType)

        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        }

        function comparatorASC(value1, value2) {
            if (oType == "tanggal") {
                value1 = SAPUI.ConvTglYyyymmdd(value1)
                value2 = SAPUI.ConvTglYyyymmdd(value2)
            }

            if (oType == "tanggalPIB") {
                if (value1 == null || value1 == undefined || value1 == '') {
                    value1 = ''
                } else {
                    value1 = convertDate(new Date(value1))
                    value1 = SAPUI.ConvTglYyyymmdd(value1)
                }
                if (value2 == null || value2 == undefined || value2 == '') {
                    value2 = ''
                } else {
                    value2 = convertDate(new Date(value2))
                    value2 = SAPUI.ConvTglYyyymmdd(value2)
                }
            }

            if (value1 == null || value1 == undefined || value1 == '') {
                value1 = "99999999999999999999999999999999999999999999999999998"
            }
            if (value2 == null || value2 == undefined || value2 == '') {
                value2 = "99999999999999999999999999999999999999999999999999998"
            }

            value1 = value1.toString().split(',').join("").split('.').join("")
            value2 = value2.toString().split(',').join("").split('.').join("")

            if (value1.toUpperCase().includes("ROWS") == true || value1.toUpperCase().includes("TOTAL") == true) {
                value1 = "99999999999999999999999999999999999999999999999999999"
            }
            if (value2.toUpperCase().includes("ROWS") == true || value2.toUpperCase().includes("TOTAL") == true) {
                value2 = "99999999999999999999999999999999999999999999999999999"
            }

            if (oType == "string") {

                if (value1 == "99999999999999999999999999999999999999999999999999998") {
                    value1 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZY"
                }
                if (value2 == "99999999999999999999999999999999999999999999999999998") {
                    value2 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZY"
                }

                if (value1 == "99999999999999999999999999999999999999999999999999999") {
                    value1 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
                }
                if (value2 == "99999999999999999999999999999999999999999999999999999") {
                    value2 = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
                }
                if (value1.toUpperCase() < value2.toUpperCase()) return -1
                if (value1.toUpperCase() == value2.toUpperCase()) return 0
                if (value1.toUpperCase() > value2.toUpperCase()) return 1
            } else {
                if (parseInt(value1) < parseInt(value2)) return -1;
                if (parseInt(value1) == parseInt(value2)) return 0;
                if (parseInt(value1) > parseInt(value2)) return 1;
            }
        };

        function comparatorDESC(value1, value2) {

            if (oType == "tanggal") {
                value1 = SAPUI.ConvTglYyyymmdd(value1)
                value2 = SAPUI.ConvTglYyyymmdd(value2)
            }

            if (oType == "tanggalPIB") {
                if (value1 == null || value1 == undefined || value1 == '') {
                    value1 = ''
                } else {
                    value1 = convertDate(new Date(value1))
                    value1 = SAPUI.ConvTglYyyymmdd(value1)
                }
                if (value2 == null || value2 == undefined || value2 == '') {
                    value2 = ''
                } else {
                    value2 = convertDate(new Date(value2))
                    value2 = SAPUI.ConvTglYyyymmdd(value2)
                }
            }

            if (value1 == null || value1 == undefined || value1 == '') {
                value1 = "-99999999999999999999999999999999999999999999999999998"
            }
            if (value2 == null || value2 == undefined || value2 == '') {
                value2 = "-99999999999999999999999999999999999999999999999999998"
            }

            value1 = value1.toString().split(',').join("").split('.').join("")
            value2 = value2.toString().split(',').join("").split('.').join("")

            if (value1.toUpperCase().includes("ROWS") == true || value1.toUpperCase().includes("TOTAL") == true) {
                value1 = "-99999999999999999999999999999999999999999999999999999"
            }
            if (value2.toUpperCase().includes("ROWS") == true || value2.toUpperCase().includes("TOTAL") == true) {
                value2 = "-99999999999999999999999999999999999999999999999999999"
            }

            if (oType == "string") {

                if (value1 == "-99999999999999999999999999999999999999999999999999999") {
                    value1 = "111111111111111111111111111111111111111111111111111111"
                }
                if (value2 == "-99999999999999999999999999999999999999999999999999999") {
                    value2 = "111111111111111111111111111111111111111111111111111111"
                }
                if (value1 == "-99999999999999999999999999999999999999999999999999998") {
                    value1 = "222222222222222222222222222222222222222222222222222222"
                }
                if (value2 == "-99999999999999999999999999999999999999999999999999998") {
                    value2 = "222222222222222222222222222222222222222222222222222222"
                }

                if (value1.toUpperCase() < value2.toUpperCase()) return -1
                if (value1.toUpperCase() == value2.toUpperCase()) return 0
                if (value1.toUpperCase() > value2.toUpperCase()) return 1

            } else {
                if (parseInt(value1) < parseInt(value2)) return -1;
                if (parseInt(value1) == parseInt(value2)) return 0;
                if (parseInt(value1) > parseInt(value2)) return 1;
            }
        };

        oCustomMenu.addItem(new sap.ui.commons.MenuItem({
            text: 'Sort Ascending',
            icon: "sap-icon://sort-ascending",
            select: function () {
                var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
                oSorter.fnCompare = comparatorASC;
                oTable.getBinding("rows").sort(oSorter);

                for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
                oColumn.setSorted(true);
                oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
            }
        }));
        oCustomMenu.addItem(new sap.ui.commons.MenuItem({
            text: 'Sort Descending',
            icon: "sap-icon://sort-descending",
            select: function (oControlEvent) {
                var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
                oSorter.fnCompare = comparatorDESC;
                oTable.getBinding("rows").sort(oSorter);

                for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);

                oColumn.setSorted(true);
                oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
            }
        }));

        oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
            text: 'Filter',
            icon: 'sap-icon://filter',
            select: function (oControlEvent) {
                var filterValue = oControlEvent.getParameters().item.getValue();
                var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
                var filters = [];
                if (filterValue.trim() != '') {
                    var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);
                    filters = [oFilter1];
                }
                oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);
            }
        }));

        oColumn.setMenu(oCustomMenu);
        return oColumn;
    },

     addColumnSorterAndFilterQty: function (oColumn) {
        var oTable = oColumn.getParent();
        var oCustomMenu = new sap.ui.commons.Menu();

        function removeCommas (str) {
            if (typeof str == 'string') {
                return Number(str.replace(/,/g, ''))
            } else {
                return str
            }
        }

        function comparator(value1, value2) {
            value1 = removeCommas(value1)
            value2 = removeCommas(value2)

            if (parseFloat(value1) < parseFloat(value2)) return -1;
            if (parseFloat(value1) == parseFloat(value2)) return 0;
            if (parseFloat(value1) > parseFloat(value2)) return 1;
        };

        oCustomMenu.addItem(new sap.ui.commons.MenuItem({
            text: 'Sort Ascending',
            icon: "sap-icon://sort-ascending",
            select: function () {
                var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
                oSorter.fnCompare = comparator;
                oTable.getBinding("rows").sort(oSorter);

                for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
                oColumn.setSorted(true);
                oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
            }
        }));
        oCustomMenu.addItem(new sap.ui.commons.MenuItem({
            text: 'Sort Descending',
            icon: "sap-icon://sort-descending",
            select: function (oControlEvent) {
                var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
                oSorter.fnCompare = comparator;
                oTable.getBinding("rows").sort(oSorter);

                for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);

                oColumn.setSorted(true);
                oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
            }
        }));

        oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
            text: 'Filter',
            icon: 'sap-icon://filter',
            select: function (oControlEvent) {
                var filterValue = oControlEvent.getParameters().item.getValue();
                var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
                var filters = [];
                if (filterValue.trim() != '') {
                    var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);
                    filters = [oFilter1];
                }
                oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);
            }
        }));

        oColumn.setMenu(oCustomMenu);
        return oColumn;
    },

    onResetTable: function (pTable) {
        var oResetModel = new sap.ui.model.json.JSONModel()
        pTable.setModel(oResetModel)
    },

    ReplaceNullInArrObject: function (pObject) {
        for (var g = 0; g < pObject.length; g++) {
            Object.keys(pObject[g]).forEach(function (key) {
                if (pObject[g][key] === null) {
                    pObject[g][key] = "";
                }
            })
        }
    },

    MultipleMessages: function (result, navToPages) {
        var modelMsg = new sap.ui.model.json.JSONModel()
        var dlgMultipleMsg = SAPUI.Dialog("", "Messages", "60%", "", true)

        var tblDocLines = SAPUI.Table("", "auto", 5, "None", "Paginator", false)
        var clMsgType = SAPUI.Column("Type", "IconImageByData", "MsgType", "16%", "Center", "Center", "", "", {
            colTarget: "MsgType",
            data: [{
                "S": "icon-stat-4"
            },
            {
                "E": "icon-stat-2"
            },
            ]
        });
        var clmnItemsDL = SAPUI.Column("Items", "TextView", "Item", "13%", "Begin", "Center")
        var clmnMesgTxtDL = SAPUI.Column("Message Text", "TextView", "Desc", "auto", "Begin", "Left")

        tblDocLines.addColumn(clMsgType);
        tblDocLines.addColumn(clmnItemsDL);
        tblDocLines.addColumn(clmnMesgTxtDL);

        dlgMultipleMsg.addContent(tblDocLines)

        dlgMultipleMsg.addButton(new sap.ui.commons.Button({
            text: "Accept",
            style: "Accept",
            icon: "sap-icon://accept",
            press: function () {
                callbackOK(navToPages)

            }
        }))

        tblDocLines.setModel(modelMsg)
        modelMsg.setData({ Message: result })
        tblDocLines.bindRows("/Message")

        function callbackOK(navToPages) {
            console.log(navToPages)
            if ((navToPages == "") || (navToPages == undefined)) {
                dlgMultipleMsg.close();
            } else {
                var isExisthtml = navToPages.includes(".html")
                console.log(isExisthtml)
                if (isExisthtml) {
                    sap.m.URLHelper.redirect(navToPages);
                    dlgMultipleMsg.close();
                } else {
                    SAPUI.Route(navToPages)
                    dlgMultipleMsg.close();
                }

            }
        }

        dlgMultipleMsg.open()
        dlgMultipleMsg.setShowCloseButton(false)
    },

    //untuk parameter arrsort isinya array object yg berupa:
    //text = text untuk di dialognya
    //key = bindingan kolomnya
    //operator = operator untuk filter, saat ini ada beberapa kondisi yaitu:
    //jika kolom angka pake EQ
    //kalau string pakai Contains
    //kalau date pakai Date
    //kalau quantity pakai Qty (khusus yg pakai globalnumberwithcommas)
    sortMTable: function (oTable, arrSort) {
        var filterTable = oTable.getBinding("items").aFilters
		var valFilter = []
		filterTable.forEach(function(oItem) {
			valFilter.push({path : oItem.sPath,value : oItem.oValue1})
		})

        var arrSortItem = []
        var bolSelected = true
        arrSort.forEach(function(oItem) {
            arrSortItem.push(
                new sap.m.ViewSettingsItem("",  {
                text : oItem.text,
                key : oItem.key+"___"+oItem.operator,
                selected: bolSelected
                })
            )
            bolSelected = false
        })

        var custControl
        var arrFilterItem = []
        arrSort.forEach(function(oItem) {
            if (oItem.operator == "Date"){
                custControl = new sap.m.DatePicker({
                    // id: pID,
                    // width: pWidth,
                    // value: "",
                    displayFormat: "dd-MM-yyyy",
                    valueFormat: "dd-MM-yyyy"
                })
                    .addStyleClass("sapUiSizeCompact")
                    .setEnabled(true)
                    .setEditable(true)
            } else {
                custControl = new sap.m.Input("", {
                            
                })
            }

            arrFilterItem.push(
                new sap.m.ViewSettingsCustomItem("",  {
					text:  oItem.text,
					key: oItem.key+"___"+oItem.operator,
					customControl: custControl
				})
            )
        })

        var dlgSort = new sap.m.ViewSettingsDialog("", {
            title: "Sort & Filter",
            sortItems: arrSortItem,
            filterItems:arrFilterItem,
            confirm: function(oEvent){
                handleSortDialogConfirm(oEvent)
                handleFilterDialogConfirm(this.getFilterItems())
			},
			resetFilters : function(){
				handleFilterDialogConfirm(this.getFilterItems(),"reset")
				this.destroy()
			}
        }).addStyleClass("sortDialog")

        var dlgFilItems = dlgSort.getFilterItems()
		// dlgFilItems[1]._control.attachChange(function(){
        //     console.log("a")
        // })
		dlgFilItems.forEach(function(oItemFil) {
            oItemFil._control.attachChange(function(){
                if(this.getValue() != ""){
                    dlgSort._filterList.getItems().forEach(function(oFilter) {
                        if(oItemFil.mProperties.text == oFilter.getTitle()){
                            if(!oFilter.getTitle().includes('*')){
                                oFilter.setTitle(oFilter.getTitle()+'*')
                                oItemFil.mProperties.text = oItemFil.mProperties.text+"*"
                            }
                        }
                    })
                } else {
                    dlgSort._filterList.getItems().forEach(function(oFilter) {
                        if(oItemFil.mProperties.text == oFilter.getTitle()){
                            if(oFilter.getTitle().includes('*')){
                                oFilter.setTitle(oFilter.getTitle().slice(0, -1))
                                oItemFil.mProperties.text = oItemFil.mProperties.text.slice(0, -1)
                            }
                        }
                    })
                }
            })

			filterTable.forEach(function(oItem) {
				var aSplit = oItemFil.mProperties.key.split("___")
				if(oItem.sPath == aSplit[0]){
                    oItem.oValue1 = oItem.oValue1 == null ? "" : oItem.oValue1
                    if(aSplit[1] == "Date"){
                        if(oItem.oValue1 != ""){
                            oItemFil._control.setDateValue(oItem.oValue1)
                        } else {
                            oItemFil._control.setValue(oItem.oValue1)
                        }
                    } else {
                        oItemFil._control.setValue(oItem.oValue1)
                    }
					if(oItem.oValue1 != ""){
						oItemFil.mProperties.text = oItemFil.mProperties.text+"*"
					}
				}
			})
		})

        dlgSort.open()
        console.log(dlgSort)
        dlgSort._dialog.getBeginButton().setType("Emphasized")
        dlgSort._dialog.getEndButton().setType("Ghost")
        dlgSort._resetButton.setType("Transparent")
        dlgSort._resetButton.setText("Reset Filter")
        dlgSort._resetButton.setIcon("")
        dlgSort._page2.getCustomHeader().destroyContentRight()
        dlgSort._page2.getCustomHeader().getContentLeft()[0].setType("Transparent")
        dlgSort._page2.getCustomHeader().getContentLeft()[0].addStyleClass("filterButtonDetail")
        
        function handleSortDialogConfirm (oEvent) {
            var mParams = oEvent.getParameters(),
                oBinding = oTable.getBinding("items"),
                sPath,
                bDescending,
                aSorters = [];

            function removeCommas (str) {
                if (typeof str == 'string') {
                    return Number(str.replace(/,/g, ''))
                } else {
                    return str
                }
            }
    
            function comparator(value1, value2) {
                value1 = removeCommas(value1)
                value2 = removeCommas(value2)
    
                if (parseFloat(value1) < parseFloat(value2)) return -1;
                if (parseFloat(value1) == parseFloat(value2)) return 0;
                if (parseFloat(value1) > parseFloat(value2)) return 1;
            };
    
            var aSplit = mParams.sortItem.getKey().split("___"),
            sPath = aSplit[0]
            bDescending = mParams.sortDescending;
            var oSorter = new sap.ui.model.Sorter(sPath, bDescending)
            if(aSplit[1] == "Qty"){
                oSorter.fnCompare = comparator;
            }
            aSorters.push(oSorter);

            // apply the selected sort and group settings
            oBinding.sort(aSorters);
        }

        function handleFilterDialogConfirm (filterItems, filterType = "") {
            var oBinding = oTable.getBinding("items"),
                aFilters = [];

            filterItems.forEach(function(oItem) {
                if (filterType == ""){
                    var aSplit = oItem.mProperties.key.split("___"),
                    sPath = aSplit[0],
                    sOperator = aSplit[1],
                    sValue1
                    if(sOperator == "Date"){
                        sValue1 = oItem._control.getDateValue()
                        sOperator = "EQ"
                    } else if(sOperator == "Qty"){
                        sValue1 = oItem._control.getValue()
                        sOperator = "EQ"
                    } else {
                        sValue1 = oItem._control.getValue()
                    }
                    sValue1 = sValue1 == null ? "" : sValue1
                    sValue2 = ""
    
                    if (sValue1 != "") {
                        var	oFilter = new sap.ui.model.Filter(sPath, sOperator, sValue1, sValue2);
                            aFilters.push(oFilter)
                            oItem._control.setValue(sValue1)
                    }
                }
            });
                
            oBinding.filter(aFilters);
        }
    },

    Export: function (pType, pData, pFileName, pFileHeader, arrColName, arrColSize, arrRowSize, arrMerge, isBCReport = null) {
        if(isBCReport != null){
            const company = "PT Trias Sentosa, Tbk."
            const
            {
                type, 
                finalData,
                title,
                colNameXlsx = finalData[1],
                fnameXLS = title,
                colSize, 
                rowSize, 
                merge,
                hasilPdf,
                columnPdf,
                periode,
                headerCSV,
                dataCSV

            } = isBCReport

            var Workbook = function Workbook() {
                if(!(this instanceof Workbook)) return new Workbook();
                this.SheetNames = [];
                this.Sheets = {};
            }
            var wb = Workbook();
            wb.SheetNames.push(fnameXLS);
    
            var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
                var headerStyle = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },
                                    font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                    fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                    bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },
                                    bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},
                                    right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                var ws = {};
                var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
                for(var R = 0; R != data.length; ++R) {
                    for(var C = 0; C != data[R].length; ++C) {
                        if(range.s.r > R) range.s.r = R;
                        if(range.s.c > C) range.s.c = C;
                        if(range.e.r < R) range.e.r = R;
                        if(range.e.c < C) range.e.c = C;
                        var cell = {v: data[R][C] };
                        if(cell.v == null) continue;
                        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
    
                        if(typeof cell.v === 'number') {
                            cell.t = 'n';
                            cell.z = "#,##0.00"
                            cell.s = {font:{ sz:"8.5", name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}}}}
    //                    	cell.s = {alignment:{ wrapText: true }}
                            }
                        else if(typeof cell.v === 'boolean') {
                            cell.t = 'b';
                            }
                        else if(cell.v instanceof Date) {
                            cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                            cell.v = datenum(cell.v);
                        }
                        else if(cell.v == finalData[0][0]) {
                            cell.t = 's';
                            cell.s = {alignment:{ wrapText: true,vertical: "center" },font:{ bold: true,sz:"12",name:"Times New Roman" }}
                        }
                        else if(finalData[finalData.length-1].includes(cell.v)||cell.v == " "||cell.v.includes("Rows")){
                            cell.t = 's';
                            cell.s = headerStyle
                        }
                        else {
                            cell.t = 's';
                            cell.s = {font:{ sz:"8.5" ,name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },
                                        bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},
                                        right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                        }

                        if(typeof colNameXlsx[0] == 'object'){
                            if(colNameXlsx[0].includes(cell.v)){
                                cell.t = 's';
                                cell.s = headerStyle
                            }
                            else if(colNameXlsx[1].includes(cell.v)){
                                cell.t = 's';
                                cell.s = headerStyle
                            }
                        }else{
                            if(finalData[1].includes(cell.v)){
                                cell.t = 's';
                                cell.s = headerStyle
                            }
                        }
                        ws[cell_ref] = cell;
                    }
                }
                if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            }
    
            switch(type.toUpperCase()){
                case 'XLS':
                    finalData.unshift([title + " " +  company + " " + periode])
                    break;
                case 'XLSX':
                    finalData.unshift([title + "\r\n" + company + "\r\n" + periode])
                    break;
            }

            var ws = sheet_from_array_of_arrays(finalData);

             // Setting up Excel column width
            ws['!cols'] = colSize;
            ws['!rows'] = rowSize;
            ws['!merges'] = merge;

            console.log(ws)

            wb.Sheets[fnameXLS] = ws;        // wb.Sheets[title] -> To set sheet name

            switch(type.toUpperCase()){
                case 'XLSX':
                    $.getScript("asset/js/ExportFiles/xlsx.js", function() {
                        var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary',showGridLines: false});
                        var s2ab = function s2ab(s) {
                            var buf = new ArrayBuffer(s.length);
                            var view = new Uint8Array(buf);
                            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                            return buf;
                        };
                        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), title + " " + company + " " + periode + ".xlsx");
                    });
                    break;
                case 'XLS':
                    $.getScript("asset/js/ExportFiles/bits/xlsx.js", function() {
                        var wbout = XLSX.write(wb, {bookType:'xlml', bookSST:true, type: 'binary',showGridLines: false});
                        var s2ab = function s2ab(s) {
                            var buf = new ArrayBuffer(s.length);
                            var view = new Uint8Array(buf);
                            for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                            return buf;
                        };
                        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), title + " " + company + " " + periode + ".xls");
                    });
                    break;
                case 'CSV':
                    var itemFormatted = typeof dataCSV != 'object' ?JSON.parse(dataCSV) : dataCSV;
                    var CSV = '';
                    CSV+= title + '';
                    
                    // Header
                    for(let i = 0; i < headerCSV.length; i++){
                        if(i == headerCSV.length - 1){
                            CSV+= headerCSV[i]
                        }else{
                            CSV+= headerCSV[i] + ','
                        }

                    }
                    CSV+= '\r\n'
            
                    // Data
                    for (var i = 0; i < itemFormatted.length; i++) {
                        var line = "";
                        const keys = Object.keys(itemFormatted[i])
                        for(let j = 0; j < keys.length; j++){
                            if(j == 0){
                                line += '"' + itemFormatted[i][keys[j]] + '","'
                            }else if(j == keys.length - 1){
                                line += itemFormatted[i][keys[j]]+'"'
                            }else{
                                line += itemFormatted[i][keys[j]]+'","'
                            }
                        }
                        CSV += line + '\r\n';
                    }

            
                    if (CSV == '') {
                        alert("Invalid data");
                        return;
                    }
                
                    // Generate a file name
                    var fileName = title;
            
                    // Initialize file format you want csv or xls
                    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                    var link =document.createElement("a");
                    link.href= uri;
                    link.style= "visibility:hidden";
                    link.download= fileName + ".csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                case 'PDF':
                    var hasil = hasilPdf
                    var pdfsize = 'b2';
                    var doc = new jsPDF('l','pt',pdfsize);
                    var data = hasil
                    
                    var columns = columnPdf
            
                    doc.setFontSize(15);
                    doc.setFont('Times New Roman');
                    doc.setTextColor(40);
                    doc.setFontStyle('bold');
                    
                    doc.text(title, 40, 100);
                    doc.text(company, 40, 118);
                    doc.text(periode, 40, 136);
            
                    doc.autoTable(columns, data,{
                        startY: 150,
                        theme: 'plain',
                        tableWidth: 'auto',
                        styles: 
                        {
                            font: 'Tahoma',
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            overflow: 'linebreak', 
                            columnWidth: 'auto'
                        },
                        headerStyles: 
                        {
                            font: 'Tahoma',
                            fillColor: [211, 211, 211],
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            fontStyle: 'normal',
                            halign: 'center'
                        },
                        columnStyles: {text: {columnWidth: 'auto'}},
                        drawCell: function(cell, data) {
                            var rows = data.table.rows;
                            if (data.row.index == rows.length - 1) {
                                doc.printingHeaderRow = true;
                                doc.setFillColor(211, 211, 211)
                            }
                        }
                    });
                    doc.save(`${title} ${company} ${periode}.pdf`);
                    break;
                default:
                    break;

            }
            Global.InsLogActivity(SAPUI.getRouteName().split("_")[0], `Export To ${type.toUpperCase()} ${title} Periode ${periode}`)
        }else{
            var arrKeys = Object.keys(pData[0]);
            if(pType == "xlsx"){
                var aData = typeof pData != 'object' ? JSON.parse(pData) : pData;
                if (aData.length) {
                    var aFinalXlsxData

                    // Array variable to store header data in XLSX file
                    aXlsxTitleData = [];
                    aFinalXlsxData = [];

                    aXlsxTitleData.push(pFileHeader);
                    aFinalXlsxData.push(aXlsxTitleData);

                    if(typeof arrColName[0] === "string"){
                        aFinalXlsxData.push(arrColName);
                    } else {
                        for (var i = 0; i < arrColName.length; i++) {
                            aFinalXlsxData.push(arrColName[i]);
                        }
                    }

                    // Below loop to extract data
                    for (var i = 0; i < aData.length; i++) {
                        // Array variable to store content data in XLSX file
                        var aXlsxContentData = [];
                        for ( var iIndex in aData[i]) {
                            aXlsxContentData.push(aData[i][iIndex]);
                        }
                        aFinalXlsxData.push(aXlsxContentData);
                    }

                    var Workbook = function Workbook() {
                        if(!(this instanceof Workbook)) return new Workbook();
                        this.SheetNames = [];
                        this.Sheets = {};
                    }
                    var wb = Workbook();
                    wb.SheetNames.push(pFileName);
                    const Qty = ["Quantity", "Qty", "quantity", "qty"]
                    var sheet_from_array_of_arrays = function sheet_from_array_of_arrays(data, opts) {
                        var ws = {};
                        var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
                        for(var R = 0; R != data.length; ++R) {
                            for(var C = 0; C != data[R].length; ++C) {
                                if(range.s.r > R) range.s.r = R;
                                if(range.s.c > C) range.s.c = C;
                                if(range.e.r < R) range.e.r = R;
                                if(range.e.c < C) range.e.c = C;
                                var cell = {v: data[R][C] };
                                if(cell.v == null) continue;
                                var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

                                if(typeof arrColName[0] === "string"){
                                    if(typeof cell.v === 'number') {
                                        var isQty = false
                                        for(let i = 0; i < Qty.length; i++){
                                            if(arrColName[C].includes(Qty[i])){
                                                isQty = true
                                                break
                                            }
                                        }
                                        if(isQty){
                                            cell.z = "#,##0.0000"
                                        }else{
                                            cell.z = "#,##0.00"
                                        }
                                        cell.t = 'n';
                                        cell.s = {font:{ sz:"8.5", name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}}}}
                                        }
                                    else if(typeof cell.v === 'boolean') {
                                        cell.t = 'b';
                                        }
                                    else if(cell.v instanceof Date) {
                                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                        cell.v = datenum(cell.v);
                                    }
                                    else if(cell.v == aXlsxTitleData[0]) {
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center" },font:{ bold: true,sz:"12",name:"Times New Roman" }}
                                    }
                                    else if(arrColName.includes(cell.v)){
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                                fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                                bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                    else if(cell.v.includes("Rows")||cell.v.includes("Total")||cell.v.includes("Dokumen Pabean")||cell.v.includes("Bukti Penerimaan Barang")||cell.v == " "){
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                                fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                                bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                    else {
                                        //A9A9A9 maybe you can diff the result with space instead before binding the data
                                                cell.t = 's';
                                                cell.s = {font:{ sz:"8.5" ,name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                } else {
                                    if(typeof cell.v === 'number') {
                                        cell.t = 'n';
                                        cell.s = {font:{ sz:"8.5", name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}}}}
                                        }
                                    else if(typeof cell.v === 'boolean') {
                                        cell.t = 'b';
                                        }
                                    else if(cell.v instanceof Date) {
                                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                        cell.v = datenum(cell.v);
                                    }
                                    else if(cell.v == aXlsxTitleData[0]) {
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center" },font:{ bold: true,sz:"12",name:"Times New Roman" }}
                                    }
                                    else if(arrColName[0].includes(cell.v)){
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                                fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                                bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                    else if(arrColName[1].includes(cell.v)){
                                            cell.t = 's';
                                            cell.s = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                                    fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                                    bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                        }
                                    else if(cell.v.includes("Rows")||cell.v.includes("Total")||cell.v.includes("Dokumen Pabean")||cell.v.includes("Bukti Penerimaan Barang")||cell.v == " "){
                                        cell.t = 's';
                                        cell.s = {alignment:{ wrapText: true,vertical: "center",horizontal: "center" },font:{ sz:"8.5" ,name:"Tahoma"},fill: {patternType: 'solid',
                                                fgColor: { theme: 8, tint: 0.3999755851924192, rgb: 'DCDCDC' },
                                                bgColor: { indexed: 64 } },border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                    else {
                                        //A9A9A9 maybe you can diff the result with space instead before binding the data
                                                cell.t = 's';
                                                cell.s = {font:{ sz:"8.5" ,name:"Tahoma"},border:{ top:{style:"thin", color: {rgb: 'A9A9A9'} },bottom:{style:"thin", color: {rgb: 'A9A9A9'}},left:{style:"thin", color: {rgb: 'A9A9A9'}},right:{style:"thin", color: {rgb: 'A9A9A9'}} }}
                                    }
                                }

                                

                                ws[cell_ref] = cell;
                            }
                        }
                        if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                        return ws;
                    }

                    var ws = sheet_from_array_of_arrays(aFinalXlsxData);

                    // Setting up Excel column width
                    var cols = []
                    for (var i = 0; i < arrColSize.length; i++) {
                        cols.push({wch:arrColSize[i]})
                    }
                    ws['!cols'] = cols

                    var rows = []
                    for (var i = 0; i < arrRowSize.length; i++) {
                        rows.push({hpt:arrRowSize[i]})
                    }
                    ws['!rows'] = rows
                    
                    ws['!merges'] = arrMerge

                    console.log(ws)
                    wb.Sheets[pFileName] = ws;        // wb.Sheets[ReportTitle] -> To set sheet name
                    
                    $.getScript("asset/js/ExportFiles/xlsx.js", function() {
                    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary',showGridLines: false});
                    var s2ab = function s2ab(s) {
                        var buf = new ArrayBuffer(s.length);
                        var view = new Uint8Array(buf);
                        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    };
                    
                    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), pFileName + ".xlsx");
                    });
                    
                } else {
                    alert("Tidak ada data")
                }
            } else if(pType == "pdf"){
                var hasil = pData
                var pdfsize = 'b2';
                var doc = new jsPDF('l','pt',pdfsize);
                var data = hasil

                var columns = []
                for (var i = 0; i < arrColName.length; i++) {
                    columns.push({title: arrColName[i], dataKey: arrKeys[i]})
                }
                
                doc.setFontSize(15);
                doc.setFont('Times New Roman');
                doc.setTextColor(40);
                doc.setFontStyle('bold');
                
                doc.text(pFileHeader, 40, 100);
                if(!pFileHeader.includes("PT Trias Sentosa, Tbk.")){
                    doc.text("PT Trias Sentosa, Tbk.", 40, 118);
                }

                doc.autoTable(columns, data,{
                    startY: 175,
                    theme: 'plain',
                    tableWidth: 'auto',
                    styles: {
                            font: 'Tahoma',
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            overflow: 'linebreak', 
                            columnWidth: 'auto'
                                    },
                    headerStyles: {
                            font: 'Tahoma',
                            fillColor: [211, 211, 211],
                            lineColor: [128, 128, 128],
                            lineWidth: 0.75,
                            fontStyle: 'normal',
                            halign: 'center'
                            },
                                    
                    columnStyles: {text: {columnWidth: 'auto'}},
                    drawCell: function(cell, data) {
                        if(typeof cell.raw == 'number'){
                            cell.text = [Global.numberWithCommas(cell.raw)]
                        }
                        var rows = data.table.rows;
                        if (data.row.index == rows.length - 1) {
                            doc.printingHeaderRow = true;
                            doc.setFillColor(211, 211, 211)
                        }
                        }
                });
                doc.save(pFileName+".pdf");
            }
            Global.InsLogActivity(window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split(".")[0], "Export To "+pType.toUpperCase()+" "+pFileName)
        }   
    },

    UpdRptTotalFilter: function(param){
        const {
            table,
            keys,
            sumTable
        } = param

        var result = {}

        if(table instanceof sap.ui.table.Table){
            var filtered   = table.getBinding("rows").aIndices
            var model      = table.getModel().getData()
            var modelIndex = Object.keys(model)[0]
            var arrModel   = model[modelIndex]

            var sumModel      = sumTable.getModel().getData()
            var sumModelIndex = Object.keys(sumModel)[0]
            var arrTblTotal   = sumModel[sumModelIndex]

            if(filtered.length === 0){
                for(let j = 0; j < keys.length; j++){
                    arrTblTotal[0][keys[j]] = "Total :  0"
                }
            }else{
                for(let i = 0; i < filtered.length; i++){
                    for(let j = 0; j < keys.length; j++){
                        if(result[keys[j]] == undefined){
                            result[keys[j]] = Global.removeCommas(arrModel[filtered[i]][keys[j]])
                        }else{
                            result[keys[j]] = result[keys[j]] + Global.removeCommas(arrModel[filtered[i]][keys[j]])
                        }
    
                        if(i == filtered.length - 1){
                            const Qty = ["Quantity", "Qty", "quantity", "qty"]
                            var isQty = false
                            for(let i = 0; i < Qty.length; i++){
                                if(keys[j].includes(Qty[i])){
                                    isQty = true
                                    break
                                }
                            }
                            if(isQty){
                                arrTblTotal[0][keys[j]] = "Total : " + Global.numberWithCommas(result[keys[j]].toFixed(4))
                            }else{
                                arrTblTotal[0][keys[j]] = "Total : " + Global.numberWithCommas(result[keys[j]].toFixed(2))
                            }
                        }
                    }
                }
            }
            sumTable.getModel().refresh()
        }else{
            throw "input param is not sap.ui.table.Table instance"
        }
    }
}
