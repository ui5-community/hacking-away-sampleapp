/* eslint-disable @typescript-eslint/no-unsafe-member-access,
					@typescript-eslint/no-unsafe-assignment,
					@typescript-eslint/no-unsafe-argument,
					@typescript-eslint/no-unsafe-call,
					@typescript-eslint/ban-ts-comment */

import JSONModel from "sap/ui/model/json/JSONModel";
import { makeAutoObservable, observe } from "mobx";

export interface UIModelData {
	new: UIModelDataNew;
	edit: UIModelDataEdit;
}

export interface UIModelDataNew {
	title: string;
}

export interface UIModelDataEdit {
	id: number;
	title: string;
}

/**
 * @namespace hacking.away.sampleapp.models
 */
export default class UIModel extends JSONModel {
	oData: UIModelData;

	constructor() {
		super({
			new: {
				title: "",
			},
			edit: {
				id: 0,
				title: "",
			},
		});
		makeAutoObservable(this.oData);
		observe(this.oData, () => {
			this.updateBindings(true);
		});
	}
}
