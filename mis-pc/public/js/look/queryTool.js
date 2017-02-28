var React=require("react");
var QueryForm=require("../common/queryForm.js");
//import { Input, Button } from 'antd';
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");


var QueryTool=React.createClass({
	render:function(){
		return (
			<div className="pageBox__queryTool">
				<div className="queryTool__title">查询条件:</div>
                    <QueryForm queryItems={
                        [
                        	{
                                name:'leiXin',type:'select',size:"small",style:{width:80+"px"},label:"缺陷类型",
                                datas:[
                                	{info:"无",val:""},
                                	{info:"一类",val:"一类缺陷"},
                                	{info:"二类",val:"二类缺陷"},
                                	{info:"三类",val:"三类缺陷"},
                                	{info:"其他",val:"其他"}
                                ]
                            },
                            {
                                name:'zhuanYe',type:'select',size:"small",style:{width:100+"px"},label:"所属专业",
                                datas:[
                                	{info:"无",val:""},
                                	{info:"汽机专业",val:"汽机专业"},
                                	{info:"锅炉专业",val:"锅炉专业"},
                                	{info:"电气专业",val:"电气专业"},
                                	{info:"化学专业",val:"化学专业"},
                                	{info:"热控专业",val:"热控专业"}
                                ]
                            },
                            {
                                name:'yiJian',type:'select',size:"small",style:{minWidth:130+"px"},label:"处理意见",multiple:true,
                                datas:[
                                	{info:"正在处理",val:"正在处理"},
                                	{info:"没有备品",val:"没有备品"},
                                	{info:"停机处理",val:"停机处理"},
                                	{info:"大小修处理",val:"大小修处理"},
                                	{info:"运行退回",val:"运行退回"},
                                	{info:"等待值长确认",val:"等待值长确认"},
                                	{info:"值长确认",val:"值长确认"},
                                	{info:"此票作废",val:"此票作废"},
                                	{info:"缺陷闭环",val:"缺陷闭环"},
                                	{info:"请求挂起",val:"请求挂起"},
                                	{info:"挂起退回",val:"挂起退回"},
                                	{info:"等待验收",val:"等待验收"}
                                ]
                            },
                            {
                            	name:'dateTool',type:'dateTool',size:"small",label:"缺陷时间",style:{width:110+"px"}
                            },
                           {type:'text',label:"内容模糊查询",name:'fuzzy',style:{width:130+"px",display:"inline-block"},size:"small"},
                        ]
                    } getValue={this.props.getValue}>
                    </QueryForm>
                </div>
		);
	}
});


module.exports = QueryTool