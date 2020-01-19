const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const generateFileName = function(fileExtension = 'html') {
	return `./_${(new Date).getTime()}.${fileExtension}`;
}

const easy = async function(username, color) {
	const htmlString = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<title>${username}</title>
		</head>
		<body>
			<h1>Hello, my name is ${username}. My favorite color is ${color}</h1>
		</body>
		</html>
	`;

	await writeFilePromise(generateFileName(), htmlString);
}

const medium = async function(username, color) {
	const template = await readFilePromise("./pdf.html", "utf-8");
	const htmlString = template.replace(new RegExp('\\#\\[username\\]\\#', 'g'), username)
							.replace(new RegExp('\\#\\[color\\]\\#', 'g'), color);

	await writeFilePromise(generateFileName(), htmlString);
}

const hard = async function(username, data) {
	const template = await readFilePromise("./pdj.ejs", "utf-8");
	const htmlString = ejs.render(template, {
		username,
		data
	});

	await writeFilePromise(generateFileName(), htmlString);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(htmlString);
	await page.pdf({path: generateFileName('pdf'), format: 'A4'});

	await browser.close();
}

module.exports = {
	easy,
	medium,
	hard
}