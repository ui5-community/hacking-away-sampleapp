/* eslint-disable @typescript-eslint/no-unsafe-member-access,
					@typescript-eslint/no-unsafe-assignment,
					@typescript-eslint/no-unsafe-argument,
					@typescript-eslint/no-unsafe-call,
					@typescript-eslint/ban-ts-comment */

import JSONModel from "sap/ui/model/json/JSONModel";

import axios from "axios";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import TodoService from "../service/TodoService";
import TodoItem from "./TodoItem";

export type todoModelData = {
	todoItems: Array<TodoItem>;
	completedCount: number;
	notCompletedCount: number;
};

/**
 * @namespace hacking.away.sampleapp.models
 */
export default class TodoModel extends JSONModel {
	private url: string;
	private todoService: TodoService;
	private data: todoModelData;
	constructor(url: string) {
		super();
		this.url = url;
		const model = new ODataModel(url);
		this.todoService = new TodoService(model);
		this.data = {
			todoItems: [],
			completedCount: 0,
			notCompletedCount: 0,
		};
		this.updateData();
		this.read()
			.then(() => {
				console.log("ok");
			})
			.catch(() => {
				console.log("nOk");
			});
	}
	updateData() {
		this.setData(this.data);
	}
	getTodoItem(id: number) {
		return this.data.todoItems.find((item) => item.getId() === id);
	}
	async read(): Promise<void> {
		// const response = await axios.get(this.url);
		const response = await this.todoService.getTodos();
		this.data.todoItems = response.data.results.map((item) => new TodoItem(item));
		this.data.completedCount = this.data.todoItems.filter((item) => item.getCompleted()).length || 0;
		this.data.notCompletedCount = this.data.todoItems.filter((item) => !item.getCompleted()).length || 0;
		this.updateData();
	}

	async create(title: string): Promise<void> {
		// await axios.post(this.url, {
		// 	id: Math.round(Math.random() * 100000),
		// 	title: title,
		// });
		await this.todoService.addTodo(new TodoItem({ title }).getJSON());
		await this.read();
	}

	async delete(todoItem: TodoItem): Promise<void> {
		// async delete(id: number): Promise<void> {
		// await axios.delete(`${this.url}/${id}`);
		await this.todoService.deleteTodo(todoItem.getId());
		await this.read();
	}

	async update(todoItem: TodoItem): Promise<void> {
		// async update(id: number, title: string, completed: boolean): Promise<void> {
		// await axios.patch(`${this.url}/${id}`, {
		// 	title,
		// 	completed,
		// });
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
