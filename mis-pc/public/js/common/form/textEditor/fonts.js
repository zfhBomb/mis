define(function(require, exports, module) {
    var Select=require('../select/select.js');
    var Color=require('color.js');
    
    var FontsShape=React.createClass({
    	getInitialState:function(){
    		return{
    			selected:false
    		}
    		
    	},
    	clickHandler:function(e){
    		this.setState({selected:!this.state.selected});
	    	this.props.fontsShape(this.props.num,e);
    	},
    	render:function(){
    		return (
    			<i className={this.state.selected?this.props.className+" selected":this.props.className} title={this.props.title} onClick={this.clickHandler}></i>
    		);
    	}
    });
    
    
    
    var Fonts=React.createClass({
        getInitialState:function(){
            return {
                colorOpen:false,
                shapeVal:[]
            }
        },
        colorToolClick:function(){
            var openned=this.state.colorOpen;
            this.setState({
                colorOpen:!openned
            });
        },
        fontsShape:function(num,e){
        	var nums=this.state.shapeVal.concat();
        	var isSame=false;
        	var SameNum=null;
        	if(nums.length>0){
        		for(var i=0;i<nums.length;i++){
        			if(nums[i]==num){
        				SameNum=i;
        				isSame=true;
        				break;
        			}
        		}
        		if(isSame){
        			nums.splice(SameNum,1);
        		}else{
        			nums.push(num);
        		}
        	}else{
        		nums.push(num);
        	}
        	this.setState({shapeVal:nums},function(e){
        		this.props.shapeSet(num,e);
        	}.bind(this));
        	console.log("字形状为："+nums);
        },
        colorChoose:function(color,e){
            this.setState({
                colorOpen:false
            });
            this.props.colorSet(color,e);
        	console.log("颜色为："+color);
        },
        fontFamily:function(str,e){
        	this.props.fontFamilySet(str,e);
        	console.log("字体为："+str);
        },
        fontSize:function(str,e){
        	this.props.fontSizeSet(str,e);
        	console.log("字大小为："+str);
        },
        getDefaultProps:function(){
        	return {
        		fontsShape:[
        			{
        				className:'iconfont icon-jiacu-copy  font-tool',
        				title:'加粗'
        			},
        			{
        				className:'iconfont icon-xieti  font-tool',
        				title:'斜体'
        			},
        			{
        				className:'iconfont icon-xiahuaxian  font-tool',
        				title:'下划线'
        			}
        		],
        		fontFamilyData:[
	        		{value:'宋体',label:'宋体'},
	        		{value:'微软雅黑',label:'微软雅黑'},
	        		{value:'黑体',label:'黑体'}
        		],
        		fontSizeData:[
	        		{value:'1',label:'12'},
	        		{value:'2',label:'14'},
	        		{value:'3',label:'16'},
	        		{value:'4',label:'18'},
	        		{value:'5',label:'20'},
	        		{value:'6',label:'22'},
	        		{value:'7',label:'24'}
        		]
        	}
        },
        render:function(){
        	var fontsShape=this.props.fontsShape.map(function(list,key){
        		return (
        			<FontsShape title={list.title} className={list.className}
        			key={key} num={key+1} 
        			fontsShape={this.fontsShape}/>
        		);
        	}.bind(this));
        	var colorComponent=this.state.colorOpen?<Color colorChoose={this.colorChoose}/>:"";
            return(
                <div className="layout-box-font" style={{display:(this.props.show)?'block':'none'}}>
                    <div className="box-tool">
                        <img className="icon-color" onClick={this.colorToolClick} src="../../../webroot-dev/html/cloudClass/static/images/icon-color.png"/>
                        <Select dis="" value="宋体" width="75" data={this.props.fontFamilyData} changeHandler={this.fontFamily}/>
                        <Select dis="" value="2" width="50" data={this.props.fontSizeData} changeHandler={this.fontSize}/>
                        {fontsShape}
                        {colorComponent}
                    </div>
                </div>
            );
        }
    });
    module.exports=Fonts;
});