# brackets-markdown-live-preview

Edit markdown files and see the results in brackets' live preview

### Install

* Install the extension

	- [Download the Zip](https://github.com/bengarnett/brackets-markdown-live-preview/archive/master.zip) and unzip it; or clone this repo on GitHub.
	- From Brackets, choose _Help > Show Extensions Folder_. This will open the extensions folder.
	- Drag the unzipped (or cloned) folder into the `user` directory.
	- Reload Brackets.

* Modify Brackets (add a couple lines of code)

	- Note. I plan to remove this set in the future, but at the current time, this was the easiest way to make it work
	- Edit "Brackets Sprint 19\www\LiveDevelopment\LiveDevelopment.js" around live 194 adding the below if statement

			// TODO: Issue #2033 Improve how default page is determined
			if (exports.config.liveUrlExtMap && exports.config.liveUrlExtMap[doc.extension]) {
				parentUrl = exports.config.liveUrlExtMap[doc.extension];
			}

### Usage

* Click the live preview icon on the top left of the brackets toolbar (Ctl+Alt+P)
* The preview will update when you SAVE the document.

### Todo

* Don't require any modification of brackets to install
* Replace setTimeout with onLiveDevInit
* Make it really live instead of just on save
* add support for showdown extensions


### Credits

* [Showdown](https://github.com/coreyti/showdown) - A JavaScript port of Markdown
* [markdown-css](https://bitbucket.org/kevinburke/markdowncss)

### License

MIT
