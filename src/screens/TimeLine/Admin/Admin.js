import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllUser } from '../../../store/actions/action';
import Spinner from '../../../components/Spinner/Spinner'
import Students from './Student/AllStudent'
class Admin extends Component {
    componentDidMount(){
        this.props.fetchAllUser() 
        console.log("After Fetch ",this.props.companies)
    }
    render() {
        let display=null
        if(this.props.loading){
            display=<Spinner />
        }
        else{
            display=<Students />;
        }
        return (
            <div>
                {display}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { students, companies,loading } = state
    return { students, companies,loading }
}

export default connect(mapStateToProps, {fetchAllUser})(Admin) 