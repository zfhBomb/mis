import React from "react";
import QueryForm from "../common/queryForm.js";
import { Input, Button } from 'antd';

var QueryTool=React.createClass({
	
	render:function(){
		return (
			<div>
                    <QueryForm queryItems={
                        [
                            {type:'text',addonBefore:'学生名称',name:'name',width:"200px"},
                            {
                                name:'propress',label:'进度',type:'checkbox',
                                options:[
											  { label: '苹果', value: 'Apple' },
											  { label: '梨', value: 'Pear' },
											  { label: '橘', value: 'Orange' },
										]
                            },
                            {
                                name:'progress1',label:'进度',type:'radio',
                                datas:[
                                	{info:"aaaa",val:1},
                                	{info:"bbbb",val:2},
                                	{info:"cccc",val:3}
                                ]
                            },
                            {
                                name:'date',label:'选择时间',type:'date'
                            },
                            {
                                name:'sex',type:'select',size:"large",style:{width:200+"px"},
                                datas:[
                                	{info:"aaaa",val:"1"},
                                	{info:"bbbb",val:"2"},
                                	{info:"cccc",val:"3"}
                                ]
                            },
                            {
                                name:'work',type:'select'
                            },
                            {
                            	name:'dateTool',type:'dateTool'
                            }
                        ]
                    }>
                    </QueryForm>
                </div>
		);
	}
});


export default QueryTool