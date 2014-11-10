$(function() {
	// has to be done in this way because of the product is load by ajax
	setInterval(detect_update, 1000)
	setInterval(add_new_upload, 1000)
})

function add_new_upload() {
	if($('.new_upload').length > 0) {
		return false
	}

	$('.ui-menubutton-menu').map(function() {
		$(this).append('<li class="text-overflow"><a class="new_upload blue-a">重新发布产品</a></li>')
	})

	$('.new_upload').click(function() {
		// todo
	})
}

function detect_update() {
	var list = $('.list-date')
	if (list.length == 0) {
		return false
	}

	list.map(function(index) {
		var l = $(this)
		l.css('width', '85px')
		l.css('margin-right', '20px')
		l.css('float', 'left')
		l.removeClass('list-date fl')

		var t = l.find('span:eq(0)')
		var date = (new Date($.trim(t.text()))).valueOf()
		var now = (new Date()).valueOf()
		var days = Math.round((now - date)/86400000)

		if (days >= 7) {
			t.css('background-color', '#F60')
			t.html( '<span style="margin:2px;color:#FFF">' + days + '天没有更新</span>')
		}
	})
}