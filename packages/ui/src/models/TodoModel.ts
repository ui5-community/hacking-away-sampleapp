/* eslint-disable @typescript-eslint/no-unsafe-member-access,
					@typescript-eslint/no-unsafe-assignment,
					@typescript-eslint/no-unsafe-argument,
					@typescript-eslint/no-unsafe-call,
					@typescript-eslint/ban-ts-comment */

import JSONModel from "sap/ui/model/json/JSONModel";
import { makeAutoObservable, observe } from "mobx";

import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import TodoService from "../service/TodoService";
import TodoItem from "./TodoItem";

export type todoModelData = {
	todoItems: Array<TodoItem>;
	completedCount: number;
	notCompletedCount: number;
	new: TodoItem;
	edit: TodoItem;
};

/**
 * @namespace hacking.away.sampleapp.models
 */
export default class TodoModel extends JSONModel {
	private url: string;
	private todoService: TodoService;
	private oData: todoModelData;
	constructor(url: string) {
		super({
			todoItems: [],
			completedCount: 0,
			notCompletedCount: 0,
			new: new TodoItem(),
			edit: new TodoItem()
		});

		makeAutoObservable(this.getData());
		observe(this.getData(), () => {
			this.updateBindings(true);
		});

		this.url = url;
		const model = new ODataModel(url);
		this.todoService = new TodoService(model);

		this.read()
			.then(() => {
				console.log("ok");
			})
			.catch(() => {
				console.log("nOk");
			});
	}
	resetNewTodo() {
		this.oData.new = new TodoItem();
	}
	setUpdateTodo(todo: TodoItem) {
		this.oData.edit = todo;
	}
	getTodoItem(id: number) {
		return this.oData.todoItems.find((item) => item.getId() === id);
	}
	async read(): Promise<void> {
		const response = await this.todoService.getTodos();
		this.oData.todoItems = response.data.results.map((item) => new TodoItem(item));
		this.oData.completedCount = this.oData.todoItems.filter((item) => item.getCompleted()).length || 0;
		this.oData.notCompletedCount = this.oData.todoItems.filter((item) => !item.getCompleted()).length || 0;
	}

	async create(title: string): Promise<void> {
		await this.todoService.addTodo(new TodoItem({ title }).getJSON());
		await this.read();
	}

	async delete(todoItem: TodoItem): Promise<void> {
		await this.todoService.deleteTodo(todoItem.getId());
		await this.read();
	}

	async update(todoItem: TodoItem): Promise<void> {
		await this.todoService.updateTodo(todoItem.getJSON());
		await this.read();
	}
	async updateTitle(id: number, title: string): Promise<void> {
		const todoItem = this.getTodoItem(id);
		todoItem.setCompleted(false);
		todoItem.setTitle(title);
		await this.update(todoItem);
	}
}
