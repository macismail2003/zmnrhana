sap.ui.controller("zalp_25042017.login1", {
	LogonBtnPress: function(pwd){
		var oLoginView = new LoginView();
		if(pwd == 'Seacox@123'){
			oLoginView.changePassword();
		}
		else{
			oLoginView.authenticateUser();
		}
			//window.open("UserHome.html","_self");
	}
});
