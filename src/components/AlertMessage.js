import React,{Component} from 'react';
import {Alert} from 'react-bootstrap';

import './AlertMessage.css';

class AlertMessage extends Component
{
	constructor(props)
	{
		super(props);
		this.state=
		{
			message:undefined
		}
	}

	componentDidMount=()=>
	{
		console.log("componentDidMount");
		this.setState(
		{
			message:this.props.message
		});
	}

	componentWillUpdate=(nextProps,nextState)=>
	{
		if(nextProps.message!==nextState.message)
		{
			this.setState(
			{
				message:this.props.message
			});
		}
	}

	render=()=>
	{
		const {message}=this.state;
		return(
			<Alert variant="danger">
				<span className="alert_message">{message}</span>
			</Alert>
		);
	}
}

export default AlertMessage;