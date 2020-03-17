import React, { Component } from 'react';
import "../css/Login.css";

class Login extends Component {
    render() {
        return (
            <div className="login">
                <h1>DXC Beacon Login</h1>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" name="password" />
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Login;