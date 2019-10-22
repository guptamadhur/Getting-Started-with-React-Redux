import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ProductForm = ({
  product,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <div className="p-4 w-25 ml-5 shadow p-4 mb-4 bg-light">
      <form onSubmit={onSave}>
        <h2>{product.id ? "Edit" : "Add"} Product</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          name="name"
          label="PRODUCT NAME"
          value={product.name}
          onChange={onChange}
          error={errors.name}
        />

        <TextInput
          name="unit"
          label="UNIT OF MEASUREMENT"
          value={product.unit}
          onChange={onChange}
          error={errors.unit}
        />

        <TextInput
          name="price"
          label="PRICE"
          value={product.price}
          onChange={onChange}
          error={errors.price}
        />

        <TextInput
          name="image"
          label="PRODUCT IMAGE"
          value={product.image}
          onChange={onChange}
          error={errors.image}
        />

        <TextInput
          name="description"
          label="PRODUCT DESCRIPTION"
          value={product.description}
          onChange={onChange}
          error={errors.description}
        />
        <div className="col-sm-12 text-center">
          <button type="submit" disabled={saving} className="pl-4 pr-4 btn btn-primary roundBtn">
            {saving ? "Saving..." : "Save"}
          </button>
          {/* TODO Reset button implementation */}
          <button type="reset" className="ml-5 pl-4 pr-4 btn btn-primary roundBtn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  //products: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default ProductForm;
