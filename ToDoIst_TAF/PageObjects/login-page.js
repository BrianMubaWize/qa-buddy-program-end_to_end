import { Selector, t } from 'testcafe';

const loginButton = Selector('.xC29iLDJOfZeDm_x5o7DH');

/**
* Page Object for Login page.
*/
class LoginPage
{
	constructor () 
	{
		this.loginButton      = loginButton.child();
		this.inputPassword    = Selector('#password');
		this.loginPopUpButton = this.inputPassword.nextSibling();
		this.inputName        = Selector('#email');
		this.popUpFrame       = Selector('._3ga5XTxZEFAiG-Q7KQfQnT');
		this.loggedInMessage  = Selector('#error_text');
		this.mailErrorMessage = Selector('.error_msg>span');
	}

	/**
   * Login to application
   * @param  {string} name
   * @param  {string} password
   */
	async login (name, password)
	{
		await this.clickLoginButton();
		await t.switchToIframe(this.popUpFrame);
		await this.setUserName(name);
		await this.setPassword(password);
		await this.clickLoginPopUpButton();
		await this.validateMessage();
		await t.switchToMainWindow();
	}

	/**
   * Performs click on LoginButton
   */
	async clickLoginButton()
	{
		await t.click(this.loginButton);
	}

	/**
   * Performs click on LoginButton
   */
	async setUserName(userName)
	{
		await t.typeText(this.inputName, userName);
	}

	/**
   * Set user password in the password field of the Login form
   * @param  {string} userPassword
   */
	async setPassword(userPassword)
	{
		await t.typeText(this.inputPassword, userPassword);
	}

	/**
   * Performs click on LoginButton after entering credentials
   */
	async clickLoginPopUpButton()
	{
		await t.click(this.loginPopUpButton);
	}

	/**
   * Validates if error message appears if so clicks on the link that takes you to the tasks page
   */
	async validateMessage()
	{
		if(await Selector(this.loggedInMessage).exists)
		{
			await t
				.click(this.loggedInMessage.child());
		}
	}

	/**
   * Validates if error message after entering an invalid email.
   * @returns boolean.
   */
	async validateInvalidMailMessage()
	{
		await t
			.switchToIframe(this.popUpFrame);
        
		if(await (Selector(this.mailErrorMessage).innerText).eql('Invalid email address.'))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
   * Validates if error message after entering an invalid username or password.
   * @returns boolean.
   */
	async validateWrongCredentialsMessage()
	{
		await t
			.switchToIframe(this.popUpFrame);
      
		if(await (Selector(this.mailErrorMessage).innerText).eql('Wrong email or password.'))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

export default new LoginPage();