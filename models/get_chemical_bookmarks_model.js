module.exports = function(data, request, response){
	var chemical_bookmarks_model = require('../schemas/chemical_events_schema.js');
	console.log('in get_chemical_bookmarks_model.js');
	/*
		eee_bookmarks_model.find({'bookmarks.bookmarked_by': {$elemMatch: {_id : data.user_id}}}, function(err, result){
		if(err)
		{
			console.log('error occurred while fetching data regarding cse events'+err);
			response.send(JSON.stringify({success: false}));
		}
		else
		{
			//result.user_id = data.user_id;
			console.log('successfully fetched the data regarding cse events'+result);
			response.send(JSON.stringify({success: true, data: result, user_id: data.user_id, length: result.length}));
		}
	});
	*/
	response.cookie('current_community', 'chemical');
	chemical_bookmarks_model.find().where('bookmarks.bookmarked_by._id').equals(data.user_id).sort({'bookmarks.bookmarked_by.bookmarked_at' : -1}).skip(data.documents_skip).limit(5).exec(function(err, result){
		if(err)
		{
			console.log('error occurred while fetching data regarding chemical events'+err);
			response.send(JSON.stringify({success: false}));
		}
		else
		{
			//result.user_id = data.user_id;
			console.log('successfully fetched the data regarding chemical events'+result);
			response.send(JSON.stringify({success: true, data: result, user_id: data.user_id, length: result.length}));
		}
	});
}