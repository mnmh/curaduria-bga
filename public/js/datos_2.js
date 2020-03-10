// Los departamentos y sus numeros
var departamentos = [];
var coordenadas = [
	// ANTIOQUIA
	[1336,455],
	// BOLIVAR
	[1385,367],
	// BOYACA
	[1444,509],
	// CALDAS
	[1340,525],
	// CESAR
	[1421,324],
	// CUNDINAMARCA
	[1395,544],
	// SANTANDER
	[1426,455]
];

var granTotal = 70073;

var copy = [
	// 'La desaparición forzada es una estrategia que han utilizado todos los actores armados en Colombia para castigar, generar terror y ocultar otros crimenes. El Magdalena Medio, el Valle de Aburrá (Antioquia) y el Oriente Antioqueño son las regiones del país más afectadas por este tipo de victimización.',
	// 'Los actores del conflicto se han encargado de borrar todo rastro de muchos de los cuerpos de sus víctimas para garantizar la impunidad de sus actos. Así, convirtieron los ríos en cementerios, y llenaron el país de fosas clandestinas con personas no identificadas.',
	// 'El subregistro es una de las razones por las cuales ha sido tan dificil contabilizar a las víctimas de desaparición forzada en Colombia. El Magdalena Medio es la región con más información gracias a la resistencia, la valentía y la perseverancia de las familias y organizaciones de las víctimas de desaparición.',
	'<b>Cifras de desaparición forzada por municipio</b><br>La desaparición forzada ha sido una estrategia utilizada por todos los actores armados presentes en la región del Magdalena Medio. El grado de victimización no ha sido uniforme en la región y en cada uno de los municipios se presentan particularidades.',
	'<b>Cifras de desaparición forzada por sexo</b><br>Existe una afectación diferenciada entre ser hombre o mujer en la guerra. Aunque las mujeres son minorías entre las víctimas de desaparición, sus familias sienten un temor inmenso de que, además de ser desaparecidas, sus esposas, hermanas o hijas sean víctimas de violencia sexual.',
	'',
	'<b>Cifras de desaparición forzada por presunto responsable</b><br>Aunque los grupos paramilitares son los mayores responsables de la desaparición forzada en la región del Magdalena Medio, las diferentes guerrillas, los grupos posdesmovilización y al Estado también han usado esta estrategia para ocultar sus acciones e infundir terror entre la comunidad.',
	'',
	'<b>Cifras de desaparición forzada por edades</b><br>Si bien la desaparición forzada es significativamente mayor entre adultos, esta es la modalidad de violencia que más ha afectado a niños, niñas y adolescentes en Colombia.',
	'',
];

var copy_num = 0;

var responsables = [
	'Gr. paramilitar',
	'Guerrilla',
	'Agente del Estado',
	'Desconocido',
	'Gr. armado no id.',
	'Bandolerismo',
	'Gr. armado no dirimido',
	'Gr. posdesmovilización',
	'Crimen organizado'
];

var edades = [
	'18 años o menos',
	'entre 19 y 54 años',
	'55 años o más',
	'sin información de edad'
];

// Ancho y alto del documento svg para la visualizacion
var width = 1366,
	height = 768;

var step = 1;

var municipios = [];
var municipios_listado_temp = [];

var numeros = [];
var numeros_listado_temp = [];

var num_departamento_actual = -1;

var data01 = [];
var data02 = [];
var data03 = [];
var data04 = [];


var svg = d3.select('svg#bg');
var bubbles;

var center = {x: width / 2, y: height / 2};
var forceStrength = 0.15;

var forceX_porMapa = d3.forceX(function(d){
	var str = d['nombre'];
	var index = $.inArray(str, departamentos);

	return coordenadas[index][0];
});

var forceX_porDepartamento = d3.forceX(function(d){
	var str = d['nombre'];
	var index = $.inArray(str, departamentos);
	var offset = (width - 900) / 2 + 50 - 75;

	return index * 150 + offset;
});

var forceX_porSexo = d3.forceX(function(d){
	var str = d['sexo'];
	var index = 0;
	var offset = (width - 600) / 2 + 100;

	if(str == 'hombre')
		index = 1;
	else if(str == 'mujer')
		index = 2;

	return index * 200 + offset;
});

var forceX_porResp = d3.forceX(function(d){
	var resp = d['responsable'];
	var index = $.inArray(resp, responsables);
	var offset = (width - 900) / 2 + 50;
	var y_pos = index * 100 + offset;
	return y_pos;
});

