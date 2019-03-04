var schema = require('async-validator')

var descriptor = {
	// name(rule, value, callback, source, options) {
	// 	console.log(rule, value, callback, source);
	// 	var errors = [];
	// 	if (!/^[a-z0-9]+$/.test(value)) {
	// 		console.log(123);
	// 		errors.push(new Error(rule.field + 'must be lowercase'));
	// 	}
	// 	callback(errors);
	// }
	// name: [
	// 	{type: 'string', required: true},
	// 	{validator: (rule, value, callback, source, options) => {
	// 		var errors = [];

	// 		if (value !== 'fuck') {
	// 			errors.push(new Error('hahahah'))
	// 		}
	// 		callback(errors);
	// 	}}
	// ]
	age: [
		{
			type: 'string',
			required: true,
			message: 'age 必填'
			// transform(value) {
			// 	return value.trim()
			// },
			// validator(rule, value) {
			// 	console.log('value is ', value.length);
			// }
		},
		{
			min: 0,
			max: 3,
			message: '最大长度不成超过3'
		}
	]
}

var validator = new schema(descriptor);
validator.validate({age: '1234'}, (error, fileds) => {
	console.log(fileds)
})