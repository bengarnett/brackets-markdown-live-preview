/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Simple extension that adds a "File > Hello World" menu item */
define(function (require, exports, module) {
	"use strict";

	var CommandManager		= brackets.getModule("command/CommandManager"),
		DocumentManager		= brackets.getModule("document/DocumentManager"),
		FileUtils			= brackets.getModule("file/FileUtils"),
		Inspector			= brackets.getModule("LiveDevelopment/Inspector/Inspector"),
		Showdown			= require('showdown'),
		moduleDir			= FileUtils.getNativeModuleDirectoryPath(module) + "/";

//	CommandManager.register("Enable live markdown preview", "markdown-live-enable", function() {});
//	CommandManager.register("Disable live markdown preview", "markdown-live-disable", function() {});

	//TODO:replace with on liveDev inited
	window.setTimeout(function () {
		var LiveDevelopment = brackets.getModule("LiveDevelopment/LiveDevelopment");
		LiveDevelopment.config.experimental = true;
		LiveDevelopment.config.liveUrlExtMap || (LiveDevelopment.config.liveUrlExtMap = {});
		LiveDevelopment.config.liveUrlExtMap.md = moduleDir;
		LiveDevelopment.config.liveUrlExtMap.markdown = moduleDir;
	}, 5000);

	function compileMarkdown() {
		var d = $.Deferred(),
			doc = DocumentManager.getCurrentDocument(),
			md = doc.getText(),
			converter = new Showdown.converter(),
			html = converter.makeHtml(md),
			text = '<html><head><link rel="stylesheet" type="text/css" href="./markdown.css"></head><body>' + html + '</body></html>',
			path = moduleDir + "index.html";
		brackets.fs.writeFile(path, text, 'utf8', function (err) {
			if (err !== 0) { console.error(err); }
			d.resolve();
		});
		return d.promise();
	}
	function liveMarkdown() {
		var doc = DocumentManager.getCurrentDocument();
		if (doc.extension === "md" || doc.extension === 'markdown') {
			compileMarkdown().then(function () {
				Inspector.Page.reload();
			});
		}
	}
	function _onConnect() {
		liveMarkdown();
		$(DocumentManager).on("documentSaved currentDocumentChange", liveMarkdown);
	}
	function _onDisconnect() {
		$(DocumentManager).off("documentSaved currentDocumentChange", liveMarkdown);
	}
	$(Inspector).on("connect", _onConnect)
				.on("disconnect", _onDisconnect);
	//TODO: make really live instead of just on save
	//_onDirtyFlagChange

});
