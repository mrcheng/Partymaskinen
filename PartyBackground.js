this.partyBackground = function()
{
	var w = window.innerWidth;
	var h = window.innerHeight;

	var ow = w / 2;
	var oh = h / 2;
	var r = Math.sqrt(ow * ow + oh * oh);
	var s = Math.PI * 2 / 100;

	var svgns = 'http://www.w3.org/2000/svg';
	var svg = document.createElementNS(svgns, 'svg');
	svg.setAttribute('width', w);
	svg.setAttribute('height', h);
	svg.setAttribute('style', 'position: fixed; z-index: -1000;');
	document.body.appendChild(svg);

	var groupTranslate = document.createElementNS(svgns, 'g');
	groupTranslate.setAttribute('transform', 'translate(' + ow + ',' + oh + ')');
	svg.appendChild(groupTranslate);

	var groupPoly = document.createElementNS(svgns, 'g');
	groupTranslate.appendChild(groupPoly);

	var tX = function(p)
	{
		return Math.sin(p) * r;
	};
	var tY = function(p)
	{
		return Math.cos(p) * r;
	};

	for (var p = 0; p < Math.PI * 2; p += s + s)
	{
		var poly = document.createElementNS(svgns, 'polygon');
		poly.setAttribute('style', 'fill:#6496ff');
		poly.setAttribute('points',
			'0,0 ' +
			tX(p) + ',' + tY(p) + ' ' +
			tX(p + s) + ',' + tY(p + s));
		groupPoly.appendChild(poly);
	}

	var animate = document.createElementNS(svgns, 'animateTransform');
	animate.setAttribute('attributeName', 'transform');
	animate.setAttribute('attributeType', 'XML');
	animate.setAttribute('type', 'rotate');
	animate.setAttribute('from', '0');
	animate.setAttribute('to', '360');
	animate.setAttribute('dur', '30s');
	animate.setAttribute('repeatCount', 'indefinite');
	groupPoly.appendChild(animate);

	//animate.beginElement();
}();
