/*!
 * ${copyright}
 */

import ObjectPath from "sap/base/util/ObjectPath";

/**
 * Initialization Code and shared classes of library com.myorg.myUI5Library.
 */

// delegate further initialization of this library to the Core
// Hint: sap.ui.getCore() must still be used here to support preload with sync bootstrap!
sap.ui.getCore().initLibrary({
	name: "hacking.away.samplelib",
	version: "${version}",
	dependencies: [
		// keep in sync with the ui5.yaml and .library files
		"sap.ui.core",
	],
	types: [],
	interfaces: [],
	controls: ["hacking.away.samplelib.CustomChart", "hacking.away.samplelib.CustomChartRecord"],
	elements: [],
	noLibraryCSS: false, // if no CSS is provided, you can disable the library.css load here
});

// get the library object from global object space because all enums must be attached to it to be usable as UI5 types
// FIXME: this line is planned to become obsolete and may need to be removed later
const thisLib: { [key: string]: unknown } = ObjectPath.get("hacking.away.samplelib") as { [key: string]: unknown };

export default thisLib;
