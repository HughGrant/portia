chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "upload_product") {
		upload_product(request.product)
	}

  if (request.action == 'push_img') {
    chrome.tabs.create({url:request.url})
  }

  if (request.action == 'push_keywords') {
    var params = {name:request.name, count:request.count}
    $.get(DOMAIN + 'push_keywords', params).done(function(kws) {
      chrome.tabs.sendMessage(sender.tab.id, {action:'set_keywords', data:kws})
    })
  }
})

var upload_product = function(record) {
  var url = 'http://hz.productposting.alibaba.com/product/posting.htm'
  chrome.tabs.create({'url':url}, function(tab) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, ctab) {
      if (tabId == tab.id && changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tab.id, {action:'set_product', product:record})
        chrome.tabs.sendMessage(tab.id, {action:'set_category', category:record.category})
      }
    })
  })
}