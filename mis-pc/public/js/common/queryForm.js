var React=require("react");
//import { Input, Checkbox,Cascader,DatePicker,Radio,Select,Button,TimePicker,Form } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Checkbox=require("antd/lib/checkbox");
var Cascader=require("antd/lib/cascader");
var DatePicker=require("antd/lib/date-picker");
var Select=require("antd/lib/select");
var Radio=require("antd/lib/radio");
var TimePicker=require("antd/lib/time-picker");
var DateTool=require("./dateTool.js");
var CheckboxGroup = Checkbox.Group;
var RadioGroup = Radio.Group;
var Option = Select.Option;
var createForm = Form.create;
var FormItem = Form.Item;


var QueryForm=React.createClass({
	getInitialState:function(){
		return {
			formData:[]
		}
	},
	submitHandler:function(e){
		this.props.form.validateFields((errors, values) => {
		      if (!!errors) {
		        console.log('Errors in form!!!');
		        return;
		      }
		      this.props.getValue(values);
		    });
	},
	handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	    if(this.refs.dateTool){
	    	this.refs.dateTool.clearDateVal();
	    } 
	},
	render:function(){
		var getFieldProps = this.props.form.getFieldProps;
		var lists=this.props.queryItems.map((list,key)=>{
			return (
				<QueryItem {...list} key={key} getFieldProps={getFieldProps} ref={list.name}/>
			);
		});
		return (
			<Form inline>
				{lists}
					<FormItem>
		        	<Button type="primary" size="small" onClick={this.submitHandler}>查询</Button>
		        	&nbsp;&nbsp;&nbsp;
		        	<Button type="primary" size="small" onClick={this.handleReset}>重置</Button>
		        	</FormItem>
			</Form>
		);
	}
});


var QueryItem = React.createClass({
		getInitialState:function(){
			return {
				dateVal:{startValue:"",endValue:""}
			}
		},
		dateToolVal:function(val){
			this.setState({dateVal:val});
		},
		clearDateVal:function(){
			if(this.refs.twoTime){
				this.setState({dateVal:{startValue:"",endValue:""}});
				this.refs.twoTime.setState({startValue:"",endValue:""});
			}
			
		},
        rendItem: function () {
        	if(!this.props.datas){
        		var lists=""
        	}
            switch (this.props.type) {
                case 'text':
                    return <Input {...this.props} {...this.props.getFieldProps(this.props.name)}/>
                case 'select':
                	if(this.props.datas){
                		lists=this.props.datas.map((list,key)=>{
	                		return (
	                			<Option value={list.val} key={key}>
	                				{list.info}
	                			</Option>
	                		);
	                	});
                	}
                    return (
                    	<Select {...this.props} {...this.props.getFieldProps(this.props.name)}>
                    		{lists}
                    	</Select>
                    );
                    
                case 'dateTool':
                    return <div>
                    	<DateTool {...this.props} handleChange={this.dateToolVal} ref="twoTime"/>
                    	<Input type="hidden" {...this.props.getFieldProps(this.props.name, { initialValue: this.state.dateVal})} />
                    </div>
                 case 'date':
                    return <DatePicker {...this.props} {...this.props.getFieldProps(this.props.name)}/>
                case 'radio':
                	if(this.props.datas){
                		lists=this.props.datas.map((list,key)=>{
	                		return (
	                			<Radio value={list.val} key={key} >
	                				{list.info}
	                			</Radio>
	                		);
	                	});
                	}
                    return (<RadioGroup {...this.props} {...this.props.getFieldProps(this.props.name)}>
                    			{lists}
                    		</RadioGroup>
                    );
                case 'checkbox':
                    return <CheckboxGroup {...this.props} {...this.props.getFieldProps(this.props.name)}/>;
                case 'selectTool':
                    return <Cascader {...this.props} {...this.props.getFieldProps(this.props.name)}/>
                case 'time':
                    return <TimePicker {...this.props} {...this.props.getFieldProps(this.props.name)}/>
                default:
                    return <Input {...this.props} {...this.props.getFieldProps(this.props.name)}/>
            }
        },
        render: function(){
            var label, item
            item = this.rendItem();
            return (
            	<FormItem
		        label={this.props.label}
		        >
			        {this.props.children}
                    {item}
		        </FormItem>
            );
        }
    });
    
QueryForm = createForm()(QueryForm);
module.exports = QueryForm