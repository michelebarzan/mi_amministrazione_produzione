var view;
var hot;
var piegheSalvagnini;
var newRowWBtn=false;

function getDatiFinitura(button)
{
    newRowWBtn=false;

    view="dati_finitura";

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarDatiSalvagnini").style.display="flex";
    $(".reusable-control-bar-items").hide();

    getTabellaFinitura();
}
async function getTabellaFinitura()
{
    if(hot!=undefined)
        hot.destroy();

    var container = document.getElementById('datiSalvagniniContainer');
    container.innerHTML="";

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    finituraSalvagnini=await getFinituraSalvagnini();

    Swal.close();

    var height=container.offsetHeight;

    if(finituraSalvagnini.data.length>0)
    {
        hot = new Handsontable
        (
            container,
            {
                data: finituraSalvagnini.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: finituraSalvagnini.colHeaders,
                className: "htMiddle",
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: true,
                width:"100%",
                height,
                columnSorting: true,
                columns:finituraSalvagnini.columns,
                beforePaste: (data, coords) =>
                {
                    if(data.length>hot.getData().length)
                    {
                        return false;
                    }
                },
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!="id_finitura")
                            {
                                //se cerchi di incollare delle righe in un numero  inore di righe le inserisce a video ma non lancia la query
                                var id_finitura=hot.getDataAtCell(row, 0); 
                                if(id_finitura!=null)
                                    aggiornaRigaFinitura(id_finitura,prop,newValue);
                                /*else
                                {
                                    creaAggiornaRigaFinitura(row,prop,newValue);
                                }*/
                            }
                        });
                    }
                },
                afterCreateRow: (index,amount,source) =>
                {
                    if(!newRowWBtn)
                        creaRigaFinitura(index);
                    else
                        newRowWBtn=false;
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    for (let i = 0; i < physicalRows.length; i++)
                    {
                        const indice = physicalRows[i];
                        var id_finitura=hot.getDataAtCell(indice, 0);
                        eliminaRigaFinitura(id_finitura);
                    }
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function creaAggiornaRigaFinitura(index,colonna,valore)
{
    $.get("creaAggiornaRigaFinitura.php",{colonna,valore},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
            else
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function aggiornaRigaFinitura(id_finitura,colonna,valore)
{
    $.get("aggiornaRigaFinitura.php",{id_finitura,colonna,valore},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function creaRigaFinitura(index)
{
    $.get("creaRigaFinitura.php",
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
            else
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function eliminaRigaFinitura(id_finitura)
{
    $.get("eliminaRigaFinitura.php",{id_finitura},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function getFinituraSalvagnini()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getFinituraSalvagnini.php",
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
        });
    });
}
function esportaTabellaFinitura()
{
    var inputNomeFile=document.createElement("input");
    inputNomeFile.setAttribute("type","text");
    inputNomeFile.setAttribute("value","finitura_salvagnini");
    inputNomeFile.setAttribute("id","fileNameInputSwal");
    Swal.fire
    ({
        type: 'question',
        title: 'Scegli il nome del file',
        html : inputNomeFile.outerHTML
    }).then((result) => 
    {
        if (result.value)
        {
            swal.close();
            var filename=document.getElementById("fileNameInputSwal").value;
            if(filename==null || filename=='')
            {
                var filename="finitura_salvagnini";
            }
            try {
                document.getElementById("esportaTabellaFinituraTable").remove();
            } catch (error) {}
        
            var table=document.createElement("table");
            table.setAttribute("style","display:none");
            table.setAttribute("id","esportaTabellaFinituraTable");
        
            var tr=document.createElement("tr");
            finituraSalvagnini.colHeaders.forEach(header =>
            {
                var th=document.createElement("th");
                th.innerHTML=header;
                tr.appendChild(th);
            });
            table.appendChild(tr);
        
            var data=hot.getData();
            data.forEach(row =>
            {
                var tr=document.createElement("tr");
                row.forEach(cell =>
                {
                    var td=document.createElement("td");
                    td.innerHTML=cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
        
            document.body.appendChild(table);
            exportTableToExcel("esportaTabellaFinituraTable", filename);
        }
        else
            swal.close();
    });
}
function getTabellaPieghe(button)
{
    newRowWBtn=false;

    view="tabella_pieghe";

    $(".in-page-nav-bar-button").css({"border-bottom-color":"","font-weight":""});
    button.style.borderBottomColor="#4C91CB";
    button.style.fontWeight="bold";

    document.getElementById("actionBarDatiSalvagnini").style.display="flex";
    $(".reusable-control-bar-items").hide();

    getTabellaPiegheSalvagnini();
}
async function getTabellaPiegheSalvagnini()
{
    if(hot!=undefined)
        hot.destroy();

    var container = document.getElementById('datiSalvagniniContainer');
    container.innerHTML="";

    Swal.fire
    ({
        width:"100%",
        background:"transparent",
        title:"Caricamento in corso...",
        html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
        allowOutsideClick:false,
        showCloseButton:false,
        showConfirmButton:false,
        allowEscapeKey:false,
        showCancelButton:false,
        onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
    });

    piegheSalvagnini=await getPiegheSalvagnini();

    Swal.close();

    var height=container.offsetHeight;

    if(piegheSalvagnini.data.length>0)
    {
        hot = new Handsontable
        (
            container,
            {
                data: piegheSalvagnini.data,
                rowHeaders: true,
                manualColumnResize: true,
                colHeaders: piegheSalvagnini.colHeaders,
                className: "htMiddle",
                filters: true,
                dropdownMenu: true,
                headerTooltips: true,
                language: 'it-IT',
                contextMenu: true,
                width:"100%",
                height,
                columnSorting: true,
                columns:piegheSalvagnini.columns,
                beforePaste: (data, coords) =>
                {
                    if(data.length>hot.getData().length)
                    {
                        return false;
                    }
                },
                afterChange: (changes) =>
                {
                    if(changes!=null)
                    {
                        changes.forEach(([row, prop, oldValue, newValue]) =>
                        {
                            if(prop!="id_piega")
                            {
                                //se cerchi di incollare delle righe in un numero  inore di righe le inserisce a video ma non lancia la query
                                var id_piega=hot.getDataAtCell(row, 0); 
                                if(id_piega!=null)
                                    aggiornaRigaPiegheSalvagnini(id_piega,prop,newValue);
                                /*else
                                {
                                    creaAggiornaRigaPiegheSalvagnini(row,prop,newValue);
                                }*/
                            }
                        });
                    }
                },
                afterCreateRow: (index,amount,source) =>
                {
                    if(!newRowWBtn)
                        creaRigaPiegheSalvagnini(index);
                    else
                        newRowWBtn=false;
                },
                beforeRemoveRow: (index,amount,physicalRows,source)  =>
                {
                    for (let i = 0; i < physicalRows.length; i++)
                    {
                        const indice = physicalRows[i];
                        var id_piega=hot.getDataAtCell(indice, 0);
                        eliminaRigaPiegheSalvagnini(id_piega);
                    }
                }
            }
        );
        document.getElementById("hot-display-license-info").remove();
        $(".handsontable .changeType").css
        ({
            "background": "#eee",
            "border-radius": "0",
            "border": "none",
            "color": "#404040",
            "font-size": "14px",
            "line-height": "normal",
            "padding": "0px",
            "margin": "0px",
            "float": "right"
        });
    }
}
function creaAggiornaRigaPiegheSalvagnini(index,colonna,valore)
{
    $.get("creaAggiornaRigaPiegheSalvagnini.php",{colonna,valore},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
            else
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function aggiornaRigaPiegheSalvagnini(id_piega,colonna,valore)
{
    $.get("aggiornaRigaPiegheSalvagnini.php",{id_piega,colonna,valore},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function creaRigaPiegheSalvagnini(index)
{
    $.get("creaRigaPiegheSalvagnini.php",
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
            else
                hot.setDataAtCell(index, 0, response);
        }
    });
}
function eliminaRigaPiegheSalvagnini(id_piega)
{
    $.get("eliminaRigaPiegheSalvagnini.php",{id_piega},
    function(response, status)
    {
        if(status=="success")
        {
            if(response.toLowerCase().indexOf("error")>-1 || response.toLowerCase().indexOf("notice")>-1 || response.toLowerCase().indexOf("warning")>-1)
            {
                Swal.fire({icon:"error",title: "Errore. Se il problema persiste contatta l' amministratore",onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.color="gray";document.getElementsByClassName("swal2-title")[0].style.fontSize="14px";}});
                console.log(response);
            }
        }
    });
}
function getPiegheSalvagnini()
{
    return new Promise(function (resolve, reject) 
    {
        $.get("getPiegheSalvagnini.php",{},
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
        });
    });
}
function getTable(table,orderBy,orderType)
{
    if(table=="pieghe_salvagnini")
    {
        getEditableTable
        ({
            table:'pieghe_salvagnini',
            editable: true,
            primaryKey:"id_piega",
            container:'datiSalvagniniContainer',
            readOnlyColumns:['id_piega'],
            noInsertColumns:['id_piega'],
            orderBy:orderBy,
            orderType:orderType
        });
    }
}
function editableTableMiDbTecnicoLoad()
{

}
function esportaTabellaPieghe()
{
    var inputNomeFile=document.createElement("input");
    inputNomeFile.setAttribute("type","text");
    inputNomeFile.setAttribute("value","pieghe_salvagnini");
    inputNomeFile.setAttribute("id","fileNameInputSwal");
    Swal.fire
    ({
        type: 'question',
        title: 'Scegli il nome del file',
        html : inputNomeFile.outerHTML
    }).then((result) => 
    {
        if (result.value)
        {
            swal.close();
            var filename=document.getElementById("fileNameInputSwal").value;
            if(filename==null || filename=='')
            {
                var filename="pieghe_salvagnini";
            }
            try {
                document.getElementById("esportaTabellaPiegheTable").remove();
            } catch (error) {}
        
            var table=document.createElement("table");
            table.setAttribute("style","display:none");
            table.setAttribute("id","esportaTabellaPiegheTable");
        
            var tr=document.createElement("tr");
            piegheSalvagnini.colHeaders.forEach(header =>
            {
                var th=document.createElement("th");
                th.innerHTML=header;
                tr.appendChild(th);
            });
            table.appendChild(tr);
        
            var data=hot.getData();
            data.forEach(row =>
            {
                var tr=document.createElement("tr");
                row.forEach(cell =>
                {
                    var td=document.createElement("td");
                    td.innerHTML=cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
        
            document.body.appendChild(table);
            exportTableToExcel("esportaTabellaPiegheTable", filename);
        }
        else
            swal.close();
    });
}
function exportTableToExcel(tableID, filename = '')
{
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
function aggiungiRigaHot()
{
    if(view=="tabella_pieghe")
        creaRigaPiegheSalvagnini(hot.countRows());

    if(view=="dati_finitura")
        creaRigaFinitura(hot.countRows());

    newRowWBtn=true;
}