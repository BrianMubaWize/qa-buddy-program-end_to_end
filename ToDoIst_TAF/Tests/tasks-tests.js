import loginPage from './../PageObjects/login-page';
import tasksPage from './../PageObjects/tasks-page';
import { Selector, t } from 'testcafe';

fixture `Tasks Tests`
	.page `${process.env.URL}`;

test ('Create a Task', async t => {
	await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);

	    tasksPage.today            = new Date();
		tasksPage.time             = tasksPage.today.getHours() + ':' + tasksPage.today.getMinutes() + ':' + tasksPage.today.getSeconds();
		tasksPage.taskCreated      = Selector('.text.sel_item_content').withText(tasksPage.time);

		//await this.clickAddTask();
		await t
			.click(tasksPage.addTask)
			.typeText(tasksPage.inputTask, String(tasksPage.time))
			.click(tasksPage.createTask);

	await t.expect(tasksPage.taskCreated.innerText).eql(tasksPage.time);
});

test ('Create multiple tasks', async t => {
	await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);
	for(let i = 0; i < 10; i++)
	{
		tasksPage.today            = new Date();
		tasksPage.time             = tasksPage.today.getHours() + ':' + tasksPage.today.getMinutes() + ':' + tasksPage.today.getSeconds();
		tasksPage.taskCreated      = Selector('.text.sel_item_content').withText(tasksPage.time);

		//await this.clickAddTask();
		await t
			.click(tasksPage.addTask)
			.typeText(tasksPage.inputTask, String(tasksPage.time))
			.click(tasksPage.createTask);

	await t.expect(tasksPage.taskCreated.innerText).eql(tasksPage.time);
	}
});