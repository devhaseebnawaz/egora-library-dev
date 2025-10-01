import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  InputAdornment,
  Button,
  Box,
  Typography,
  useMediaQuery,
  DialogTitle,
  IconButton
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getScreenSizeCategory } from "../../../utils/fontsize";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../hook-form";
import Iconify from '../iconify';

export default function CustomerInfoModal({
  themeColors,
  globalComponentStyles,
  layout,
  styles,
  states,
  actions,
  open,
  onClose,
  onCustomerFound,
  previewMode = false,
}) {
  layout = layout?.json ? layout?.json : layout;
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const PhoneSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  });

  const methods = useForm({
    resolver: yupResolver(PhoneSchema),
    defaultValues: {
      phone: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    setError
  } = methods;

  const onSubmit = async (values) => {
    try {
      const data = {
        levelId: states.cardItems?.levelId,
        venueId: states.cardItems?.venueId,
        phone: values.phone,
      };

      const response = await actions.fetchCustomerByPhone(data);

      if (response) {
        if (onCustomerFound) {
          onCustomerFound(response);
        }
        onClose();
      } else {
        setError("phone", {
          type: "manual",
          message: "No customer found with this phone number",
        });
      }
    } catch (error) {
      console.error("Error fetching customer info:", error);
      setError("phone", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const getHeadingStyles = {
    color:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalHeadingsTextColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalHeadingsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
        ? globalComponentStyles?.Text?.color?.value
        : `${themeColors?.CustomerInfoModalHeadingsTextColor?.value}`,
    fontSize:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
        : themeColors?.CustomerInfoModalHeadingsTextSize?.value[
            getScreenSizeCategory()
          ],
    fontWeight:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalHeadingsTextWeight?.value != ""
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : themeColors?.CustomerInfoModalHeadingsTextWeight?.value,

    fontFamily:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalHeadingsTextFont?.value != ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalHeadingsTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.CustomerInfoModalHeadingsTextFont?.value}`,

    fontStyle:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalHeadingsTextStyle?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalHeadingsTextStyle?.value}`
        : globalComponentStyles?.Text?.fontStyle?.value != ""
        ? globalComponentStyles?.Text?.fontStyle?.value
        : `${themeColors?.CustomerInfoModalHeadingsTextStyle?.value}`,
  };

  const getSubmitEnabledStyles = {
    color:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitEnabledTextColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitEnabledTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
        ? globalComponentStyles?.Text?.color?.value
        : `${themeColors?.CustomerInfoModalSubmitEnabledTextColor?.value}`,

    backgroundColor:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitEnabledBackgroundColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitEnabledBackgroundColor?.value}`
        : globalComponentStyles?.Button?.backgroundColor?.value != ""
        ? globalComponentStyles?.Button?.backgroundColor?.value
        : `${themeColors?.CustomerInfoModalSubmitEnabledBackgroundColor?.value}`,
  };

  const getSubmitDisabledStyles = {
    color:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitDisabledTextColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitDisabledTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
        ? globalComponentStyles?.Text?.color?.value
        : `${themeColors?.CustomerInfoModalSubmitDisabledTextColor?.value}`,
    backgroundColor:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitDisabledBackgroundColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitDisabledBackgroundColor?.value}`
        : globalComponentStyles?.Button?.backgroundColor?.value != ""
        ? globalComponentStyles?.Button?.backgroundColor?.value
        : `${themeColors?.CustomerInfoModalSubmitDisabledBackgroundColor?.value}`,
  };

  const getSubmitTextStyles = {
    fontSize:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalSubmitTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
        ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
        : themeColors?.CustomerInfoModalSubmitTextSize?.value[
            getScreenSizeCategory()
          ],
    fontWeight:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitTextWeight?.value != ""
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalSubmitTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : themeColors?.CustomerInfoModalSubmitTextWeight?.value,
    fontFamily:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitTextFont?.value != ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.CustomerInfoModalSubmitTextFont?.value}`,

    fontStyle:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalSubmitTextStyle?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitTextStyle?.value}`
        : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.CustomerInfoModalSubmitTextStyle?.value}`,
  };

  const getPhoneInputStyles = {
    color:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalPhoneInputTextColor?.value !== ""
        ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalPhoneInputTextColor?.value}`
        : `${themeColors?.CustomerInfoModalPhoneInputTextColor?.value}`,
    fontSize:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalPhoneInputTextSize?.value[getScreenSizeCategory()] !=
      0
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalPhoneInputTextSize?.value[
            getScreenSizeCategory()
          ]
        : themeColors?.CustomerInfoModalPhoneInputTextSize?.value[
            getScreenSizeCategory()
          ],
    fontWeight:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalPhoneInputTextWeight?.value != ""
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalPhoneInputTextWeight?.value
        : themeColors?.CustomerInfoModalPhoneInputTextWeight?.value,
    fontFamily:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalPhoneInputTextFont?.value != ""
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalPhoneInputTextFont?.value
        : themeColors?.CustomerInfoModalPhoneInputTextFont?.value,
    fontStyle:
      layout?.CustomerInfoModalLayout?.body[0].styles
        ?.CustomerInfoModalPhoneInputTextStyle?.value !== ""
        ? layout?.CustomerInfoModalLayout?.body[0].styles
            ?.CustomerInfoModalPhoneInputTextStyle?.value
        : themeColors?.CustomerInfoModalPhoneInputTextStyle?.value,
  };

  const content = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            minWidth: smDown
              ? 30
              : layout?.CustomerInfoModalLayout?.body[0].styles
                ?.CustomerInfoModalCloseIconHeightWidth?.value,
            height: smDown
              ? 30
              : layout?.CustomerInfoModalLayout?.body[0].styles
                ?.CustomerInfoModalCloseIconHeightWidth?.value,
            borderRadius: smDown
              ? 8
              : `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalCloseIconBorderRadius?.value}px`,
            backgroundColor:
              layout?.CustomerInfoModalLayout?.body[0].styles
                ?.CustomerInfoModalCloseIconBackColor?.value || "#c9c7c7ff",
            color:
              layout?.CustomerInfoModalLayout?.body[0].styles
                ?.CustomerInfoModalCloseIconColor?.value || "#fff",
            fontWeight: "bold",
            fontSize: smDown ? 16 : 20,
          }}
        >
          <Iconify icon="mdi:close" width={24} height={24} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              fontWeight: "bold",
              fontSize: "1rem",
              ...getHeadingStyles,
            }}
          >
            Please enter your phone number:
          </Typography>

          <RHFTextField
            fullWidth
            name="phone"
            placeholder="3xxxxxxxxx"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius:
                  layout?.CustomerInfoModalLayout?.body[0].styles
                    ?.CustomerInfoModalPhoneInputBorderRadius?.value != 0
                    ? `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalPhoneInputBorderRadius?.value}px`
                    : `${themeColors?.CustomerInfoModalPhoneInputBorderRadius?.value}px`,

                backgroundColor:
                  layout?.CustomerInfoModalLayout?.body[0].styles
                    ?.CustomerInfoModalPhoneInputBackgroundColor?.value !== ""
                    ? layout?.CustomerInfoModalLayout?.body[0].styles
                        ?.CustomerInfoModalPhoneInputBackgroundColor?.value
                    : themeColors?.CustomerInfoModalPhoneInputBackgroundColor
                        ?.value,

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    layout?.CustomerInfoModalLayout?.body[0].styles
                      ?.CustomerInfoModalPhoneInputBorderColor?.value || "#ccc",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    layout?.CustomerInfoModalLayout?.body[0].styles
                      ?.CustomerInfoModalPhoneInputBorderFocusColor?.value ||
                    "",
                  borderWidth: 2,
                },
              },

              "& .MuiInputBase-input": {
                ...getPhoneInputStyles,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+92</InputAdornment>
              ),
              inputMode: "numeric",
            }}
            inputProps={{
              maxLength: 10,
              onInput: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              },
              onKeyDown: (e) => {
                if (
                  !/^[0-9]$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          type="submit"
          fullWidth
          disabled={!isValid || isSubmitting}
          style={{
            borderRadius: `${layout?.CustomerInfoModalLayout?.body[0].styles?.CustomerInfoModalSubmitButtonBorderRadius?.value}px`,
            padding: smDown ? "12px" : "12px 24px",
            fontWeight: "bold",
            fontSize: smDown ? 12 : 16,
            backgroundColor: isValid
              ? getSubmitEnabledStyles.backgroundColor
              : getSubmitDisabledStyles.backgroundColor,
            color: isValid
              ? getSubmitEnabledStyles.color
              : getSubmitDisabledStyles.color,
            ...getSubmitTextStyles,
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </FormProvider>
  );

  if (previewMode) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          backgroundColor:
            themeColors?.CustomerInfoModalBackgroundColor ||
            styles?.CustomerInfoModalBackgroundColor ||
            "#fff",
          borderRadius: "20px",
          boxShadow: 24,
          padding: "32px 24px 24px",
          border: "2px solid #e0e0e0",
          width: "50%",
          margin: "auto",
          mt: 14,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {content}
    </Dialog>
  );
}
