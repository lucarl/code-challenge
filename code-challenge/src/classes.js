class Color {
	constructor(name) {
		this.name = name
	}
}

class Black extends Color {
	constructor() {
		super('black');
	}
}

class White extends Color {
	constructor() {
		super('white');
	}
}

class Green extends Color {
	constructor() {
		super('green');
	}
}

class Blue extends Color {
	constructor() {
		super('blue');
	}
}

class Red extends Color {
  constructor() {
    super('red');
  }
}

module.exports = { Black, White, Green, Blue, Red };
