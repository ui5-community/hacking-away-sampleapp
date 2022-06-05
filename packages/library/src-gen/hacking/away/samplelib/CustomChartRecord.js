sap.ui.define(["sap/ui/core/Element"], function (Element) {
	/**
	 * @extends Control
	 *
	 * @author Wouter Lemaire
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @name hacking.away.samplelib.CustomChartRecord
	 */
	const CustomChartRecord = Element.extend("hacking.away.samplelib.CustomChartRecord", {
		metadata: {
			library: "hacking.away.samplelib",
			properties: {
				label: "string",
				value: "float",
			},
		},
		constructor: function _constructor(id, settings) {
			Element.prototype.constructor.call(this, id, settings);
		},
	});
	return CustomChartRecord;
});
