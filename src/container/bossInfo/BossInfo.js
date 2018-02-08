import React, { Component } from 'react'
import {NavBar,InputItem,TextareaItem,WingBlank,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import AvatarSelector from '../../components/avatarSelector/AvatarSelector'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/reducers/user'

@connect(
    state=>state.user,
    {update},
)
export default class BossInfo extends Component {

    state = {
        title:'',
        company:'',
        payroll:'',
        desc:'',
    }
    handleChange = (key,value) =>{
        this.setState({
            [key]:value
        })
    }
    selectAvatar=(imgName)=>{
        this.setState({
            avatar:imgName,
        })
    }
    render(){
        const {pathname} = this.props.location
        const redirect = this.props.redirectTo
        return(
            <div>
                 {redirect&&redirect!==pathname?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar
                    mode='dark'
                    style={{height:'50px'}}
                >
                完善信息
                </NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}/>
                <WingBlank>
                    <InputItem onChange={(value)=>{this.handleChange('title',value)}}>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={(value)=>{this.handleChange('company',value)}}>
                        公司名称
                    </InputItem>
                    <InputItem onChange={(value)=>{this.handleChange('payroll',value)}}>
                        职位薪资
                    </InputItem>
                    <TextareaItem 
                        onChange={(value)=>{this.handleChange('desc',value)}}
                        rows={3}
                        autoHeight
                        title='职位要求'
                        >
                        职位要求
                    </TextareaItem>
                    <Button 
                        type='primary'
                        onClick={
                            ()=>{
                                this.props.update(this.state)
                            }
                        }
                    >保存</Button>
                </WingBlank>
            </div>
        )
    }
}