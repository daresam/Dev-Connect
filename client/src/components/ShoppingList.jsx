import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types'

export class ShoppingList extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		items: [
	// 			{ id: uuid(), name: 'Eggs' },
	// 			{ id: uuid(), name: 'Milk' },
	// 			{ id: uuid(), name: 'Steak' },
	// 			{ id: uuid(), name: 'Water' }
	// 		]
    //     };
    // }
    
    componentDidMount() {
        this.props.getItems();
    }
    
	render() {
        const { items } = this.props.item;
        // const items  = this.props.items;
		return (
            
			<div >
				<Container> 
                    <Button
                        style={{ marginBottom: '2rem' }}
                        color="success"
                        onClick={() => {
                            const name = prompt('Enter your item');
                            if(name) {
                                this.setState((state) => ({
                                    items: [...state.items, {id: uuid(), name}]
                                }))
                            }
                        }}
                    >
                        Add Item
                    </Button>

                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {items.map(({id, name}) => (
                                <CSSTransition key={id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            onClick={() => {
                                                this.setState((state) => ({
                                                    items: state.items.filter((item) => item.id !== id)
                                                }));
                                            }}
                                            >
                                            &times;
                                        </Button>
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
				</Container>
			</div>
		);
	}
}
// ShoppingList.propTypes = {
//     getItems: PropTypes.func.isRequired,
//     item: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
    item: state.item
});
export default connect(mapStateToProps, {getItems})(ShoppingList);
// export default ShoppingList;
