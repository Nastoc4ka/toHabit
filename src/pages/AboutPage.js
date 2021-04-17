import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import './about.css';
import screenShots from '../screenshotApp.png';

const AboutPage = () => {
    return (
        <Container>
            <Row className="mt-2 h-100">
                <Col className='my-auto'>
                    <div className='content'>
                        <h5 className='headAbout'>ToHabit helps you to create and maintain good habits allowing to
                            achieve your long-term goals.</h5>
                        <p>Try to do your habit at list for 21 day in row and it becomes a part of your
                            everyday schedule.
                        </p>
                        <Row>
                            <Col className='appFeaturelist'>
                                <p>This App allows you:</p>
                                <ul className="nav flex-column">
                                    <li>- create new habits</li>
                                    <li>- mark it done</li>
                                    <li>- sort by categories</li>
                                    <li>- add new categories</li>
                                    <li>- track your week progress</li>
                                    <li>- see on statistics page TOP done.</li>
                                </ul>
                            </Col>
                            <Col md={8}>
                                <div className='screenShot'>
                                    <img src={screenShots}/>
                                </div>
                            </Col>
                        </Row>
                        <p className='mt-4'>We hope ToHabit keeps you more focused and helps stay motivated.</p>
                        <p>So wish you enough persistence and inspiration to achieve your goals!</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
};

export default AboutPage