import React from 'react';
import { Row, Divider ,Col, Table, Input, Button } from 'antd';
import './employee.less'
import Add from './employeeAdd'


const tableData =[
  {
    id:'1',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
  
  },{
    id:'2',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
   
  },{
    id:'3',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
    
  },{
    id:'4',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
   
  },{
    id:'5',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
    
  },{
    id:'6',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
   
  },{
    id:'7',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
    
  },{
    id:'8',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
   
  },{
    id:'9',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
   
  },{
    id:'10',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
   
  },{
    id:'11',
    name:'lidy',
    tel:'25',
    email:'lidongyan_cn@163.com',
   
  },{
    id:'12',
    name:'yyt',
    tel:'25',
    email:'yyt@163.com',
    
  }
]

export default class Employee extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    visible:false, 
    isModify:false,
    sonDate:{
      name:'',
      tel:'',
      email:''
    }
  }
  // 点击修改员工的信息
  fixUpForm = (text)=>{
    // console.log('123')
    const {name,tel,email} =text;
    console.log();
    console.log(text);
    this.setState({
      visible:true,
      isModify:true,
      sonDate:{
        name,
        tel,
        email
      }
    })
    //好像和vue的refs差距很大
    // this.refs['employeeAdd'].init('123');
    // console.log(this.refs['employeeAdd'])
  }
  // 关闭弹出框
  visibleChange =()=>{
    this.setState({
      visible:false,
    })
  }
  // 点击增加员工按钮
  addForm = (e)=>{
    // this.state.visible = true;
    console.log('增加按钮被触发')
    this.setState({
      visible:true,
      isModify:false,
    })
  } 
  render() {
    const columns=[
      {
        title:'ID',       //当前显示的名字
        key:'id',         //
        dataIndex:'id',    //
      },
      {
        title:'姓名',       //当前显示的名字
        key:'name',         //
        dataIndex:'name',    //
      },{
        title:'联系方式',       //当前显示的名字
        key:'tel',         //
        dataIndex:"tel",    //
      },{
        title:'邮箱',       //当前显示的名字
        key:'email',         //
        dataIndex:'email',    //
      },{
        title:'操作',       //当前显示的名字
        render :(text) =>{
          return  <span>
          <Button type="primary" onClick={ () => { this.fixUpForm(text) }} > 修改</Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => {}} > 详情</Button>
          <Divider type="vertical" />
          <Button type="primary" onClick ={() => {}}> 删除</Button>
          </span>
        }
      },
    ]
    const {visible ,isModify} =this.state;
    return (
      <div>
        <div>
          <Row>
            <Col span={18}><Button type="primary" onClick={this.addForm}>添加员工</Button></Col>
            <Col span={6}>
              <Input className="w200" placeholder="请输入姓名" />

              <Button type="primary" > 查询</Button>
            </Col>
          </Row>
        </div>
        <div>
          <Table 
            bordered
            rowKey = {record => record.id}
            columns= {columns}
            dataSource ={tableData}
          />
        </div>
        <Add 
          ref='employeeAdd' 
          visible={visible}
          isModify ={isModify} 
          fatherDate = {sonDate}
          visibleChange ={this.visibleChange}
          />
      </div>
      
    )
  }
}