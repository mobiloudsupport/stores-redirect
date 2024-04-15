function getMobileOS() {
	var userAgent =
	navigator.userAgent.toLowerCase() ||
	navigator.vendor.toLowerCase() ||
	window.opera;
	
	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "windows";
	}
	
	if (/android/i.test(userAgent)) {
		return "android";
	}
	
	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/ipad|iphone|ipod/.test(userAgent) && !window.MSStream) {
		return "ios";
	}
	
	return "desktop";
}	

console.log('asd')

document.addEventListener("DOMContentLoaded", function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const iosUrl = urlParams.get('ios');
    const androidUrl = urlParams.get('android');
    const platform = getMobileOS();
    const downloadMsg = document.getElementById("downloadMsg");
    const redirectingMsg = document.getElementById("redirectingMsg");
    const errorMsg = document.getElementById("errorMsg");
    const iosBadge = document.getElementById("iosBadge");
    const androidBadge = document.getElementById("androidBadge");
    const urlRegex = /^(http|https):\/\//

  

    function showBadges(platform) {
        // shows 404 if no links provided
        if( !iosUrl && !androidUrl || !urlRegex.test(iosUrl) && !urlRegex.test(androidUrl) ){
            errorMsg.classList.remove('hidden');
            redirectingMsg.classList.add('hidden')
            return
        }
        console.log(platform + " | empty param or invalid device")
        redirectingMsg.classList.add('hidden');
        downloadMsg.classList.remove('hidden');
        if(iosUrl && urlRegex.test(iosUrl)){
            iosBadge.classList.remove("hidden");
            iosBadge.href = iosUrl
        };
        if (androidUrl && urlRegex.test(androidUrl)) {
            androidBadge.classList.remove('hidden');
            androidBadge.href = androidUrl
        }
    }
    console.log('asdf')

    switch (platform) {
        case 'android':
            androidUrl ? window.location.href = androidUrl :  showBadges(platform) 
            break;
        case 'ios':
            iosUrl ? window.location.href = iosUrl : showBadges(platform)
            break
        default:
            showBadges(platform)            
            break;
    }
});