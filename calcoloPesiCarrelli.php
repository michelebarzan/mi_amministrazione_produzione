<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Etichette Carrelli";
?>
<html>
	<head>
		<link href="css/fonts.css" rel="stylesheet">
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/struttura.css" />
		<script src="js/struttura.js"></script>
        <link rel="stylesheet" href="css/calcoloPesiCarrelli.css" />
		<script src="js/calcoloPesiCarrelli.js"></script>
		<link href="css/fonts.css" rel="stylesheet">
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarCloudFoto">
            <div class="rcb-input-icon-container" id="textareaElencoCodiciCabinaContainer">
                <textarea id="textareaElencoCodiciCabina" placeholder="Incolla un elenco di codici carrello..." ></textarea>
				<button class="fal fa-times" onclick="document.getElementById('textareaElencoCodiciCabina').value=''" style="margin-right:0px;color:gray;font-size:18px" id="btnCheckCodiciCabina" ></button>
                <button class="fad fa-search" onclick="checkCodiciCabina()" id="btnCheckCodiciCabina" ></button>
            </div>
            <button class="rcb-button-text-icon" onclick="getPopupTestiEtichette()">
				<span>Testi etichette</span>
				<i class="fad fa-file-alt" style="margin-left:5px"></i>
            </button>
			<button class="rcb-button-text-icon" onclick="getPopupInserisciCarrelli()">
				<span>Descrizioni etichette carrelli</span>
				<i class="fad fa-info-circle" style="margin-left:5px"></i>
			</button>
			<button class="rcb-button-text-icon" onclick="stampaEtichette()">
				<span>Stampa</span>
				<i class="fad fa-print" style="margin-left:5px"></i>
            </button>
		</div>
		<div id="calcoloPesiCarrelliContainer"></div>
		<div id="footer">
			<b>Marine&nbspInteriors&nbspS.p.A.</b>&nbsp&nbsp|&nbsp&nbspVia&nbspSegaluzza&nbsp33170&nbspPordenone&nbsp&nbsp|&nbsp&nbspPhone:&nbsp(+39)&nbsp0434612811&nbsp|&nbspPowered&nbspby&nbsp<a target="_blank" href="http://www.servizioglobale.it">Servizio Globale S.R.L.</a>
		</div>
	</body>
</html>