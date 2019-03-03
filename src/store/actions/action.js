import actionsTypes from '../actions/types';
import firebase from '../../config/FirebaseConfig';


export const profileFetch = type => dispatch => {

    console.log("Fetching " + type);
    firebase.database().ref(`/Users/${type}`)
        .on('value', res => {
            const Obj = res.val();
            console.log("val: ", res.val());
            const profiles = [];
            for (let profile in Obj) {
                profiles.push(Obj[profile])
            }
            console.log(profiles)
            dispatch({ type: actionsTypes.FETCH_SUCCESS, payload: profiles });
        });

};

export const userAlreadySigned = (user, history) => {
    console.log("In userAlreadySigned()", history)
    const { uid, type, status } = user;
    let data = {};
    if (type === "Student")
        history.replace("/timeline/student");
    else
        history.replace("/timeline/company");
    return (dispatch) => {
        firebase.database().ref(`Users/${type}/${uid}`)
            .on("value", res => {
                if (res.val()) {
                    data = res.val()
                    dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload: { data, status } })
                }
            })
    }
}

export const appliedFetch = (applied, profiles) => {
    return (dispatch) => {
        console.log("In AppliedFetch")
        const appliedCompany = profiles.filter(profile => applied.find(element => element === profile.uuid))
        console.log("In action appliedCompany", appliedCompany)
        dispatch({ type: actionsTypes.APPLIED_COMPANY, payload: appliedCompany })
    }
}

export const updateUser = (data, history) => {
    console.log("In Update user")
    if (data.type === "Student") {
        data.initials = data.firstname[0] + data.lastname[0]
    }
    else {
        data.initials = data.company[0];
    }
    console.log(data);
    firebase.database().ref(`/Users/${data.type}/${data.uuid}`).set(data)
        .then(res => {
            console.log("success!")
        })
        .catch(err => {
            console.log(err);
        })
}

export const fetchAllUser = () => {
    return (dispatch) => {
        firebase.database().ref('/Users/Student')
            .on("value", res => {
                let students = []
                console.log("std changed", res.val())
                let studentObj = {}
                studentObj = res.val()
                for (let student in studentObj) {
                    students.push(studentObj[student])
                }
                firebase.database().ref('/Users/Company')
                    .on("value", res => {
                        let companies = []
                        console.log("cmp changed")
                        let companyObj = {}
                        companyObj = res.val()
                        for (let company in companyObj) {
                            companies.push(companyObj[company])
                        }
                        console.log("students:", students)
                        console.log("companies:", companies)
                        console.log("dispatching")
                        dispatch({ type: actionsTypes.FETCH_ALL_USERS, payload: { students: [...students], companies: [...companies] } })
                    })
            })
    }
}
export const applyCompany = (suid, cuid, applied, applicants) => {
    console.log(suid, cuid)
    return (dispatch, getState) => {
        firebase.database().ref(`/Users/Student/${suid}/applied`)
            .set(applied).then(() => {
                firebase.database().ref(`/Users/Company/${cuid}/applicants`)
                    .set(applicants).then(() => {
                        console.log("updated", getState())
                        console.log(applied)
                        dispatch({ type: actionsTypes.APPLIED_COMPANY, payload: applied })
                    })
            })
    }

}

export const createuser = (data, history, password) => {
    let status;
    let type=data.type;
    return (dispatch) => {
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
                        console.log("Insert data failed")
                        return dispatch({ type: actionsTypes.CREATE_USER_FAIL, payload: err.message })

                    });
            })
            .catch((err) => dispatch({ type: actionsTypes.LOGIN_FAIL, payload: err.message }));
    }
}

export const loginUser = (email, password, history) => {
    console.log(history);
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
                                console.log("Fetch Student Success: " + data.lastname)
                                console.log("Fetch Student Success: " + status)
                                status=2
                                const payload = { data, status }
                                console.log("payload", payload);
                                dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload })
                                type = "Student"
                                
                                console.log("navigating", history)
                                let user = { uid, status, type }
                                localStorage.setItem("user", JSON.stringify(user));
                                history.replace("/timeline/student");

                            }
                            else {
                                console.log("Data Not found in student db")
                                firebase.database().ref(`Users/Company/${uid}`)
                                    .on("value", res => {
                                        if (res.val()) {
                                            console.log("Fetch Company Success: " + res.val().company)
                                            data = res.val()
                                            status = 3
                                            type = "Company"
                                            dispatch({ type: actionsTypes.LOGIN_SUCCESS, payload: { data, status } })
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
                console.log("failed!! " + err);
                dispatch({ type: actionsTypes.LOGIN_FAIL, payload: err.message });
            });

    };
}
export const selectUser = (data) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: actionsTypes.SELECTED_PROFILE, payload: data })
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
        console.log(type, uid, blockStatus)
        firebase.database().ref(`/Users/${type}/${uid}/block`)
            .set(!blockStatus)
        // dispatch({type:actionsTypes.SET_BLOCK})
    }

}
