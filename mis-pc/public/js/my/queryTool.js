import React from "react";
import QueryForm from "../common/queryForm.js";
import { Input, Button } from 'antd';

var QueryTool=React.createClass({
	render:function(){
		return (
			<div className="pageBox__queryTool">
				<div className="queryTool__title">查询条件:</div>
                    <QueryForm queryItems={
                        [
                        	{
                                name:'leiXin',type:'select',size:"small",style:{width:100+"px"},label:"缺陷类型",
                                datas:[
                                	{info:"无",val:""},
                                	{info:"一类",val:"一类缺陷"},
                                	{info:"二类",val:"二类缺陷"},
                                	{info:"三类",val:"三类缺陷"}
                                ]
                            },
                            {
                                name:'zhuanYe',type:'select',size:"small",style:{width:100+"px"},label:"消缺专业",
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
                                name:'yiJian',type:'select',size:"small",style:{width:130+"px"},label:"处理意见",
                                datas:[
                                	{info:"无",val:""},
                                	{info:"正在处理",val:"正在处理"},
                                	{info:"没有备品",val:"没有备品"},
                                	{info:"停机处理",val:"停机处理"},
                                	{info:"大小修处理",val:"大小修处理"},
                                	{info:"运行退回",val:"运行退回"},
                                	{info:"转专业",val:"转专业"},
                                	{info:"无此缺陷",val:"无此缺陷"},
                                	{info:"等待验收",val:"等待验收"}
                                ]
                            },
                            {
                            	name:'dateTool',type:'dateTool',size:"small",label:"缺陷时间",style:{width:110+"px"}
                            },
                            {type:'text',label:"内容模糊查询",name:'fuzzy',style:{width:150+"px",display:"inline-block"},size:"small"},
                        ]
                    } getValue={this.props.getValue} getValue={this.props.getValue}>
                    </QueryForm>
                </div>
		);
	}
});


export default QueryTool