var select_btn = '<a id="select_keyword" class="ui-button ui-button-primary ui-button-medium">反选</a>'
var append_btn = '<a id="append_keyword" class="ui-button ui-button-primary ui-button-medium">添加</a>'
$(function(){
	$('#J-search-trigger').after(select_btn)
	$('#select_keyword').after(append_btn)

	setInterval(adding_boxes, 1000)

	$('#select_keyword').click(function() {
		var f = detect_keywords()
		if (!f) {
			return false
		}
		$('.ynkw').prop('checked', false)
	})

	$('#append_keyword').click(function() {
		var f = detect_keywords()
		if (!f) {
			return false
		}
		var kws = $('.ynkw:checked')
		if (kws.length == 0) {
			return false
		}
		var list = []
		var skw = $('#J-search-keywords').val()
		kws.map(function(){
			var v = $(this).attr('value')
			list.push({search_keyword:skw, keyword:v, count:0})
		})
		model_insert('keywords', list, '成功增加'+list.length+'个关键字', '出错了')
	})
})

function adding_boxes() {
	var kw = $('#J-search-keywords')
	if ($.trim(kw.val()) == '') {
		return false
	}

	var kws = $('#J-keywords-content .J-keyword-line > .column-keyword.align-left')
	if (kws.length == 0) {
		return false
	}

	kws.map(function(){
		var kw = $(this)
		if (kw.find('input').length == 0 ) {
			kw.prepend('<input value="' + kw.text() + '" type="checkbox" class="ynkw" checked="checked">')
		}
	})
}

function detect_keywords() {
	var kw = $('#J-search-keywords')
	if ($.trim(kw.val()) == '') {
		kw.css('border', '1px solid red')
		return false
	} else {
		kw.css('border', '1px solid #ccc')
	}

	var kws = $('#J-keywords-content .J-keyword-line > .column-keyword.align-left')
	if (kws.length == 0) {
		return false
	}

	return true
}