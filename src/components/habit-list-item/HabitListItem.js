import React, {useState} from 'react';
import './habitListItem.css';
import Button from "react-bootstrap/esm/Button";
import {Col, ListGroup, Row} from "react-bootstrap";
import EditHabit from "../habit-edit";
import {FiEdit2} from 'react-icons/fi';
import {RiDeleteBinLine} from "react-icons/ri";
import {MdCheck} from "react-icons/md";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import AlertDone from "../alertDone";

const HabitListItem = ({
                           habit, selectedId, onDone, alertMarkDoneId,
                           errorRemoveHabit, loadingRemoveHabit,
                           showInput, loadingHabit, removeHabit
                       }) => {

    const [removedId, setRemovedId] = useState(false);

    const {id, name} = habit;
    const styleHabits = {backgroundColor: `${habit.category.color.bgColor}`};

    const removeItem = () => {
        setRemovedId(id);
        return removeHabit()
    };

    const habitItem = <>
        <Col>
            <Row>
                <Button style={styleHabits}
                        className='mr-3 w-100'
                        variant="outline-info"
                        onClick={onDone}>
                    <MdCheck/> {name}
                </Button>
                {alertMarkDoneId === id && <AlertDone/>}
            </Row>
        </Col>
        <Col sm={2.5} className='pr-0 pl-0'>
            <Button variant="outline-dark" className='mr-2' onClick={removeItem}><RiDeleteBinLine/></Button>
            <Button variant="outline-warning" onClick={showInput}><FiEdit2/></Button>
        </Col>
    </>;

    if ((loadingRemoveHabit && removedId) === id || (loadingHabit && selectedId === id)) return <Spinner/>;
    if (errorRemoveHabit && removedId === id) return <ErrorIndicator message={errorRemoveHabit.message}/>;
    return (
        <ListGroup.Item className='list-group-flush pt-0 pr-0'>
            <Row>
                {selectedId === id ? <EditHabit habit={habit}/> : habitItem}
            </Row>
        </ListGroup.Item>
    )
};

export default HabitListItem;