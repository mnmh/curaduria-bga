(function ($, root, undefined) {

	// Listado de anos que estan en la tabla, no son todos seguidos, hay unos que hacen falta
	var lista_anos = [1933, 1949, 1951, 1954, 1955, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
	// El nombre de los responsables
	var lista_responsables = ["Guerrilla","Grupo Posdesmovilización","Grupo Paramilitar","Grupo Armado No Identificado","Crimen Organizado","Agente del Estado"];
	// Los lugares que estan en la tabla
	var lista_lugares = ["Todo el país","Magdalena Medio y Magdalena Medio Antioqueño"];
	// Ancho y alto del documento svg para la visualizacion
	var width = 1920,
		height = 1080;

	var step = 0;

	var svg = d3.select('#bg');

	var xscale = d3.scaleTime()
	.domain([new Date('January 1, 1980 00:00:00'), new Date('December 31, 2016 00:00:00')])
	.range([0, 1900]);

	var yscale = d3.scaleLinear()
	.domain([0, 10000])
	.range([500, 1800]);

	var color = d3.scaleOrdinal(d3.schemeAccent);

	var x_axis = d3.axisBottom(x).ticks(40).tickSize(1020).tickFormat(d3.timeFormat("%Y"));
				
	
	d3.csv('./assets/csv/victimas_total.csv').then(data => {
		var keys = data.columns.slice(1)
		shuffleArray(keys)


		// organizar el stack en modo central, 
        var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(lista_responsables)
		(data)
		
        var area = d3.area()
        .x(function(d) { return xscale(new Date('January 1, '+d.data.year+' 00:00:00')); })
        .y0(function(d) { return yscale(d[0]); })
        .y1(function(d) { return yscale(d[1]); })

        svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
		.style("fill", function(d) { return color(d.key); })
		.style("stroke", '#999999')
		.attr("d", area)

		svg.append("g")
		.attr('class', 'yaxis x')
		.call(x_axis);


	}).catch(err => {

	});

	function slugify(text)
	{
		return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

})(jQuery, this);