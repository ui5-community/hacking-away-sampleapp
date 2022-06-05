import Object from "sap/ui/base/Object";
import Filter from "sap/ui/model/Filter";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Sorter from "sap/ui/model/Sorter";

type odataMethods = "read" | "create" | "update" | "remove";
type parameters<T> = {
	context?: Record<string, unknown>;
	urlParameters?: Record<string, string>;
	filters?: Filter[];
	sorters?: Sorter[];
	success?: (result: T, response: Response) => void;
	error?: (error: unknown) => void;
	batchGroupId?: string;
	groupId?: string;
	updateAggregatedMessages?: boolean;
};
type response<T> = {
	data: T;
	response: unknown;
};
/**
 * @namespace hacking.away.sampleapp.service
 */
export default class BaseService extends Object {
	protected model: ODataModel;
	constructor(model: ODataModel) {
		super();
		if (model) {
			this.setModel(model);
		}
	}
	public setModel(model: ODataModel): void {
		this.model = model;
	}
	public getModel(): ODataModel {
		return this.model;
	}
	public odata(url: string) {
		const core = {
			ajax: <T>(type: odataMethods, url: string, parameters: parameters<T>, data?: T): Promise<response<T>> => {
				const promise = new Promise<response<T>>((resolve, reject) => {
					let params: parameters<T> = {};
					if (parameters) {
						params = parameters;
					}
					params.success = (result: T, response): void => {
						const responseResult: response<T> = {
							data: result,
							response: response,
						};
						resolve(responseResult);
					};
					params.error = function (error: unknown) {
						reject(error);
					};
					if (data) {
						this.model[type](url, data, params);
					} else {
						this.model[type](url, params);
					}
				});
				return promise;
			},
		};
		return {
			get: <T>(params?: parameters<T>): Promise<response<T>> => core.ajax("read", url, params),
			post: <T>(data: T, params?: parameters<T>): Promise<response<T>> => core.ajax("create", url, params, data),
			put: <T>(data: T, params?: parameters<T>): Promise<response<T>> => core.ajax("update", url, params, data),
			delete: <T>(params?: parameters<T>): Promise<response<T>> => core.ajax("remove", url, params),
		};
	}
}
