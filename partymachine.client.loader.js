﻿(function () {

	/*yepnope1.5.3|WTFPL*/
	(function (a, b, c) { function d(a) { return o.call(a) == "[object Function]" } function e(a) { return typeof a == "string" } function f() { } function g(a) { return !a || a == "loaded" || a == "complete" || a == "uninitialized" } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { (a.t == "c" ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { a != "img" && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = {}, o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; y[c] === 1 && (r = 1, y[c] = [], l = b.createElement(a)), a == "object" ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), a != "img" && (r || y[c] === 2 ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i(b == "c" ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), p.length == 1 && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && o.call(a.opera) == "[object Opera]", l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return o.call(a) == "[object Array]" }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++) c = x[f](c); return c } function g(a, e, f, g, i) { var j = b(a), l = j.autoCallback; j.url.split(".").pop().split("?").shift(), j.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]] || h), j.instead ? j.instead(a, e, f, g, i) : (y[j.url] ? j.noexec = !0 : y[j.url] = 1, f.load(j.url, j.forceCSS || !j.forceJS && "css" == j.url.split(".").pop().split("?").shift() ? "c" : c, j.noexec, j.attrs, j.timeout), (d(e) || d(l)) && f.load(function () { k(), e && e(j.origUrl, i, g), l && l(j.origUrl, i, g), y[j.url] = 2 }))) } function i(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b } (), a) a.hasOwnProperty(n) && (!c && ! --m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } } (k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var j, l, m = this.yepnope.loader; if (e(a)) g(a, 0, m, 0); else if (w(a)) for (j = 0; j < a.length; j++) l = a[j], e(l) ? g(l, 0, m, 0) : w(l) ? B(l) : Object(l) === l && i(l, m); else Object(a) === a && i(a, m) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } })(this, document);

	function getUrlParams() {
		var urlParams = {};
		(function () {
			var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = window.location.search.substring(1);

			while (e = r.exec(q))
				urlParams[d(e[1])] = d(e[2]);
		})();

		return urlParams;
	};

	var urlParams = getUrlParams();
	var baseUrlEncoded = urlParams["baseUrl"];
	var baseUrl = decodeURIComponent(baseUrlEncoded);

	var isProbablyDevelopingAPlugin = false;

	if (typeof baseUrlEncoded === "undefined") {
		baseUrl = 'http://mrcheng.github.com/Partymaskinen/';
		isProbablyDevelopingAPlugin = true;
	}

	yepnope({
		load: [
			baseUrl + "deps/json2.js",
			"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",
			baseUrl + "deps/jquery.ba-postmessage.js?plugin=1",
			baseUrl + "deps/jquery.swfobject.1-1-1.min.js?plugin=1",
			baseUrl + "scripts/partymachine.controllers.js?plugin=1",
			baseUrl + "scripts/partymachine.controllers.selector.js?plugin=1",
			baseUrl + "scripts/partymachine.controller.keyboard.js?plugin=1",
			baseUrl + "scripts/partymachine.controller.boomstick.js?plugin=1",
			baseUrl + "partymachine.client.js?plugin=1"
		],
		complete: function () {
			if (isProbablyDevelopingAPlugin) {

				var participants = [];

				participants.push({ name: 'Pub', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Randy', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Magnecyl', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Geggin', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Mejje', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Joel', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Fold', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Blaizer', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Deamo', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Wipeout', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Vico', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Shahin', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController: {} });
				participants.push({ name: 'Jesse', imageUrl: baseUrl + 'img/participant_example.png', status: "active", gameController : {} });

				partyMachinePlugin(participants);
				
			} else {
				$.receiveMessage(function (e) {
					var data = JSON.parse(e.data);

					if (data.event === 'getParticipants') {
						partyMachinePlugin(data.participants);
					}
				});
				$.postMessage(JSON.stringify({ event: "getParticipants" }), '*', window.parent);
			}
		}
	});

})();