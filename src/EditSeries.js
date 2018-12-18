import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const status = {
    'Watched': 'Watched',
    'Whatching': 'Whatching',
    'To Watch': 'To Watch'
}

class EditSeries extends Component{
    constructor(props){
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series:{}
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount(){
        this.setState({ 
            isLoading: true 
        })
        api.loadSeriesById(this.props.match.params.id)
            .then((res) => {
                this.setState({ series: res.data })
                this.refs.name.value = this.state.series.name
                this.refs.genre.value = this.state.series.genre
                this.refs.comments.value = this.state.series.comments
                this.refs.status.value = this.state.series.status
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
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.updateSeries(newSeries)
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
                <h1>Edit Serie</h1>
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
export default EditSeries