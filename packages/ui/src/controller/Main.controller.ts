import BaseController from "./Base.controller";

import UI5Element from "sap/ui/core/Element";
import Dialog from "sap/ui/webc/main/Dialog";
import TodoModel from "../models/TodoModel";
import Event from "sap/ui/base/Event";
import Button from "sap/m/Button";
import TodoItem from "../models/TodoItem";

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
		this.todoModel.resetNewTodo();
	}

	async deleteTodo(id: number, event: Event): Promise<void> {
		const todoItem = (event.getSource() as Button).getBindingContext().getObject() as TodoItem;
		await this.getTodoModel().delete(todoItem);
	}

	openEditDialog(id: number, title: string, event: Event): void {
		const todoItem = (event.getSource() as Button).getBindingContext().getObject() as TodoItem;
		this.todoModel.setUpdateTodo(todoItem);
		// this.todoModelData.edit = todoItem;
		(this.byId("editDialog") as Dialog).show(false);
	}

	async closeEditDialog(id: number, title: string): Promise<void> {
		await this.getTodoModel().updateTitle(id, title);
		(this.byId("editDialog") as Dialog).close();
	}

	async completeTodo(id: number, checked: boolean, event: Event): Promise<void> {
		const todoItem = (event.getSource() as Button).getBindingContext().getObject() as TodoItem;
		await this.getTodoModel().update(todoItem);
	}
}
