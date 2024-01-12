import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import * as ApplicationsConstants from './util/ApplicationsConstants';
import { readOne, saveNote, updateOne } from '../services/notes.sevice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Import Bootstrap CSS (you may need to adjust the path based on your project structure)
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNoteComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [autoIncrementId, setAutoIncrementId] = useState(null);

  const handleSubmit = async (values) => {
    try {
      let response = null;
      if (values.id) {
        response = await updateOne(values);
      } else {
        response = await saveNote(values);
      }
      if (!response) {
        throw Error('Error occurred while storing into the database');
      }
      console.log(`printing the response object ${response.data}`);
      navigate('/mynotes');
    } catch (error) {
      console.error('Error occurred during form submission', error);
    }
  };

  const getNoteById = async () => {
    try {
      const response = await readOne(id);
      const existing = response.data;
      setTitle(existing.title);
      setBody(existing.body);
      setCategory(existing.category);
      setAutoIncrementId(existing.id);
    } catch (error) {
      console.error('Error occurred while retrieving the data from API', error);
    }
  };

  useEffect(() => {
    if (id) {
      getNoteById(id);
    }
  });

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ backgroundColor: '#E0AC5B', color: '#000000', overflowY: 'hidden' }}>
        <h2 className="card-title mb-4 text-center display-4 fw-bold text-uppercase">add new note</h2>
        <Formik
          initialValues={
            {
            title: title,
            body: body,
            category: category,
            id: autoIncrementId,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          <Form>
            <Field id="id" name="id" type="hidden" />
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-bold text-uppercase">
                Title
              </label>
              <Field
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold text-uppercase">
                Description
              </label>
              <Field name="description">
                {({ form }) => {
                   const { setFieldValue } = form;
                   return(
                  <>
                    <Editor
                      apiKey={ApplicationsConstants.TINYMCE_API_KEY}
                      value={form.values.body}
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: ["image", "code", "table", "link", "media"],
                        toolbar:
                          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat|help',
                        content_style:
                          "body{font-family: Hylvetica,Arial,san:             4px}"
                      }}
                      onEditorChange={(content) => {
                        setFieldValue('body', content);
                      }}
                    />
                  </>
                )}}
              </Field>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label fw-bold text-uppercase">
                Category
              </label>
              <Field
                id="category"
                name="category"
                className="form-control"
                placeholder="Enter Category"
              />
            </div>
            <button type="submit" className="btn btn-secondary fw-bold text-uppercase" style={{ backgroundColor: '#000000', color: '#ffffff', overflowY: 'hidden' }}>
              Submit
            </button>
          </Form>
        </Formik>
        <div className="mt-3">
          <Link to="/mynotes" className="btn btn-secondary mt-3 fw-bold text-uppercase" style={{ backgroundColor: '#7C4800', color: '#FDCE2A', overflowY: 'hidden' }}>
            Back to Notes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNoteComponent;
