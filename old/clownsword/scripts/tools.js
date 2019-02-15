function tool(button) {
	var tools = document.querySelectorAll('.tool-button');
	var clips = document.querySelectorAll('.clips');
	var trackMeasures = document.querySelectorAll('.trackMeasures');

	for(var i = 0; i < tools.length; i++)
	{
		if(button.id == tools[i].id)
		{
			for(var j = 0; j < clips.length; j++)
			{
				$(clips[j]).switchClass(collection.tool, collection.tools[i]);
			}
			for(var k = 0; k < trackMeasures.length; k++)
			{
				$(trackMeasures[k]).switchClass(collection.tool, collection.tools[i]);
			}
			collection.tool = collection.tools[i];
			collection.tool = collection.tools[i];
			//tools[i].className = 'tool-button selectedToolBackground canvas-button';
			$(tools[i]).switchClass('normalToolBackground', 'selectedToolBackground');
		}else
		{
			tools[i].className = 'tool-button canvas-button normalToolBackground';
		}
	}
}
