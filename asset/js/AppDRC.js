var serverhostname = window.location.hostname
var serverhost = window.location.host
var serverpathname = window.location.pathname 
var serverprotocol = window.location.protocol 
//var serverassign = window.location.assign("UM02_01.html")
var serverhref = window.location.href 
 
// Global.KeyboardGlobal();
var loadingMKII = SAPUI.BusyDialog()

var NumberRange=""
var ZCheck;
//Declare Variabel

var base64txt;
var ClientIP=window.localStorage.getItem("ActivityIP");
var userSession = window.localStorage.getItem("userSession");		//buat new session
var ActivityIP = window.localStorage.getItem("ActivityIP");
var AppStatus = window.localStorage.getItem("AppStatus");
var U5312UX5 = window.localStorage.getItem("userNameux5");			//user name
var t0123nUX5 = window.localStorage.getItem("tokenux5");
var tcodeSessionUX5 = window.localStorage.getItem("tcodeux5");  	//search auto complete
var languageUX5 = window.localStorage.getItem("languageux5");	
var X_TcodeUX5 = window.sessionStorage.getItem("tcodeIndukux5");	//tode induk
//var X_Varian = window.localStorage.getItem("tcodeVariant");
var X_VarianUX5 = window.sessionStorage.getItem("tcodeVariantux5");	//tcode variant
var userTypeUX5 = window.localStorage.getItem("userTypeux5");
//cancel pending order
var Filter1=window.localStorage.getItem("filter1");
var startedDate=window.localStorage.getItem("startedDate");
var autoComplete=window.localStorage.getItem("autocompleteux5");


//JRLABEL
//
//PFCG
var OFCG01_xRoleUser = window.localStorage.getItem("roleUser")
var OFCG01_xJSONTcode = window.localStorage.getItem("jsonTcode")
//
var clientux5 = "100";
var companyCodeux5 = "9999";
var returnPage;
var iconLanguage = window.localStorage.getItem("iconLang");

//SAPUI.SwicthOffApp();
////alert("test")
//
//SAPUI.CheckAppStatus();
//SAPUI.CheckConSQL();