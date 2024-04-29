const VNOSNA_POLJA = ["Form_Ime", "Form_Priimek", "Form_DatumRojstva", "Form_VpisnaStevilka", "Form_Username", "Form_NewPassword", "Form_NewPasswordConfirmation", "Form_OrganizacijaId"];
const GESLA = ["Form_NewPassword", "Form_NewPasswordConfirmation"];

//Odprem link na UL password reset
browser.browserAction.onClicked.addListener(function(activeTab){
	let currentURL = activeTab.url;
	if(currentURL === "https://id.uni-lj.si/DigitalnaIdentiteta/PonastavitevGesla") {
		// Shranimo podatke, vnesene na tej strani!
		
	} else {
		console.log("Na strani za ponastavitev gesla vnesite svoje podatke. Za geslo uporabite staro geslo, ki ga želite ohraniti več kot 180 dni. Namesto gumba za reset pritisnite znova na ta dodatek!")
		var newURL = "https://id.uni-lj.si/DigitalnaIdentiteta/PonastavitevGesla";
		browser.tabs.create({ url: newURL });
	}
});

browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "help") {
				// Tu bi morali imeti v localstorage vse potrebne podatke.
				// Vrnemo jih v content.js
				podatki = {};
				for(let polje of VNOSNA_POLJA.concat(["status"])) {
					if(localStorage.getItem(polje) !== null) podatki[polje] = localStorage.getItem(polje);
				}
				sendResponse({details: podatki});

		} else if(request.greeting === "save") {
			// Shranimo podatke v localstorage
			for(let polje in request.details) {
				localStorage.setItem(polje, request.details[polje]);
			}
			sendResponse({details: "Podatki shranjeni!"});
		} else if (request.greeting === "changeee") {
			console.log(request.details)
			localStorage.setItem("status", JSON.stringify(request.details));
		}
});