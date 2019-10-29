import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { profileAdmin, profileSuccess } from './redux/actions/adminActions';
import Indicator from './activityIndicator';

class Profile extends Component {


  


    logout = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h1>You have Reached the profile page {this.props.admin.username}</h1>
                <button onClick={this.logout}>Log out</button>
                {this.props.admin.requsting ? <Indicator /> : <></>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        admin: state.admin.admin
    }
}
export default connect(mapStateToProps, null)(Profile)