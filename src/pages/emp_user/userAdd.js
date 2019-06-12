import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
const {Fragment} =React;
const FormItem = Form.Item;
class UserAdd extends React.Component {
  constructor(props){
    super(props)
  }
  state ={
    loading :false,
  }
  handleResetClick =()=>{
    console.log('清空表单');
    this.props.form.resetFields();
  }
  handleCancle =() =>{
    this.props.visibleChange();
    console.log('关闭页')
    this.handleResetClick();
  }
  handleOk =() =>{
    this.setState({ loading: true });
    this.props.sendSonDate(this.props.form.getFieldsValue(),this.props.isModify);
    // console.log('向父级发送数据',this.props.form.getFieldsValue(),this.props.isModify)
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      this.props.visibleChange();
    }, 3000)
  }
  render(){
    const {loading} = this.state
    const {getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <Modal
          visible ={this.props.visible}
          title = {this.props.isModify?'修改用户信息':'增加员工信息'}
          onOk ={this.handleOk}
          onCancel ={this.handleCancle}
          footer= {[
            <Button key ="back" onClick ={this.handleResetClick}>重置</Button>,
            <Button key ="submit" type= "primary" loading={loading}  onClick ={this.handleOk}>提交</Button>,
          ]}
        >

        <Form>
          <FormItem>
            {getFieldDecorator('userName',{
              rules:[{validator: this.checkUsername }]
            })(
              <Input readOnly = {this.props.isReadOnly} placeholder ="用户名" />
            )}
          </FormItem>
          
          <FormItem>
            {getFieldDecorator('userTel',{
              rules:[{validator: this.checkTel }]
            })(
              <Input readOnly = {this.props.isReadOnly} placeholder ="电话方式"/>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('userEmail',{
              rules:[{validator: this.checkEmail }]
            })(
              <Input readOnly = {this.props.isReadOnly} placeholder ="通讯邮件"/>
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('userAvatar',{
              rules:[{validator: this.checkAvatar }]
            })(
              <Input readOnly = {this.props.isReadOnly} placeholder ="img"/>
            )}
          </FormItem>

        </Form>
        </Modal>
      </Fragment>
    )
  }

} 
UserAdd = Form.create({
  mapPropsToFields:(props) =>{
    if(props.isModify){
      return {

      }
    }else{
      return false
    }
  },
  onValuesChange: (props,changeValue,allValue) =>{
    console.log('changeValue is ',changeValue)
  }
})(UserAdd)
export default UserAdd;