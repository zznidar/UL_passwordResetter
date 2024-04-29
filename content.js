const VNOSNA_POLJA = ["Form_Ime", "Form_Priimek", "Form_DatumRojstva", "Form_VpisnaStevilka", "Form_Username", "Form_NewPassword", "Form_NewPasswordConfirmation", "Form_OrganizacijaId"];
const GESLA = ["Form_NewPassword", "Form_NewPasswordConfirmation"];

browser.runtime.sendMessage({greeting: "help"}, function(response) {
	var solid = response.details;
	console.log(solid);
	console.log(Object.keys(solid).length);

	let validnost = checkValidity();
	console.log("Validnost:", validnost);
	if(!validnost) {
		alert("Oops, nekaj je šlo narobe. Neke rdeče napake so na strani. Ste prepričani, da so podatki pravi?\nAlso, zdej je zbrkljan status vašega gesla. Ko odpravite težave, nekajkrat zamenjajte geslo v obe smeri, da se status pravilno posodobi.");
		//browser.runtime.sendMessage({greeting: "changeee", details: "nazadnje je bil err"}, function(response) {console.log(response)});
		//return("invalid");
	}

	if(document?.getElementsByClassName("alert alert-success")[0]?.innerText === " Uspešno ste ponastavili svoje geslo." ) {
		alert("Bojda ste uspešno spremenili geslo. Preusmerjam na formo za reset gesla, da lahko ponastavite nazaj na želeno geslo.");
		var newURL = "https://id.uni-lj.si/DigitalnaIdentiteta/PonastavitevGesla";
		window.location.href = newURL;
	}


	if(Object.keys(solid).length !== 0) {
		if((solid?.status ?? 0) < 10) {
			dodatek = solid.status ?? 0;
			let potrditev = confirm(`Trenutno geslo je. Ali želite izvesti prvo ponastavitev (doda črko ${dodatek} na konec trenutnega gesla. Upam, da vaše geslo ni dolgo toliko, kot je limit. Lp in lep pozdrav)?\n\nTo je treba ponoviti 10-krat, ker si UL shrani zadnjih nekaj gesel in ne dovoli ponovitve istega gesla.`);
			if(potrditev) {
				for(let polje of VNOSNA_POLJA) {
					document.getElementById(polje).value = solid[polje];
				}
				for(let geslo of GESLA) {
					console.log(geslo);
					document.getElementById(geslo).value += `${dodatek}`;
				}
				browser.runtime.sendMessage({greeting: "changeee", details: parseInt(dodatek)+1}, function(response) {console.log(response)});
				document.getElementsByClassName("btn btn-primary")[0].click(); 
			}
		} else {
			dodatek = solid.status;
			let potrditev = confirm(`🙌🏻 *** Takole, še zadnja ponastavitev!!! *** \n\nZdaj ima geslo na koncu dodatek ${dodatek}, da se razlikuje od vašega gesla. Ali želite izvesti še zadnjo ponastavitev (geslo se povrne na vaše želeno geslo)? 🙌🏻🙌🏻🙌🏻`);
			if(potrditev) {
				for(let polje of VNOSNA_POLJA) {
					console.log(polje);
					document.getElementById(polje).value = solid[polje];
				}
				browser.runtime.sendMessage({greeting: "changeee", details: 0}, function(response) {console.log(response)});
				document.getElementsByClassName("btn btn-primary")[0].click(); 
			}

		}

	} else {
		alert("Na strani za ponastavitev gesla vnesite svoje podatke. Za geslo uporabite staro geslo, ki ga želite ohraniti več kot 180 dni. Namesto gumba za reset pritisnite na gumb 'Shrani podatke v dodatek!'")
	}
});

document.getElementById("Form_NewPasswordConfirmation").insertAdjacentHTML("afterend", "<input type='button' id='saveButton' value='Shrani podatke v dodatek!'>");

document.getElementById("saveButton").addEventListener("click", function() {
	let podatki = getContents();
	console.log(podatki);
	browser.runtime.sendMessage({greeting: "save", details: podatki}, function(response) {
		console.log(response);
		alert(response?.details);
		// Refersh the page
		var newURL = "https://id.uni-lj.si/DigitalnaIdentiteta/PonastavitevGesla";
		window.location.href = newURL;
	});
});

function getContents() {
	if(true) {
		// Shranimo podatke, vnesene na tej strani!
		podatki = {};
		for(let polje of VNOSNA_POLJA) {
			let poljeElement = document.getElementById(polje);
			if(poljeElement && poljeElement?.value) {
				podatki[polje] = poljeElement.value;
			} else {
				console.log(`Polje ${polje} ni bilo najdeno ali pa je bilo prazno! Vsa polja morate izpolniti.`);
			}
		}
		return podatki;
		
	}
}

function checkValidity() {
	invalidi = document.getElementsByClassName("invalid-feedback");
	for(let i of invalidi) {
		console.log(i.innerText);
		if(i.innerText !== "") return(false);
	}
	return(true);
}