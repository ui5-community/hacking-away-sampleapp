import Element from "sap/ui/core/Element";

/**
 * @extends Control
 *
 * @author Wouter Lemaire
 * @version ${version}
 *
 * @constructor
 * @public
 * @namespace hacking.away.samplelib
 */
export default class CustomChartRecord extends Element {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(idOrSettings?: string | $CustomChartRecordSettings);
	constructor(id?: string, settings?: $CustomChartRecordSettings);
	constructor(id?: string, settings?: $CustomChartRecordSettings) {
		super(id, settings);
	}
	static readonly metadata = {
		library: "hacking.away.samplelib",
		properties: {
			label: "string",
			color: "sap.ui.core.CSSColor",
			value: "float"
		}
	};
}
