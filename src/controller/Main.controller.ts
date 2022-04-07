
import Event from "sap/ui/base/Event";
import BaseController from "./Base.controller";


import Button from "sap/ui/webc/main/Button";
import Dialog from "sap/ui/webc/main/Dialog";
import TodoModel from "../models/TodoModel";
import UIComponent from "sap/ui/core/UIComponent";
import CheckBox from "sap/ui/webc/main/CheckBox";

/**
 * @namespace xmas.hacking.sample.controller
 */
 export default class MainController extends BaseController {

	onInit() : void {
		super.onInit()
	}

	getTodoModel(): TodoModel {
		return this.getOwnerComponent().getModel() as TodoModel;
	}

	async addTodo(event: Event): Promise<void> {
		await this.getTodoModel().create(this.uiModelData.new.title);
		this.uiModelData.new.title = "";
	}

	async deleteTodo(event: Event): Promise<void> {
		const context = (event.getSource() as Button).getBindingContext();
		await this.getTodoModel().delete(context.getProperty("id") as number);
	}

	openEditDialog(event: Event): void {
		const context = (event.getSource() as Button).getBindingContext();
		this.uiModelData.edit = {
			id: context.getProperty("id") as number,
			title: context.getProperty("title") as string,
		};
		// @ts-ignore - TODO: Dialog#show not available in @openui5/ts-types-esm
		(this.byId("editDialog") as Dialog).show(false);
	}
	
	async closeEditDialog(event: Event): Promise<void> {
		const { id, title } = this.uiModelData.edit;
		await this.getTodoModel().update(id, title, undefined);
		(this.byId("editDialog") as Dialog).close();
	}
	
	async completeTodo(event: Event): Promise<void> {
		const context = (event.getSource() as CheckBox).getBindingContext();
		const id = context.getProperty("id") as number;
		const checked = (event.getSource() as CheckBox).getChecked();
		await this.getTodoModel().update(id, undefined, checked);
	}

}