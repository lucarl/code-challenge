const { getColor } = require('./apiMock');

const { Black, White, Green, Blue, Red } = require('./classes');

async function getColors(black, white, green, blue, red, order) {
	const colors = [];
	if (black === 'true') {
	  black = new Black();
	  colors[order.indexOf(black.name)] = getColor(black.name);
	}
	if (white === 'true') {
	  white = new White();
	  colors[order.indexOf(white.name)] = getColor(white.name);
	}
	if (green === 'true'){
	  green = new Green();
	  colors[order.indexOf(green.name)] = getColor(green.name);
	}
	if (blue === 'true') {
	  blue = new Blue()
	  colors[order.indexOf(blue.name)] = getColor(blue.name);
	}
	if (red === 'true') {
	  red = new Red();
	  colors[order.indexOf(red.name)] = getColor(red.name);
	}
	return await Promise.all(colors);
}

async function getAllColorsAsync(black, white, green, blue, red, order) {
	const colors = await getColors(black, white, green, blue, red, order);
	const hexColors = colors.map(color => color ? color.HEX : null);
	const rgbColors = colors.map(color => color ? color.RGB : null);
	return {
		hexColors,
		rgbColors
	};
}

async function getOneColorSync(color) {
    const { getColor } = require('./apiMock');
    const { Black, White, Green, Blue, Red } = require('./classes');
    const colors = { Black, White, Green, Blue, Red };
    if (!colors[color]) {
        throw new Error(`Invalid color: ${color}`);
    }
    const c = new colors[color]();
    const result = await getColor(c.name);
    if (!result) {
        return null;
    }
    const { HEX, RGB } = result;
    return { HEX, RGB };
}

async function colors(sync = false) {
	console.log("DEBUG: ", process.argv);
	const black = process.argv[2];
	const white = process.argv[3];
	const green = process.argv[4];
	const blue = process.argv[5];
	const red = process.argv[6];
	const colorOrder = JSON.parse(process.argv[7]);
	if (sync) {
		const color = process.argv[8];
		const syncColor = await getOneColorSync(color);
		console.log(syncColor);
	} else {
		const asyncColors = await getAllColorsAsync(black, white, green, blue, red, colorOrder);
		console.log(asyncColors);
	}
}

// Usage:
// To run asynchronously getting all colors at the same time:
// node ~/code-challenge/src/index.js true true true false true '["black", "white","green","blue", "red"]'
//
// To run synchronously getting one color at a time (In this case the color red):
// node ~/code-challenge/src/index.js true true true false true '["black", "white","green","blue", "red"]' Red
colors(process.argv.length > 8);
