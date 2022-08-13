/*
  Adobe-script-runner 'copyright.js'
*/

getCopyright();

function getCopyright() {
	const rawXmp = app.activeDocument.xmpMetadata.rawData;

	const xml = new XML(rawXmp);

	// TODO: Research parsing the xmp
	// https://www.adobe.com/devnet/xmp.html

	Window.alert(xml.child("0") as any);
}