var forceY_porMapa = d3.forceY(function(d){
	var str = d['nombre'];
	var index = $.inArray(str, departamentos);

	return coordenadas[index][1];
});

var forceY_porSexo = d3.forceY(function(d){
	var str = d['sexo'];
	var index = 0;
	if(str == 'hombre')
		index = 1;
	else if(str == 'mujer')
		index = 2;


	return index * 150 + 200;
});

var forceY_porMapa = d3.forceY(function(d){
	var str = d['nombre'];
	var index = $.inArray(str, departamentos);

	return coordenadas[index][1];
});

var forceY_porResp = d3.forceY(function(d){
	var resp = d['responsable'];
	var index = $.inArray(resp, responsables);
	var y_pos = index * 100 + 80;
	return y_pos;
});

var forceY_porEdad = d3.forceY(function(d){
	var resp = d['edad'];
	var index = $.inArray(resp, edades);
	var y_pos = index * 100 + 100 + 80;
	return y_pos;
});

var simulation;


function charge_simple(d){
	return -forceStrength * Math.pow(0, 2.0);
}

function charge_radius(d){
	var num = parseInt(d['numero']);
	if(num == 0)
		return 0;
	else
		return - 0.15 * Math.pow(num.map(128,43193,10,70), 2.0);
}

function ticked(){
	bubbles
		.attr('cx', function (d) { return d.x; })
		.attr('cy', function (d) { return d.y; });
}

cargarTablas();

function cargarTablas(){
	d3.csv('./assets/csv/lugar.csv', function(error, data) {
		// Organizar los datos en un arreglo para la primera visualizacion
		organizarArregloPrimera(data);

		d3.csv('./assets/csv/resp-edad.csv', function(error, data) {
			// Organizar los datos en un arreglo para la segunda visualizacion
			organizarArregloTercera(data);

			iniciarVisuali();
			$('.btn_datos').eq(0).click();

				
		})
	});
}

function organizarArregloPrimera(data){
	num_departamento_actual++;

	for(var i = 0; i < data.length; i++){
		// Asignar valores temporales por cada dato que se lee de la tabla
		var departamento_temp = data[i]["Departamento"];
		var municipio_temp = data[i]["Municipio"];
		var num_temp = parseInt(data[i]["Numero"]);

		// Si no existe ningun departamento en el arreglo crea uno automaticamente
		if(departamentos.length == 0){
			departamentos.push(departamento_temp);
		}
		// Si el departamento actual es el mismo que esta activo en el arreglo
		if(departamento_temp == departamentos[num_departamento_actual]){
			// Verifica si el municipio actual ya se ha añadido a la base de datos, si no esta lo agrega al arreglo
			if($.inArray(municipio_temp, municipios_listado_temp) < 0){
				// adicionar municipio a la lista de municipios
				municipios_listado_temp.push(municipio_temp);
				// adicionar el número de victimas al arreglo de numeros para futura referencia
				numeros_listado_temp.push(num_temp);
			}
			else{
				// si el municipio ya existe en el arreglo, coge el indice
				var numIndex = $.inArray(municipio_temp, municipios_listado_temp);
				// y suma el numero de victimas
				var suma_temp = parseInt(numeros_listado_temp[numIndex]);
				numeros_listado_temp[numIndex] = suma_temp + num_temp;
			}
		}
		// Si el dato actual cambia de departamento, agrega el departamento al arreglo y pasa al siguiente número
		else if(departamento_temp != departamentos[num_departamento_actual]){
			departamentos.push(departamento_temp);
			num_departamento_actual++;

			// Agrega los datos del departamento 
			municipios.push(municipios_listado_temp);
			numeros.push(numeros_listado_temp);

			municipios_listado_temp = [];
			numeros_listado_temp = [];

			// adicionar municipio a la lista de municipios
			municipios_listado_temp.push(municipio_temp);
			// adicionar el número de victimas al arreglo de numeros para futura referencia
			numeros_listado_temp.push(num_temp);
			
		}
	}

	municipios.push(municipios_listado_temp);
	numeros.push(numeros_listado_temp);

	for(var i = 0; i < departamentos.length; i++){
		var municipios_temp = [];
		for(var t = 0; t < municipios[i].length; t++){
			var municipios_obj = {
				nombre: municipios[i][t],
				numero: numeros[i][t]
			}
			municipios_temp.push(municipios_obj);
		}
		var departamento = {
			nombre: departamentos[i],
			municipios: municipios_temp
		}
		data01.push(departamento);
	}

	organizarArregloSegunda(data);
}

