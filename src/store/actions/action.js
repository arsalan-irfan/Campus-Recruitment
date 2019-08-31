import actionsTypes from '../actions/types';
import firebase from '../../config/FirebaseConfig';

export const deleteJob = (currentJobs, uid, id) => {
    console.log("jobid=", id)
    console.log("uid=", uid)
    console.log("currentJobs=", currentJobs)
    console.log("In Action")
    let jobs = currentJobs.filter(job => {

        return job.jobid !== id;
    })
    console.log(jobs)

    firebase.database().ref(`/Users/Company/${uid}/jobs`)
        .set(jobs)
}
export const profileFetch = type => dispatch => {

    firebase.database().ref(`/Users/${type}`)
        .on('value', res => {
            const Obj = res.val();
            const profiles = [];
            for (let profile in Obj) {
                profiles.push(Obj[profile])
            }
            dispatch({ type: actionsTypes.FETCH_SUCCESS, payload: profiles });
        });

};

export const userAlreadySigned = (user, history) => {
    let flag = true
    const { uid, type, status } = user;
    let data = {};
    if (type === "Admin") {
        return (dispatch) => {
            dispatch({ type: actionsTypes.ADMIN_LOGIN, payload: status })
        }
    }
    else {
        if (type === "Student") {
            history.replace("/timeline/student");
            flag = false
        }
        else if (type === "Company") {
            history.replace("/timeline/company");
            flag = false
        }
        return (dispatch) => {
            firebase.database().ref(`Users/${type}/${uid}`)
                .on("value", res => {
                    if (res.val()) {
                        data = res.val()
                        let applied = []  
                        let applicants =[];
                        if (data.type === 'Student') {
                            if (data.applied) {
                                for (let company in data.applied) {
                                    console.log(company)
                                    applied.push(data.applied[company])
                                }
                            }
                        }
                        if (data.type === 'Company') {
                            if (data.applicants) {
                                for (let students in data.applicants) {
                                    console.log(students)
                                    applicants.push(data.applicants[students])
                                }
                            }
                        }
                        dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload: { data, status,applied,applicants } })
                    }
                })
        }
    }


}
export const applicantsFetch = (applicants, profiles) => {
    return (dispatch) => {
        const companyApplicants = profiles.filter(profile => applicants.find(element => element === profile.uuid))
        dispatch({ type: actionsTypes.APPLICANTS_COMPANY, payload: companyApplicants })
    }
}

export const appliedFetch = (applied, profiles) => {
    return (dispatch) => {
        const appliedCompany = profiles.filter(profile => applied.find(element => element === profile.uuid))
        dispatch({ type: actionsTypes.APPLIED_COMPANY, payload: appliedCompany })
    }
}

export const updateUser = (data, history) => {
    console.log(data)
    if (data.type === "Student") {
        data.initials = data.firstname[0] + data.lastname[0]
    }
    else {
        data.initials = data.company[0];
    }
    firebase.database().ref(`/Users/${data.type}/${data.uuid}`).set(data)

    alert("Profile Updated Succesfully");

}

export const fetchAllUser = () => {
    return (dispatch) => {
        firebase.database().ref('/Users/Student')
            .on("value", res => {
                let students = []
                let studentObj = {}
                studentObj = res.val()
                for (let student in studentObj) {
                    students.push(studentObj[student])
                }
                firebase.database().ref('/Users/Company')
                    .on("value", res => {
                        let companies = []
                        let companyObj = {}
                        companyObj = res.val()
                        for (let company in companyObj) {
                            companies.push(companyObj[company])
                        }
                        dispatch({ type: actionsTypes.FETCH_ALL_USERS, payload: { students: [...students], companies: [...companies] } })
                    })
            })
    }
}
export const applyCompany = (suid, cuid, applied, applicants) => {
    return (dispatch, getState) => {
        firebase.database().ref(`/Users/Student/${suid}/applied/`)
            .set(applied).then(() => {
                firebase.database().ref(`/Users/Company/${cuid}/applicants`)
                    .set(applicants).then(() => {
                        console.log(applicants)
                        dispatch({ type: actionsTypes.APPLIED_COMPANY, payload: applied })
                    })
            })
    }

}

