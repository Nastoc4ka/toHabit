import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import {ByDaysInRow, ByDone} from "../components/habit-statistics";
import Spinner from "../components/spinner";
import {BsFillStarFill} from "react-icons/bs";
import './statistics.css';

const StatisticsPage = ({loadingStatistics, isLoggedIn}) => {

    if (!isLoggedIn) return <Redirect to="/"/>;

    if (loadingStatistics) return <Spinner/>;

    return (
        <Container className="statistics pt-3">
            <Row className="h-100">
                <Col className="auto">
                    <h5 className="ml-1">Make your habit everyday routine! Do it at least for 21
                        <BsFillStarFill className="supernova"/> days in row.</h5>
                    <Row>
                        <Col md={5} sm={12}>
                            <ByDone character={'Total done TOP'}/>
                        </Col>
                        <Col md={6} sm={12} className='colByDaysInRow'>
                            <ByDaysInRow character={'MAX days in row'}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

const mapStateToProps = ({
                             statisticsReducer: {loadingStatistics},
                             authLoginReducer: {isLoggedIn}
                         }) => {
    return {loadingStatistics, isLoggedIn}
};

export default connect(mapStateToProps)(StatisticsPage);