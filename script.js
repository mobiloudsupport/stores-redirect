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
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
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
    const errorMsg = document.getElementById("errorMsg");
    const redirectingMsg = document.getElementById("redirectingMsg");
    const iosBadge = document.getElementById("iosBadge");
    const androidBadge = document.getElementById("androidBadge");
    switch (platform) {
        case 'android':
            if(androidUrl){
                window.location.href = androidUrl;
                
            }
            else{
                console.log("android | invalid or empty param")
            }
            break;
        case 'ios':
            console.log(iosUrl);
            if(iosUrl  && iosUrl.length > 0){
                window.location.href = iosUrl;                
            }
            else{
                console.log("ios | invalid or empty param")
            }
            break
        default:
            redirectingMsg.classList.add('hidden');
            errorMsg.classList.remove('hidden');
            if(iosUrl){
                iosBadge.classList.remove("hidden");
                iosBadge.href = iosUrl
            };
            if (androidUrl) {
                androidBadge.classList.remove('hidden');
                androidBadge.href = androidUrl

            }
            break;
    }
});