function organizarArregloSegunda(data){

	for(var i = 0; i < departamentos.length; i++){
		var resp = {
			nombre: departamentos[i],
			sexo: 'mujer',
			numero: 0
		};
		data02.push(resp);
	}
	for(var i = 0; i < departamentos.length; i++){
		var resp = {
			nombre: departamentos[i],
			sexo: 'hombre',
			numero: 0
		};
		data02.push(resp);
	}
	for(var i = 0; i < departamentos.length; i++){
		var resp = {
			nombre: departamentos[i],
			sexo: 'sin información',
			numero: 0
		};
		data02.push(resp);
	}

	for(var i = 0; i < data.length; i++){
		var departamento_temp = data[i]["Departamento"];
		var sexo_temp = data[i]["Sexo"];
		var num_temp = parseInt(data[i]["Numero"]);
		for(var t = 0; t < data02.length; t++){
			if(data02[t]['nombre'] == departamento_temp && data02[t]['sexo'] == sexo_temp){
				var temp = data02[t]['numero'] + num_temp;
				data02[t]['numero'] = temp;
			}
		}
	}
}

function organizarArregloTercera(data){
	for(var i = 0; i < departamentos.length; i++){
		for(var t = 0; t < responsables.length; t++){
			var resp = {
				nombre: departamentos[i],
				responsable: responsables[t],
				numero: 0
			}
			data03.push(resp);
		}
	}


	for(var i = 0; i < data.length; i++){
		var str = data[i]['Responsable'];
		var departamento_temp = data[i]['Departamento'];
		var resp = str.split(' - ');
		var num = parseInt(data[i]['Numero']);

		for(var t = 0; t < data03.length; t++){
			if(data03[t]['nombre'] == departamento_temp && data03[t]['responsable'] == resp[0]){
				var temp = parseInt(data03[t]['numero']) + num;
				data03[t]['numero'] = temp;
			}
		}
	}


	// Máximo: 15038

	organizarArregloCuarta(data);
}

function organizarArregloCuarta(data){
	for(var i = 0; i < departamentos.length; i++){
		for(var t = 0; t < edades.length; t++){
			var resp = {
				nombre: departamentos[i],
				edad: edades[t],
				numero: 0
			}
			data04.push(resp);
		}
	}


	for(var i = 0; i < data.length; i++){
		var departamento_temp = data[i]['Departamento'];
		var resp = data[i]['Edad'];
		var num = parseInt(data[i]['Numero']);

		for(var t = 0; t < data04.length; t++){
			if(data04[t]['nombre'] == departamento_temp && data04[t]['edad'] == resp){
				var temp = parseInt(data04[t]['numero']) + num;
				data04[t]['numero'] = temp;
			}
		}
	}
}



function iniciarVisuali() {
	simulation = d3.forceSimulation()
		.force("collide", d3.forceCollide(function(d){
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(128,43193,10,70) + 2;
		}))
		// .force("x", forceX_porMapa)
		// .force("y", forceY_porMapa)
		.on("tick", ticked)
		.alpha(1);

	actualizarBubbles(data01);

	bubbles.attr("id",function(d,i) {
			return i;
		})
		.attr('r', function(d) {
			return 10;
		})
		.attr('class', function(d,i){
			return 'bubble departamento_bble_' + i;
		});


	simulation.nodes(data01);
	// datosPorDepartamentos();

	$('#next_graf').on('click', function(){
		step++;
		console.log('hola');

		if(step == 1){
			datosPorDepartamentos();
		}
		else if(step == 2){
			datosPorDepartamentosSexo();
		}
		else if(step == 3){
			datosPorSexo();
		}
		else if(step == 4){
			datosPorDepartamentos_2();
		}
		else if(step == 5){
			datosPorDepartamentoResponsables();
		}
		else if(step == 6){
			datosPorDepartamentos_3();
		}
	});
}

