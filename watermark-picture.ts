/*
  Adobe-script-runner 'watermark-picture.js'
*/

const WATERMARK_PATH = "C:\\Users\\Kamen\\Desktop\\kamen.png";

addPictureWatermark();

const { charIDToTypeID, executeAction } = app;

function addPictureWatermark() {
	// app.open(WATERMARK_PATH);

	const doc = app.activeDocument;
	const layerRef = app.activeDocument.artLayers.add();
	const layer = app.activeDocument.artLayers.getByName("Layer 1");

	// const selectedFile = new File(WATERMARK_PATH);

	placeWatermark(WATERMARK_PATH);
}

function placeWatermark(watermarkPath: string) {
	if (!app.documents.length) {
		return;
	}

	var fileObj = new File(watermarkPath);

	if (!fileObj.exists) {
		alert(fileObj.name + " does not exist!");

		return;
	}

	try {
		var doc = app.activeDocument; // set Doc object to active document
		app.displayDialogs = DialogModes.NO; // Dialog off
		var strtRulerUnits = app.preferences.rulerUnits; // Save Users ruler units
		var strtTypeUnits = app.preferences.typeUnits; // Save Users Type units
		app.preferences.rulerUnits = Units.PIXELS; // work with pixels
		app.preferences.typeUnits = TypeUnits.PIXELS; // work with pixels
		var layers = app.activeDocument.layers; // get layers
		app.activeDocument.activeLayer = layers[0]; // Target Top Layer

		placeFile(fileObj); // Place in file the Watermark png file
	} catch (e) {
		alert(e + ": on line " + e.line);
	} finally {
		// inform user of error
		app.preferences.rulerUnits = strtRulerUnits; // Restore user ruler units
		app.preferences.typeUnits = strtTypeUnits; // Restore user type units
	}
}

function placeFile(placeFile: string | File) {
	var desc21 = new ActionDescriptor();

	desc21.putPath(charIDToTypeID("null"), new File(placeFile as string));
	desc21.putEnumerated(
		charIDToTypeID("FTcs"),
		charIDToTypeID("QCSt"),
		charIDToTypeID("Qcsa")
	);

	var desc22 = new ActionDescriptor();
	desc22.putUnitDouble(charIDToTypeID("Hrzn"), charIDToTypeID("#Pxl"), 0.0);
	desc22.putUnitDouble(charIDToTypeID("Vrtc"), charIDToTypeID("#Pxl"), 0.0);
	desc21.putObject(charIDToTypeID("Ofst"), charIDToTypeID("Ofst"), desc22);
	executeAction(charIDToTypeID("Plc "), desc21, DialogModes.NO);
}
