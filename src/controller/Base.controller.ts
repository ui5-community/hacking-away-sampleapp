import Controller from "sap/ui/core/mvc/Controller";
import UIModel, { UIModelData } from "../models/UIModel";

/**
 * @namespace hacking.away.sampleapp.controller
 */
export default class BaseController extends Controller {
	protected uiModelData: UIModelData;

	public onInit(): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.uiModelData = (this.getOwnerComponent().getModel("ui") as UIModel).getData() as UIModelData;
	}
}
