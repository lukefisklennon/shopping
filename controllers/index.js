var window = $.index;
var mainTabs = [];

function navClick() {
	$.drawer.toggleLeft();
}

function searchClick() {
	show($.backButton);
	hide($.menuButton);
	hide($.title);
	hide($.searchButton);
}

function tabClick(event) {
	setTab($.tabs.children.indexOf(event.source), true, true);
}

function pagesScroll(event) {
	setTab(event.currentPage, false, true);
	$.tabLine.left = event.currentPageAsFloat * $.tabs.size.width / 2;
}

window.addEventListener("open", function() {
	mainTabs = getTabs($.tabs);
	for (var i = 0; i < mainTabs.length; i ++) {
		mainTabs[i].left = ($.tabs.size.width / mainTabs.length) * i;
	}
	setTab(0, true, false);
});

window.open();

function getTabs(view) {
	var tabs = [];
	var children = view.children;
	var n = children.length - 1;
	for (var i = 0; i < n; i++) {
		tabs.push(children[i]);
	}
	return tabs;
}

var tabAnimationDuration = 100;
function setTab(index, setPage, animate) {
	for (var i = 0; i < mainTabs.length; i++) {
		var label = mainTabs[i].children[0];
		var color = "#e6e6e6";
		var opacity = 0.6;
		if (i == index) {
			color = "#ffffff";
			opacity = 1;
		}
		if (animate) {
			label.animate({
				color: color,
				opacity: opacity,
				duration: tabAnimationDuration
			});
		} else {
			label.color = color;
			label.opacity = opacity;
		}
	}
	if (setPage) $.pages.scrollToView(index);
}

function show(view) {
	view.opacity = 1;
	view.touchEnabled = true;
}

function hide(view) {
	view.opacity = 0;
	view.touchEnabled = false;
}
