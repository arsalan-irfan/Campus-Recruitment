import actionsTypes from '../actions/types';

const initialState = {
    profiles: [],
    currentUser: {},
    error: "",
    status: 0,
    selectedProfile: {},
    students: [],
    companies: [],
    appliedCompany: [],
    companyApplicants: [],
    loading: false,
    selectedJob:{}
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.CREATE_USER:
            return {
                ...state,
                loading: true
            }
        case actionsTypes.APPLICANTS_COMPANY:
            console.log("payload", action.payload)
            return {
                ...state,
                companyApplicants: action.payload
            }
        case actionsTypes.APPLIED_COMPANY:
            console.log("payload", action.payload)
            return {
                ...state,
                appliedCompany: action.payload
            }
        case actionsTypes.LOGIN:
            return {
                ...state,
                loading: true
            }
        case actionsTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.obj,
                status: action.payload.status,
                loading: false
            }
        case actionsTypes.FETCH_ALL_USERS:

            console.log(action.payload)
            console.log(action.payload.students[0])
            return {
                ...state,
                students: action.payload.students,
                companies: action.payload.companies,
                loading: false,
            }
        case actionsTypes.ADMIN_LOGIN:
            return {
                ...state,
                loading: true,
                status: action.payload
            }

        case actionsTypes.FETCH_SUCCESS:
            return {
                ...state,
                profiles: action.payload
            }


        case actionsTypes.LOGIN_SUCCESS:
            const { data, status,applied,applicants } = action.payload
            console.log(status);
            return {
                ...state,
                currentUser: data,
                status,
                appliedCompany:applied,
                companyApplicants:applicants,
                loading: false
            }


        case actionsTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case actionsTypes.CREATE_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case actionsTypes.SELECTED_PROFILE:
            return {
                ...state,
                selectedProfile: action.payload
            }
        case actionsTypes.SELECTED_JOB:
            return {
                ...state,
                selectedJob: action.payload
            }

        case actionsTypes.SIGN_OUT:
            return {
                ...state,
                ...initialState
            }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;