var codici=[];
var pannelli;
var totaliPannelli;
var kit;
var totaliKit;
var cabineTrovate;
var cabineNonTrovate;
var stepsPannelli=100;
var oldStepsPannelli;
var stepsPannelliSize=100;
var stepsKit=100;
var oldStepsKit;
var stepsKitSize=100;
var mostraCodiciCabina;

function checkCodiciCabina()
{
    codici=[];
    var textarea=document.getElementById("textareaElencoCodiciCabina");
    var value=textarea.value;
    if(value!="")
    {
		//value=value.replace(" ","");
		value=value.replace(/ /g,"");
        codiciD=value.split("\n");
        codici = cleanArray(codiciD);
        var outerContainer=document.createElement("div");
        outerContainer.setAttribute("class","conferma-codici-outer-container");
        var table=document.createElement("table");
        table.setAttribute("class","conferma-codici-table");
        codici.forEach(function(codice)
        {
            var tr=document.createElement("tr");
            var td=document.createElement("td");
            td.style.textAlign="left";
            td.innerHTML=codice;
            tr.appendChild(td);
            var td=document.createElement("td");
            td.innerHTML='<i title="Rimuovi" class="fal fa-times" onclick="rimuoviCodiceCabinaPopup(this.parentElement)"></i>';
            tr.appendChild(td);
            table.appendChild(tr);
        });
        outerContainer.appendChild(table);
        Swal.fire
        ({
            title: "Riepilogo codici inseriti",
            html: outerContainer.outerHTML,
            confirmButtonText:"Conferma",
            showCloseButton:true,
            allowEscapeKey:false,
            allowOutsideClick:false,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
        }).then((result) => 
        {
            if (result.value)
            {
                getEtichietteCarrelli();
            }
            else
                swal.close();
        });
    }
}
async function getEtichietteCarrelli()
{
    document.getElementById("btnCheckCodiciCabina").disabled=true;

    var container=document.getElementById("calcoloPesiCarrelliContainer");
    container.innerHTML="";

    Swal.fire
    ({
        title: "Caricamento in corso... ",
        background:"transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });

    var commesse_brevi=[];
    codici.forEach(codice => {
        commesse_brevi.push(codice.substring(0, 4));
    });
    var descrizioniCarrelli=await getDescrizioniCarrelli(commesse_brevi);
    var carrelliTrovati=[];
    descrizioniCarrelli.forEach(function(obj)
    {
        carrelliTrovati.push(obj.carrello);
    });
    var uniquecarrelliTrovati=[];
    $.each(carrelliTrovati, function(i, el){
        if($.inArray(el, uniquecarrelliTrovati) === -1) uniquecarrelliTrovati.push(el);
    });
    var carrelliNonTrovati = [];
    codici.forEach(function(codice)
    {
        var commessa_breve=codice.substring(0, 4);
        if(!uniquecarrelliTrovati.includes(commessa_breve))
            carrelliNonTrovati.push(commessa_breve);
    });
    if(carrelliNonTrovati.length>0)
    {
        Swal.close();
        document.getElementById("btnCheckCodiciCabina").disabled=false;
        getPopupDescrizioniEtichette("INSERT",carrelliNonTrovati);
    }
    else
    {
        Swal.close();
        
        var testiEtichette=await getTestiEtichette();

        var testo_cantiere=getFirstObjByPropValue(testiEtichette,"nome","testo_cantiere");
        var testo_costruzione=getFirstObjByPropValue(testiEtichette,"nome","testo_costruzione");
        var testo_carrello=getFirstObjByPropValue(testiEtichette,"nome","testo_carrello");
        var testo_descrizione_carrello=getFirstObjByPropValue(testiEtichette,"nome","testo_descrizione_carrello");
        var testo_colonna_quantita=getFirstObjByPropValue(testiEtichette,"nome","testo_colonna_quantita");
        var testo_misure_carrello=getFirstObjByPropValue(testiEtichette,"nome","testo_misure_carrello");
        var testo_colonna_numero=getFirstObjByPropValue(testiEtichette,"nome","testo_colonna_numero");
        var testo_colonna_codice=getFirstObjByPropValue(testiEtichette,"nome","testo_colonna_codice");
        var testo_apertura_carrelli=getFirstObjByPropValue(testiEtichette,"nome","testo_apertura_carrelli");
        var testo_indicazioni=getFirstObjByPropValue(testiEtichette,"nome","testo_indicazioni");

        for (let index = 0; index < codici.length; index++)
        {
            const carrello = codici[index];
            var commessa_breve=carrello.substring(0, 4);
            var descrizioneCarrello=await getDescrizioniCarrelli([commessa_breve]);

            var cantiere=getFirstObjByPropValue(descrizioneCarrello,"nome","cantiere");
            cantiere.descrizione.replace(/\r?\n/g, "<br />");
            var costruzione=getFirstObjByPropValue(descrizioneCarrello,"nome","costruzione");
            var misure=getFirstObjByPropValue(descrizioneCarrello,"nome","misure");

            var etichettaOuterContainer=document.createElement("div");
            etichettaOuterContainer.setAttribute("class","etichetta-outer-container");
            var id_carrello=carrello.replace("+","");
            etichettaOuterContainer.setAttribute("id","etichettaOuterContainer"+id_carrello);

            var row=document.createElement("div");
            row.setAttribute("class","etichetta-row");

            var column=document.createElement("div");
            column.setAttribute("class","etichetta-column");
            column.setAttribute("style","width:calc(50% - 15px);margin-right:15px;align-items:flex-start");

            var logoContainer=document.createElement("div");
            logoContainer.setAttribute("style","display:flex;align-items:center;justify-content:center;width:100%;height: 60px;");

            var logo=document.createElement("img");
            logo.setAttribute("class","etichetta-logo");
            logo.setAttribute("src","images/logoCabins.png");
            logoContainer.appendChild(logo);
            
            column.appendChild(logoContainer);

            var barcode=document.createElement("span");
            barcode.setAttribute("class","etichetta-barcode");
            barcode.innerHTML="*"+carrello+"*";
            column.appendChild(barcode);

            var div=document.createElement("div");
            div.setAttribute("class","etichetta-column");
            div.setAttribute("style","height:calc(100% - 140px);width:100%");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","height:40%;font-size:18px;width:100%;border-top:1px solid black;border-left:1px solid black;border-right:1px solid black;display:flex;align-items:center;justify-content:center");
            span.innerHTML=testo_misure_carrello.testo;
            div.appendChild(span);
            
            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","height:60%;font-size:24px;font-weight:bold;width:100%;border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;display:flex;align-items:center;justify-content:center");
            span.innerHTML=misure.descrizione;
            div.appendChild(span);

            column.appendChild(div);

            row.appendChild(column);

            var column=document.createElement("div");
            column.setAttribute("class","etichetta-column");
            column.setAttribute("style","width:calc(50% - 15px);margin-left:15px");

            var spanRow=document.createElement("div");
            spanRow.setAttribute("class","etichetta-row");
            spanRow.setAttribute("style","border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:flex-start;flex-direction:column");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","border-bottom:1px solid black;font-size:18px;width:100%;padding:10px;box-sizing:border-box");
            span.innerHTML=testo_cantiere.testo;
            spanRow.appendChild(span);

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:18px;font-weight:bold;width:100%;padding:10px;box-sizing:border-box");
            span.innerHTML=cantiere.descrizione;
            spanRow.appendChild(span);

            column.appendChild(spanRow);
        
            var spanRow=document.createElement("div");
            spanRow.setAttribute("class","etichetta-row");
            spanRow.setAttribute("style","border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:space-evenly;padding:10px;box-sizing:border-box;width:calc(100% + 2px)");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:18px;");
            span.innerHTML=testo_costruzione.testo;
            spanRow.appendChild(span);

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:40px;font-weight:bold;");
            span.innerHTML=costruzione.descrizione;
            spanRow.appendChild(span);

            column.appendChild(spanRow);

            row.appendChild(column);

            etichettaOuterContainer.appendChild(row);

            var row=document.createElement("div");
            row.setAttribute("class","etichetta-row");
            row.setAttribute("style","flex-direction:column;margin-top:30px");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:18px;width:100%;border-top:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:center;box-sizing:border-box;padding:5px");
            span.innerHTML=testo_carrello.testo;
            row.appendChild(span);

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:40px;font-weight:bold;width:100%;border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:center;box-sizing:border-box;padding:10px");
            span.innerHTML=carrello;
            row.appendChild(span);

            etichettaOuterContainer.appendChild(row);

            var row=document.createElement("div");
            row.setAttribute("class","etichetta-row");
            row.setAttribute("style","flex-direction:column;margin-top:30px");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:18px;width:100%;border-top:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:center;box-sizing:border-box;padding:5px");
            span.innerHTML=testo_descrizione_carrello.testo;
            row.appendChild(span);

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:34px;font-weight:bold;width:100%;border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black;border-right:1px solid black;align-items:center;justify-content:center;box-sizing:border-box;padding:10px");
            var descrizioneCarrelloEng=await getDescrizioneCarrello(carrello);
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("Carrello","Trolley");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("Carello","Trolley");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("Ponte","Deck");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("Corridoio","Corridor");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("corridoio","Corridor");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("cabine","cabins");
            descrizioneCarrelloEng=descrizioneCarrelloEng.replace("Pref","PRF");
            span.innerHTML=descrizioneCarrelloEng;
            row.appendChild(span);

            etichettaOuterContainer.appendChild(row);

            var tableCabine=document.createElement("table");
            tableCabine.setAttribute("class","etichetta-table-cabine");
        
            var tr=document.createElement("tr");

            var th=document.createElement("th");
            th.innerHTML=testo_colonna_quantita.testo;
            tr.appendChild(th);

            var th=document.createElement("th");
            th.innerHTML=testo_colonna_numero.testo;
            tr.appendChild(th);

            var th=document.createElement("th");
            th.innerHTML=testo_colonna_codice.testo;
            tr.appendChild(th);

            tableCabine.appendChild(tr);

            var cabine=await getCabineCarrello(carrello);

            var i=0;
            
            cabine.forEach(function(cabina)
            {
                if(i<3)
                {
                    var tr=document.createElement("tr");

                    var td=document.createElement("td");
                    td.innerHTML=cabina.QNT;
                    tr.appendChild(td);

                    var td=document.createElement("td");
                    td.innerHTML=cabina.NCAB;
                    tr.appendChild(td);

                    var td=document.createElement("td");
                    td.innerHTML=cabina.CODCAB;
                    tr.appendChild(td);

                    tableCabine.appendChild(tr);
                }
                
                i++;
            });

            etichettaOuterContainer.appendChild(tableCabine);

            var row=document.createElement("div");
            row.setAttribute("class","etichetta-row");
            row.setAttribute("style","margin-top:auto");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:24px;text-align:left;font-weight:bold;box-sizing:border-box");
            span.innerHTML = testo_indicazioni.testo.replace(/\r?\n/g, "<br />");
            row.appendChild(span);

            etichettaOuterContainer.appendChild(row);

            var row=document.createElement("div");
            row.setAttribute("class","etichetta-row");
            row.setAttribute("style","margin-top:auto;border-top:1px solid black;box-sizing:border-box;padding-top:10px");

            var span=document.createElement("span");
            span.setAttribute("class","etichetta-span");
            span.setAttribute("style","font-size:13px;text-align:left;font-weight:bold");
            span.innerHTML = testo_apertura_carrelli.testo.replace(/\r?\n/g, "<br />");
            row.appendChild(span);

            etichettaOuterContainer.appendChild(row);

            document.getElementById("calcoloPesiCarrelliContainer").appendChild(etichettaOuterContainer);

            /*var width=document.getElementById("etichettaOuterContainer"+id_carrello).offsetWidth;
            var height=(297*width)/210;
            document.getElementById("etichettaOuterContainer"+id_carrello).style.height=height+"px";*/
        }

        document.getElementById("btnCheckCodiciCabina").disabled=false;
    }
}
function getCabineCarrello(carrello)
{
    return new Promise(function (resolve, reject) 
    {
        $.post("getCabineCarrelloEtichetteCarrelli.php",
        {
            carrello
        },
        function(response, status)
        {
            if(status=="success")
            {
                resolve(JSON.parse(response));
            }
        });
    });
}
function getDescrizioneCarrello(carrello)
{
    return new Promise(function (resolve, reject) 
    {
        $.post("getDescrizioneCarrelloEtichetteCarrelli.php",
        {
            carrello
        },
        function(response, status)
        {
            if(status=="success")
            {
                resolve(response);
            }
        });
    });
}
async function getPopupDescrizioniEtichette(operation,carrelli)
{
    if(operation=="UPDATE")
    {
        var value=document.getElementById("textareaPopupInserisciCarrelli").value;
        if(value!="")
        {
            value=value.replace(/ /g,"");
            var carrelliD=value.split("\n");
            var carrelli = cleanArray(carrelliD);
        }
    }

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","testi-etichette-popup-outer-container");

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","testi-etichette-popup-inner-container");
	
	var dirtyCarrelli=carrelli;
	carrelli=[];
	$.each(dirtyCarrelli,function(i,el)
	{
		if($.inArray(el,carrelli)===-1)
			carrelli.push(el);
	});
	
	console.log(carrelli);

    for (let index = 0; index < carrelli.length; index++)
    {
        const carrello = carrelli[index];
        var commessa_breve=carrello.substring(0, 4);

        var localOperation=operation;
        
        if(operation=="UPDATE")
        {
            var descrizioneCarrello=await getDescrizioniCarrelli([commessa_breve]);
            if(descrizioneCarrello.length==0)
                localOperation="INSERT";
            else
                localOperation="UPDATE";
        }
        
        var row=document.createElement("div");
        row.setAttribute("class","testi-etichette-popup-row");

        var spanCarrello=document.createElement("span");
        spanCarrello.setAttribute("class","testi-etichette-popup-span");
        spanCarrello.setAttribute("style","font-weight:bold;text-align:left;margin:0px;");
        spanCarrello.innerHTML=commessa_breve;
        row.appendChild(spanCarrello);
    
        var spanNome=document.createElement("span");
        spanNome.setAttribute("class","testi-etichette-popup-span");
        spanNome.setAttribute("style","border:none;padding:0px;margin:0px;margin-top:10px;margin-bottom:5px");
        spanNome.innerHTML="Cantiere";
        row.appendChild(spanNome);
    
        var textareaTesto=document.createElement("textarea");
        textareaTesto.setAttribute("placeholder","Descrizione...");
        textareaTesto.setAttribute("class","testi-etichette-popup-textarea");
        textareaTesto.setAttribute("onkeydown","validateInput(this,event)");
        textareaTesto.setAttribute("id","descrizione|cantiere|Cantiere|"+commessa_breve);
        if(localOperation=="UPDATE")
        {
            textareaTesto.innerHTML=descrizioneCarrello[0].descrizione;
        }
        row.appendChild(textareaTesto);

        var spanNome=document.createElement("span");
        spanNome.setAttribute("class","testi-etichette-popup-span");
        spanNome.setAttribute("style","border:none;padding:0px;margin:0px;margin-top:10px;margin-bottom:5px");
        spanNome.innerHTML="Costruzione";
        row.appendChild(spanNome);
    
        var textareaTesto=document.createElement("textarea");
        textareaTesto.setAttribute("placeholder","Descrizione...");
        textareaTesto.setAttribute("class","testi-etichette-popup-textarea");
        textareaTesto.setAttribute("onkeydown","validateInput(this,event)");
        textareaTesto.setAttribute("id","descrizione|costruzione|Costruzione|"+commessa_breve);
        if(localOperation=="UPDATE")
        {
            textareaTesto.innerHTML=descrizioneCarrello[1].descrizione;
        }
        row.appendChild(textareaTesto);

        var spanNome=document.createElement("span");
        spanNome.setAttribute("class","testi-etichette-popup-span");
        spanNome.setAttribute("style","border:none;padding:0px;margin:0px;margin-top:10px;margin-bottom:5px");
        spanNome.innerHTML="Misure";
        row.appendChild(spanNome);
    
        var textareaTesto=document.createElement("textarea");
        textareaTesto.setAttribute("placeholder","Descrizione...");
        textareaTesto.setAttribute("class","testi-etichette-popup-textarea");
        textareaTesto.setAttribute("onkeydown","validateInput(this,event)");
        textareaTesto.setAttribute("id","descrizione|misure|Misure|"+commessa_breve);
        if(localOperation=="UPDATE")
        {
            textareaTesto.innerHTML=descrizioneCarrello[2].descrizione;
        }
        row.appendChild(textareaTesto);
    
        innerContainer.appendChild(row);
    }

    outerContainer.appendChild(innerContainer);

    var row=document.createElement("div");
    row.setAttribute("class","testi-etichette-popup-row");
    row.setAttribute("style","padding:0px;min-height:30px");

    var button=document.createElement("button");
    button.setAttribute("class","testi-etichette-popup-button");
    button.setAttribute("onclick","salvaModificheDescrizioniEtichette('"+operation+"')");
    button.innerHTML='<span>Salva modifiche</span><i class="fad fa-save"></i>';
    row.appendChild(button);

    outerContainer.appendChild(row);

    Swal.fire
    ({
        title: "Descrizioni carrelli",
        background:"#f1f1f1",
        html: outerContainer.outerHTML,
        showConfirmButton:false,
        showCloseButton:true,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.textAlign="left";document.getElementsByClassName("swal2-title")[0].style.width="100%";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
}
async function salvaModificheDescrizioniEtichette(operation)
{
    var all=document.getElementsByClassName("testi-etichette-popup-textarea");
    var descrizioni=[];
    for (let index = 0; index < all.length; index++)
    {
        const textareaDescrizione = all[index];
        var descrizione=textareaDescrizione.value;
        var nome=textareaDescrizione.id.split("|")[1];
        var label=textareaDescrizione.id.split("|")[2];
        var carrello=textareaDescrizione.id.split("|")[3];

        var descrizioneObj=
        {
            descrizione,
            nome,
            label,
            carrello
        };
        descrizioni.push(descrizioneObj);
    }
    Swal.fire
    ({
        title: "Salvataggio in corso...",
        background:"transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
    for (let index = 0; index < descrizioni.length; index++)
    {
        const descrizioneObj = descrizioni[index];
        if(operation=="UPDATE")
            var response=await deleteDescrizioniEtichetteCarrelli(descrizioneObj.descrizione,descrizioneObj.nome,descrizioneObj.label,descrizioneObj.carrello);
        var response2=await insertDescrizioniEtichetteCarrelli(descrizioneObj.descrizione,descrizioneObj.nome,descrizioneObj.label,descrizioneObj.carrello);
        
    }
    Swal.fire
    ({
        icon:"success",
        title: "Modifiche salvate",
        showConfirmButton:false,
        showCloseButton:true,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    }).then((result) => 
    {
        if(operation=="INSERT")
            getEtichietteCarrelli();
    });
}
function insertDescrizioniEtichetteCarrelli(descrizione,nome,label,carrello)
{
    return new Promise(function (resolve, reject) 
    {
        $.post("insertDescrizioniEtichetteCarrelli.php",
        {
            descrizione,nome,label,carrello
        },
        function(response, status)
        {
            if(status=="success")
            {
                resolve(response);
            }
        });
    });
}
function getPopupInserisciCarrelli()
{
    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","testi-etichette-popup-outer-container");

    var row=document.createElement("div");
    row.setAttribute("class","testi-etichette-popup-row");
    row.setAttribute("style","padding-top:15px");

    var textarea=document.createElement("textarea");
    textarea.setAttribute("placeholder","Incolla un elenco di codici carrello (separati da carattere a capo)...");
    textarea.setAttribute("class","testi-etichette-popup-textarea");
    textarea.setAttribute("id","textareaPopupInserisciCarrelli");
    textarea.setAttribute("style","height:240px");
    row.appendChild(textarea);

    outerContainer.appendChild(row);

    var row=document.createElement("div");
    row.setAttribute("class","testi-etichette-popup-row");
    row.setAttribute("style","padding:0px;min-height:30px");

    var button=document.createElement("button");
    button.setAttribute("class","testi-etichette-popup-button");
    button.setAttribute("onclick","getPopupDescrizioniEtichette('UPDATE')");
    button.innerHTML='<span>Conferma</span><i class="fad fa-check-circle"></i>';
    row.appendChild(button);

    outerContainer.appendChild(row);

    Swal.fire
    ({
        title: "Descrizioni carrelli",
        background:"#f1f1f1",
        html: outerContainer.outerHTML,
        showConfirmButton:false,
        showCloseButton:true,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.textAlign="left";document.getElementsByClassName("swal2-title")[0].style.width="100%";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
}
function deleteDescrizioniEtichetteCarrelli(descrizione,nome,label,carrello)
{
    return new Promise(function (resolve, reject) 
    {
        $.post("deleteDescrizioniEtichetteCarrelli.php",
        {
            descrizione,nome,label,carrello
        },
        function(response, status)
        {
            if(status=="success")
            {
                resolve(response);
            }
        });
    });
}
function getDescrizioniCarrelli(codici)
{
    return new Promise(function (resolve, reject) 
    {
        var JSONcodici=JSON.stringify(codici);
        $.post("getDescrizioniCarrelliStampaEtichette.php",
        {
            JSONcodici
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
async function getPopupTestiEtichette()
{
    var testiEtichette=await getTestiEtichette();

    var outerContainer=document.createElement("div");
    outerContainer.setAttribute("class","testi-etichette-popup-outer-container");

    var innerContainer=document.createElement("div");
    innerContainer.setAttribute("class","testi-etichette-popup-inner-container");

    testiEtichette.forEach(function(riga)
    {
        var row=document.createElement("div");
        row.setAttribute("class","testi-etichette-popup-row");
    
        var spanNome=document.createElement("span");
        spanNome.setAttribute("class","testi-etichette-popup-span");
        spanNome.innerHTML=riga.label;
        row.appendChild(spanNome);
    
        var textareaTesto=document.createElement("textarea");
        textareaTesto.setAttribute("placeholder","Testo...");
        textareaTesto.setAttribute("class","testi-etichette-popup-textarea");
        textareaTesto.setAttribute("onkeydown","validateInput(this,event)");
        textareaTesto.setAttribute("id","testoEtichette"+riga.id_testo);
        textareaTesto.innerHTML=riga.testo;
        row.appendChild(textareaTesto);
    
        innerContainer.appendChild(row);
    });

    outerContainer.appendChild(innerContainer);

    var row=document.createElement("div");
    row.setAttribute("style","padding:0px;min-height:30px");

    var button=document.createElement("button");
    button.setAttribute("class","testi-etichette-popup-button");
    button.setAttribute("onclick","salvaModificheTestiEtichette()");
    button.innerHTML='<span>Salva modifiche</span><i class="fad fa-save"></i>';
    row.appendChild(button);

    outerContainer.appendChild(row);

    Swal.fire
    ({
        title: "Testi etichette",
        background:"#f1f1f1",
        html: outerContainer.outerHTML,
        showConfirmButton:false,
        showCloseButton:true,
        onOpen : function(){
			
			var all=document.getElementsByClassName("testi-etichette-popup-row");
			for(let i=0;i<all.length;i++)
			{
				var row=all[i];
				row.style.minHeight="150px";
			}
			var all=document.getElementsByClassName("testi-etichette-popup-textarea");
			for(let i=0;i<all.length;i++)
			{
				var row=all[i];
				row.style.height="100px";
			}
			
			document.getElementsByClassName("swal2-title")[0].style.textAlign="left";document.getElementsByClassName("swal2-title")[0].style.width="100%";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
}
async function salvaModificheTestiEtichette()
{
    var all=document.getElementsByClassName("testi-etichette-popup-textarea");
    var testi=[];
    for (let index = 0; index < all.length; index++)
    {
        const textareaTesto = all[index];
        var testo=textareaTesto.value;
        var id_testo=textareaTesto.id.replace("testoEtichette","");

        var testoObj=
        {
            testo,
            id_testo
        };
        testi.push(testoObj);
    }
    Swal.fire
    ({
        title: "Salvataggio in corso...",
        background:"transparent",
        html: '<i style="color:white" class="fad fa-spinner-third fa-spin fa-4x"></i>',
        showConfirmButton:false,
        showCloseButton:false,
        allowEscapeKey:false,
        allowOutsideClick:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="white";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
    for (let index = 0; index < testi.length; index++)
    {
        const testoObj = testi[index];
        var response=await updateTestiEtichetteCarrelli(testoObj.testo,testoObj.id_testo);
    }
    Swal.fire
    ({
        icon:"success",
        title: "Modifiche salvate",
        showConfirmButton:false,
        showCloseButton:true,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
    });
}
function updateTestiEtichetteCarrelli(testo,id_testo)
{
    return new Promise(function (resolve, reject) 
    {
        $.post("updateTestiEtichetteCarrelli.php",
        {
            testo,id_testo
        },
        function(response, status)
        {
            if(status=="success")
            {
                resolve(response);
            }
        });
    });
}
function getTestiEtichette()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getTestiEtichetteCalcoloPesi.php",
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
function getPesiPannelliCarrelli(pannelli)
{
    return new Promise(function (resolve, reject) 
    {
        var JSONpannelli=JSON.stringify(pannelli);
        $.get("getPesiPannelliCarrelliCalcoloPesi.php",
        {
            JSONpannelli
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
function getPannelliCarrelli()
{
    return new Promise(function (resolve, reject) 
    {
        var JSONcodici=JSON.stringify(codici);
        $.get("getPannelliCarrelliCalcoloPesi.php",
        {
            JSONcodici
        },
        function(response, status)
        {
            if(status=="success")
            {
                if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
                {
                    Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                    console.log(response);
                    resolve([]);
                }
                else
                {
                    try {
                        resolve(JSON.parse(response));
                    } catch (error) {
                        Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                        console.log(response);
                        resolve([]);
                    }
                }
            }
            else
                resolve([]);
        });
    });
}
function cleanArray(actual)
{
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
        newArray.push(actual[i]);
        }
    }
    return newArray;
}
function rimuoviCodiceCabinaPopup(td)
{
    var tr=td.parentElement;
    var codice=tr.firstChild.innerHTML;
    const index = codici.indexOf(codice);
    if (index > -1)
    {
        codici.splice(index, 1);
    }
    tr.remove();
}
function validateInput(input,event)
{
    var allowed=["1","2","3","4","5","6","7","8","9","0","Control","CapsLock",";","Shift","Enter","Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"," ","A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","/","'",",",".",":","-","_","(",")"];
    if(!allowed.includes(event.key))
    {
        event.preventDefault();
        return;
    }
}
function getFirstObjByPropValue(array,prop,propValue)
{
    var return_item;
    array.forEach(function(item)
    {
        if(item[prop]==propValue)
        {
            return_item= item;
        }
    });
    return return_item;
}
function stampaEtichette()
{
    var oldBody=document.body.innerHTML;

    var container = document.getElementById("calcoloPesiCarrelliContainer").cloneNode(true);

    document.getElementsByTagName("html")[0].style.overflow="visible";
    document.body.style.overflow="visible";
    document.body.style.background="white";

    container.style.height="100%";
    container.style.width="100%";
    container.style.padding="0px";
    container.style.margin="0px";
    container.style.flexDirection="column";
    container.style.alignItems="center";
    container.style.justifyContent="flex-start";
    container.style.flexWrap="nowrap";
    container.style.overflow="visible";
    
    document.body.innerHTML="";

    document.body.appendChild(container);

    var all=document.getElementsByClassName("etichetta-outer-container");

    for (let index = 0; index < all.length; index++)
    {
        const element = all[index];
        element.style.border="none";
        element.style.margin="0px";
        element.style.height="297mm";
        element.style.maxHeight="297mm";
        element.style.minHeight="297mm";
    }

    setTimeout(function(){ window.print(); }, 500);    

    setTimeout(function()
    {
        document.getElementsByTagName("html")[0].style.overflow="";
        document.body.style.overflow="";
        document.body.style.background="";

        document.body.innerHTML=oldBody;

        console.clear();

        Swal.fire
        ({
            icon:"success",
            title: "Pagina inviata alla stampante",
            showConfirmButton:false,
            showCloseButton:true,
            onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="black";document.getElementsByClassName("swal2-title")[0].style.fontWeight="normal";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";document.getElementsByClassName("swal2-close")[0].style.outline="none";}
        })

    }, 1000);
}