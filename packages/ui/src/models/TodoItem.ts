import { TodoEntity } from "../service/TodoService";
import BaseObject from "./BaseObject";

/**
 * @namespace hacking.away.sampleapp.models
 */
export default class TodoItem extends BaseObject<TodoEntity> {
	private id: number;
	private title: string;
	private completed: boolean;

	constructor(data?: TodoEntity) {
		super();

		if (data) {
			this.id = data.id;
			this.title = data.title;
			this.completed = data.completed;
		}
		!this.id && (this.id = this.generateId());
	}
	public getId() {
		return this.id;
	}
	private generateId() {
		return Math.round(Math.random() * 100000);
	}
	public setCompleted(completed: boolean) {
		this.completed = completed;
	}
	public getCompleted() {
		return this.completed;
	}
	public setTitle(title: string) {
		this.title = title;
	}
	public getJSON(): TodoEntity {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed,
		};
	}
}
