/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { WDI5Control } from "wdio-ui5-service/dist/lib/wdi5-control";
import CustomListItem from "sap/m/CustomListItem";
import Input from "sap/m/Input";
import Label from "sap/m/Label";
import List from "sap/m/List";
describe("basic usage", () => {
	it("should start the app", async () => {
		const inputControl = await browser.asControl({
			selector: {
				id: "newTodo",
				viewName: "hacking.away.sampleapp.view.Main"
			}
		});
		expect(inputControl.getVisible()).toBeTruthy();
	});
	it("should add a ToDo", async () => {
		// retrieve the amount of items in the list
		const beforeListItems = (
			(await browser.asControl({
				selector: {
					id: "todoList",
					viewName: "hacking.away.sampleapp.view.Main"
				}
			})) as unknown as List
		)
			// @ts-ignore
			.getItems(true);

		// works - wdio native
		// await $('#__component0---main--newTodo').shadow$('input').setValue('peter rulez')

		// works two - ui5 web components native
		const inputSelector = {
			selector: {
				id: "newTodo",
				viewName: "hacking.away.sampleapp.view.Main"
			}
		};
		// eslint-disable-next-line @typescript-eslint/await-thenable
		await (browser.asControl(inputSelector) as unknown as Input).setValue("peter rulez");

		// works three - wdi5 + wdio
		// const input = await browser.asControl(inputSelector)
		// await input.focus()
		// await browser.keys("peter rulez")

		// send off the newly entered todo item
		await (
			browser.asControl({
				selector: {
					properties: {
						icon: "add"
					},
					controlType: "sap.ui.webc.main.Button",
					viewName: "hacking.away.sampleapp.view.Main"
				}
			}) as unknown as WDI5Control
		).press();

		// retrieve the amount of items in the list after adding the above todo
		const list = (await browser.asControl({
			forceSelect: true,
			selector: {
				id: "todoList",
				viewName: "hacking.away.sampleapp.view.Main"
			}
		})) as unknown as List;
		// @ts-ignore
		const afterListItems = await list.getItems(true);

		expect(afterListItems.length - 1).toEqual(beforeListItems.length);

		// @ts-ignore
		const lastItem = (await list.getItems(2)) as CustomListItem;
		const label = (await lastItem.getContent())[1] as Label;
		const labelText = await label.getText();

		expect(labelText).toEqual("peter rulez");
	});
});
