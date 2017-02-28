define(function(require, exports, module) {
	/**
     * 评分插件
     * @module common.form
     * @class rate
     */
    
    /**
     *  星星总数
     *  @property count {num}
     *  @default 5
     */
    
    /**
     *  默认星星数
     *  @property defaultValue {num}
     *  @default 0
     */
    
    /**
     *  是否使用文字标签
     *  @property starText {Booleans}
     *  @default true
     */
    
    /**
     *  是否只读
     *  @property disabled {Booleans}
     *  @default false
     */
    
    	var RateItem=React.createClass({
		over:function(){
			this.props.hoverHander(this.props.num,true);
		},
		out:function(){
			this.props.hoverHander(this.props.num,false);
		},
		clickHander:function(){
			this.props.clickHander(this.props.num);
		},
		render:function(){
			if(this.props.disabled){
				return (
					<li className={this.props.itemClass}>
						<div className="ant-rate-star-content"></div>
					</li>
				);
			}else{
				return (
					<li className={this.props.itemClass} onMouseOver={this.over} onMouseOut={this.out} onClick={this.clickHander}>
						<div className="ant-rate-star-content"></div>
					</li>
				);
			}
		}
	});
    
    
    
	var Rate=React.createClass({
		getInitialState:function(){
			return {
				value:this.props.defaultValue,
				hoverValue:this.props.defaultValue
			}
		},
		getDefaultProps:function(){
			return {
				count:5,
				defaultValue:1,
				starText:true,
				disabled:false
			}
		},
		clickHander:function(num){
			this.setState({value:num});
			if(this.props.onChange){
				this.props.onChange(num);
			}
		},
		clearValue:function(){
			this.setState({value:0,hoverValue:0});
		},
		hoverHander:function(num,hover){
			if(hover){
				this.setState({hoverValue:num});
			}else{
				this.setState({hoverValue:this.state.value});
			}
		},
		render:function(){
			var nums=[];
			for(var i=1;i<this.props.count+1;i++){
				nums.push(i);
			}
			var lists=nums.map(function(key){
				if(this.state.hoverValue>=key){
					return (
						<RateItem itemClass="ant-rate-star ant-rate-star-full" key={key} clickHander={this.clickHander} hoverHander={this.hoverHander} num={key} disabled={this.props.disabled}/>
					);
				}else{
					return (
						<RateItem itemClass="ant-rate-star ant-rate-star-zero" key={key} clickHander={this.clickHander} hoverHander={this.hoverHander} num={key} disabled={this.props.disabled}/>
					);
				}
				
			}.bind(this));
			return (
				<div>
					<ul className="ant-rate ">
						<input type="hidden" value={this.state.value==0?"":this.state.value} name={this.props.name} />
						{lists}
					</ul>
					<span>{this.props.starText?this.state.value+"星":""}</span>
				</div>
			);
		}
	});
	

    module.exports=Rate;

});