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
	setTab($.tabs.children.indexOf(event.source), true);
}

window.addEventListener("open", function() {
	mainTabs = getTabs($.tabs);
	for (var i = 0; i < mainTabs.length; i ++) {
		mainTabs[i].left = ($.tabs.size.width / mainTabs.length) * i;
	}
	setTab(0, false);
});

window.open();

var inactiveOpacity = 0.54;
function pagesScroll(event) {
	var index = event.currentPage;
	var position = event.currentPageAsFloat;
	var exactlyOnPage = (index == position);
	$.tabLine.left = position * $.tabs.size.width / 2;
	for (var i = 0; i < mainTabs.length; i++) {
		var label = mainTabs[i].children[0];
		if (exactlyOnPage) {
			if (i == index) {
				label.opacity = 1;
			} else {
				label.opacity = inactiveOpacity;
			}
		} else {
			var floor = Math.floor(position);
			var ceil = Math.ceil(position);
			if (i == floor) {
				label.opacity = distanceToOpacity(position - floor);
			} else if (i == ceil) {
				label.opacity = distanceToOpacity(ceil - position);;
			} else {
				label.opacity = inactiveOpacity;
			}
		}
	}
	function distanceToOpacity(distance) {
		return (1 - inactiveOpacity) * (1 - (distance)) + inactiveOpacity;
	}
}
function setTab(index, animatePages) {
	for (var i = 0; i < mainTabs.length; i++) {
		var label = mainTabs[i].children[0];
		if (i == index) {
			label.opacity = 1;
		} else {
			label.opacity = inactiveOpacity;
		}
	}
	if (animatePages) {
		$.pages.scrollToView(index);
	} else {
		$.pages.currentPage = index;
	}
}

function getTabs(view) {
	var tabs = [];
	var children = view.children;
	var n = children.length - 1;
	for (var i = 0; i < n; i++) {
		tabs.push(children[i]);
	}
	return tabs;
}

function show(view) {
	view.opacity = 1;
	view.touchEnabled = true;
}

function hide(view) {
	view.opacity = 0;
	view.touchEnabled = false;
}
