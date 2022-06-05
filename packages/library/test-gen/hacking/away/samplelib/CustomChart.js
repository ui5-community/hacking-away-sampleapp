sap.ui.define(["hacking/away/samplelib/CustomChart", "hacking/away/samplelib/CustomChartRecord"], function (__CustomChart, __CustomChartRecord) {
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
	}

	const CustomChart = _interopRequireDefault(__CustomChart);

	const CustomChartRecord = _interopRequireDefault(__CustomChartRecord); // create a new instance of the Example control and
	// place it into the DOM element with the id "content"

	new CustomChart({
		type: "pie",
		title: "Test",
		color: "#A52A2A",
		records: [
			new CustomChartRecord({
				label: "A",
				value: 12.5,
			}),
			new CustomChartRecord({
				label: "B",
				value: 14.5,
			}),
			new CustomChartRecord({
				label: "C",
				value: 18.5,
			}),
		],
	}).placeAt("content");
});