function actualizarBubbles(data){
	bubbles = svg.selectAll("circle.bubble")
		.data(data);

	bubbles.enter()
		.append("circle")
		.attr('class', function(d,i){
			var dep = d['nombre'];

			var index = $.inArray(dep, departamentos);
			var str = 'bubble departamento_bble_' + index;

			if(d['numero'] == 0)
				str += ' hide_always';
			return str;
		})
		.attr('r', 0);

	bubbles.exit().transition().attr('r', 0).remove();

	bubbles = svg.selectAll("circle.bubble")
		.data(data);
}

function limpiarCanvas() {
	$('.leyenda_dep, .line_guia, .titulo_txt').remove();
}

function datosPorDepartamentos(){
	var total_listado = [];

	var num_temp = 0;

	actualizarBubbles(data01);

	simulation.force('x', forceX_porDepartamento)
	.force('y', d3.forceY(height/2))
	.on("tick", ticked)
	.alpha(1)
	.restart()

	cargarLeyendaDepartamentos();

	bubbles.transition().attr('r', function(d) {
				var muni = d['municipios'];
				var total = 0;
				for(var t = 0; t < muni.length; t++){
					total += parseInt(muni[t]['numero']);
				}
				total_listado.push(total);
				return total.map(128,43193,10,70);
			})
			.attr('class', function(d,i){
				if(num_temp == departamentos.length)
					num_temp = 0;
				var str = 'bubble departamento_bble_' + num_temp;
				num_temp ++;
				if(d['numero'] == 0)
					str += ' hide_always';
				return str;
			});

	for(var t = 0; t < departamentos.length; t++){
		var numero = numeral(total_listado[t])
		var num = svg.append('text');
		num.attr("x", function (d) {
			var offset = (width - 900) / 2 - 75;
			return t * 150 + offset + 50;
		})
		.attr("y", function (d) {
			return height - 250;
		})
		.attr("class", "titulo_txt big num")
		.attr("font-family", "Avenir")
		.attr("text-anchor", "middle")
		.text(numero.format('0,0') + '  [' + calcularPorcentaje(total_listado[t]) + ']');
	}
}

function datosPorDepartamentosSexo(){
	$('.titulo_txt.big.num').remove();
	cargarLeyendaDepartamentos();

	var num_temp = 0;

	simulation
	.force("x", forceX_porDepartamento)
	.force("y", d3.forceY(height/2))
	.on("tick", ticked)
	.alpha(1)
	.restart()

	var num_temp = 0;

	actualizarBubbles(data02);

	simulation.nodes(data02)
	simulation.alpha(1).restart()

	while(simulation.alpha() > 0.1){
		simulation.tick();
	}		

	bubbles.attr("id",function(d,i) {
			return i;
		})
		.transition()
		.attr('r', function(d) {
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(128,43193,10,70);
		})
		.attr('class', function(d,i){
			if(num_temp == departamentos.length)
				num_temp = 0;
			var str = 'bubble departamento_bble_' + num_temp;
			num_temp ++;
			if(d['numero'] == 0)
				str += ' hide_always';
			return str;
		});

	setTimeout(function(){

		simulation.force("y", forceY_porSexo)
		.alpha(1).restart();

		for(var i = 0; i < 3; i++){
			var name = 'Sin información';
			if(i == 1)
				name = 'Hombre';
			else if(i == 2)
				name = 'Mujer';

			var tit = svg.append("text");
			tit.attr("x", function (d) {
				return 60;
			})
			.attr("y", function (d) {
				return i * 150 + 200 + 20 - 15;
			})
			.attr("class", "leyenda_dep titulo_txt big")
			.attr("font-family", "Minion Bold")
			.attr("font-size", "0.7em")
			.attr("text-anchor", "middle")
			.text(name);

			var line = svg.append('line');
			line.attr('x1', 0)
			.attr('x2', 1185)
			.attr('y1', function(){
				return (i * 150) + 125;
			})
			.attr('y2', function(){
				return (i * 150) + 125;
			})
			.attr('class', 'line_guia hori');

			if(i == 2){
				var line = svg.append('line');
				line.attr('x1', 0)
				.attr('x2', 1185)
				.attr('y1', function(){
					return ((i + 1) * 150) + 125 - 10;
				})
				.attr('y2', function(){
					return ((i + 1) * 150) + 125 - 10;
				})
				.attr('class', 'line_guia hori');
			}
		}

		var bubbles_num = svg.selectAll("text.num_sex")
			.data(data02)
			.enter()
			.append("text")
			.attr('x', function(d){
				var str = d['nombre'];
				var index = $.inArray(str, departamentos);
				var offset = (width - 900) / 2 + 50 - 75;

				return index * 150 + offset;
			})
			.attr('y', function(d){
				var str = d['sexo'];
				var index = 0;
				if(str == 'hombre')
					index = 1
				else if(str == 'mujer')
					index = 2;
				return index * 150 + 200 -30;
			})
			.attr('class', function(d,i){
				var str = 'num_sex titulo_txt big';
				return str;
			})
			.attr("font-family", "Avenir")
			.attr("text-anchor", "middle")
			.text(function(d){
				var num = numeral(d['numero'])
				return num.format('0,0') + '  [' + calcularPorcentaje(d['numero']) + ']';
			});
	},100);
}

