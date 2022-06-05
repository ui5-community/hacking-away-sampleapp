import { CSSColor } from "sap/ui/core/library";
import CustomChartRecord from "hacking/away/samplelib/CustomChartRecord";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./CustomChart" {
	/**
	 * Interface defining the settings object used in constructor calls
	 */
	interface $CustomChartSettings extends $ControlSettings {
		type?: string;
		title?: string;
		color?: CSSColor;
		records?: CustomChartRecord[] | CustomChartRecord;
	}

	export default interface CustomChart {
		// property: type
		getType(): string;
		setType(type: string): this;

		// property: title
		getTitle(): string;
		setTitle(title: string): this;

		// property: color
		getColor(): CSSColor;
		setColor(color: CSSColor): this;

		// aggregation: records
		getRecords(): CustomChartRecord[];
		addRecord(records: CustomChartRecord): this;
		insertRecord(records: CustomChartRecord, index: number): this;
		removeRecord(records: number | string | CustomChartRecord): this;
		removeAllRecords(): CustomChartRecord[];
		indexOfRecord(records: CustomChartRecord): number;
		destroyRecords(): this;
	}
}
