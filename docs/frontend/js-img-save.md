js实现保存图片到本地、相册

1、保存到电脑上（pc）
downloadCanvasIamge(selector, name) {
	var image = new Image()
	// 解决跨域 Canvas 污染问题
	image.setAttribute('crossOrigin', 'anonymous')
	image.onload = function () {
		var canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height

		var context = canvas.getContext('2d')
		context.drawImage(image, 0, 0, image.width, image.height)
		var url = canvas.toDataURL('image/png')

		// 生成一个a元素
		var a = document.createElement('a')
		// 创建一个单击事件
		var event = new MouseEvent('click')

		// 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
		a.download = name || '下载图片名称'
		// 将生成的URL设置为a.href属性
		a.href = url
		// 触发a的单击事件
		a.dispatchEvent(event)
	}

	image.src = document.querySelector(selector).src
},
复制代码
参数
selector：要保存的元素的名字，img的那个标签，不用写到src
name：要下载的图片的名字（可填可不填），不填默认为 下载图片名称 上面代码有判断~

2、保存到电脑、手机端（相册）中
saveImg (Url) {
	var blob=new Blob([''], {type:'application/octet-stream'});
	var url = URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = Url;
	a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0];
	var e = document.createEvent('MouseEvents');
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	a.dispatchEvent(e);
	URL.revokeObjectURL(url);
},
复制代码
参数
Url：要保存的路径（图片的名字），也就是 img 标签属性里的 src的值
譬如： 在vue中的data里

data () {
    return {
        saveImgpath: require('../assets/moren.png')
    }
}
然后这个 saveImgpath 就是上面方法saveImg（Url）的 Url的参~