function datosPorSexo(){
	var tl = new TimelineMax();

	simulation.alpha(1).restart();

	var listado_totales = [0,0,0];

	tl.add('start')
	.staggerTo('text.num_sex', 0.1, {autoAlpha: 0, y: 10}, 0.05)
	.to('.rect_sexo', 0.2, {autoAlpha: 0}, 'start')
	.add(function(){

		bubbles.attr('class', function(d){
			var sexo = d['sexo'];
			var num = parseInt(d['numero']);
			var i = 0;

			if(sexo == 'mujer')
				i = 2;
			else if(sexo == 'hombre')
				i = 1;

			listado_totales[i] += num;

			return 'bubble sex_' + i;
		});

		for(var t = 0; t < listado_totales.length; t++){
			var num_str = numeral(listado_totales[t]);
			var num = svg.append('text');
			num.attr("x", function (d) {
				return width/2 + 20;
			})
			.attr("y", function (d) {
				return t * 150 + 210;
			})
			.attr("class", "titulo_txt big num")
			.attr("font-family", "Avenir")
			.attr("text-anchor", "middle")
			.text(num_str.format('0,0') + '  [' + calcularPorcentaje(listado_totales[t]) + ']');
		}

	})
	.add(function(){
		$('text.num_sex, .rect_sexo').remove();

		simulation.force("x", d3.forceX(width / 2 - 100))
		.alpha(1).restart();

		var tl_sub = new TimelineMax();
		tl_sub.add('start')
		.staggerTo('.leyenda_dep:not(.general)', 0.5, {x: 400, ease: Power3.easeInOut},0.05)
		.staggerFromTo('.titulo_txt.big.num', 0.5, {autoAlpha:0},{autoAlpha:1, ease: Power3.easeInOut},0.2,'start')

		$('.leyenda_dep.general, .line_guia.ver').fadeOut();
	});
}

