import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../../../../components/Card/Admin/StudentCard'
import Navbar from '../../../../components/Navbar/AdminNav'
import './style.css'
class UnblockStudents extends Component {
    render() {
        const students = this.props.students.map((student,index) => {
            if (!student.block) {
                return <Card user={student} key={index}/>
              }
              else return null
            })
        
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div className="heading">
                            <h3 className="text-center">Blocked Students</h3>
                        </div>
                        <div className="card-container">
                            {students}
                        </div>

                    </div>
                    <div className="col-2">

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

export default connect(mapStateToProps)(UnblockStudents)