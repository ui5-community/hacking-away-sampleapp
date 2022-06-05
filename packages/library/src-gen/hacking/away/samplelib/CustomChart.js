sap.ui.define(["sap/ui/core/Control", "chart.js/auto"], function (Control, __Chart) {
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
	}

	const Chart = _interopRequireDefault(__Chart);
	/**
	 * @extends Control
	 *
	 * @author Wouter Lemaire
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @name hacking.away.samplelib.CustomChart
	 */

	const CustomChart = Control.extend("hacking.away.samplelib.CustomChart", {
		metadata: {
			library: "hacking.away.samplelib",
			properties: {
				type: {
					type: "string",
					defaultValue: "line",
				},
				title: "string",
				color: "sap.ui.core.CSSColor",
			},
			aggregations: {
				records: {
					type: "hacking.away.samplelib.CustomChartRecord",
				},
			},
			defaultAggregation: "records",
		},
		constructor: function _constructor(id, settings) {
			Control.prototype.constructor.call(this, id, settings);
		},
		getChartData: function _getChartData() {
			const aRecords = this.getRecords();
			return {
				labels: aRecords.map((record) => {
					return record.getLabel();
				}),
				datasets: [
					{
						label: this.getTitle(),
						backgroundColor: this.getColor(),
						borderColor: this.getColor(),
						data: aRecords.map((record) => {
							return record.getValue();
						}),
					},
				],
			};
		},
		init: function _init() {},
		onAfterRendering: function _onAfterRendering() {
			if (!this.chart) {
				this.chart = new Chart(this.getDomRef("canvas"), {
					type: this.getType(),
					data: this.getChartData(),
					options: {
						responsive: true,
						animation: false,
					},
				});
			} else {
				this.chart.data = this.getChartData();
				this.chart.update();
			}
		},
	});
	return CustomChart;
});
