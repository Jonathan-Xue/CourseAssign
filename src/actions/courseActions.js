import { GET_COURSE_REQUEST, GET_COURSE_SUCCESS, GET_COURSE_FAILED, POST_COURSE_REQUEST, POST_COURSE_SUCCESS, POST_COURSE_FAILED, PUT_COURSE_REQUEST, PUT_COURSE_SUCCESS, PUT_COURSE_FAILED, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS, DELETE_COURSE_FAILED } from '../constants/actionTypes';
import { config } from '../constants/config';
import axios from 'axios';

// Actions
const getCourseRequest = () => {
    return {
        type: GET_COURSE_REQUEST,
    }
}

const getCourseSuccess = (res) => {
    return {
        type: GET_COURSE_SUCCESS,
        payload: res,
    }
}

const getCourseFailed = (err) => {
    return {
        type: GET_COURSE_FAILED,
        payload: err,
    }
}

const postCourseRequest = () => {
    return {
        type: POST_COURSE_REQUEST,
    }
}

const postCourseSuccess = (res) => {
    return {
        type: POST_COURSE_SUCCESS,
        payload: res,
    }
}

const postCourseFailed = (err) => {
    return {
        type: POST_COURSE_FAILED,
        payload: err,
    }
}

const putCourseRequest = () => {
    return {
        type: PUT_COURSE_REQUEST,
    }
}

const putCourseSuccess = (res) => {
    return {
        type: PUT_COURSE_SUCCESS,
        payload: res,
    }
}

const putCourseFailed = (err) => {
    return {
        type: PUT_COURSE_FAILED,
        payload: err,
    }
}

const deleteCourseRequest = () => {
    return {
        type: DELETE_COURSE_REQUEST,
    }
}

const deleteCourseSuccess = (res) => {
    return {
        type: DELETE_COURSE_SUCCESS,
        payload: res,
    }
}

const deleteCourseFailed = (err) => {
    return {
        type: DELETE_COURSE_FAILED,
        payload: err,
    }
}


// Thunk
// GET: '/courses'
export const getCourses = () => dispatch => new Promise((resolve, reject) => {
	dispatch(getCourseRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		config.API_URL + '/courses', 
		body
	).then(res => {
		dispatch(getCourseSuccess(res.data.data));
		resolve(res.data.data);
	}).catch(err => {
		dispatch(getCourseFailed(err));
		reject(err);
	});
})


// POST: '/courses'
export const createCourse = (courseNo, courseName, courseDesc) => dispatch => new Promise((resolve, reject) => {
	dispatch(postCourseRequest());

	let body = {
		courseNo: courseNo,
		courseName: courseName,
		courseDesc: courseDesc,
		crossDomain: true
	}

	axios.post(
		config.API_URL + '/courses', 
		body
	).then(res => {
		dispatch(postCourseSuccess(res));
		resolve(res);
	}).catch(err => {
		dispatch(postCourseFailed(err));
		reject(err);
	});
});

// PUT: '/courses/:courseNo/:courseName'
export const updateCourse = (courseNo, courseName, courseDesc) => dispatch => new Promise((resolve, reject) => {
	dispatch(putCourseRequest());
	
	let body = {
		courseDesc: courseDesc,
		crossDomain: true
	}

	axios.put(
		config.API_URL + '/courses/' + courseNo + '/' + courseName, 
		body
	).then(res => {
		dispatch(putCourseSuccess(res));
		resolve(res);
	}).catch(err => {
		dispatch(putCourseFailed(err));
		reject(err);
	});
});

// DELETE: '/courses/:courseNo/:courseName'
export const deleteCourse = (courseNo, courseName) => dispatch => new Promise((resolve, reject) => {
	dispatch(deleteCourseRequest());

	let body = {
		crossDomain: true
	}

	axios.delete(
		config.API_URL + '/courses/' + courseNo + '/' + courseName, 
		body
	).then(res => {
		dispatch(deleteCourseSuccess(res));
		resolve(res);
	}).catch(err => {
		dispatch(deleteCourseFailed(err));
		reject(err);
	});
});