function datosPorDepartamentos_2(){
	simulation.force('x', forceX_porDepartamento)
	.force('y', d3.forceY(height/2))
	.alpha(1).restart();

	cargarLeyendaDepartamentos();

	bubbles.attr('class', function(d){
		var dep = d['nombre'];

		var index = $.inArray(dep, departamentos);
		var str = 'bubble departamento_bble_' + index;

		if(d['numero'] == 0)
			str += ' hide_always';
		return str;
	})

	var num_temp = 0;

	$('.leyenda_dep:not(.general), .titulo_txt.big.num, .line_guia.hori').remove();
	$('.leyenda_dep.general, .line_guia.ver').show();

	setTimeout(function(){

		actualizarBubbles(data03);
		bubbles
		.attr('r', function(d) {
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(1,43193,5,70);
		})
		.attr('class', function(d,i){
			var dep = d['nombre'];

			var index = $.inArray(dep, departamentos);
			var str = 'bubble departamento_bble_' + index;

			if(d['numero'] == 0)
				str += ' hide_always';
			return str;
		})

		simulation
		.nodes(data03)
		.force("collide", d3.forceCollide(function(d){
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(1,43193,5,70) + 1;
		}))

		simulation.alpha(1).restart()

		

		while(simulation.alpha() > 0.1){
			simulation.tick();
		}

		setTimeout(function(){

			simulation.force('y', forceY_porResp).alpha(1).restart();

			for(var i = 0; i < responsables.length; i++){
				var rect = svg.append("rect");
				var name = responsables[i];

				var tit = svg.append("text");
				tit.attr("x", function (d) {
					return 75;
				})
				.attr("y", function (d) {
					return i * 100 + 50 + 20 - 15;
				})
				.attr("class", "leyenda_dep titulo_txt big")
				.attr("font-family", "Minion Bold")
				.attr("font-size", "1em")
				.attr("text-anchor", "middle")
				.text(function(){
					if(name == 'Grupo Armado No Identificado')
						name = 'Grupo Armado No Id.'

					return name
				});

				var line = svg.append('line');
				line.attr('x2', 1185)
				.attr('x1', 0)
				.attr('y1', function(){
					return (i * 100) + 15;
				})
				.attr('y2', function(){
					return (i * 100) + 15;
				})
				.attr('class', 'line_guia hori');

				if(i == (responsables.length - 1)){
					var line = svg.append('line');
					line.attr('x2', 1185)
					.attr('x1', 0)
					.attr('y1', function(){
						return ((i + 1) * 100);
					})
					.attr('y2', function(){
						return ((i + 1) * 100);
					})
					.attr('class', 'line_guia hori');
				}
			}

			leyenda_dep_temp = svg.selectAll("text.leyenda_dep.general")
			leyenda_dep_temp.attr('y', function(){
				return 920
			});

			var lines = svg.selectAll("line.line_guia.ver");
			lines.attr('y1', height - 30 + 165)
			.attr('y2', height + 165)

			var bubbles_num = svg.selectAll("text.num_resp")
				.data(data03)
				.enter()
				.append("text")
				.attr('x', function(d){
					var str = d['nombre'];
					var index = $.inArray(str, departamentos);
					var offset = (width - 900) / 2 + 50 - 75;

					return index * 150 + offset;
				})
				.attr('y', function(d){
					var resp = d['responsable'];
					var index = $.inArray(resp, responsables);
					var y_pos = index * 100 + 40;
					return y_pos;
				})
				.attr('class', function(d,i){
					var str = 'num_resp titulo_txt big';
					return str;
				})
				.attr("font-family", "Avenir")
				.attr("text-anchor", "middle")
				.text(function(d){
					var num = numeral(d['numero'])
					return num.format('0,0') + '  [' + calcularPorcentaje(d['numero']) + ']';
				});
		}, 100);

	}, 100)
}

function datosPorDepartamentoResponsables(){
	var tl = new TimelineMax();

	var listado_totales = [0,0,0,0,0,0,0,0,0];

	simulation.alpha(1).restart();


	tl.add('start')
	.staggerTo('text.num_resp', 0.05, {autoAlpha: 0, y: 10}, 0.025)
	.to('.leyenda_dep.general, .line_guia.ver', 0.2, {autoAlpha: 0}, 'start')
	.add(function(){
		bubbles.attr('class', function(d){
			var responsable = d['responsable'];
			var num = parseInt(d['numero']);
			
			var index = $.inArray(responsable, responsables);

			var total = listado_totales[index] + num;
			listado_totales[index] = total;

			var str = 'bubble resp resp_bble_' + index;

			return str;
		});

		for(var t = 0; t < listado_totales.length; t++){
			var num_str = numeral(listado_totales[t]);
			var num = svg.append('text');
			num.attr("x", function (d) {
				return (width / 2);
			})
			.attr("y", function (d) {
				var y_pos = t * 100 + 60;
				return y_pos;
			})
			.attr("class", "titulo_txt big num")
			.attr("font-family", "Avenir")
			.attr("text-anchor", "middle")
			.text(num_str.format('0,0') + '  [' + calcularPorcentaje(listado_totales[t]) + ']');
		}

		simulation.force('x', d3.forceX(width / 2 - 100))
		.force('y', forceY_porResp)
		.force("collide", d3.forceCollide(function(d){
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(1,43193,5,70) + 1;
		}))
		.alpha(1)
		.restart();

		// d3.selectAll('rect.rect_resp').attr('x', function(){
		// 	return width / 2 + 100;
		// });

		var tl_sub = new TimelineMax();
		tl_sub.add('start')
		.staggerTo('.leyenda_dep:not(.general)', 0.5, {x: 400, ease: Power3.easeInOut},0.05)
		.staggerFromTo('.titulo_txt.big.num', 0.5, {autoAlpha:0},{autoAlpha:1, ease: Power3.easeInOut},0.2,'start')
	})
	// .to('.rect_resp', 0.15, {x: -200}, 0.05)
	;
}

