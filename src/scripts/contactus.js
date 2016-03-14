function BDMap(options){
    var map = new BMap.Map(options.id);
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12); 
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); 
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(options.point, function(point){
        if (point) {
            var marker = new BMap.Marker(point)  
            map.centerAndZoom(point, 16);
            map.addOverlay(marker); 
            marker.setLabel(new BMap.Label(options.label, {offset:new BMap.Size(20,-10)}));
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
        }
    }, options.range); 
}

var mapData = [
    {
        id: "address-bj"
        ,range: '北京市'
        ,point: '四惠大厦'
        ,label: '北京快网'
    }
    ,{
        id: "address-sh"
        ,range: '上海市'
        ,point: '江场西路160号'
        ,label: '上海快网'
    }
    ,{
        id: "address-gz"
        ,range: '广州市'
        ,point: '平云路163号平云广场A塔'
        ,label: '广州快网'
    }
    ,{
        id: "address-sz"
        ,range: '深圳市'
        ,point: '田厦国际中心B座'
        ,label: '深圳快网'
    }
	,{
        id: "address-wh"
        ,range: '武汉市'
        ,point: '光谷金融港A11栋'
        ,label: '武汉快网研发'
    }
];

var $mpcnt = $('.fw-maps-content li');
var $mpctrl = $('.fw-maps-control li').each(function(i){
    var $this = $(this);
    $this.click(function(){
        $mpctrl.find('a').removeClass('fw-active').eq(i).addClass('fw-active');
        $mpcnt.hide().eq(i).show();
        BDMap(mapData[i]);
    });
});
$mpctrl.eq(0).click();
