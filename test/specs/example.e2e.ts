describe("basic usage", () => {
  it("should start the app", async () => {
    const inputControl = await browser.asControl({
      selector: {
        id: "newTodo",
        viewName: "xmas.hacking.sample.view.Main"
      }
    })
    await expect(await inputControl.getVisible()).toBeTruthy()
  })
  it("should add a ToDo", async () => {
    // retrieve the amount of items in the list
    const beforeListItems = await browser
      .asControl({
        selector: {
          id: "todoList",
          viewName: "xmas.hacking.sample.view.Main"
        }
      })
      .getItems(true)

    // works - wdio native
    // await $('#__component0---main--newTodo').shadow$('input').setValue('peter rulez')

    // works two - ui5 web components native
    const inputSelector = {
      selector: {
        id: "newTodo",
        viewName: "xmas.hacking.sample.view.Main"
      }
    }
    await browser.asControl(inputSelector).setValue("peter rulez")

    // works three - wdi5 + wdio
    // const input = await browser.asControl(inputSelector)
    // await input.focus()
    // await browser.keys("peter rulez")

    // send off the newly entered todo item
    await browser
      .asControl({
        selector: {
          properties: {
            icon: "add"
          },
          controlType: "sap.ui.webc.main.Button",
          viewName: "xmas.hacking.sample.view.Main"
        }
      })
      .press()

    // retrieve the amount of items in the list after adding the above todo
    const list = await browser.asControl({
      forceSelect: true,
      selector: {
        id: "todoList",
        viewName: "xmas.hacking.sample.view.Main"
      }
    })
    const afterListItems = await list.getItems(true)

    expect(afterListItems.length - 1).toEqual(beforeListItems.length)

    const lastItem = await list.getItems(2)
    const label = (await lastItem.getContent())[1]
    const labelText = await label.getText()

    expect(labelText).toEqual("peter rulez")

  })
})
