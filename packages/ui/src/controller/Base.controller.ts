import Controller from "sap/ui/core/mvc/Controller";
import TodoModel, { todoModelData } from "../models/TodoModel";

/**
 * @namespace hacking.away.sampleapp.controller
 */
export default class BaseController extends Controller {
	protected todoModelData: todoModelData;
	protected todoModel: TodoModel;

	public onInit(): void {
		this.todoModel = this.getOwnerComponent().getModel() as TodoModel;
		this.todoModelData = this.todoModel.getData() as todoModelData;
	}
}
