import React, { Component } from 'react'
import Loading from './fragments/Loading'
import styles from './App.module.css'
import { requestApi } from './utils'

export default class App extends Component {

  constructor() {
    super()
    this.state = {}
    this.state.state = 'form'
    this.state.loading = true
    this.state.error = null
    this.state.formEmail = ''

    // Bindings
    this.handleFormInput = this.handleFormInput.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /**
   * Component did mount
   */
  async componentDidMount() {
    // Parse Query Params
    this.queryData = new URLSearchParams(window.location.search)

    this.state.campaign = this.queryData.get('campaign')
    this.state.source = this.queryData.get('source')
    this.state.medium = this.queryData.get('medium')

    this.setState({
      campaign: this.queryData.get('campaign'),
      source: this.queryData.get('source'),
      medium: this.queryData.get('medium'),
      loading: false 
    })

    // Clear query params
    const url = document.location.href
    window.history.pushState({}, '', url.split('?')[0])
  }

  /**
   * Handle text changes within form fields
   */
  handleFormInput(field, value) {
    value = value.trim()
    
    const nextState = {}
    nextState[field] = value

    this.setState(Object.assign(this.state, nextState))
  }

  /**
   * Handles form submission
   * @param {object} evt 
   */
  async handleFormSubmit(evt) {
    evt.preventDefault()

    // Validate email
    if (!this.state.formEmail) {
      return this.setState({ formError: 'email is required' })
    }

    try {
      await requestApi(
        '/leads',
        'POST',
        {
          email: this.state.formEmail
        })
    } catch (error) {
      if (error.message) {
        this.setState({ formError: error.message })
      } else {
        this.setState({ formError: 'Sorry, something unknown went wrong.  Please try again.' })
      }
      return
    }

    this.setState({ 
      state: 'success',
      formError: null 
    })
  }

  /**
   * Render a loading view
   */
  renderLoading() {
    return <Loading className={styles.loading} />
  }

  /**
   * Render Email Field
   */
  renderEmailForm() {
    return (
      <div>
        <form className={styles.form} onSubmit={this.handleFormSubmit}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>enter your email</label>
            <input
              type='text'
              placeholder='email'
              className={styles.formInput}
              value={this.state.formEmail}
              onChange={(e) => { this.handleFormInput('formEmail', e.target.value) }}
            />
          </div>

          {this.state.formError && (
            <div className={styles.formError}>{this.state.formError}</div>
          )}

          <input className={`buttonPrimaryLarge ${styles.formButton}`} type='submit' value='enter' />

        </form>
      </div>
    )
  }

  render() {

    /**
     * Loading
     */

    if (this.state.loading) {
      return this.renderLoading()
    }

    return (
      <div className={`${styles.container} animateFadeIn`}>
        <div className={styles.containerInner}>

          { /* Logo */ }

          <div className={styles.logoContainer}>
            <img src={'./fullstack-app-hero.png'} alt='serverless-fullstack-application' />
            
          </div>

          { /* Loading */ }

          { this.state.loading && (
            <div>
              { < Loading className={styles.containerLoading} /> }
            </div>
          )}

          { /* Email Form */ }

          { !this.state.loading && this.state.state === 'form' && (
            <div>
              { this.renderEmailForm() }
            </div>
          )}

          { /* Success Message */ }

          { !this.state.loading && this.state.state === 'success' && (
            <div className={styles.success}>
              Thanks, you have been successfully registered
            </div>
          )}

        </div>
      </div>
    )
  }
}