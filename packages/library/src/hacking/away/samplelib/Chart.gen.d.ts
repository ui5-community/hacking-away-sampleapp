import { CSSColor } from "sap/ui/core/library";
import ChartRecord from "ui5-cc-chart/ChartRecord";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./CustomChart" {
	/**
	 * Interface defining the settings object used in constructor calls
	 */
	interface $ChartSettings extends $ControlSettings {
		type?: string;
		title?: string;
		color?: CSSColor;
		records?: ChartRecord[] | ChartRecord;
	}

	export default interface Chart {
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
		getRecords(): ChartRecord[];
		addRecord(records: ChartRecord): this;
		insertRecord(records: ChartRecord, index: number): this;
		removeRecord(records: number | string | ChartRecord): this;
		removeAllRecords(): ChartRecord[];
		indexOfRecord(records: ChartRecord): number;
		destroyRecords(): this;
	}
}
