import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { productCategories } from './../../constants';

import { ProductsContext } from "./../../contexts/products.context";
// import ErrorBoundary from "./../../components/error-boundary/ErrorBoundary";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const schema = yup.object().shape({
  title: yup.string().required().min(2).max(20),
  price: yup.string().required().min(2).max(5),
  category: yup.mixed().oneOf(productCategories).required(),
});

function ProductForm({ initialValues }) {
  const classes = useStyles();
  let { id } = useParams();
  const [populated, setPopulated] = useState(false);

  const defaultValues = {
    price: "",
    title: "",
    category: "",
  };

  const { addProduct, updateProduct } = useContext(ProductsContext);
  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  // console.log("formState", formState);
  const { isDirty, isValid } = formState;

  if (initialValues && !populated) {
    // initialValues.price = initialValues.price / 100;
    reset({
      ...initialValues,
      price: (initialValues.price / 100).toFixed(2),
    });
    setPopulated(true);
  }

  // console.log("errors", errors);
  const onSubmit = async (formValues) => {
    console.log("formValues", formValues);
    // formValues._id = id; // pulled from the URL using router 'useParams' hook

    if (formValues.price) {
      formValues.price = formValues.price * 100;
    }

    if (populated) {
      const updates = {};
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== "_") {
            updates[key] = formValues[key];
          }
        }
      }
      console.log("updates", updates);
      updateProduct(id, updates);
    } else {
      addProduct(formValues);
    }
    reset(defaultValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.title}
              helperText={errors.title?.message}
              id="title"
              name={name}
              label="title"
            />
          )}
          name="title"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <TextField
              inputRef={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!errors.price}
              helperText={errors.price?.message}
              id="price"
              name={name}
              placeholder="x.xx"
              label="price £x.xx"
            />
          )}
          name="price"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formrow}>
        <Controller
          render={(
            { onChange, onBlur, value, name, ref },
            { invalid, isTouched, isDirty }
          ) => (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Choose a category</InputLabel>
              <Select
                inputRef={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!errors.category}
                id="category"
                name={name}
                label="category"
                required={true}
              >
                <MenuItem value="">Choose a category</MenuItem>
                {productCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          name="category"
          control={control}
          rules={{ required: true }}
        />
        {errors.category ? (
                <InputLabel htmlFor="category">
                  {errors.category.message}
                </InputLabel>
              ) : (
                ""
              )}
      </div>
      <div className={classes.formrow}>
        <Button onClick={() => reset(defaultValues)}>Reset</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!isValid || !isDirty}
        >
          {populated ? "Update" : "Add"} Product
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
