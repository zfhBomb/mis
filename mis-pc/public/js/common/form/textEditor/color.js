define(function(require, exports, module) {
	
	var ColorList=React.createClass({
		clickHandler:function(e){
			this.props.colorChoose(this.props.color,e);
		},
		render:function(){
			return (
				<li style={{backgroundColor:this.props.color}} onClick={this.clickHandler}></li>
			);
		}
	});
	
    var Color=React.createClass({
    	getDefaultProps:function(){
    		return {
    			colors:["#ac725e","#d06b64","#f83a22","#fa573c","#ff7537",
    			"#ffad46","#42d692","#16a765","#7bd148","#b3dc6c",
    			"#fbe983","#fad165","#92e1c0","#9fe1e7","#9fc6e7",
    			"#4986e7","#9a9cff","#b99aff","#c2c2c2","#cabdbf",
    			"#cca6ac","#f691b2","#cd74e6","#a47ae2","#444444",
    			]
    		}
    	},
    	colorChoose:function(color,e){
    		this.props.colorChoose(color,e);
    	},
        render:function(){
        	var lists=this.props.colors.map(function(list,key){
        		return (
        			<ColorList color={list} key={key} colorChoose={this.colorChoose}/>
        		);
        	}.bind(this));
			return (
				<div className="layout-font-color kc-anim">
                    <div className="layout-kc-content">
                        <ul className="box-font-list">
                            {lists}
                        </ul>
                    </div>
                </div>
			);
        }
    });
    module.exports=Color;
});