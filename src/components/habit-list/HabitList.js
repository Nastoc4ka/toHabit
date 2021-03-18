import React, {Component} from 'react';
import {connect} from 'react-redux';

import HabitListItem from '../habit-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {categoriesRequested, habitEditShow, habitRemove, requestHabits} from '../../redux/actions';
import './habitList.css';
import {Container, ListGroup, Row} from "react-bootstrap";

const HabitList = ({habits, showInput, selectedId, removeHabit}) => {
    return (
        <Row>
            <ListGroup className='w-100'>
                {habits.map((habit, idx) => {
                    return (
                        <HabitListItem showInput={() => showInput(habit.id)}
                                       removeHabit={() => removeHabit(habit.id)}
                                       idx={idx}
                                       selectedId={selectedId}
                                       habit={habit}
                                       key={habit.id}/>
                    )
                })}
            </ListGroup>
        </Row>
    )
};

class HabitsContainer extends Component {

    componentDidMount() {
        this.props.fetchCategories();
        this.props.requestHabits();

    }

    render() {
        const {habits, categories, loading, error, showInput, selectedId, removeHabit} = this.props;
        if (loading) return <Spinner/>;

        if (error) return <ErrorIndicator message={error.message}/>;

        return (<>
            {
                categories.map(category => {
                    const habitsByCategory = habits.filter(h => h.category.id === category.id);
                    const hasHabits = habitsByCategory.length > 0;

                    return hasHabits && (<Container className='mt-3' key={category.id}>
                        <h3 className={category.name.toLowerCase()}>{category.name}</h3>
                        <HabitList
                            showInput={showInput}
                            selectedId={selectedId}
                            habits={habitsByCategory}
                            removeHabit={removeHabit}/>
                    </Container>)

                })
            }

        </>)
    }
}

const mapStateToProps = ({
                             habitEditReducer: {selectedId},
                             habitsReducer: {habits, loading, error},
                             categoryReducer: {categories}
                         }) => {
    return {habits, error, loading, selectedId, categories};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(categoriesRequested()),
        requestHabits: () => dispatch(requestHabits()),
        showInput: id => dispatch(habitEditShow(id)),
        removeHabit: id => dispatch(habitRemove(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitsContainer)