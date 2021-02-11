<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Dati Salvagnini";
?>
<html>
	<head>
		<link href="css/fonts.css" rel="stylesheet">
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/datiSalvagnini.css" />
        <script src="libs/js/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="libs/js/spinnersV2/spinners.css" />
		<script src="js/datiSalvagnini.js"></script>
		<link rel="stylesheet" href="libs/js/spinners/spinner.css" />
		<script src="libs/js/spinners/spinner.js"></script>
		<script src="editableTableMiDbTecnico/editableTable.js"></script>
		<link rel="stylesheet" href="editableTableMiDbTecnico/editableTable.css" />
		<link rel="stylesheet" href="css/inPageNavBar.css" />
		<link rel="stylesheet" href="css/darkPopup.css" />
		<script src="libs/js/handsontable/handsontable.full.min.js"></script>
		<link href="libs/js/handsontable/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="libs/js/handsontable/languages/it-IT.js"></script>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="in-page-nav-bar">
			<div class="in-page-nav-bar-row">
				<!--<div class="in-page-nav-bar-select-container" id="selectCommessaDatiSalvagniniContainer">
					<span>Commessa</span>
					<select id="selectCommessaDatiSalvagnini" onchange="getView()"></select>
				</div>-->
			</div>
			<div class="in-page-nav-bar-row">
				<button class="in-page-nav-bar-button" id="btn_tabella_pieghe" onclick="getTabellaPieghe(this)">
					<span>Tabella Pieghe</span>
					<i class="fad fa-sticky-note"></i>
				</button>
				<button class="in-page-nav-bar-button" id="btn_dati_finitura" onclick="getDatiFinitura(this)">
					<span>Dati Finitura</span>
					<i class="fad fa-palette"></i>
				</button>
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarDatiSalvagnini" style="display:none">
			<button class="rcb-button-text-icon" onclick="esportaTabellaPieghe()"><span>Esporta</span><i style="margin-left: 5px;" class="fad fa-file-excel"></i></button>
			<button class="rcb-button-text-icon" onclick="aggiungiRigaHot()"><span>Aggiungi Riga</span><i style="margin-left: 5px;font-size:15px" class="fad fa-plus-circle"></i></button>
		</div>
		<div id="datiSalvagniniContainer"></div>
		<div id="footer">
			<b>Marine&nbspInteriors&nbspS.p.A.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspSegaluzza&nbsp33170&nbspPordenone&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp0434612811&nbsp|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
        </div>
	</body>
</html>