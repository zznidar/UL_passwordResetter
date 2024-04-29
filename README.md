# UL_passwordResetter
Ste naveličani menjavanja gesla za UL-identiteto vsakih 180 dni? Ta dodatek vam geslo ponastavi na isto geslo. 

## Namestitev
1. Prensite [dodatek 
`UL_passwordResetter.zip`](https://github.com/zznidar/UL_passwordResetter/releases/).
2. Odprite `about:debugging#/runtime/this-firefox` v svojem brskalniku Firefox.
3. Kliknite na `Load Temporary Add-on…` in izberite preneseno datoteko `UL_passwordResetter.zip`.
4. Uporabite dodatek in uživajte v svojem starem geslu!

## Navodila za uporabo
1. Kliknite na dodatek, da se odpre stran za ponastavitev gesla.
    1. Če stran uporabljate prvič, vnesite svoje podatke za reset. V polje "geslo" in "novo geslo" vnesite geslo, ki ga želite še naprej uporabljati.
    2. Kliknite na gumb "Shrani podatke v dodatek!". Podatki se bodo shranili in stran se bo osvežila.
2. Dodatek vas bo vprašal, ali želite pričeti z menjavo gesla. Potrdite s klikom na gumb "Ok".
3. Geslo se bo zamenjalo na začasno geslo, ki na koncu dobi zaporedno številko. _Pomembno: vaše geslo mora biti dovolj kratko, da po dodatku ne doseže limita dolžine!_
4. Postopek ponovite 10-krat.
5. Pred zadnjim resetom bo dodatek izvrgel drugačno sporočilo, in sicer, da bo to zadnja menjava gesla. Potrdite z gumbom "Ok" in uživajte v svojem starem geslu! :)

## Zavrnitev odgovornosti
Avtor ne odgovarja za kakršnekoli napake ali težave, ki bi lahko nastale zaradi uporabe dodatka. Uporabnik uporablja vse to na lastno odgovornost.  

Koda ni lepa. Pred branjem kode si namestite zaščito za oči.

## FAQ
1. Zakaj dodatek ne dela v Chrome?
    1. Ker ne podpira več extension manifesta v2.
    2. Ker ne podpira objekta `browser` in izvrže error.
    3. Ker je bil dodatek skupaj skrpan v slabih dveh urah.
