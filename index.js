const inquirer = require('inquirer');
const axios = require('axios');

const { easy, medium, hard } = require('./makehtml');

function getUserInput() {
	return inquirer.prompt([
		{
			type: 'input',
			message: 'Please input your github username',
			default: 'ljdurante',
			name: 'username',
		},
		{
		type: 'list',
			message: 'Please choose your favorite color',
			name: 'color',
			choices: [
				{
					name: 'Red',
		 			value: 'red'
				},
				{
	 			name: 'Blue',
					value: 'blue'
            },
            {
                name: 'Orange',
                 value: 'orange'
            },
            {
                name: 'Green',
                 value: 'green'
            },
			]
		}
	])
}

async function getGithubInfo(username) {
	const { data } = await axios.get(`https://api.github.com/users/${username}`);
	return data;
}

async function main() {
	const { username } = await getUserInput();

	const data = await getGithubInfo(username);
	hard(username, data);
}

main();