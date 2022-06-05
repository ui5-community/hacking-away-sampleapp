import CustomChart from "hacking/away/samplelib/CustomChart";
import CustomChartRecord from "hacking/away/samplelib/CustomChartRecord";

// create a new instance of the Example control and
// place it into the DOM element with the id "content"
new CustomChart({
	type: "pie",
	title: "Test",
	color: "#A52A2A",
	records: [new CustomChartRecord({ label: "A", value: 12.5 }), new CustomChartRecord({ label: "B", value: 14.5 }), new CustomChartRecord({ label: "C", value: 18.5 })],
}).placeAt("content");
