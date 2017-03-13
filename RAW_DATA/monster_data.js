/*
		INDEX

	0. Goblin
	1. Orc
	2. Skeleton
	3. Harpy
	4. 
	5.
	6.
	7.
	8.
	9.
	10.
	11.
	12.
	13.
	14.
	15.
	16.
	17.
	18.
	19.
	20.
	22.
	23.
	24.
	25.
	26.
	27.
	28.
	29.

*/

var parse = require('../text_parser');

monster = [
	{
		name: 'goblin',
		attack: 1,
		hp: 1,
		resist_p: false,
		resist_s: false,
		resist_b: false,
		resist_fire: false,
		resist_lightning: false,
		text_flav: [
			'cackles maniacally',
			'tosses a dagger back and forth',
			'tugs at its nose'
		],
		text_atk: [
			'[leaps|jumps|lunges] forward with a [short|sharp] [blade|knife]',
			'jumps forward and [slashes|slices] with a [dagger|[short|sharp] [blade|knife]]',
			'[looses|shoots|fires] an arrow from a [primitive|rough] [cross|short]bow'
		],
		text_def: [
			'dodges out of the way',
			'ducks',
			'[leaps|rolls|tumbles] behind cover'
		],
		text_hitplace: [
			'head',
			'shoulder',
			'chest',
			'side',
			'arm',
			'leg',
			'hip',
			'abdomen',
			'stomach',
			'back'
		],
		text_dead: [
			'[slumps|collapses|crumples] to the [floor|ground]',
			'lets out a final [gurging|gasping|shuddering] breath',
			'dies'
		]
	},

	{
		name: 'orc',
		attack: 2,
		hp: 2,
		resist_p: false,
		resist_s: false,
		resist_b: false,
		resist_fire: false,
		resist_lightning: false,
		text_flav: [
			'thumps its chest',
			'[bellows|roars|howls] a [short|viscious|wild] [battle |war]cry',
			'swings [an axe|a sword|a club|a cudgel] above its head'
		],
		text_atk: [
			'[chops|hacks|hews] [cruelly|wildly|visciously] with [a cleaver|a shortsword|an axe]'
		],
		text_def: [
			'deflects the attack with the flat of its blade',
			'shrugs off the glancing blow'
		],
		text_hitplace: [
			'head',
			'shoulder',
			'chest',
			'side',
			'arm',
			'leg',
			'hip',
			'abdomen',
			'stomach',
			'back'
		],
		text_dead: [
			'[slumps|collapses|crumples] to the [floor|ground]',
			'lets out a final [gurging|gasping|shuddering] breath',
			'dies'
		]

	}
	/*
	,

	{
		name: '',
		attack: ,
		hp: ,
		resist_p: ,
		resist_s: ,
		resist_b: ,
		resist_fire: ,
		resist_lightning: ,
		text_flav: [
			'',
			'',
			''
		],
		text_atk: [
			'',
			'',
			''
		],
		text_def: [
			'',
			''
		],
		text_hitplace: [
			'head',
			'shoulder',
			'chest',
			'side',
			'arm',
			'leg',
			'hip',
			'abdomen',
			'stomach',
			'back'
		],
		text_dead: [
			'dies',
			'',
			''
		]
	}
	*/
]

var thisMonster = monster[Math.floor(Math.random()*monster.length)];


console.log(parse.branchedString('Before you you see a ' + thisMonster.name + '!'));
console.log(parse.branchedString('When it sees you the ' + thisMonster.name + ' '+ thisMonster.text_flav[Math.floor(Math.random()*thisMonster.text_flav.length)] + '.'));
console.log(parse.branchedString('You swing your sword, but the ' + thisMonster.name + ' ' + thisMonster.text_def[Math.floor(Math.random()*thisMonster.text_def.length)] + '.'));
console.log(parse.branchedString('It ' + thisMonster.text_atk[Math.floor(Math.random()*thisMonster.text_atk.length)] + ', reducing you to ' + (Math.floor(Math.random()*4)+10) + ' HP!'));
console.log(parse.branchedString('You swing again, this time catching the ' + thisMonster.name + ' in the ' + thisMonster.text_hitplace[Math.floor(Math.random()*thisMonster.text_hitplace.length)] + '.'));
console.log(parse.branchedString('The ' + thisMonster.name + ' ' + thisMonster.text_dead[Math.floor(Math.random()*thisMonster.text_dead.length)] + '.'));

//console.log(thisMonster.text_flav[Math.floor(Math.random()*monster[0].text_flav.length)]);






