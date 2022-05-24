/* eslint-disable @typescript-eslint/no-unsafe-member-access,
					@typescript-eslint/no-unsafe-assignment,
					@typescript-eslint/no-unsafe-argument,
					@typescript-eslint/no-unsafe-call,
					@typescript-eslint/ban-ts-comment */

import JSONModel from "sap/ui/model/json/JSONModel";

import axios from "axios";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import TodoService from "../service/TodoService";

/**
 * @namespace hacking.away.sampleapp.models
 */
export default class TodoModel extends JSONModel {
	private url: string;
	private todoService: TodoService;
	constructor(url: string) {
		super();
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

	async read(): Promise<void> {
		// const response = await axios.get(this.url);
		const response = await this.todoService.getTodos();
		this.setData(response.data.results);
	}

	async create(title: string): Promise<void> {
		// await axios.post(this.url, {
		// 	id: Math.round(Math.random() * 100000),
		// 	title: title,
		// });
		await this.todoService.addTodo({
			id: Math.round(Math.random() * 100000),
			title: title,
		});
		await this.read();
	}

	async delete(id: number): Promise<void> {
		// await axios.delete(`${this.url}/${id}`);
		await this.todoService.deleteTodo(id);
		await this.read();
	}

	async update(id: number, title: string, completed: boolean): Promise<void> {
		// await axios.patch(`${this.url}/${id}`, {
		// 	title,
		// 	completed,
		// });
		await this.todoService.updateTodo({
			id,
			title,
			completed,
		});
		await this.read();
	}
}
