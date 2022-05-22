import BaseController from "./Base.controller";

import UI5Element from "sap/ui/core/Element";
import Dialog from "sap/ui/webc/main/Dialog";
import TodoModel from "../models/TodoModel";

/**
 * @namespace hacking.away.sampleapp.controller
 */
export default class MainController extends BaseController {
	onInit(): void {
		super.onInit();
	}

	getTodoModel(): TodoModel {
		return this.getOwnerComponent().getModel() as TodoModel;
	}

	getTodoId(source: UI5Element) {
		const context = source.getBindingContext();
		return context.getProperty("id") as number;
	}

	async addTodo(title: string): Promise<void> {
		await this.getTodoModel().create(title);
		this.uiModelData.new.title = "";
	}

	async deleteTodo(id: number): Promise<void> {
		await this.getTodoModel().delete(id);
	}

	openEditDialog(id: number, title: string): void {
		this.uiModelData.edit = {
			id,
			title,
		};
		(this.byId("editDialog") as Dialog).show(false);
	}

	async closeEditDialog(id: number, title: string): Promise<void> {
		await this.getTodoModel().update(id, title, undefined);
		(this.byId("editDialog") as Dialog).close();
	}

	async completeTodo(id: number, checked: boolean): Promise<void> {
		await this.getTodoModel().update(id, undefined, checked);
	}
}
