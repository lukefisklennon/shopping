exports.createView = function(args) {
	alert("Well hello there!");
    if (OS_IOS) {
        return Ti.UI.createView(args);
    } else {
        return Ti.UI.Android.createCardView(args);
    }
};
