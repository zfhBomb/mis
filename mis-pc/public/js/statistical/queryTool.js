var React=require("react");
var QueryForm=require("../common/queryForm.js");
//import { Input, Button } from 'antd';


var QueryTool=React.createClass({
	
	render:function(){
		return (
			<div className="pageBox__queryTool">
				<div className="queryTool__title">查询条件:</div>
                    <QueryForm queryItems={
                        [
                            {
                            	name:'dateTool',type:'dateTool',size:"small",label:"统计时间段",style:{width:110+"px"}
                            }
                        ]
                    } getValue={this.props.getValue}>
                    </QueryForm>
                </div>
		);
	}
});


module.exports = QueryTool