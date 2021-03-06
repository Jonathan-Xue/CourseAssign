import React from 'react';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';
import NewEntryModal from './modals/NewEntryModal';
import DeleteEntryModal from './modals/DeleteEntryModal';
import NewCourseModal from './modals/NewCourseModal';
import UpdateCourseModal from './modals/UpdateCourseModal';
import DeleteCourseModal from './modals/DeleteCourseModal';
import NewInstructorModal from './modals/NewInstructorModal';
import UpdateInstructorModal from './modals/UpdateInstructorModal';
import DeleteInstructorModal from './modals/DeleteInstructorModal';
import SearchBar from '../components/SearchBar';
import CardList from '../components/CardList';
import './HomeView.scss';

import { connect } from 'react-redux';
import { getEntries } from '../actions/entryActions';
import { getCourses } from '../actions/courseActions';
import { getInstructors } from '../actions/instructorActions';
import { matchInstructorsToCourse, matchCoursesToInstructor } from '../actions/matchActions';

class HomeView extends React.Component {
    constructor() {
        super();

        this.state = {
            showNewEntryModal: false,
            showDeleteEntryModal: false,

            showNewCourseModal: false,
            showUpdateCourseModal: false,
            showDeleteCourseModal: false,

            showNewInstructorModal: false,
            showUpdateInstructorModal: false,
            showDeleteInstructorModal: false,

            filter: null,
            selection: null,

            responseFilter: null,
            responseSelection: null,
        };
    }

    // Lifecycle Methods
    componentDidMount() {
        this.refreshData()
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // Refresh Data Every Five Minutes
    refreshData = () => {
        Promise.all([
            this.props.dispatch(getEntries()),
            this.props.dispatch(getCourses()),
            this.props.dispatch(getInstructors())
        ]).then(res => {
            this.timer = setTimeout(this.refreshData, 300000);
        }).catch(err => {});
    }

    // Modals
    openNewEntryModal = () => { this.setState({ showNewEntryModal: true }); };
    closeNewEntryModal = () => { this.setState({ showNewEntryModal: false }); };

    openDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: true }); };
    closeDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: false }); };

    openNewCourseModal = () => { this.setState({ showNewCourseModal: true }); };
    closeNewCourseModal = () => { this.setState({ showNewCourseModal: false }); };

    openUpdateCourseModal = () => { this.setState({ showUpdateCourseModal: true }); };
    closeUpdateCourseModal = () => { this.setState({ showUpdateCourseModal: false }); };

    openDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: true }); };
    closeDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: false }); };

    openNewInstructorModal = () => { this.setState({ showNewInstructorModal: true }); };
    closeNewInstructorModal = () => { this.setState({ showNewInstructorModal: false }); };

    openUpdateInstructorModal = () => { this.setState({ showUpdateInstructorModal: true }); };
    closeUpdateInstructorModal = () => { this.setState({ showUpdateInstructorModal: false }); };

    openDeleteInstructorModal = () => { this.setState({ showDeleteInstructorModal: true }); };
    closeDeleteInstructorModal = () => { this.setState({ showDeleteInstructorModal: false }); };

    // Open Current Version
    findEntries = () => {
        this.props.dispatch(getEntries()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {
            console.log(err);
        });
    }

    findCourses = () => {
        this.props.dispatch(getCourses()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {
            console.log(err);
        });
    }

    findInstructors = () => {
        this.props.dispatch(getInstructors()).then(res => {
            let doc = window.open('data:application/json,');
            doc.document.open();
            doc.document.write('<html><body><pre>' + JSON.stringify(res, null, 4) + '</pre></body></html>');
            doc.document.close();
        }).catch(err => {
            console.log(err);
        });
    }

    // Select Menu
    handleFilter = (e) => {
        this.setState({
            filter: e.target.value,
            selection: null,
        });
    }

    handleDropdown = (e) => {
        this.setState({
            selection: e.target.value
        });
    }

    search = (filter, selection) => {
        if (filter === "instructor") {
            this.setState({
                responseFilter: filter,
                responseSelection: selection
            });

            this.props.dispatch(matchCoursesToInstructor(JSON.parse(selection).instructorId));
        } else if (filter === "course") {
            this.setState({
                responseFilter: filter,
                responseSelection: selection
            });

            this.props.dispatch(matchInstructorsToCourse(JSON.parse(selection).courseNo, JSON.parse(selection).courseName));
        } else {
            this.setState({
                responseFilter: null,
                responseSelection: null
            });
        }
    }

    // Render
    render() {
        return (
            <React.Fragment>
                <NavBar history={this.props.history}/>
                <div className="home-screen">
                    <div className="left">
                        <NewEntryModal courses={this.props.courseRequests.getCourseResp} instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showNewEntryModal} close={this.closeNewEntryModal}/>
                        <DeleteEntryModal entries={this.props.entryRequests.getEntryResp} visibility={this.state.showDeleteEntryModal} close={this.closeDeleteEntryModal}/>
                        <NewCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showNewCourseModal} close={this.closeNewCourseModal}/>
                        <UpdateCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showUpdateCourseModal} close={this.closeUpdateCourseModal}/>
                        <DeleteCourseModal courses={this.props.courseRequests.getCourseResp} visibility={this.state.showDeleteCourseModal} close={this.closeDeleteCourseModal}/>
                        <NewInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showNewInstructorModal} close={this.closeNewInstructorModal}/>
                        <UpdateInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showUpdateInstructorModal} close={this.closeUpdateInstructorModal}/>
                        <DeleteInstructorModal instructors={this.props.instructorRequests.getInstructorResp} visibility={this.state.showDeleteInstructorModal} close={this.closeDeleteInstructorModal}/>

                        <Accordion defaultActiveKey="-1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <span>Entry Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewEntryModal}>New Entry</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteEntryModal}>Delete Entry</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <span>Course Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewCourseModal}>New Course</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openUpdateCourseModal}>Update Course</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteCourseModal}>Delete Course</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    <span>Instructor Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.openNewInstructorModal}>New Instructor</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openUpdateInstructorModal}>Update Instructor</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.openDeleteInstructorModal}>Delete Instructor</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <span>Dataset Operations</span>
                                    <span>&#9660;</span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                    <ListGroup className="list" variant="flush">
                                        <ListGroup.Item action className="list-item" onClick={this.findEntries}>Find Entries</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.findCourses}>Find Courses</ListGroup.Item>
                                        <ListGroup.Item action className="list-item" onClick={this.findInstructors}>Find Instructors</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>

                    <div className="right">
                        <div className="content">
                            <SearchBar courses={this.props.courseRequests.getCourseResp} instructors={this.props.instructorRequests.getInstructorResp} isLoading={this.props.match.isMatching} search={this.search}/>
                            <CardList filter={this.state.responseFilter} selection={ this.state.responseFilter === "instructor" ? JSON.parse(this.state.responseSelection).instructorName : this.state.responseFilter === "course" ? JSON.parse(this.state.responseSelection).courseName : null} data={this.props.match.matchResp} isLoading={this.props.match.isMatching}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = store => {
    return {
        auth: store.auth,
        entryRequests: store.entryRequests,
        courseRequests: store.courseRequests,
        instructorRequests: store.instructorRequests,
        match: store.match,
    }
}

export default connect(mapStateToProps)(HomeView);