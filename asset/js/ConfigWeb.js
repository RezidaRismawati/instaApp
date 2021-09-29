/**
 * Config Connection To Web Service
 * 
 */

var urlDevBC = 'http://localhost:49838/'; // Endpoint for dev

var urlLocal = 'http://localhost:61738/'; // Endpoint for dev
//var urlLocal = 'http://192.168.1.92:61738/'; // Endpoint for dev

var urlDev = 'http://192.168.1.92/ITINV_BETA1/'; // Endpoint for DEV  
var urlQasWeb = '/WS_ITINVQA/'; // Endpoint for QAS Demo Publish  
var urlQas = 'https://192.168.1.70/WS_ITINVQA/'; // Endpoint for QA
var urlPrdWeb = '/WS_ITINVPRD/'; // Endpoint for PRD
var urlPrd = 'https://192.168.1.70/WS_ITINVPRD/'; // Endpoint for PRD

var urlRoot = urlLocal; // Toggle deploy/dev
var urlWebservice = urlRoot + "Service1.svc/";

var WS_Transaction = urlRoot + "MainServices/Transaction/Transaction.svc/";
var WS_Upload = urlRoot + "MainServices/Upload/Upload.svc/";
var WS_Report = urlRoot + "MainServices/Report/Report.svc/";
var WS_User = urlRoot + "MainServices/UserControl/UserControl.svc/";

var Server1 = "PRD";
var WS_SY = "http://localhost:62990/MainServices/SY/System.svc/";
var WS_PP = "http://localhost:62990/MainServices/PP/ProductionPlanning.svc?wsdl/";

/* Web Service */
var ip_WS = 'localhost:62990';
// var ip_WS = '192.168.1.92/WS_WMS';

var dir_WS_PP = "http://"+ ip_WS +"/MainServices/PP/";
var dir_WS_MM = "http://"+ ip_WS +"/MainServices/MM/";
var dir_WS_SD = "http://"+ ip_WS +"/MainServices/SD/";
var dir_WS_SY = "http://"+ ip_WS +"/MainServices/SY/";
var dir_WS_Report = "http://"+ ip_WS +"/MainServices/Report/";

var WS_PP = dir_WS_PP + "ProductionPlanning.svc/";
var WS_MM = dir_WS_MM + "MaterialManagement.svc/";
var WS_SD = dir_WS_SD + "SalesDistribution.svc/";
var WS_SY = dir_WS_SY + "System.svc/";
var WS_Report = dir_WS_Report + "Report.svc/";

/* For upload image
    1. Install XAMPP first
    2. Run Apache and get active server link and port (urlSrv)
    3. Make new folder for target (dirTarget) at C\xampp\htdocs
    4. Make receiver.php for receive file inside new folder */
var dirImgFolder = 'Images/';
/* var urlSrv = 'http://192.168.88.88:80/';
var urlSrv = 'http://192.168.1.232:8081/';
var dirTarget = 'WasteDiscovery/';
var urlImgSrv = urlSrv + dirImgFolder;
var urlTempImgSend = urlImgSrv + 'receiver.php'; */

var dataTempUPGRF1, dataTempUPGRF1

var sumLoading = SAPUI.BusyDialog();

const browserCheck = {
    fetch: 'fetch' in window
}
if(browserCheck.fetch){
    console.log('%cBrowser support FetchAPI 😃','color:green', )
}else{
    console.log("%cBrowser doesn't support FetchAPI yet 😢",'color:red', )
}

function isNotEmpty(boom) {
    return boom != null && typeof boom != 'undefined' && boom.length > 0
};

function sanitize(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerText;
};

SAPUI.SwicthOffApp()

/**
 * @function
 * Param
 * @url string
 * @body object || string
 * @method string 
 * Return
 * @res Promise (await variable)
 */
async function fetchApi(req) {
    SAPUI.SwicthOffApp("fetch")
    const {url, body, method} = req

    // const keys = body.keys
    // const tblKeys = []

    // // Save keys for Table Type
    // for (let i = 0; i < keys.length; i++) {
    //     if(keys[i].includes("Tbl")){
    //         tblKeys.push(keys[i])
    //     }
    // }

    // if(tblKeys.length > 0){
    //     for (let i = 0; i < tblKeys.length; i++) {
    //         const element = body[tblKeys[i]]
    //         var elementParse = JSON.parse(element)
            
    //     }
    // }

    var readySend = sanitize( // Sanitize User Inputs
        Global.dynamicParam( // Parsing to Acceptable Format for WS
            method,
            typeof body == 'string' ?  // Check if body require to Parse (Must Object)
                JSON.parse(body) : body
        )
    )
    // Just uncomment 2 line below to debugging, be careful 😆
    // console.log('%c Body Before Send From FetchAPI 😃','color:green', readySend)
    // throw 'Just For Testing! 😘'
    return fetch(url, {
        method: 'post', // All http method always post
        body: readySend
    })
    .then(res => {
        //Parsing to json if response ok
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
        return Global.dynamicDeserialize(res)
    })
    .catch(e => {
        // SAPUI.MessageBoxAlert(`Hubungi IT, Terjadi error ${e.name}: "${e.message}"`)
        console.log('Fetch Api Error', e)
    })
}

function deepCopy(obj){
    if(typeof obj == 'object'){
        return JSON.parse(JSON.stringify(obj))
    }else{
        return obj
    }
}


var pnlHeaderMenu = new sap.m.Panel({
    //content: [mtrHeader]
})

var page = new sap.m.Page("idPage", {
    title: "HOME",
    showHeader: false,
    subHeader: [new sap.m.Toolbar({
        content: pnlHeaderMenu
    })],
    enableScrolling: true
});

var pageLogin = new sap.m.Page("idPageLogin", {

});


var list = new sap.m.List("listId", {
    inset: false
})

var pageList = new sap.m.Page({
    title: ""
})

function unifiedShell(title) {
    var xShell = new sap.ui.unified.Shell({
        icon: "asset/image/TRIAS WATERMARK.png",
        headItems: [

            new sap.ui.unified.ShellHeadItem({
                tooltip: "Home",
                icon: "sap-icon://home",
                visible: "false",
                press: function () {
                    sap.m.URLHelper.redirect("dashboard.html");
                }
            })
        ],
        headEndItems: [
            new sap.ui.unified.ShellHeadItem({
                icon: "sap-icon://log",
                tooltip: "Logoff",
                press: function () {
                    U5312 = "";
                    Server1 = "";
                    window.localStorage.clear();
                    window.sessionStorage.clear()
                    sap.m.URLHelper.redirect("index.html");
                }
            })
        ],

        //Demo Cloud Edition 
        search: new sap.m.Title({
            text: title,
            width: "100%",
            textAlign: "Center"
        }),
        user: new sap.ui.unified.ShellHeadUserItem({
            image: "sap-icon://person-placeholder",
            username: window.localStorage.getItem("userName"),
            showPopupIndicator: false,
        }),
        content: page,
        paneContent: [pageList],
    })

    return xShell;
}