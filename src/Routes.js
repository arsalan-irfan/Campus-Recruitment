import React from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import Signin from './AuthScreen/Login/Login'
import SignupStudent from './AuthScreen/Signup/Student/Signup'
import SignupCompany from './AuthScreen/Signup/Company/Signup'
import StudentTimeline from './screens/TimeLine/Student'
import CompanyTimeline from './screens/TimeLine/Company'
import StudentProfile from './screens/Profiles/Student/OwnProfile'
import StudentView from './screens/Profiles/Student/ProfileView'
import CompanyProfile from './screens/Profiles/Company/OwnProfile'
import CompanyView from './screens/Profiles/Company/ProfileView'
import AdminTimeline from './screens/TimeLine/Admin/Admin'
import AllStudents from './screens/TimeLine/Admin/Student/AllStudent'
import BlockedStudents from './screens/TimeLine/Admin/Student/BlockStudent'
import UnblockStudents from './screens/TimeLine/Admin/Student/UnblockStudents'
import AllCompany from './screens/TimeLine/Admin/Company/AllCompany'
import BlockedCompany from './screens/TimeLine/Admin/Company/BlockCompany'
import UnblockCompany from './screens/TimeLine/Admin/Company/UnblockCompany'
import AppliedCompany from './screens/Applied/Applied'


const getRoutes = status => {

    let routes = (
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup/student" exact component={SignupStudent} />
        <Route path="/signup/company" exact component={SignupCompany} />
        <Redirect to="/signin" />
      </Switch>
    );
      console.log("stattus",status)
    // routes for admin
    if (status === 1) {
      routes = (
        <Switch>
           <Route exact path="/timeline/admin" component={AdminTimeline} />
           <Route exact path="/timeline/admin/allStudent" component={AllStudents} />
           <Route exact path="/timeline/admin/blockStudent" component={BlockedStudents} />
           <Route exact path="/timeline/admin/unblockStudent" component={UnblockStudents} />
           <Route exact path="/timeline/admin/allCompany" component={AllCompany} />
           <Route exact path="/timeline/admin/blockCompany" component={BlockedCompany} />
           <Route exact path="/timeline/admin/unblockCompany" component={UnblockCompany} />
           <Route path="/student/company/profile/:id" component={CompanyView} />
           <Route path="/company/student/profile/:id" component={StudentView} />
           <Redirect to="/timeline/admin" />            
        </Switch>
      );
    }
  
    // routes for students
    if (status === 2) {
      console.log("status", status);
      routes = (
        <Switch>
          <Route path="/timeline/student" exact component={StudentTimeline} />
          <Route path="/student/profile" exact component={StudentProfile} />          
          <Route path="/student/applied" exact component={AppliedCompany} />
          <Route path="/student/company/profile/:id" component={CompanyView} />
          <Redirect to="/timeline/student" />
        </Switch>
      );
    }
  
    // routes for companies
    else if (status === 3) {
      routes = (
        <Switch>
          <Route path="/timeline/company" exact component={CompanyTimeline} />
          <Route path="/company/profile" exact component={CompanyProfile} />          
          {/* <Route path="/company/applicants" exact components={Applicants}/>
          <Route path="/company/applicants/accepted" exact components={AcceptedApplicants} /> */}
          <Route path="/company/student/profile/:id" component={StudentView} />
          <Redirect to="/timeline/company" />
        </Switch>
      );
    }
  
  
    return routes;
  };
  
  export default getRoutes;