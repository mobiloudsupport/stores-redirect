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


document.addEventListener("DOMContentLoaded", function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const iosUrl = urlParams.get('ios');
    const androidUrl = urlParams.get('android');
    const redirectUrl = urlParams.get('redirect');
    const platform = getMobileOS();
    const downloadMsg = document.getElementById("downloadMsg");
    const redirectingMsg = document.getElementById("redirectingMsg");
    const externalMsg = document.getElementById("externalMsg");
    const errorMsg = document.getElementById("errorMsg");
    const iosBadge = document.getElementById("iosBadge");
    const externalLinkBtn = document.getElementById("externalLinkBtn");
    const androidBadge = document.getElementById("androidBadge");
    const urlRegex = /^(http|https):\/\//
    const buttonColor = urlParams.get('buttonColor');
  

    function showBadges(platform) {
        // shows 404 if no links provided
        if( !redirectUrl && !iosUrl && !androidUrl || !urlRegex.test(iosUrl) && !urlRegex.test(androidUrl) && !urlRegex.test(redirectUrl) ){
            errorMsg.classList.remove('hidden');
            redirectingMsg.classList.add('hidden')
            return
        }
        console.log(platform + " | empty param or invalid device")
        redirectingMsg.classList.add('hidden');
        downloadMsg.classList.remove('hidden');
        if(redirectUrl && urlRegex.test(redirectUrl)){
            console.log(buttonColor)
            buttonColor ? externalLinkBtn.style.backgroundColor = "#" + buttonColor : externalLinkBtn.style.backgroundColor = "#000000"
            externalMsg.classList.remove("hidden");
            downloadMsg.classList.add('hidden');
            externalLinkBtn.href = redirectUrl
        }
        if(iosUrl && urlRegex.test(iosUrl)){
            iosBadge.classList.remove("hidden");
            iosBadge.href = iosUrl
        };
        if (androidUrl && urlRegex.test(androidUrl)) {
            androidBadge.classList.remove('hidden');
            androidBadge.href = androidUrl
        }
    }
    if(redirectUrl && urlRegex.test(redirectUrl)){
        window.open(redirectUrl, "_blank");
    }
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