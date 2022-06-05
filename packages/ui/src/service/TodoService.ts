import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import BaseService from "./BaseService";

export type TodoEntity = {
	id?: number;
	title?: string;
	completed?: boolean;
};
export type TodoEntitySet = { results: Array<TodoEntity> };

/**
 * @namespace hacking.away.sampleapp.service
 */
export default class TodoService extends BaseService {
	constructor(model: ODataModel) {
		super(model);
	}
	public async getTodosData() {
		const result = await this.odata("/Todos").get<TodoEntitySet>();
		return result.data.results;
	}
	public getTodos() {
		return this.odata("/Todos").get<TodoEntitySet>();
	}
	public addTodo(todo: TodoEntity) {
		return this.odata("/Todos").post<TodoEntity>(todo);
	}
	public deleteTodo(id: number) {
		const todoPath = this.model.createKey("/Todos", {
			id: id,
		});
		return this.odata(todoPath).delete();
	}
	public updateTodo(todo: TodoEntity) {
		const todoPath = this.model.createKey("/Todos", {
			id: todo.id,
		});
		return this.odata(todoPath).put(todo);
	}
}