function datosPorDepartamentos_3(){
	simulation.force('x', forceX_porDepartamento)
	.force('y', d3.forceY(height / 2))
	.force("collide", d3.forceCollide(function(d){
		var num = parseInt(d['numero']);
		if(num == 0)
			return 0;
		else
			return num.map(128,43193,10,70) - 5;
	}))
	.alpha(1)
	.restart()

	var num_temp = 0;

	cargarLeyendaDepartamentos();

	bubbles.attr('class', function(d,i){
		var dep = d['nombre'];

		var index = $.inArray(dep, departamentos);
		var str = 'bubble departamento_bble_' + index;

		if(d['numero'] == 0)
			str += ' hide_always';
		return str;
	});

	$('.leyenda_dep:not(.general), .titulo_txt.big.num, .line_guia.hori').remove();
	
	var tl = new TimelineMax();

	tl.add('start')
	.staggerTo('.leyenda_dep.general, .line_guia.ver', 0.2, {autoAlpha: 1}, 0.05)

	setTimeout(function(){
		actualizarBubbles(data04)

		bubbles.transition()
		.attr('r', function(d) {
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(1,43193,5,70);
		})
		.attr('class', function(d,i){
			var dep = d['nombre'];

			var index = $.inArray(dep, departamentos);
			var str = 'bubble departamento_bble_' + index;

			if(d['numero'] == 0)
				str += ' hide_always';
			return str;
		})

		simulation
		.nodes(data04)
		.force("collide", d3.forceCollide(function(d){
			var num = parseInt(d['numero']);
			if(num == 0)
				return 0;
			else
				return num.map(1,43193,5,70) + 1;
		}))

		simulation.alpha(1).restart()

		

		while(simulation.alpha() > 0.1){
			simulation.tick();
		}

		setTimeout(function(){

			simulation.force('y', forceY_porEdad)
			.alpha(1)
			.restart()

			for(var i = 0; i < edades.length; i++){
				var name = edades[i];

				var tit = svg.append("text");
				tit.attr("x", function (d) {
					return 60;
				})
				.attr("y", function (d) {
					return i * 100 + 105 + 80;
				})
				.attr("class", "leyenda_dep titulo_txt big")
				.attr("font-family", "Minion Bold")
				.attr("font-size", "0.7em")
				.attr("text-anchor", "middle")
				.text(function(){
					return name
				});

				if(i == (edades.length - 1)){
					var line = svg.append('line');
					line.attr('x2', 1185)
					.attr('x1', 0)
					.attr('y1', function(){
						return (i * 100)+ 250 + 15;
					})
					.attr('y2', function(){
						return (i * 100)+ 250 + 15;
					})
					.attr('class', 'line_guia hori');
				}
				else {
					var line = svg.append('line');
					line.attr('x2', 1185)
					.attr('x1', 0)
					.attr('y1', function(){
						return (i * 100) + 205 + 15;
					})
					.attr('y2', function(){
						return (i * 100) + 205 + 15;
					})
					.attr('class', 'line_guia hori');
				}
			}
			$("text.num_resp").remove()
			var bubbles_num = svg.selectAll("text.num_resp")
				.data(data04)
				.enter()
				.append("text")
				.attr('x', function(d){
					var str = d['nombre'];
					var index = $.inArray(str, departamentos);
					var offset = (width - 900) / 2 + 50 - 75;

					return index * 150 + offset;
				})
				.attr('y', function(d){
					var resp = d['edad'];
					var index = $.inArray(resp, edades);
					var y_pos = index * 100 + 80 + 80;
					return y_pos;
				})
				.attr('class', function(d,i){
					var str = 'num_resp titulo_txt big';
					return str;
				})
				.attr("font-family", "Avenir")
				.attr("text-anchor", "middle")
				.text(function(d){
					var num = numeral(d['numero'])
					return num.format('0,0') + '  [' + calcularPorcentaje(d['numero']) + ']';
				});

		}, 100)
	}, 100)
}

