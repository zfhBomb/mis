define(function(require, exports, module) {
    var KCTree=require('KC-tree.js');

	
	//参数说明    1、url为ajax数据地址    2、title为标题
	/*3、  treeContent为除标题外的内容区域div
	treeFolder为带有子节点的div   treeFolderHeader为子节点标题外容器div  treeFolderName为子节点的标题   
	childList为最末级子节点 外层div childListName为最末级子节点  listIcon为最末级节点的图标  
	child为未展开的子节点容器div   childOn为展开的子节点容器div   openIcon为展开的图标
	closeIcon为未展开的图标            以上参数如无需指定可不传参*/
	React.render(<KCTree url="./data/tree.json"  title="标题标题" />,document.getElementById('block'));


});