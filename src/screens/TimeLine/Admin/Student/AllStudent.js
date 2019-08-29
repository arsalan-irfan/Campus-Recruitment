import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../../../../components/Card/Admin/StudentCard'
import Navbar from '../../../../components/Navbar/AdminNav'
import './style.css'
class AllStudent extends Component {
    render() {
        console.log("Hello"+this.props.students)
        const students = this.props.students.map(student => {
            return <Card user={student} />
        })
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-10">
                        <div className="heading">
                            <h3 className="text-center">All Students</h3>
                        </div>
                        <div className="card-container">
                            {students}
                        </div>

                    </div>
                    <div className="col-1">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { students } = state;
    return { students }
}

export default connect(mapStateToProps)(AllStudent)