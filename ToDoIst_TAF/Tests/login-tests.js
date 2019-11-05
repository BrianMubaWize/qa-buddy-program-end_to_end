import loginPage from './../PageObjects/login-page';
import tasksPage from './../PageObjects/tasks-page';

fixture `Login Tests`
	.page `${process.env.URL}`;

test ('Test successfull login', async t => {
	await loginPage.login((`${process.env.USER_NAME}`), (`${process.env.PASSWORD}`));

	await t.expect(tasksPage.addTask.exists).ok();
});

test ('Test failed login wrong password', async t => {
	await loginPage.login(`${process.env.USER_NAME}`, 'wrongPassword');

	await t.expect(loginPage.validateWrongCredentialsMessage).ok();
});


test ('Test failed login wrong user', async t => {
	await loginPage.login('invaliduUser@', `${process.env.PASSWORD}`);

	await t.expect(loginPage.validateInvalidMailMessage).ok();
});