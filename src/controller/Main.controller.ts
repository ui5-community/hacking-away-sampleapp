/* eslint-disable @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call */

import Event from "sap/ui/base/Event";
import BaseController from "./Base.controller";

import axios, {AxiosResponse } from "axios";
import JSONModel from "sap/ui/model/json/JSONModel";

export default class MainController extends BaseController {

	public onInit() : void {
		super.onInit()
	}

	public async addTodo(event: Event): Promise<void> {
		await axios.post('/json-server/todos', {
			id: Math.round(Math.random() * 100000),
			title: this.uiModelData.new.title
		});
		const response = await axios.get('/json-server/todos') as AxiosResponse;
		(this.getOwnerComponent().getModel() as JSONModel).setData(response.data);
		this.uiModelData.new.title = "";
	}

}