function cargarLeyendaDepartamentos(){
	for(var i = 0; i < departamentos.length; i++){

		var tit = svg.append("text");
		tit.attr("x", function (d) {
			var offset = (width - 900) / 2 - 75;
			return i * 150 + offset + 50;
		})
		.attr("y", function (d) {
			return height - 200 + 20;
		})
		.attr("class", "leyenda_dep general titulo_txt big")
		.attr("font-family", "Minion Bold")
		.attr("font-size", "1.3em")
		.attr("text-anchor", "middle")
		.text(departamentos[i]);

		var line = svg.append('line');
		line.attr('x1', function(){
			var offset = (width - 900) / 2 - 75;
			return i * 150 + offset + 50 - 75;
		})
		.attr('x2', function(){
			var offset = (width - 900) / 2 - 75;
			return i * 150 + offset + 50 - 75;
		})
		.attr('y1', function(){
			return height - 170;
		})
		.attr('y2', function(){
			return height - 200;
		})
		.attr('class', 'line_guia ver')

		if(i == departamentos.length - 1){
			var line = svg.append('line');
			line.attr('x1', function(){
				var offset = (width - 900) / 2 - 75;
				return (i + 1) * 150 + offset + 50 - 75;
			})
			.attr('x2', function(){
				var offset = (width - 900) / 2 - 75;
				return (i + 1) * 150 + offset + 50 - 75;
			})
			.attr('y1', function(){
				return height - 170;
			})
			.attr('y2', function(){
				return height - 200;
			})
			.attr('class', 'line_guia ver')
		}
	}
}

var capitulos = ['Lugar', 'Sexo', 'Responsable', 'Edad'];

for(var i = 0; i < 2; i++){
	var rect_btn = svg.append('rect');
	rect_btn.attr('x', 1300 + (i * 260) - 60)
	.attr('y', (height - 200))
	.attr('width', 240)
	.attr('height', 50)
	.attr('data-cap', (i + 1))
	.attr('class', 'btn_datos inactive');

	var btn_capitulo = svg.append('text');
	btn_capitulo.attr('x', 1300 + (i * 260) + 60)
	.attr('y', (height - 200 + 35))
	.attr('class', 'capitulo_btn inactive')
	.attr('data-cap', (i + 1))
	.attr("font-size", "1.8em")
	.attr("text-anchor", "middle")
	.attr("font-family", "Minion Bold")
	.text(capitulos[i]);
}

for(var i = 2; i < 4; i++){
	var rect_btn = svg.append('rect');
	rect_btn.attr('x', 1300 + ((i - 2) * 260) - 60)
	.attr('y', (height - 200 + 60))
	.attr('width', 240)
	.attr('height', 50)
	.attr('data-cap', (i + 1))
	.attr('class', 'btn_datos inactive');

	var btn_capitulo = svg.append('text');
	btn_capitulo.attr('x', 1300 + ((i - 2) * 260) + 60)
	.attr('y', (height - 200 + 35 + 60))
	.attr('class', 'capitulo_btn inactive')
	.attr('data-cap', (i + 1))
	.attr("font-size", "1.8em")
	.attr("text-anchor", "middle")
	.attr("font-family", "Minion Bold")
	.text(capitulos[i]);
}

$('.btn_datos, .capitulo_btn').on('click', function(){
	var step = $(this).attr('data-cap');

	$('.btn_datos, .capitulo_btn').addClass('inactive');
	$('.btn_datos[data-cap='+step+'], .capitulo_btn[data-cap='+step+']').removeClass('inactive');

	// console.log(step);

	if(step == 1){
		limpiarCanvas();
		$('.text_1,.text_2,.text_3,.text_4').hide();
		$('.text_1').fadeIn();
		$('#next_graf').hide();
		datosPorDepartamentos();
	}
	else if(step == 2){
		limpiarCanvas();
		$('.text_1,.text_2,.text_3,.text_4').hide();
		$('.text_2').fadeIn();
		$('#next_graf').show().off('click');
		$('#next_graf').on('click', function(){
			datosPorSexo();
			$(this).hide();
		});
		datosPorDepartamentosSexo();
	}
	else if(step == 3){
		// datosPorSexo();
		limpiarCanvas();
		$('.text_1,.text_2,.text_3,.text_4').hide();
		$('.text_3').fadeIn();
		$('#next_graf').show().off('click');
		$('#next_graf').on('click', function(){
			datosPorDepartamentoResponsables();
			$(this).hide();
		});
		datosPorDepartamentos_2();
	}
	else if(step == 4){
		limpiarCanvas();
		$('.text_1,.text_2,.text_3,.text_4').hide();
		$('.text_4').fadeIn();
		$('#next_graf').hide();
		datosPorDepartamentos_3();
	}
	// else if(step == 5){
	// 	datosPorDepartamentoResponsables();
	// }
	// else if(step == 6){
	// 	datosPorDepartamentos_3();
	// }
});

function calcularPorcentaje(num){
	var resp = (num) / granTotal;

	return numeral(resp).format('0.0%');
}



Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


