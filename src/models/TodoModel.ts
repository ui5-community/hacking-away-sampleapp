/* eslint-disable @typescript-eslint/no-unsafe-member-access,
					@typescript-eslint/no-unsafe-assignment,
					@typescript-eslint/no-unsafe-argument,
					@typescript-eslint/no-unsafe-call,
					@typescript-eslint/ban-ts-comment */

import JSONModel from "sap/ui/model/json/JSONModel";

import axios from "axios";

/**
 * @namespace xmas.hacking.sample.models
 */
export default class TodoModel extends JSONModel {

	private url : string;

	constructor(url: string) {
		super();
		this.url = url;
		this.read().then(() => { console.log("ok"); }).catch(() => { console.log("nOk"); });
	}

	async read(): Promise<void> {
		const response = await axios.get(this.url);
		this.setData(response.data);
	}

	async create(title: string): Promise<void> {
		await axios.post(this.url, {
			id: Math.round(Math.random() * 100000),
			title: title
		});
		await this.read();
	}

	async delete(id: number): Promise<void> {
		await axios.delete(`${this.url}/${id}`);
		await this.read();
	}

	async update(id: number, title: string, completed: boolean): Promise<void> {
		await axios.patch(`${this.url}/${id}`, {
			title,
			completed
		});
		await this.read();
	}

}
