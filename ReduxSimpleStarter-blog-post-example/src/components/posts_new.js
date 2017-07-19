import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
}

class PostsNew extends Component{
  renderField(field){
    const { meta: {touched, error} } = field;
    //alert()
    const className=`form-group ${touched && error ? 'has-danger' : ''}`
      return(
        <div className={className}>
          <label>{field.label}</label>
          <field.type
            className="form-control"
            type="text-help"
            { ...field.input }
          />
          <div className="text-help">{ touched ? error : ''}</div>
        </div>
      );
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          name="title"
          label="Title"
          type="input"
          component={this.renderField}
        />
        <Field
          name="categories"
          label="Categories"
          type="input"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Post Content"
          type="textarea"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title){
    errors.title = "Enter a title!";
  }
  if(!values.categories){
    errors.categories = "Enter a category!";
  }
  if(!values.content){
    errors.content = "Enter some content!";
  }
  return errors;
}

//reduxForm is making the redux-form library aware of the form elements on our
//PostsNew class. The first arg is an object that contains the validate parameter,
//making the redux-form library aware of our validate function and a form attribute,
//which is necesary but seems pretty random. It's like a unique id I think.
//The second arg is the component class. The connect function is making the component
//aware of the action creator and returning a component to the reduxForm helper
export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(
  connect(null, {createPost})(PostsNew)
);
