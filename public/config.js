$.fn.serializeObject = function() {
   var o = {}
   var a = this.serializeArray()
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]]
           }
           o[this.name].push(this.value || '')
       } else {
           o[this.name] = this.value || ''
       }
   })
   return o
}

var model_insert = function(model_name, data, success_msg, error_msg) {
  $.ajax({
    url: DOMAIN + model_name,
    data: JSON.stringify(data),
    type: 'POST',
    success: function(data) {
      alert(success_msg)
    },
    error: function(data) {
      alert(error_msg)
    }
  })
}

var product_upload = function(product) {
  chrome.runtime.sendMessage({action: 'upload_product', product: product})
}

var push_img = function(url, name) {
  var new_url = DOMAIN + 'push_img?url=' + url + '&name=' + name
  var info = {action:'push_img', url:new_url}
  chrome.runtime.sendMessage(info)
}

var DOMAIN = 'http://localhost:4567/'
var SEARCH_HOT_KEYWORD_URL = 'http://hz.my.data.alibaba.com/industry/keywords.htm'
var ATTR = [
  ["售后服务体系", "After-sales Service Provided", "select"],
  ["保修期", "Warranty", "input"],
  ["认证", "Certification", "input"],
  ["重量", "Weight", "input"],
  ["尺寸(长×宽×高)", "Dimension(L*W*H)", "input"],
  ["功率(瓦)", "Power(W)", "input"],
  ["功率", "Power", "input"],
  ["动力类型", "Driven Type", "select"],
  ["自动化程度", "Automatic Grade", "select"],
  ["包装材料", "Packaging Material", "check"],
  ["包装类型", "Packaging Type", "check"],
  ["电压", "Voltage", "input"],
  ["型号", "Model Number", "input"],
  ["品牌", "Brand Name", "input"],
  ["原产地", "Place of Origin", "select"],
  ["编程控制", "Computerized", "select"],
  ["箱包材质", "Material", "select"],
  ["材质", "Material", "select"],
  ["箱包类型", "Bag Type", "select"],
  ["机器类型", "Machine Type", "select"],
  ["状态", "Condition", "select"],
  ["新旧程度", "Condition", "select"],
  ["类型", "Type", "select"],
  ["种类", "Type", "select"],
  ["应用", "Application", "check"],
  ["最大压片直径", "Max. Tablet Diameter(mm)", "input"],
  ["最大压片厚度", "Max. Tablet Thickness(mm)", "input"],
  ["最大压力", "Max. Pressure(KN)", "input"],
  ["生产率", "Production Capacity", "input"],
]

var moneyType = {
  US: {value: 1, text: 'USD'},
  CH: {value: 2, text: 'RMB'},
  EU: {value: 3, text: 'EUR'},
  OT: {value: 4, text: 'Other'},
  GB: {value: 5, text: 'GBP'},
  JP: {value: 6, text: 'JPY'},
  AU: {value: 7, text: 'AUD'},
  CA: {value: 8, text: 'CAD'},
  CF: {value: 9, text: 'CHF'},
  NT: {value: 11, text: 'NTD'},
  HK: {value: 12, text: 'HKD'},
  NZ: {value: 13, text: 'NZD'},
}

