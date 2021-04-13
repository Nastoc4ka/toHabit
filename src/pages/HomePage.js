import React from 'react';
import HabitList from "../components/habit-list/index";
import {Col, Container, Row} from "react-bootstrap";
import {AddHabit} from "../components/habit-create";
import {AddCategory} from "../components/category-create";
import HabitWeek from "../components/habit-week";
import {connect} from "react-redux";
import HabitWelcome from "../components/habit-welcome/HabitWelcome";


const HomePage = ({isLoggedIn}) => {

    if (!isLoggedIn) {
        return <HabitWelcome/>
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={5} sm={12}>
                    <HabitList />
                    <AddHabit/>
                    <AddCategory/>
                </Col>
                <Col lg={2} className="d-none d-lg-block"></Col>
                <Col lg={5} md={7} sm={12} className='mt-2 pl-0'>
                    <HabitWeek/>
                </Col>
            </Row>
        </Container>)
};

function mapStateToProps({authLoginReducer}) {
    const {user, isLoggedIn} = authLoginReducer;
    return {
        user,
        isLoggedIn
    };
}

export default connect(mapStateToProps)(HomePage)