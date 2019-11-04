import loginPage from './../PageObjects/login-page';
import tasksPage from './../PageObjects/tasks-page';

fixture `Tasks Tests`
	.page `${process.env.URL}`;

test ('Create a Task', async t => {
	await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);
	await tasksPage.createTask();

	await t.expect(tasksPage.taskCreated.innerText).eql(tasksPage.time);
});

test ('Create multiple tasks', async tasksPage => {
	await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);
	await tasksPage.createMultipleTasks(3);
});