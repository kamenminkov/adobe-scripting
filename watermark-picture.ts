/*
  Adobe-script-runner 'watermark-picture.js'
*/

const WATERMARK_PATH = "C:\\Users\\Kamen\\Desktop\\kamen.png";
const WATERMARK_SCALE = 70;

addPictureWatermark();

const { charIDToTypeID, executeAction, stringIDToTypeID } = app;

function addPictureWatermark(): void {
	if (!app.documents.length) {
		return;
	}

	// app.open(WATERMARK_PATH);

	// const doc = app.activeDocument;
	// const layerRef = app.activeDocument.artLayers.add();
	// const layer = app.activeDocument.artLayers.getByName("Layer 1");

	// const selectedFile = new File(WATERMARK_PATH);

	placeWatermark(WATERMARK_PATH);
}

function placeWatermark(watermarkPath: string, offset: number = 100): void {
	const watermarkFile = new File(watermarkPath);

	if (!watermarkFile.exists) {
		alert(watermarkFile.name + " does not exist!");

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

		const docHeight = doc.height;
		const docWidth = doc.width;

		var offsetPosX = (docWidth as number) - 0.5 * offset;
		var offsetPosY = (docHeight as number) - 0.5 * offset; // - offset);

		// alert(`w: ${docWidth} h: ${docHeight}`);

		const orientation =
			docWidth > docHeight ? Direction.HORIZONTAL : Direction.VERTICAL;

		placeWatermarkFromFile(
			watermarkFile,
			{ x: offsetPosX, y: offsetPosY },
			orientation
		); // Place in file the Watermark png file
	} catch (e) {
		alert(e + ": on line " + e.line);
	} finally {
		// inform user of error
		app.preferences.rulerUnits = strtRulerUnits; // Restore user ruler units
		app.preferences.typeUnits = strtTypeUnits; // Restore user type units
	}
}

function placeWatermarkFromFile(
	watermarkPath: string | File,
	offsetFromBottom: { x: number; y: number } = { x: 0, y: 0 },
	picOrientation: Direction
): void {
	const desc21 = new ActionDescriptor();

	if (picOrientation === Direction.HORIZONTAL) {
		offsetFromBottom = { x: -550, y: 250 };
	} else {
		offsetFromBottom = { x: -250, y: 600 };
	}

	desc21.putPath(charIDToTypeID("null"), new File(watermarkPath as string));
	desc21.putEnumerated(
		charIDToTypeID("FTcs"),
		charIDToTypeID("QCSt"),
		charIDToTypeID("Qcsa")
	);

	const desc22 = new ActionDescriptor();
	desc22.putUnitDouble(
		charIDToTypeID("Hrzn"),
		charIDToTypeID("#Pxl"),
		offsetFromBottom.x
	);
	desc22.putUnitDouble(
		charIDToTypeID("Vrtc"),
		charIDToTypeID("#Pxl"),
		offsetFromBottom.y
	);

	desc21.putObject(charIDToTypeID("Ofst"), charIDToTypeID("Ofst"), desc22);

	const idPrc = charIDToTypeID("#Prc");

	desc21.putUnitDouble(charIDToTypeID("Wdth"), idPrc, WATERMARK_SCALE);
	desc21.putUnitDouble(charIDToTypeID("Hght"), idPrc, WATERMARK_SCALE);

	executeAction(charIDToTypeID("Plc "), desc21, DialogModes.NO);
}
