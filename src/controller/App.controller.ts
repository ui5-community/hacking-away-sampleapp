import MessageBox from "sap/m/MessageBox";
import BaseController from "./Base.controller";
import AppComponent from "../Component";

export default class AppController extends BaseController {

	public onInit() : void {
		super.onInit();
		// apply content density mode to root view
		this.getView().addStyleClass((this.getOwnerComponent() as AppComponent).getContentDensityClass());
	}

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}
}