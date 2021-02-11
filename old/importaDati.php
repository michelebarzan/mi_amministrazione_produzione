<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Importa dati";
?>
<html>
	<head>
		<link href="css/fonts.css" rel="stylesheet">
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/importaDati.css" />
		<script src="js/importaDati.js"></script>
	</head>
	<body onload="getElencoLogImportazioni()">
		<?php include('struttura.php'); ?>
		<div class="top-action-bar" id="importaDatiActionBar">
			<button class="action-bar-text-icon-button" id="bntImportaTutto" style="margin-right:5px" onclick="importaTutto(this)"><span>Importa tutti i database</span><i class="fad fa-upload"></i></button>
			<button class="action-bar-text-icon-button" id="bntImportaSingoloDatabase" style="margin-right:0px" onclick="getPopupScegliDatabase(this)"><span>Importa singoli database</span><i class="fad fa-file-upload"></i></button>

			<!--<div class="action-bar-item" style="margin-left:5px" ><b>Visualizzazione</b>
				<button class="action-bar-icon-button" id="btnFlexDirectionRow" onclick="changeFlexDirection()"><i class="fad fa-line-columns"></i></button>
				<button class="action-bar-icon-button" id="btnFlexDirectionColumn" onclick="changeFlexDirection()"><i class="fad fa-line-height"></i></button>
			</div>
			<div class="action-bar-item"><b>Righe</b>
				<input type="number" class="action-bar-input" id="inputFilterTop" onfocusout="getElencoPick()" value="200">
			</div>
			<button class="action-bar-text-icon-button" id="bntFilterChiusi" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterChiusi','chiuso');getElencoPick()"><span>Chiusi</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterAperti" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterAperti','chiuso');getElencoPick()"><span>Aperti</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterControllati" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterControllati','controllato');getElencoPick()"><span>Controllati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonControllati" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterNonControllati','controllato');getElencoPick()"><span>Non controllati</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterStampati" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterStampati','stampato');getElencoPick()"><span>Stampati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonStampati" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterNonStampati','stampato');getElencoPick()"><span>Non stampati</span><i class="far fa-exclamation-circle"></i></button>
			<div class="action-bar-item"><b style="margin-right:-5px">Ordina per</b>
				<button class="action-bar-text-icon-button" style="margin-right:-5px" id="bntOrderNPick" style="margin-right:0px" onclick="orderBy='n_Pick';getElencoPick()"><span>N pick</span><i class="fas fa-sort-numeric-down-alt"></i></button>
				<button class="action-bar-text-icon-button" id="bntOrderData" style="margin-right:0px" onclick="orderBy='DataPick';getElencoPick()"><span>Data</span><i class="far fa-calendar-alt"></i></button>
			</div>-->
		</div>
		<div id="importaDatiContainer"></div>
		<div id="footer">
			<b>Marine&nbspInteriors&nbspS.p.A.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspSegaluzza&nbsp33170&nbspPordenone&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp0434612811&nbsp|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
		</div>
	</body>
</html>