var unitType = {
  'Acre/Acres':                           26,
  'Ampere/Amperes':                       27,
  'Bag/Bags':                             1,
  'Barrel/Barrels':                       19,
  'Blade/Blades':                         91,
  'Box/Boxes':                            28,
  'Bushel/Bushels':                       18,
  'Carat/Carats':                         90,
  'Carton/Cartons':                       29,
  'Case/Cases':                           30,
  'Centimeter/Centimeters':               31,
  'Chain/Chains':                         32,
  'Combo/Combos':                         92,
  'Cubic Centimeter/Cubic Centimeters':   33,
  'Cubic Foot/Cubic Feet':                34,
  'Cubic Inch/Cubic Inches':              35,
  'Cubic Meter/Cubic Meters':             13,
  'Cubic Yard/Cubic Yards':               36,
  'Degrees Celsius':                      37,
  'Degrees Fahrenheit':                   38,
  'Dozen/Dozens':                         14,
  'Dram/Drams':                           39,
  'Fluid Ounce/Fluid Ounces':             40,
  'Foot/Feet':                            41,
  'Forty-Foot Container':                 88,
  'Furlong/Furlongs':                     42,
  'Gallon/Gallons':                       15,
  'Gill/Gills':                           43,
  'Grain/Grains':                         44,
  'Gram/Grams':                           17,
  'Gross':                                87,
  'Hectare/Hectares':                     45,
  'Hertz':                                46,
  'Inch/Inches':                          47,
  'Kiloampere/Kiloamperes':               48,
  'Kilogram/Kilograms':                   16,
  'Kilohertz':                            49,
  'Kilometer/Kilometers':                 10,
  'Kiloohm/Kiloohms':                     50,
  'Kilovolt/Kilovolts':                   51,
  'Kilowatt/Kilowatts':                   52,
  'Liter/Liters':                         22,
  'Long Ton/Long Tons':                   9,
  'Megahertz':                            53,
  'Meter/Meters':                         8,
  'Metric Ton/Metric Tons':               7,
  'Mile/Miles':                           54,
  'Milliampere/Milliamperes':             55,
  'Milligram/Milligrams':                 24,
  'Millihertz':                           56,
  'Milliliter/Milliliters':               57,
  'Millimeter/Millimeters':               58,
  'Milliohm/Milliohms':                   59,
  'Millivolt/Millivolts':                 60,
  'Milliwatt/Milliwatts':                 61,
  'Nautical Mile/Nautical Miles':         62,
  'Ohm/Ohms':                             63,
  'Ounce/Ounces':                         6,
  'Pack/Packs':                           21,
  'Pair/Pairs':                           5,
  'Pallet/Pallets':                       86,
  'Parcel/Parcels':                       64,
  'Perch/Perches':                        65,
  'Piece/Pieces':                         4,
  'Pint/Pints':                           66,
  'Plant/Plants':                         85,
  'Pole/Poles':                           67,
  'Pound/Pounds':                         3,
  'Quart/Quarts':                         68,
  'Quarter/Quarters':                     69,
  'Rod/Rods':                             70,
  'Roll/Rolls':                           71,
  'Set/Sets':                             20,
  'Sheet/Sheets':                         89,
  'Short Ton/Short Tons':                 2,
  'Square Centimeter/Square Centimeters': 72,
  'Square Foot/Square Feet':              73,
  'Square Inch/Square Inches':            74,
  'Square Meter/Square Meters':           12,
  'Square Mile/Square Miles':             75,
  'Square Yard/Square Yards':             76,
  'Stone/Stones':                         77,
  'Strand/Strands':                       84,
  'Ton/Tons':                             11,
  'Tonne/Tonnes':                         78,
  'Tray/Trays':                           79,
  'Twenty-Foot Container':                83,
  'Unit/Units':                           25,
  'Volt/Volts':                           80,
  'Watt/Watts':                           81,
  'Wp':                                   82,
  'Yard/Yards':                           23,
  'Acre':                                 26,
  'Ampere':                               27,
  'Bag':                                  1,
  'Barrel':                               19,
  'Blade':                                91,
  'Box':                                  28,
  'Bushel':                               18,
  'Carat':                                90,
  'Carton':                               29,
  'Case':                                 30,
  'Centimeter':                           31,
  'Chain':                                32,
  'Combo':                                92,
  'Cubic Centimeter':                     33,
  'Cubic Foot':                           34,
  'Cubic Inch':                           35,
  'Cubic Meter':                          13,
  'Cubic Yard':                           36,
  'Degrees Celsius':                      37,
  'Degrees Fahrenheit':                   38,
  'Dozen':                                14,
  'Dram':                                 39,
  'Fluid Ounce':                          40,
  'Foot':                                 41,
  'Forty-Foot Container':                 88,
  'Furlong':                              42,
  'Gallon':                               15,
  'Gill':                                 43,
  'Grain':                                44,
  'Gram':                                 17,
  'Gross':                                87,
  'Hectare':                              45,
  'Hertz':                                46,
  'Inch':                                 47,
  'Kiloampere':                           48,
  'Kilogram':                             16,
  'Kilohertz':                            49,
  'Kilometer':                            10,
  'Kiloohm':                              50,
  'Kilovolt':                             51,
  'Kilowatt':                             52,
  'Liter':                                22,
  'Long Ton':                             9,
  'Megahertz':                            53,
  'Meter':                                8,
  'Metric Ton':                           7,
  'Mile':                                 54,
  'Milliampere':                          55,
  'Milligram':                            24,
  'Millihertz':                           56,
  'Milliliter':                           57,
  'Millimeter':                           58,
  'Milliohm':                             59,
  'Millivolt':                            60,
  'Milliwatt':                            61,
  'Nautical Mile':                        62,
  'Ohm':                                  63,
  'Ounce':                                6,
  'Pack':                                 21,
  'Pair':                                 5,
  'Pallet':                               86,
  'Parcel':                               64,
  'Perch':                                65,
  'Piece':                                4,
  'Pint':                                 66,
  'Plant':                                85,
  'Pole':                                 67,
  'Pound':                                3,
  'Quart':                                68,
  'Quarter':                              69,
  'Rod':                                  70,
  'Roll':                                 71,
  'Set':                                  20,
  'Sheet':                                89,
  'Short Ton':                            2,
  'Square Centimeter':                    72,
  'Square Foot':                          73,
  'Square Inch':                          74,
  'Square Meter':                         12,
  'Square Mile':                          75,
  'Square Yard':                          76,
  'Stone':                                77,
  'Strand':                               84,
  'Ton':                                  11,
  'Tonne':                                78,
  'Tray':                                 79,
  'Twenty-Foot Container':                83,
  'Unit':                                 25,
  'Volt':                                 80,
  'Watt':                                 81,
  'Wp':                                   82,
  'Yard':                                 23,
}


// var jq = document.createElement('script');
// jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
// document.getElementsByTagName('head')[0].appendChild(jq);

// function collect(cs){
//   var options = $(cs);
//   var code = '';
//   for(var i = 0; i < options.length; i++) {
//     var v = options[i].value; 
//     var t = options[i].text;
//     code += "'" + t + "'" + ':' + v + ',\n';
//   }
//   console.log(code);
//   return code;
// }
