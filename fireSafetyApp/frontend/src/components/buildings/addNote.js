import React, { Component } from 'react';
import {createFENote} from "../../actions/notes"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class NoteInputToggler extends Component {
    state = {
        inputHidden: true,
        note: '',
    };

    static propTypes = {
        createFENote: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  
    toggleInput = () => {
      this.setState({
        inputHidden: !this.state.inputHidden
      })
    };

    createNote = (e) => {
        e.preventDefault();
        if (!this.state.note) {}
        else {
            let n = {
                note: this.state.note,
                fire_extinguisher: this.props.fe.id
            }
            this.props.createFENote(n);
            this.setState({ note: ''});
        }
    }
  
    render() {
      const inputClass = this.state.inputHidden ? 'hide' : '';
      const buttonLabel = this.state.inputHidden ? 'Add Note' : 'Submit';
      const {note} = this.state;
      return (
        <span>
            <form onSubmit={this.createNote}>
                <input type="text" name="note" value={note} onChange={this.onChange} className={inputClass}  />
                <button type="submit" onClick={this.toggleInput}>          
                    {buttonLabel}
                </button>
            </form>
        </span>
       )
    }
  }
export default connect(null, { createFENote })(NoteInputToggler);