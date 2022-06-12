import { CSSColor } from "sap/ui/core/library";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ElementSettings } from "sap/ui/core/Element";

declare module "./CustomChartRecord" {
	/**
	 * Interface defining the settings object used in constructor calls
	 */
	interface $CustomChartRecordSettings extends $ElementSettings {
		label?: string | PropertyBindingInfo;
		color?: CSSColor | PropertyBindingInfo | `{${string}}`;
		value?: number | PropertyBindingInfo | `{${string}}`;
	}

	export default interface CustomChartRecord {
		// property: label
		getLabel(): string;
		setLabel(label: string): this;

		// property: color
		getColor(): CSSColor;
		setColor(color: CSSColor): this;

		// property: value
		getValue(): number;
		setValue(value: number): this;
	}
}
