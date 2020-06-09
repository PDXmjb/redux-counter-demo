import React, { Component } from 'react';
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux'; //import function that returns HOC for connecting to redux.

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    
    render () {
    
        
    
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.results.map((storeResult) => (<li key={storeResult.id} onClick={() => this.props.onDeleteResult(storeResult.id)}>{storeResult.value}</li> ))}
                </ul>
            </div>
        );
    }
}

// Defining things after the class.
const mapStateToProps = state => {
    return {
        counter: state.counter.counter,
        results: state.result.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: (value) => dispatch({type: actionTypes.ADD, value: value}),
        onSubtractCounter: (value) => dispatch({type: actionTypes.SUBTRACT, value: value}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch(({type: actionTypes.DELETE_RESULT, resultElementId: id}))
    }
}

// Say in connect which bits of the state you want in the container, which actions you want to dispatch.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);