import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    let val = this.props.value ? this.props.value : '';
    this.state = { file: val };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
  }

  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
    this.props.onChange(event);
    // var formData = new FormData(form);
    // formData.append(', 'Chris');
    // formData.append('image', 'Chris');

   axios.get(`http://localhost:3200/products`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
  

  render() {
    const { name, onChange, label, error } = this.props;

    let wrapperClass = "form-group";
    if (error && error.length > 0) {
      wrapperClass += " " + "has-error";
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <input
            style={{ cursor: "pointer" }}
            type="file"
            onChange={this.handleChange}
            name={name}
          />
          <div className="imgPreview">
            <img src={this.state.file} alt={this.state.file} value={this.state.file} onChange={() => onChange} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    )
  }
}

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default ImageUpload;
