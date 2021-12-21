import Controller from "sap/ui/core/mvc/Controller"
import JSONModel from "sap/ui/model/json/JSONModel";
import { UIModelData } from "../types/ui"

export default class BaseController extends Controller {

	protected uiModelData: UIModelData;

	public onInit() : void {

		this.uiModelData = (this.getOwnerComponent().getModel("ui") as JSONModel).getData() as UIModelData;

	}

}