export const createuser = (data, history, password) => {
    let status;
    let type = data.type;
    return (dispatch) => {
        dispatch({ type: actionsTypes.CREATE_USER })
        let url = "/timeline/student"
        firebase.auth().createUserWithEmailAndPassword(data.email, password)
            .then(() => {
                const { currentUser } = firebase.auth();
                const uid = currentUser.uid;
                if (data.type === "Student") {
                    data.initials = data.firstname[0] + data.lastname[0]
                    status = 2
                }
                else {
                    data.initials = data.company[0]
                    status = 3
                }
                data.uuid = uid
                let user = { uid, status, type }
                localStorage.setItem("user", JSON.stringify(user));

                firebase.database().ref(`/Users/${data.type}/${currentUser.uid}`)
                    .set(data)
                    .then(() => {
                        firebase.database().ref(`/Users/${data.type}/${currentUser.uid}`)
                            .on('value', res => {
                                let obj = res.val()
                                dispatch({ type: actionsTypes.CREATE_USER_SUCCESS, payload: { obj, status } })
                                if (data.type === "Company") {
                                    url = "/timeline/company"
                                }
                                history.replace(url);
                            })
                    })
                    .catch((err) => {
                        return dispatch({ type: actionsTypes.CREATE_USER_FAIL, payload: err.message })

                    });
            })
            .catch((err) => dispatch({ type: actionsTypes.CREATE_USER_FAIL, payload: err.message }));
    }
}

export const loginUser = (email, password, history) => {
    let data = {}
    let status;
    let type;
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({ type: actionsTypes.LOGIN })
                const { currentUser } = firebase.auth()
                let uid = currentUser.uid
                if (uid === "JD8IpLm9v7OPcfuZV3TCaNCzUHt1") {
                    status = 1
                    type = "Admin"
                    dispatch({ type: actionsTypes.ADMIN_LOGIN, payload: status })

                    let user = { uid, status, type }
                    localStorage.setItem("user", JSON.stringify(user));
                    history.replace('/timeline/admin')
                }

                else {
                    firebase.database().ref(`Users/Student/${uid}`)
                        .on("value", res => {
                            if (res.val()) {
                                data = res.val()
                                status = 2
                                let applied = []
                                let applicants=[]
                                if (data.applied) {
                                    // for (let company in data.applied) { 
                                    //     applied.push(data.appplied[company]);
                                    // }
                                    applied=data.applied
                                }
                                const payload = { data, status, applied,applicants }
                                dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload })
                                type = "Student"

                                let user = { uid, status, type }
                                localStorage.setItem("user", JSON.stringify(user));
                                history.replace("/timeline/student");

                            }
                            else {
                                let applied = []
                                let applicants=[]
                                firebase.database().ref(`Users/Company/${uid}`)
                                    .on("value", res => {
                                        if (res.val()) {
                                            data = res.val()
                                            status = 3
                                            type = "Company"
                                            if (data.applicants) {
                                                for (let students in data.applicants) {
                                                    console.log(students)
                                                    applicants.push(data.applicants[students])
                                                }
                                            }                
                                            dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload: { data, status,applied,applicants } })
                                            history.replace("/timeline/student");

                                            let user = { uid, status, type }
                                            localStorage.setItem("user", JSON.stringify(user));
                                        }
                                    })
                            }
                        })
                }

            })
            .catch(err => {
                dispatch({ type: actionsTypes.LOGIN_FAIL, payload: err.message });
            });

    };
}
export const selectUser = (data) => {
    return (dispatch) => {
        dispatch({ type: actionsTypes.SELECTED_PROFILE, payload: data })
    }
}
export const selectJob = (data) => {
    return (dispatch) => {
        dispatch({ type: actionsTypes.SELECTED_JOB, payload: data })
    }
}
export const signOut = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        dispatch({ type: actionsTypes.SIGN_OUT });
        localStorage.removeItem("user");
    };
}

export const setBlock = (type, uid, blockStatus) => {
    return (dispatch) => {
        firebase.database().ref(`/Users/${type}/${uid}/block`)
            .set(!blockStatus)
        // dispatch({type:actionsTypes.SET_BLOCK})
    }

}
export const onJobPost = (data) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        const uid = currentUser.uid;
        firebase.database().ref(`/Users/Company/${uid}/jobs/${data.jobid}`)
            .set(data)

    }
}