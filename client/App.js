import logo from './logo.svg';
import './App.css';
import React from 'react';

export function validateTitle(title) {
  if (title.length < 5 || title.length > 50) {
      return false;
  }

  return true;
}

export function validateAuthor(author) {
  if (typeof author !== 'string') {
      return false;
  }

  if (author.length < 3 || author.length > 30) {
      return false;
  }

  return true;
}

export function validateCategory(category) {
  if (category.length < 3 || category.length > 20) {
      return false;
  }

  return true;
}

function App() {
  
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitle(value);
  }
  function handleAuthorChange(e) {
    const value = e.target.value;
    setAuthor(value)
  }
  function handleCategoryChange(e) {
    const value = e.target.value;
    setCategory(value);
  }
  function handleFormSubmit (e) {
    e.preventDefault();
    if (!validateTitle(title) || !validateAuthor(author) || !validateCategory(category)) {
      setError('form is invalid!');
      setSuccessMessage(null)
      return;
    }
    setTitle('')
    setAuthor('')
    setCategory('');
    setError(null);
    setSuccessMessage('form saved!')
  }

  return <form onSubmit={handleFormSubmit}>
    <input onChange={handleTitleChange} placeholder="Title" value={title} />
    <input onChange={handleAuthorChange} placeholder="Author" value={author} />
    <input onChange={handleCategoryChange} placeholder="Category" value={category} />
    <button type="submit">Save</button>
    { successMessage && successMessage }
    { error && error }
  </form>
}

export default App;
