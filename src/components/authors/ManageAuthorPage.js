import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import Spinner from "../common/Spinner";
import { newAuthor } from "../../tools/mockData";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import { toast } from "react-toastify";

export function ManageAuthorPage({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error =>
        console.log("Loading authors failed", error)
      );
    } else {
      setAuthor({ ...props.author });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.author]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    try {
      await saveAuthor(author);
      // redirect back to authors page
      history.push("/authors");
    } catch (error) {
      toast.error(error.message, { autoClose: false });
      setSaving(false);
    }
  }

  function formIsValid() {
    const errors = {};
    if (!author.name) errors.name = "Name is required!";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      {authors.length === 0 ? (
        <Spinner />
      ) : (
        <AuthorForm
          author={author}
          onSave={handleSave}
          onChange={handleChange}
          saving={saving}
          errors={errors}
        />
      )}
    </>
  );
}

ManageAuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const author =
    id && state.authors.length > 0
      ? state.authors.find(author => author.id === +id)
      : newAuthor;
  return {
    author,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
