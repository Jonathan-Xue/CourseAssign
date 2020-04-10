import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import NewEntryModal from '../components/modals/NewEntryModal.jsx';
import DeleteEntryModal from '../components/modals/DeleteEntryModal.jsx';
import NewCourseModal from '../components/modals/NewCourseModal.jsx';
import DeleteCourseModal from '../components/modals/DeleteCourseModal.jsx'
import './HomeScreen.scss';

import { connect } from 'react-redux';
import { sampleAction } from '../actions/fooActions';

class HomeScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            showNewEntryModal: false,
            showDeleteEntryModal: false,

            showNewCourseModal: false,
            showDeleteCourseModal: false,

            data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc vitae nisl ullamcorper volutpat. Aliquam in augue vitae felis pretium ornare quis non velit. Morbi aliquet ipsum convallis faucibus luctus. In scelerisque risus non enim consectetur, vel tincidunt eros tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque elementum lobortis rhoncus. Nullam sagittis pretium volutpat. Cras id tristique lacus. Cras arcu nisi, scelerisque commodo cursus sed, faucibus a ligula. Morbi iaculis nulla id fringilla laoreet. Praesent ornare tortor quis risus ullamcorper luctus. Proin viverra pulvinar tempor. Morbi at iaculis mi.",
        };
    }

    // New Entry Modal
    openNewEntryModal = () => { this.setState({ showNewEntryModal: true }); };
    closeNewEntryModal = () => { this.setState({ showNewEntryModal: false }); };

    // Delete Entry Modal
    openDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: true }); };
    closeDeleteEntryModal = () => { this.setState({ showDeleteEntryModal: false }); };

    // New Course Modal
    openNewCourseModal = () => { this.setState({ showNewCourseModal: true }); };
    closeNewCourseModal = () => { this.setState({ showNewCourseModal: false }); };

    // Delete Course Modal
    openDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: true }); };
    closeDeleteCourseModal = () => { this.setState({ showDeleteCourseModal: false }); };

    // Render
    render() {
        return (
            <div className="home-screen">
                <NewEntryModal visibility={this.state.showNewEntryModal} close={this.closeNewEntryModal}/>
                <DeleteEntryModal visibility={this.state.showDeleteEntryModal} close={this.closeDeleteEntryModal}/>

                <NewCourseModal visibility={this.state.showNewCourseModal} close={this.closeNewCourseModal}/>
                <DeleteCourseModal visibility={this.state.showDeleteCourseModal} close={this.closeDeleteCourseModal}/>

                <ButtonGroup>
                    <Button variant="primary" onClick={this.openNewEntryModal}>Insert Entry</Button>
                    <Button variant="primary" onClick={this.openDeleteEntryModal}>Delete Entry</Button>
                </ButtonGroup>

                <br/>
                <br/>

                <ButtonGroup>
                    <Button variant="primary" onClick={this.openNewCourseModal}>Insert/Modify Course</Button>
                    <Button variant="primary" onClick={this.openDeleteCourseModal}>Delete Course</Button>
                </ButtonGroup>

                <br/>
                <br/>

                <ButtonGroup>
                    <Button variant="secondary">Find Grades</Button>
                    <Button variant="secondary">Find Courses</Button>
                </ButtonGroup>

                <br/>
                <br/>

                <p>{this.state.data}</p>
            </div>
        );
    };
};

const mapStateToProps = store => {
    return {
      sample: store.sample,
    }
}

export default connect(mapStateToProps, undefined)(HomeScreen);