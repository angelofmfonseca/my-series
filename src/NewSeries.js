import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const status = {
    'Watched': 'Watched',
    'Whatching': 'Whatching',
    'To Watch': 'To Watch'
}

class NewSeries extends Component{
    constructor(props){
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount(){
        this.setState({ 
            isLoading: true 
        })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }
    saveSeries(){
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series' + this.refs.genre.value
                })
            })
    }
    render(){
        return(
            <section className='intro-section'>
                { 
                    this.state.redirect &&
                    <Redirect to={ this.state.redirect } />
                }
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label>Serie:</label>
                            <input type="text" ref="name" className="form-control" />
                            <br />
                            <label>Status:</label>
                            <select ref="status">
                                {
                                    Object
                                        .keys(status)
                                        .map(key => <option value={ key }>{ status[key] }</option>)
                                }
                            </select>
                            <br />
                            <label>Genre:</label>
                            <select ref="genre">
                                {
                                    this.state.genres
                                    .map(key => <option key={ key } value={ key }>{ key }</option>)
                                }
                            </select>
                            <br />
                            <label>Comments:</label>
                            <textarea ref="comments" className="form-control"></textarea>
                            <br />
                            <button type="button" onClick={this.saveSeries}>Save</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        )
    }
}
export default NewSeries