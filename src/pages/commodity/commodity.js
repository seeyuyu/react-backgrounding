import React from 'react'
import {Card,Table} from 'antd'
import Footer from '../../components/Footer'
import Utils from './../../utils/utils'
export default class Commodity extends React.Component{
  state = {current:1}
  componentDidMount(){

  }
  request =(params) =>{
    let _this = this;
    axios.ajax({
      url:'/commodity',
      method:'POST',
      data:params
    }).then( res => {
      console.log(res);
    }).catch( err => {
      console.log(err);
    })
  }
  render(){
    const columns = [{
      title:'商品ID',
      key:'id',
      dataIndex:'id'
    },
    {
      title:'商品名字',
      key:'name',
      dataIndex:'name'
    },
    {
      title:'商品数量',
      key:'mount',
      dataIndex:'mount'
    }]

    const data =[{
      key:'1',
      id:'1',
      name:'苹果',
      mount:12
    },{
      key:'2',
      id:'2',
      name:'香蕉',
      mount:12
    },{
      key:'3',
      id:'3',
      name:'西红柿',
      mount:12
    },
    {
      key:'4',
      id:'4',
      name:'花椰菜',
      mount:12
    },{
      key:'5',
      id:'5',
      name:'榴莲',
      mount:12
    },{
      key:'6',
      id:'6',
      name:'菠菜',
      mount:12
    }] 
    let pageConfig ={
      current:this.state.current,
      pageSize:3,
      defaultCurrent:1,
      onchange:(page,pageSize)=>{
        console.log(page)
        console.log(pageSize)
        this.setState({
          current: page,
        });
      }
    }
    return(
      <div>
        <Card title='表格'>
          <Table
            bordered
            columns={columns} 
            dataSource={data}
            pagination = {false}
          />
        </Card>
        <Footer/>
      </div>
    )
  }
}