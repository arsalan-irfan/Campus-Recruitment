import React from 'react'
import { signOut } from '../../store/actions/action';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const AdminNav = (props) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top justify-content-between">
            <span class="navbar-brand">Campus Recruitment</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="all" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            All
                            </a>
                        <div class="dropdown-menu" aria-labelledby="all">
                            <Link class="dropdown-item" to="/timeline/admin/allStudent">Student</Link>
                            <Link class="dropdown-item" to="/timeline/admin/allCompany">Company</Link>
                        </div>
                    </li><li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="unblock" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Unblock
                            </a>
                        <div class="dropdown-menu" aria-labelledby="unblock">
                            <Link class="dropdown-item" to="/timeline/admin/unblockStudent">Student</Link>
                            <Link class="dropdown-item" to="/timeline/admin/unblockCompany">Company</Link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Blocked
                            </a>
                        <div class="dropdown-menu" aria-labelledby="block">
                            <Link class="dropdown-item" to="/timeline/admin/blockStudent">Student</Link>
                            <Link class="dropdown-item" to="/timeline/admin/blockCompany">Company</Link>
                        </div>
                    </li>
                </ul>
                <div className="nav-item">
                    <span style={{fontWeight:"bold", marginRight: 10,}}>Admin</span>
                </div>

                <button className="btn btn-warning my-2 my-sm-0"
                    onClick={() => { props.signOut() }}>
                    Logout</button>
            </div>
        </nav>
    )
}
export default connect(null, { signOut })(AdminNav);