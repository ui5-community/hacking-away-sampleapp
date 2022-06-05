import BaseController from "./Base.controller";
import AppComponent from "../Component";

/**
 * @namespace hacking.away.sampleapp.controller
 */
export default class AppController extends BaseController {
	public onInit(): void {
		super.onInit();
		// apply content density mode to root view
		this.getView().addStyleClass((this.getOwnerComponent() as AppComponent).getContentDensityClass());
	}
}
