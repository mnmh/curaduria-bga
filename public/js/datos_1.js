(function ($, root, undefined) {

	// Listado de anos que estan en la tabla, no son todos seguidos, hay unos que hacen falta
	var lista_anos = [1933, 1949, 1951, 1954, 1955, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
	// El nombre de los responsables
	var lista_responsables = ["Guerrilla","Grupo Posdesmovilización","Grupo Paramilitar","Grupo Armado No Identificado","Crimen Organizado","Agente del Estado","Total desaparecidos en el Magdalenda Medio", "Total desaparecidos en el país"];
	var lista_responsables_dos = ["Guerrilla","Grupo Posdesmovilización","Grupo Paramilitar","Grupo Armado No Identificado","Crimen Organizado","Agente del Estado"];
	// Los lugares que estan en la tabla
	var lista_lugares = ["Todo el país","Magdalena Medio y Magdalena Medio Antioqueño"];
	// Ancho y alto del documento svg para la visualizacion
	var width = 1920,
		height = 1080;

	var step = -2;

	var svg = d3.select('#bg');

	var xscale = d3.scaleTime()
	.domain([new Date('January 1, 1950 00:00:00'), new Date('December 31, 2017 00:00:00')])
	.range([0, 1900]);

	var yscale = d3.scaleLinear()
	.domain([0, 800])
	.range([1000, 0]);

	var color = d3.scaleOrdinal(d3.schemePaired);

	var x_axis = d3.axisBottom(xscale).ticks(40).tickSize(1020).tickFormat(d3.timeFormat("%Y"));
	var y_axis = d3.axisRight(yscale).ticks(20).tickSize(1850);
				
	svg.append("g")
		.attr('class', 'yaxis x')
		.call(x_axis);

	svg.append("g")
		.attr('class', 'yaxis y')
		.call(y_axis);
	
	var line = d3.line()
		.x(function(d,i) {
			return xscale(new Date('January 1, '+d.year+' 00:00:00'))
		}) // set the x values for the line generator
		.y(function(d,i) { return yscale(d.num); }) // set the y values for the line generator 
		// .curve(d3.curveMonotoneX);

	var area = d3.area()
		.x(function(d) { return xscale(new Date('January 1, '+d.data.year+' 00:00:00')); })
		.y0(function(d) { return yscale(d[0]); })
		.y1(function(d) { return yscale(d[1]); })

	Promise.all([
		d3.csv('./assets/csv/victimas.csv'),
		d3.csv('./assets/csv/victimas_invertido.csv')
	]).then(files => {
		const data = files[0];
		const data_resp = files[1];

		for(var i = 0; i < data.length; i++){
			var d = data[i];
			var datum =  [];
			for(var j = 0; j < lista_anos.length; j++){
				var dataObj = {year: lista_anos[j], num: d[lista_anos[j]]};
				datum.push(dataObj);
			}
			if(d['Lugar'] == 'Magdalena Medio y Magdalena Medio Antioqueño' && (d['Responsable'] == 'Total desaparecidos en el Magdalenda Medio' || d['Responsable'] == 'Total desaparecidos en el país'))
				svg.append("path")
				.attr('fill', () => {
					// if(d['Responsable'] == 'Total desaparecidos en el Magdalenda Medio' || d['Responsable'] == 'Total desaparecidos en el país'){
					// 	return 'rgba(255, 255, 255,0.5)';
					// } else {
					// 	return 'none';
					// }
					return color(d['Responsable'])
				})
				.attr('class', () => {
					return 'lineCol resp_' + slugify(d['Responsable']);
				})
				.attr('stroke', '#999999')
				.attr('stroke-width', 2.5)
				.datum(datum)
				.attr("d", line);
		}

		var stackedData = d3.stack()
				.keys(lista_responsables_dos)
				(data_resp)
			
				svg
				.selectAll("mylayers")
				.data(stackedData)
				.enter()
				.append("path")
				.attr('class', () => {
					return 'myArea resp_' + slugify(d['Responsable']);
				})
				.style("fill", function(d) { return color(d.key); })
				.style("stroke", '#999999')
				.attr("d", area)

		for(var i = 0; i < lista_responsables.length; i++){
			svg.append('text')
			.attr('class', () => {
				return 'resp_' + slugify(lista_responsables[i]);
			})
			.attr('y', i * 65 + 50)
			.attr('x', 80)
			.attr('style', 'fill: #555')
			.text(lista_responsables[i]);
	
			svg.append('rect')
			.attr('class', () => {
				return 'resp_' + slugify(lista_responsables[i]);
			})
			.attr('y', i * 65 + 25)
			.attr('x', 20)
			.attr('fill', color(lista_responsables[i]))
			.attr('width', 45)
			.attr('height', 45);
		}

		$('#nav .prev').on('click', () => {
			if(step > -2)
				step--;
			
			update()
		})

		$('#nav .next').on('click', () => {
			if(step < 3)
				step++;
			
			update()
		})

		const annotations = [
			{
				note: {
					label: "572 desaparecidos",
					title: "Año 2001",
					wrap: 400
				},
				type: d3.annotationCalloutCircle,
				subject: {
					radius: 40,
					radiusPadding: 5
				},
				color: ["#333"],
				x: xscale(new Date('January 1, 2001 00:00:00')),
				y: yscale(572),
				dy: -70,
				dx: 70
			},
			{
				note: {
					label: "286 desaparecidos",
					title: "Año 1996",
					wrap: 400
				},
				type: d3.annotationCalloutCircle,
				subject: {
					radius: 40,
					radiusPadding: 5
				},
				color: ["#333"],
				x: xscale(new Date('January 1, 1996 00:00:00')),
				y: yscale(286),
				dy: -150,
				dx: -70
			},
			{
				note: {
					label: "275 desaparecidos",
					title: "Año 1988",
					wrap: 400,
					align: 'middle'
				},
				type: d3.annotationCalloutCircle,
				subject: {
					radius: 40,
					radiusPadding: 5
				},
				color: ["#333"],
				x: xscale(new Date('January 1, 1988 00:00:00')),
				y: yscale(275),
				dy: -100,
				dx: -100
			}
			]

		const makeAnnotations = d3.annotation()
            .annotations(annotations)
		
		svg.append('g').attr('class','labels').call(makeAnnotations);

		update();

		function update(){
			var ynew, xnew, dur, xnew_end;
			xnew_end = new Date('December 31, 2017 00:00:00');
			$('#nav div').addClass('visible');
			$('#over .msj, #over').hide();

			if(step == -2){
				$('#nav .prev').removeClass('visible');
				$('#over, #over .msj.uno').show();
			}
			else if(step == -1){
				$('.labels').hide();
				$('.resp_agente-del-estado, .resp_crimen-organizado, .resp_grupo-armado-no-identificado, .resp_grupo-paramilitar, .resp_grupo-posdesmovilizacin, .resp_guerrilla').hide();
				$('.resp_total-desaparecidos-en-el-magdalenda-medio').show();
				$('.resp_total-desaparecidos-en-el-pas').hide();
				dur = 1000;
				ynew = 40;
				xnew = new Date('January 1, 1950 00:00:00');
				xnew_end = new Date('December 31, 1980 00:00:00');
			}
			else if(step == 0){
				$('.labels').fadeIn();
				$('.resp_agente-del-estado, .resp_crimen-organizado, .resp_grupo-armado-no-identificado, .resp_grupo-paramilitar, .resp_grupo-posdesmovilizacin, .resp_guerrilla').hide();
				$('.resp_total-desaparecidos-en-el-magdalenda-medio').show();
				$('.resp_total-desaparecidos-en-el-pas').hide();
				dur = 1000;
				ynew = 800;
				xnew = new Date('January 1, 1950 00:00:00');
			}
			else if(step == 1){
				$('.labels').hide();
				$('#over, #over .msj.dos').show();
			} else if(step == 2) {
				$('.resp_agente-del-estado, .resp_crimen-organizado, .resp_grupo-armado-no-identificado, .resp_grupo-paramilitar, .resp_grupo-posdesmovilizacin, .resp_guerrilla').fadeIn();
				$('.resp_total-desaparecidos-en-el-pas').hide();
				dur = 1000;
				ynew = 600;
				xnew = new Date('January 1, 1972 00:00:00');
			} else if (step == 3) {
				$('.resp_agente-del-estado, .resp_crimen-organizado, .resp_grupo-armado-no-identificado, .resp_grupo-paramilitar, .resp_grupo-posdesmovilizacin, .resp_guerrilla').hide();
				$('.resp_total-desaparecidos-en-el-pas').fadeIn();
				dur = 8000;
				ynew = 10000;
				xnew = new Date('January 1, 1950 00:00:00');
				$('#nav .next').removeClass('visible');
			}
			yscale.domain([0, ynew]);
			svg.select(".y")
				.transition().duration(dur)
				.call(y_axis);


			xscale.domain([xnew, xnew_end]);
			svg.select(".x")
				.transition().duration(dur)
				.call(x_axis);

			d3.selectAll('.lineCol').transition().duration(dur).attr("d", line);
			d3.selectAll(".myArea").transition().duration(dur).attr("d", area)
		}

		function random(min, max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	}).catch(err => {

	})

	function slugify(text)
	{
		return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
	}

})(jQuery, this);