import React, { Component } from 'react';
import './App.css';
import Indicator from './activityIndicator';
import { logginFetch } from './redux/actions/logginActions';
import { profileAdmin, profileSuccess } from './redux/actions/adminActions';
import { connect } from "react-redux"
import { ThemeProvider } from '@material-ui/styles';


class Login extends Component {

    state = {
        username: "",
        password: "",
        requsting: false,
        error: false

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ requsting: !this.state.requsting })
        this.props.logginFetch(this.state).then(data => {

            this.setState({ username: "", password: "" });

            localStorage.setItem("token", data.token)
            this.props.profileAdmin(localStorage.token).then(admin => {
                this.setState({ requsting: this.props.admin.requesting })
                if (this.props.admin.username !== 'undefined') {
                    this.props.profileSuccess(admin)
                    this.setState({ requsting: this.props.admin.requesting })
                    this.props.history.push('/profile')
                }
                else {
                    this.setState({ error: !this.state.error })
                }

            })


        })
        console.log(this.props.admin.username)
        // localStorage.token !== "undefined" ? this.props.history.push('/profile') : this.props.history.push('/') 
    }



    render() {
        // console.log(this.props)
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>Username: </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />

                    <label>Password: </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <input type="submit" />
                    {this.state.error ? <p style={{ color: "red", fontSize: "XX-large" }}>You have entered a wrong username or password</p> : <></>}
                    {this.state.requsting && !this.state.error ? <Indicator /> : <></>}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
        loggin: state.loggin
    }
}
export default connect(mapStateToProps, { logginFetch, profileAdmin, profileSuccess })(Login)