
import { Input, Checkbox,Cascader,DatePicker,Radio,Select, } from 'antd';

    module.exports={
        rendItem: function (className) {
        	console.log(this.props);
            switch (this.props.type) {
                case 'text':
                    return <Input className={className} ref={this.props.name}/>
                case 'select':
                    return <Select  ref={this.props.name}/>
                case 'date':
                    return <DatePicker  ref={this.props.name}/>;
                case 'radio':
                    return <Radio  ref={this.props.name}/>;
                case 'checkbox':
                    return <Checkbox  ref={this.props.name}/>;
                case 'selectTool':
                    return <Cascader  ref={this.props.name}/>
                default:
                    return <Input  ref={this.props.name}/>
            }
        }
    }
