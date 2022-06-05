sap.ui.define([], function () {
	/*!
	 * ${copyright}
	 */

	/**
	 * Example renderer.
	 * @namespace
	 */
	const CustomChartRenderer = {
		apiVersion: 2,
		// usage of DOM Patcher
		render: function (rm, chart) {
			rm.openStart("div", chart);
			rm.style("color", chart.getColor());
			rm.class("chart");
			rm.openEnd();
			rm.openStart("canvas", chart.getId() + "-canvas");
			rm.openEnd();
			rm.close("canvas");
			rm.close("div");
		},
	};
	return CustomChartRenderer;
});
