const getCurrentDate = function() {
	let current = new Date();
	//format Y-m-d H:i:s
	return current.getFullYear() + '-' + current.getMonth() + '-' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
};

const apiResponse = function(results, msg) {
	return {
		status: !msg,
		result: results,
		error: (msg && msg.sqlMessage !== undefined) ?  msg.sqlMessage : msg
	};
};

module.exports = { getCurrentDate, apiResponse};