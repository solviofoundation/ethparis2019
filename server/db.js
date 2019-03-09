const Gun = require('gun')
const crypto = require('crypto')
require('gun/lib/open.js')

const gun = Gun({
    isValid: function () { return true }
})

function hash (string){
	return crypto.createHmac('sha256', string)
                   .digest('hex');
}

module.exports.hash = hash

module.exports.createTopic = function (name) {
	gun.get('topics').set(
		gun.get(hash(name)).put({
			title: name
		})
	);
}

module.exports.addResource2Topic = function (topicName, title, url) {
	let t = gun.get(hash(topicName));
	let s = gun.get(hash(url)).put({
		title,
		url
	})
	s.get('topic').put(t);
	gun.get(hash(topicName)).get('resources').set(s);
	gun.get('resources').set(s);
}

module.exports.addReview2Resource = function (reviewID, resourceURL, quality, length, dependencies, content) {
	gun.get(hash(resourceURL)).get('reviews').set(
		gun.get('reviews/'+reviewID).put({
			quality,
			length,
			content,
		})
	);
	dependencies.forEach((d)=>{
		console.log(d);
		let t = gun.get(hash(d.topic));
		let s = gun.get('reviews/'+reviewID+'/deps/'+hash(d.topic)).put({
			weight: d.weight
		})
		s.get('topic').put(t);
		gun.get('reviews/'+reviewID).get('dependencies').set(s);
	});
}
