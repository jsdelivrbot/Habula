module.exports = function(data, request, response){
	var current_community = request.cookies.current_community;
	var temp;
	console.log("in likes_model.js");
	if(current_community == 'cse')
	{
		console.log('in cse');
		temp = require('../schemas/cse_events_schema.js');
	}
	if(current_community == 'ece')
	{
		console.log('in ece');
		temp = require('../schemas/ece_events_schema.js');
	}
	if(current_community == 'eee')
	{
		console.log('in eee');
		temp = require('../schemas/eee_events_schema.js');
	}
	if(current_community == 'mechanical')
	{
		console.log('in mechanical');
		temp = require('../schemas/mechanical_events_schema.js');
	}
	if(current_community == 'chemical')
	{
		console.log('in chemical');
		temp = require('../schemas/chemical_events_schema.js');
	}
	var x= data.event_id;
	var y={};
	y._id= data.user_id;
	y.full_name = data.full_name;
	y.branch = data.branch;
	y.college = data.college;
	y.liked_at = new Date();
	temp.update({_id : x}, {$push: {'likes.liked_by' : y}, $inc: {'likes.count' : 1}}, function(err, result){
		if(err)
		{
			console.log("error occurred while updating likes count in the collection"+err);
			response.send(JSON.stringify({success: false}));
		}
		else
		{
			console.log("successfully updated likes count in the document"+result);
			response.send(JSON.stringify({success: true}));
		}
	});
};