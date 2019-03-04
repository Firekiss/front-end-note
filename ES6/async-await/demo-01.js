const fn = async () => {
	let val = await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(100)
		}, 3000)
	})
	return val + 10;
}

fn().then(res => {
	console.log(res);
})