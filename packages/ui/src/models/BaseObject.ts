import Object from "sap/ui/base/Object";
/**
 * @namespace hacking.away.sampleapp.models
 */
export default abstract class BaseObject<T> extends Object {
	private busy = false;
	constructor() {
		super();
		this.busy = false;
	}

	public setBusy(busy: boolean): void {
		this.busy = busy;
	}
	public abstract getJSON(): T;
}
