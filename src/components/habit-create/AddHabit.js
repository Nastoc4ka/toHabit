import React from 'react';
import HabitCreate from "./HabitCreate";
import {hideHabitCreate, showHabitCreate} from '../../redux/actions'
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";

const AddHabit = (props) => {
    const {display, showHabitCreate, hideHabitCreate} = props;

    return (<>
        <Button className='w-100 mt-3' variant="outline-success" onClick={() => showHabitCreate()}>
            ADD NEW HABIT
        </Button>
        <Modal show={display} onHide={() => hideHabitCreate()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Body>
                    <HabitCreate/>
                </Modal.Body>
            </Modal.Header>
        </Modal>
    </>)
};

const mapStateToProps = ({displayHabitCreateReducer: {display}}) => {
    return {display}
};

const mapDispatchToProps = (dispatch) => {
    return {
        showHabitCreate: () => dispatch(showHabitCreate()),
        hideHabitCreate: () => dispatch(hideHabitCreate()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHabit);