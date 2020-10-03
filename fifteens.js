let valueBones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// creating starting array of bones order
let sortedBones = [];
for (let i = 0; i < 15; i++) {
	sortedBones.push(valueBones.splice(randomInt(0, valueBones.length - 1), 1)[0]);
}
let empty = {
	value: "empty",
	x: 0,
	y: 0
}
sortedBones.unshift(empty);

console.log(sortedBones)

//creating the playig field div
let field = document.createElement("div");
field.className = "playingField";
document.body.append(field);

let positions = []; //array of objects for storing bones object, value and coordinates;
positions.push(empty);
console.log(positions);

//creating bones objects
for (let i = 0; i < 16; i++) {
	if (typeof sortedBones[i] != "number") continue;
	let bone = document.createElement("div");
	bone.className = "plBone";
	bone.value = sortedBones[i]; //value is used for winning condition calculation
	bone.innerText = bone.value;
	let x = (i) % 4; //x coordinate
	let y = Math.floor((i) / 4); //y coordinate

	positions.push({ //adding this bone to storage
		x: x,
		y: y,
		value: bone.value,
		element: bone
	})

	bone.style.top = y * 10 + "vw"; //bone starting position on the field
	bone.style.left = x * 10 + "vw";

	field.append(bone);

	bone.addEventListener("click", function () { //move on click listener
		move(i);
	})
}

function move(i) {
	if (!checkIsNeighbore(i)) return;
	bone = positions[i];

	bone.element.style.top = empty.y * 10 + "vw";
	bone.element.style.left = empty.x * 10 + "vw";

	let tempX = empty.x;
	let tempY = empty.y;
	empty.x = bone.x;
	empty.y = bone.y;
	bone.x = tempX;
	bone.y = tempY;

}

function checkIsNeighbore(i) {
	let xDiff = Math.abs(empty.x - positions[i]["x"]);
	console.log(xDiff);
	let yDiff = Math.abs(empty.y - positions[i]["y"]);
	console.log(yDiff);
	if ((xDiff + yDiff) > 1) return false;
	return true;
}

//Randomizer in range [lowest, highest]
function randomInt(lowest, highest) {
	return Math.floor((Math.random() * (highest + 1 - lowest)) + lowest);
}



