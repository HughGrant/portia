module Tables
	
	META = {
		accounts: [
			{name: 'email', title:'邮箱', show: true},
			{name: 'password', title:'密码', show: false},
		],
		keywords: [
			{name: 'search_keyword', title:'类目', show: true},
			{name: 'keyword', title:'关键字', show: true},
			{name: 'count', title:'使用次数', show: true},
		],
		costs: [
			{name: 'name', title:'名称', show: true},
			{name: 'cost', title:'成本(RMB)', show: true},
			{name: 'weight', title:'重量(KG)', show: true},
			{name: 'dimension', title:'长宽高(CM)', show: true},
			{name: 'volume_weight', title:'体积重(KG)', show: true},
			{name: 'video_link', title:'视频链接', show: true},
			{name: 'bak', title:'备注', show: true},
		],
		customers: [
			{name: 'email', title:'邮箱', show: true},
			{name: 'name', title:'姓名', show: true},
			{name: 'telephone', title:'联系号码', show: true},
			{name: 'country', title:'国家', show: true},
			{name: 'address', title:'地址', show: true},
			{name: 'post_code', title:'邮编', show: true},
			{name: 'company_name', title:'公司名', show: true},
		],
		products: [
			{name: 'name', title:'产品名'},
			{name: 'keywords', title:'关键字'},
			{name: 'category', title:'类目'},
			{name: 'summary', title:'概览'},
			{name: 'photos', title:'产品图片'},
			{name: 'attrs', title:'产品属性'},
			{name: 'min_order_quantity', title:'起订量'},
			{name: 'min_order_unit', title:'起订单位'},
			{name: 'money_type', title:'货币类型'},
			{name: 'price_range_min', title:'最低报价'},
			{name: 'price_range_max', title:'最高报价'},
			{name: 'price_uint', title:'报价单位'},
			{name: 'port', title:'港口'},
			{name: 'payment_method', title:'付款方式'},
			{name: 'supply_quantity', title:'产量'},
			{name: 'supply_unit', title:'产量单位'},
			{name: 'supply_period', title:'产量周期'},
			{name: 'consignment_term', title:'运输时长'},
			{name: 'packaging_desc', title:'包装描述'},
			{name: 'rich_text', title:'产品正文'},
		]
	}

end