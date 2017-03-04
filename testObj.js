var parse = require('./text_parser');

var testObject = [
	{
		name: 'sword',
		damage: 's',
		attack: '[swing|slash]'
	},{
		name: 'dagger',
		damage: 'p',
		attack: 'thrust'
	},{
		name: 'bow',
		damage: 'p',
		attack: '[shoot|fire]'
	}
];

for (var i = 0; i < 5; i++){
	var weapon = testObject[Math.floor(Math.random()*testObject.length)];
	var unprocessedString = 'I ' + weapon.attack + ' [a|my] ' + weapon.name + ' [towards|at] [the [creature|beast]|my [enemy|foe]]!';
	console.log(unprocessedString);
	console.log(parse.branchedString(unprocessedString));
}