import React, { Component } from 'react';
import {createFENote} from "../../../actions/notes"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MAX_NOTE_LENGTH = 240;

export class FENotes extends Component {
    state = {
        inputHidden: true,
        note: '',
        charsLeft: MAX_NOTE_LENGTH
    };

    static propTypes = {
        createFENote: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    onChange = (e) => {
        if (e.target.value.length > MAX_NOTE_LENGTH) {
            this.setState({charsLeft: "TOO MANY CHARACTERS"});
        } else {
            this.setState({charsLeft: MAX_NOTE_LENGTH - e.target.value.length})
        }
        this.setState({ [e.target.name]: e.target.value })
    };
  
    toggleInput = () => {
      this.setState({
        inputHidden: !this.state.inputHidden
      })
    };

    createNote = (e) => {
        e.preventDefault();
        if (!this.state.note || this.state.note.length > MAX_NOTE_LENGTH) {
            
        }
        else {
            const { user } = this.props.auth;
            let n = {
                note: this.state.note,
                author: `${user.first_name} ${user.last_name}`,
                date_written: new Date(),
                fire_extinguisher: this.props.fe.id
            }
            this.props.createFENote(n);
        }
        this.setState({ note: '', charsLeft: MAX_NOTE_LENGTH});
    }
  
    render() {
      const inputClass = this.state.inputHidden ? 'hide' : '';
      const buttonLabel = this.state.inputHidden ? 'Add Note' : 'Submit';
      const {note} = this.state;
      return (
        <span>
            <form onSubmit={this.createNote}>
                <input type="text" name="note" value={note} onChange={this.onChange} className={inputClass}  />
                <p className={inputClass}>Characters Left: {this.state.charsLeft}</p>
                <button type="submit" onClick={this.toggleInput}>          
                    {buttonLabel}
                </button>
            </form>
        </span>
       )
    }
  }
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
export default connect(mapStateToProps, { createFENote })(FENotes);