import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {categoriesRequestedSaga, logoutSaga, requestHabitsSaga, statisticsLoaded} from "../../redux/actions";
import {HomePage, LoginPage, RegisterPage, StatisticsPage, WelcomePage} from '../../pages';
import Header from "../header";
import Footer from "../footer";
import {Col, Container, Row} from 'react-bootstrap';
import '../../fonts/New_Tegomin/NewTegomin-Regular.ttf';
import './app.css';


const App = (props) => {
    const {user, isLoggedIn, requestHabits, fetchCategories, statisticsLoaded, logout} = props;
    useEffect(() => {
        if (user) {
            requestHabits();
            fetchCategories();
            statisticsLoaded();
        }
    }, []);
    return (
        <Container role='main' className='main'>
            <Row>
                <Col>
                    <Header isLoggedIn={isLoggedIn}
                            user={user}
                            logout={logout}
                    />
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/register' component={RegisterPage}/>
                        <Route path='/statistics' component={StatisticsPage}/>
                        <Route path='/welcome' component={WelcomePage}/>
                    </Switch>
                    <Footer
                        isLoggedIn={isLoggedIn}
                        logout={logout}
                    />
                </Col>
            </Row>
        </Container>
    )
};

function mapStateToProps({authLoginReducer: {user, isLoggedIn}}) {
    return {user, isLoggedIn};
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestHabits: () => dispatch(requestHabitsSaga()),
        fetchCategories: () => dispatch(categoriesRequestedSaga()),
        statisticsLoaded: () => dispatch(statisticsLoaded()),
        logout: () => dispatch(logoutSaga())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
