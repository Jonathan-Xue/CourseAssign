import React from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import './Modal.scss';

import { connect } from 'react-redux';
import { getCourses, updateCourse } from '../../actions/courseActions';

const initialState = {
    error: false,

    form: {
        courseNo: null,
        courseName: null,
        courseDesc: null,
    },
}

class UpdateCourseModal extends React.Component {
    constructor() {
        super();

        this.state = initialState;
    }

    // Form Input
    textInput = (e) => {
        this.setState({ 
            form: {
                ...this.state.form, 
                [e.target.name]: e.target.value.trim(),
            },
        });
    }

    // Select
    handleNumberSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                courseNo: parseInt(e.target.value),
            }
        });
    }

    handleNameSelect = (e) => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                courseName: e.target.value,
            }
        });
    }

    // Save Changes To Database
    submit = (e) => {
        // Check All Fields Valid
        for (const entry in this.state.form) {
            if (!this.state.form[entry]) {
                this.setState({ error: true });
                return;
            }
        }
        this.setState({ error: false });

        // Redux Action
        this.props.dispatch(updateCourse(this.state.form.courseNo, this.state.form.courseName, this.state.form.courseDesc)).then(res => {
            this.props.dispatch(getCourses()).then(res => {
                this.props.close();
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    // Close Modal
    close = () => {
        this.setState(initialState);
        this.props.close();
    }

    // Render
    render() {
        let courseMap = {};
        if (this.props.courses) {
            this.props.courses.forEach(course => {
                if (!courseMap.hasOwnProperty(course.courseNo)) {
                    courseMap[course.courseNo] = [];
                }

                courseMap[course.courseNo].push(course.courseName);
            });
        }

        return (
            <Modal size="lg" show={this.props.visibility} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                       <Form.Group controlId="courseNo">
                            <Form.Control as="select" onChange={this.handleNumberSelect} custom>
                                <option className="initial-option" value={null}>Course No.</option>
                                { Object.keys(courseMap).map((courseNo, i) => <option key={courseNo + courseMap[courseNo]} value={courseNo}>{courseNo}</option>) }
                            </Form.Control>
                        </Form.Group>
                            
                        <Form.Group controlId="courseName">
                            <Form.Control as="select" onChange={this.handleNameSelect} custom>
                                <option className="initial-option" value={null}>Course Name</option>
                                { courseMap[this.state.form.courseNo] && courseMap[this.state.form.courseNo].map((courseName, i) => <option key={this.state.form.courseNo + courseName} value={courseName}>{courseName}</option>) }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="courseDesc">
                            <Form.Control required as="textarea" rows="5" name="courseDesc" onChange={this.textInput} placeholder="Course Description"/>
                        </Form.Group>
                    </Form>

                    { this.state.error && <Alert variant="danger">All fields are required!</Alert> }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.close}>Close</Button>
                    <Button variant="primary" onClick={this.submit}>Update Course</Button>
                </Modal.Footer>
            </Modal>
        );
    };
};

export default connect()(UpdateCourseModal);