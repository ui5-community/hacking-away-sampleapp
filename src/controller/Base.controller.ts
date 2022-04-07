import Controller from "sap/ui/core/mvc/Controller"
import JSONModel from "sap/ui/model/json/JSONModel";
import { UIModelData } from "../types/ui"

/**
 * @namespace xmas.hacking.sample.controller
 */
export default class BaseController extends Controller {

	protected uiModelData: UIModelData;

	public onInit() : void {

		// requires beerMode in manifest => bObserve=true!
		// -> only properties are allowed to be changed, no object/array refs!
		this.uiModelData = (this.getOwnerComponent().getModel("ui") as JSONModel).getData() as UIModelData;

	}

}