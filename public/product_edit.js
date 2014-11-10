$(function() {
	$('#productKeyword').after('<button id="get_keywords" type="button" class="ui-button ui-button-normal ui-button-big">获取关键字</button>')

	$('#get_keywords').click(function() {
			var name = $('#productName').val()
			if ($.trim(name) == '') {
				name = product.name
			}
			var info = {action:'push_keywords', name:name}
			chrome.runtime.sendMessage(info)
		})
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.action == 'set_keywords') {
		if (request.data.success == true) {
			$('#productKeyword').val(request.data.keywords.shift())
			$('#keywords2').val(request.data.keywords.shift())
			$('#keywords3').val(request.data.keywords.shift())
		} else {
			var f = confirm(request.data.message + '\n是否现在去采集?')
			if (f) {
				chrome.runtime.sendMessage({action: 'push_img', url: SEARCH_HOT_KEYWORD_URL})
			}
		}
	}

})