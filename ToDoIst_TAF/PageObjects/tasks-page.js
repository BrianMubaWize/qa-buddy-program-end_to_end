import { Selector, t } from 'testcafe';

/**
* Page Object for tasks page.
*/
class TasksPage
{
	constructor ()
	{
		this.addTask          = Selector('#jd4FBg>path');
		this.today            = new Date();
		this.time             = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
		this.taskCreated      = Selector('.text.sel_item_content').withText(this.time);
		this.inputTask        = Selector('.DraftEditor-editorContainer>div>div>div>div');
		this.createTask       = Selector('.item_editor_actions>button');
	}
    
	/**
   * Creates a task in the tasks page.
   */
	async createTask()
	{
		this.today            = new Date();
		this.time             = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
		this.taskCreated      = Selector('.text.sel_item_content').withText(this.time);

		await this.clickAddTask();
		await t
			.typeText(this.inputTask, String(this.time))
			.click(this.createTask)
			.wait(2000);
	}

	/**
   * Calls crateTask() numberOfTasks times passed as parameter
   * @param  {int} numberOfTasks
   */
	async createMultipleTasks(numberOfTasks)
	{
		for(let i = 0; i < numberOfTasks; i++)
		{
			await this.createTask();
			await t.expect(this.taskCreated.innerText).eql(this.time);
		}
	}

	/**
   * Click on add task '+' simbol.
   */
	async clickAddTask()
	{
		await t
			.click(this.addTask);
	}
}

export default new TasksPage();
