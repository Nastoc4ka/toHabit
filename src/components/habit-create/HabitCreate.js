import React, {Component} from "react";
import {connect} from "react-redux";
import {categoriesRequestedSaga, habitCreateSaga} from "../../redux/actions";
import './habitCreate.css'
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {GrFormAdd} from "react-icons/gr";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

class HabitCreate extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        const {categories, createHabit} = this.props;
        const {categoryId, name} = this.state;
        if (!this.state.name.trim()) return;

        const category = categoryId ?
            categories.find(category => category.id == categoryId) :
            categories[0];

        createHabit({name, category});
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            name: ''
        };
        this.habitInputFocus = React.createRef();
    }

    componentDidMount() {
        this.props.fetchCategories();
        this.habitInputFocus.current.focus();
    }

    render() {

        const {categories, loadingCreateHabit, errorCreateHabit, fetchCategories, createHabit} = this.props;

        if (loadingCreateHabit) {
            return <Spinner/>
        }

        if (errorCreateHabit) {
            return <ErrorIndicator error={errorCreateHabit}/>
        }

        return (<Container>
            <Row>
                <form onSubmit={this.onSubmit} className='w-100'>
                    <InputGroup className='w-100'>
                        <Col sm={12} md={6} className='pr-0 pr-0 align-self-end'>
                            <FormControl ref={this.habitInputFocus}
                                         name='name'
                                         id='newItem'
                                         placeholder="make new habit"
                                         value={this.state.name}
                                         onChange={this.handleChange}
                                         aria-label="make new habit"
                                         className='inputNewHabit w-100'/>
                        </Col>
                        <Col sm={8} md={5} className='col-11'>
                            <InputGroup.Append>
                                <Form.Group as={Row} className='mb-0'>
                                    <Col sm={12}>
                                        <Form.Label className='mt-2'>Choose Category:</Form.Label>
                                    </Col>
                                    <Col sm={12}>
                                        <Form.Control as="select" name='categoryId' value={this.state.categoryId}
                                                      onChange={this.handleChange}>
                                            {categories.map((category) => {
                                                return <option key={`category${category.id}`}
                                                               value={category.id}>{category.name}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </InputGroup.Append>
                        </Col>
                        <Col sm={1} className='pl-0 col-1 align-self-end'>
                            <Button variant="outline-success" type="submit">
                                <GrFormAdd/>
                            </Button>
                        </Col>
                    </InputGroup>
                </form>
            </Row>
        </Container>)
    }
}

const mapStateToProps = ({
                             habitsReducer: {loadingCreateHabit, errorCreateHabit},
                             categoryReducer: {categories}
                         }) => {
    return {loadingCreateHabit, errorCreateHabit, categories};
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchCategories: () => dispatch(categoriesRequestedSaga()),
        createHabit: (newHabit) => dispatch(habitCreateSaga(newHabit)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HabitCreate)