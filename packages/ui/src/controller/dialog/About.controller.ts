import DialogController from "../Dialog.controller";
import { frag } from "../Base.controller";
import Popover from "sap/m/Popover";
import UI5Event from "sap/ui/base/Event";
import Dialog from "sap/m/Dialog";
import AppController from "../App.controller";
import Text from "sap/m/Text";
import JSONModel from "sap/ui/model/json/JSONModel";
type data = {
	param: string;
};
/**
 * @namespace hacking.away.sampleapp.controller.dialog
 */
export default class About extends DialogController {
	private data: data;
	private resolve: (value: unknown) => void;
	public onBeforeShow(viewController: AppController, dialog: frag, resolve: (value: unknown) => void, data: data): void {
		this.dialog = dialog;
		this.viewController = viewController;
		this.data = data;
		this.resolve = resolve;
		this.dialog.fragment.setModel(new JSONModel({ param: this.data.param }));
	}
	public onClose(event?: UI5Event): void {
		(this.dialog.fragment as Dialog).close(); //eslint-disable-line
		const text = this.fragmentById(this.viewController, "About", "textField") as Text;
		this.resolve(text);
	}
}
