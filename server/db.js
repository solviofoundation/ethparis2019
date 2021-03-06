const Gun = require('gun')
const crypto = require('crypto')
require('gun/lib/open.js')

/*
const gun = Gun({
    isValid: function () { return true }
})
*/

function hash (string){
    return crypto.createHash('sha256')
                   .update(string, 'utf8')
                   .digest('hex');
}

module.exports.hash = hash

module.exports.createTopic = function (gun, name) {
	gun.get('topics').set(
		gun.get(hash(name)).put({
			title: name
		})
	);
}

module.exports.addResource2Topic = (gun, topicName, title, url) => {
    let t = gun.get(hash(topicName));
    t.put({
        'title': topicName
    })
    gun.get('topics').set(t)
    let resourceId = hash(url)
	let s = gun.get(resourceId).put({
		title,
		url
	})
	s.get('topic').put(t);
	gun.get(hash(topicName)).get('resources').set(s);
    gun.get('resources').set(s);
    return resourceId
}

module.exports.addReview2Resource = function (gun, reviewID, resourceID, quality, length, dependencies, content) {
	gun.get(resourceID).get('reviews').set(
		gun.get('reviews/'+reviewID).put({
			quality,
			length,
			content,
		})
	);
	dependencies.forEach((d)=>{
        let t = gun.get(hash(d.topic));
        t.put({
            'title': d.topic
        })
        let s = gun.get('reviews/'+reviewID+'/deps/'+hash(d.topic)).put({
            weight: d.weight
        })
        s.get('topic').put(t);
        gun.get('reviews/'+reviewID).get('dependencies').set(s);
	});
}
