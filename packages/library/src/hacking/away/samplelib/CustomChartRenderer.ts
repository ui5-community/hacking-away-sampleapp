/*!
 * ${copyright}
 */
import RenderManager from "sap/ui/core/RenderManager";
import CustomChart from "./CustomChart";

/**
 * Example renderer.
 * @namespace hacking.away.samplelib
 */
const CustomChartRenderer = {
	apiVersion: 2, // usage of DOM Patcher

	render: function (rm: RenderManager, chart: CustomChart) {
		rm.openStart("div", chart);
		rm.class("chart");
		rm.openEnd();

		rm.openStart("canvas", chart.getId() + "-canvas");
		rm.openEnd();
		rm.close("canvas");

		rm.close("div");
	},
};

export default CustomChartRenderer;
