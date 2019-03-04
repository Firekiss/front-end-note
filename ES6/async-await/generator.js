function* Iterdtor() {
	console.log(1);
	yield '123';
	console.log(2);
	yield '234';
	console.log(3);
	yield '345';
}

let iterator = Iterdtor();
iterator.next();
iterator.next();
iterator.next();

