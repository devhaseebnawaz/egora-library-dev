'use client';
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Switch,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import UniversalImage from "../../../UniversalImage";
import { fNumber } from "../../../utils/formatNumber";
import { borderRadius, Container } from "@mui/system";
import { useSnackbar } from "../../snackbar";
// import LoadingScreen from "src/components/loading-screen";
import capitalizeWords from "../../../utils/capitalizeWords";
import { SvgIcon } from '@mui/material';
import { getIconWidthHeight, getScreenSizeCategory } from '../../../utils/fontsize';

export function StarIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M17.56,21 C17.4000767,21.0006435 17.2423316,20.9629218 17.1,20.89 L12,18.22 L6.9,20.89 C6.56213339,21.067663 6.15259539,21.0374771 5.8444287,20.8121966 C5.53626201,20.5869161 5.38323252,20.2058459 5.45,19.83 L6.45,14.2 L2.33,10.2 C2.06805623,9.93860108 1.9718844,9.55391377 2.08,9.2 C2.19824414,8.83742187 2.51242293,8.57366684 2.89,8.52 L8.59,7.69 L11.1,2.56 C11.2670864,2.21500967 11.6166774,1.99588989 12,1.99588989 C12.3833226,1.99588989 12.7329136,2.21500967 12.9,2.56 L15.44,7.68 L21.14,8.51 C21.5175771,8.56366684 21.8317559,8.82742187 21.95,9.19 C22.0581156,9.54391377 21.9619438,9.92860108 21.7,10.19 L17.58,14.19 L18.58,19.82 C18.652893,20.2027971 18.4967826,20.5930731 18.18,20.82 C17.9989179,20.9468967 17.7808835,21.010197 17.56,21 L17.56,21 Z" />
    </SvgIcon>
  );
}

export default function ReviewPage({ id, styles, layout, globalComponentStyles, themeColors, states,
  previewMode = false, actions
}) {

  const reviewOrderStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageReviewOrderHeadingsTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageReviewOrderHeadingsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageReviewOrderHeadingsTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageReviewOrderHeadingsTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewOrderHeadingsTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageReviewOrderHeadingsTextStyle?.value,
  };

  const questionsStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageQuestionsTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageQuestionsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageQuestionsTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageQuestionsTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageQuestionsTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageQuestionsTextStyle?.value,
  };

  const reviewItemHeadingTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewEachItemHeadingTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewEachItemHeadingTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewEachItemHeadingTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewEachItemHeadingTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewEachItemHeadingTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewEachItemHeadingTextStyle?.value,
  };

  const orderNoTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageOrderNoTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageOrderNoTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageOrderNoTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageOrderNoTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderNoTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageOrderNoTextStyle?.value,
  };

  const orderTotalTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageOrderTotalTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageOrderTotalTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageOrderTotalTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageOrderTotalTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageOrderTotalTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageOrderTotalTextStyle?.value,
  };

  const variantHeadingTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageVarinatHeadingTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageVarinatHeadingTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageVarinatHeadingTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageVarinatHeadingTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVarinatHeadingTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageVarinatHeadingTextStyle?.value,
  };

  const getSelectedVariantHeadingTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageSelectedVarinatHeadingTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageSelectedVarinatHeadingTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageSelectedVarinatHeadingTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageSelectedVarinatHeadingTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSelectedVarinatHeadingTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageSelectedVarinatHeadingTextStyle?.value,
  };

  const getSubmitButtonStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextColor?.value}`
        : globalComponentStyles?.Button?.color?.value != ""
          ? globalComponentStyles?.Button?.color?.value
          : `${themeColors?.reviewPageSubmitTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageSubmitTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextWeight?.value
        : globalComponentStyles?.Button?.fontWeight?.value != ""
          ? globalComponentStyles?.Button?.fontWeight?.value
          : themeColors?.reviewPageSubmitTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextFont?.value
        : globalComponentStyles?.Button?.fontFamily?.value != ""
          ? globalComponentStyles?.Button?.fontFamily?.value
          : themeColors?.reviewPageSubmitTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextStyle?.value
        : globalComponentStyles?.Button?.fontStyle?.value != ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.reviewPageSubmitTextStyle?.value,
    backgroundColor:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitButtonBackgroundColor?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitButtonBackgroundColor?.value
        : globalComponentStyles?.Button?.fontStyle?.value != ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.reviewPageSubmitButtonBackgroundColor?.value,
    borderRadius:
      layout?.reviewLayout?.body[0].styles?.reviewPageSubmitBorderRadius?.value != ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageSubmitBorderRadius?.value}px`
        : `${themeColors?.reviewPageSubmitBorderRadius?.value}px`,
  };

  const getGoHomeButtonStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextColor?.value}`
        : globalComponentStyles?.Button?.color?.value != ""
          ? globalComponentStyles?.Button?.color?.value
          : `${themeColors?.reviewPageHomeTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageHomeTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextWeight?.value
        : globalComponentStyles?.Button?.fontWeight?.value != ""
          ? globalComponentStyles?.Button?.fontWeight?.value
          : themeColors?.reviewPageHomeTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextFont?.value
        : globalComponentStyles?.Button?.fontFamily?.value != ""
          ? globalComponentStyles?.Button?.fontFamily?.value
          : themeColors?.reviewPageHomeTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextStyle?.value
        : globalComponentStyles?.Button?.fontStyle?.value != ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.reviewPageHomeTextStyle?.value,
    backgroundColor:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeButtonBackgroundColor?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeButtonBackgroundColor?.value
        : globalComponentStyles?.Button?.fontStyle?.value != ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.reviewPageHomeButtonBackgroundColor?.value,
    borderRadius:
      layout?.reviewLayout?.body[0].styles?.reviewPageHomeBorderRadius?.value != ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageHomeBorderRadius?.value}px`
        : `${themeColors?.reviewPageHomeBorderRadius?.value}px`,
  };

  const venueNameTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageVenueNameTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageVenueNameTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageVenueNameTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageVenueNameTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageVenueNameTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageVenueNameTextStyle?.value,
  };
  
  const itemNameTextStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageItemNameTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageItemNameTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageItemNameTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageItemNameTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemNameTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageItemNameTextStyle?.value,
  };

  const itemHeadingsStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageItemHeadingsTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageItemHeadingsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageItemHeadingsTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageItemHeadingsTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemHeadingsTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageItemHeadingsTextStyle?.value,
  };
  
  const itemDescriptionStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageItemDescriptionTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageItemDescriptionTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageItemDescriptionTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageItemDescriptionTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageItemDescriptionTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageItemDescriptionTextStyle?.value,
  };
  
  const getReviewSubmittedStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageReviewSubmittedTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageReviewSubmittedTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageReviewSubmittedTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageReviewSubmittedTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageReviewSubmittedTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageReviewSubmittedTextStyle?.value,
  };
 
  const itemNotesStyles = {
    color:
      layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextColor?.value !== ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.reviewPageNotesTextColor?.value}`,
    fontSize:
      layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.reviewPageNotesTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextWeight?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.reviewPageNotesTextWeight?.value,
    fontFamily:
      layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextFont?.value != ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.reviewPageNotesTextFont?.value,
    fontStyle:
      layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextStyle?.value !== ""
        ? layout?.reviewLayout?.body[0].styles?.reviewPageNotesTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.reviewPageNotesTextStyle?.value,
  };

  const getMainImageStyles = {
    width: layout?.reviewLayout?.body[0].styles?.reviewPageImageHeightWidth?.value != ""
      ? layout?.reviewLayout?.body[0].styles?.reviewPageImageHeightWidth?.value
      : themeColors?.reviewPageImageHeightWidth?.value,

    height: layout?.reviewLayout?.body[0].styles?.reviewPageImageHeightWidth?.value != ""
      ? layout?.reviewLayout?.body[0].styles?.reviewPageImageHeightWidth?.value
      : themeColors?.reviewPageImageHeightWidth?.value,

    backgroundColor: layout?.reviewLayout?.body[0].styles?.reviewPageImageBackgroundColor?.value
      ? layout?.reviewLayout?.body[0].styles?.reviewPageImageBackgroundColor?.value
      : themeColors?.reviewPageImageBackgroundColor?.value,

    borderRadius:
      layout?.reviewLayout?.body[0].styles?.reviewPageImageBorderRadius?.value != ""
        ? `${layout?.reviewLayout?.body[0].styles?.reviewPageImageBorderRadius?.value}px`
        : `${themeColors?.reviewPageImageBorderRadius?.value}px`,
  };
  
  const [ratings, setRatings] = useState({
    ambiance: 0,
    waitTime: 0,
    foodQuality: 0,
    service: 0,
    overAllExperience: 0,
    valueForMoney: 0,
  });

  const { enqueueSnackbar } = useSnackbar();

  const [imageURLs, setImageURLs] = useState([]);
  const [venueImageURL, setVenueImageURL] = useState("");
  const [itemWiseReview, setItemWiseReview] = useState(false);
  const [itemRatings, setItemRatings] = useState({});
  const [comment, setComment] = useState("");
  const [reviewExists, setReviewExists] = useState(states.orderData);
  const [checkAlreadyReviewExists, setCheckAlreadyReviewExists] = useState(states.reviewAlreadyExists);

  const handleGoBack = () => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
    const urlsToAppendId = ["http://localhost:3031", "http://stores.dev.egora.pk", "http://stores.stg.egora.pk", "http://stores.test.egora.pk", "http://stores.egora.pk"];
    if (urlsToAppendId.includes(baseUrl)) {
      actions.navigateToHome(`${baseUrl}/?${(states?.orderData?.venueId?.franchiseId)}`)
    } else {
      actions.navigateToHome(`${baseUrl}`)
    }
  };

  useEffect(() => {
    setReviewExists(states.orderData);
    setCheckAlreadyReviewExists(states.reviewAlreadyExists);
  }, [states]);

  const handleRatingChange = (question, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [question]: prevRatings[question] === rating ? 0 : rating,
    }));
  };

  const handleItemRatingChange = (itemId, rating) => {
    setItemRatings((prevItemRatings) => ({
      ...prevItemRatings,
      [itemId]: prevItemRatings[itemId] === rating ? 0 : rating,
    }));
  };

  const ratingMessages = {
    ambiance: " Ambiance",
    waitTime: "Wait time",
    foodQuality: "Food quality",
    service: "Service",
    overAllExperience: "Overall experience",
    valueForMoney: "Value for money",
  };

  const handleSubmit = async () => {
    const orderId = reviewExists?.id;
    const venueId = reviewExists?.venueId?.id;
    const levelId = reviewExists?.levelId;

    const requestBody = {
      overallOrderRating: ratings,
      orderId,
      venueId,
      levelId,
    };

    if (itemWiseReview) {
      const itemsRating = Object.keys(itemRatings).map((itemId) => ({
        id: itemId,
        itemRating: itemRatings[itemId],
      }));
      requestBody.itemsRating = itemsRating;
    }

    if (comment.trim() !== "") {
      requestBody.comments = comment;
    }

    if (itemWiseReview) {
      const allItemsRated = reviewExists.items.every(
        (item) => itemRatings[item.id] > 0
      );
      if (!allItemsRated) {
        enqueueSnackbar("Please rate all items before submitting.", {
          variant: "warning",
        });
        return;
      }
    }
     try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Review submitted successfully:", response.data);
        enqueueSnackbar("Review Submitted successfully!");
        handleGoBack()
      } else {
        console.error("Failed to submit review:", response.data);
        enqueueSnackbar("Failed to submit review. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        enqueueSnackbar("Review for this order already submitted.");
      } else {
        console.error("Error submitting review:", error);
        enqueueSnackbar("Failed to submit review. Please try again later.");
      }
    } finally {
      
    }
    
  };

  const renderStars = (question, isItem = false, itemId = null) => {
    return [...Array(5)].map((_, index) => {
      const isSelected = isItem
        ? itemRatings[itemId] > index
        : ratings[question] > index;

      return (
        <StarIcon
          key={index}
          onClick={() => {
            if (isItem) {
              handleItemRatingChange(itemId, index + 1);
            } else {
              handleRatingChange(question, index + 1);
            }
          }}
          sx={{
            cursor: "pointer",
            color: isSelected ? layout?.reviewLayout?.body[0].styles?.starSelectedColor?.value || themeColors?.starSelectedColor?.value : layout?.reviewLayout?.body[0].styles?.starUnselectedColor?.value || themeColors?.starUnselectedColor?.value,
            fontSize: {
              xs: "20px",
              sm: "30px",
              md: "30px",
            },
            margin: "0 2px",
          }}
        />
      );
    });
  };

  const questionsToRate = [
    "waitTime",
    "foodQuality",
    "service",
    "overAllExperience",
    "valueForMoney",
  ];

  const allQuestionsRated = questionsToRate.every(
    (question) => ratings[question] > 0
  );
  
  return (
    <Container maxWidth="sm" sx={{
      padding: 3,
      mt: 16,
      backgroundColor: layout?.reviewLayout?.body[0].styles?.reviewPageBackgroundColor?.value || themeColors?.reviewPageBackgroundColor?.value
    }}>
      {checkAlreadyReviewExists ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mt: 16, mb: 2, textAlign: "center", ...getReviewSubmittedStyles }}
          >
            You have already submitted the review for this order.
          </Typography>

          <LoadingButton
            fullWidth
            onClick={() => {
              if (!previewMode) {
                handleGoBack()
              }
            }}
            size="large"
            type="submit"
            variant="contained"
            sx={{
              mt: 3, ...getGoHomeButtonStyles,
              '&:hover': {
                backgroundColor:
                  layout?.reviewLayout?.body[0].styles?.reviewPageHomeButtonBackgroundColor?.value !== ""
                    ? layout?.reviewLayout?.body[0].styles?.reviewPageHomeButtonBackgroundColor?.value
                    : globalComponentStyles?.Button?.fontStyle?.value != ""
                      ? globalComponentStyles?.Button?.fontStyle?.value
                      : themeColors?.reviewPageHomeButtonBackgroundColor?.value,
                color:
                  layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextColor?.value !== ""
                    ? `${layout?.reviewLayout?.body[0].styles?.reviewPageHomeTextColor?.value}`
                    : globalComponentStyles?.Button?.color?.value != ""
                      ? globalComponentStyles?.Button?.color?.value
                      : `${themeColors?.reviewPageHomeTextColor?.value}`
              }
            }}
          >
            Go to Home
          </LoadingButton>
        </Box>
      ) : (
        <>
          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 4,
              ...reviewOrderStyles
            }}
          >
            Review your Order
          </Typography>

          {
            <>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <UniversalImage
                  src={
                    venueImageURL ? venueImageURL : "/assets/placeholder.png"
                  }
                  alt={"Venue Image"}
                  style={{
                    ...getMainImageStyles
                  }}
                />
                <Box>
                  <Typography sx={{ ...venueNameTextStyles }}
                  >
                    {reviewExists?.venueId?.name}
                  </Typography>
                  <Typography sx={{ ...orderNoTextStyles }}>Order # {reviewExists?.billNumber}</Typography>
                  <Typography sx={{ ...orderTotalTextStyles }} >
                    Total: Rs.
                    {fNumber(reviewExists?.total)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ marginY: 2 }} />

              <Box>
                {questionsToRate.map((question) => (
                  <Box
                    key={question}
                    mb={2}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        ...questionsStyles
                      }}
                    >
                      {ratingMessages[question]}
                    </Typography>
                    <Box>{renderStars(question)}</Box>
                  </Box>
                ))}
                <Divider />
                <Box
                  mb={2}
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      ...reviewItemHeadingTextStyles
                    }}
                  >
                    Want to review each item
                  </Typography>
                  <Switch
                    checked={itemWiseReview}
                    onChange={() => setItemWiseReview(!itemWiseReview)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: layout?.reviewLayout?.body[0].styles?.reviewEachItemToggleColor?.value !="" ? layout?.reviewLayout?.body[0].styles?.reviewEachItemToggleColor?.value : themeColors?.reviewEachItemToggleColor?.value,
                        '& + .MuiSwitch-track': {
                          backgroundColor: layout?.reviewLayout?.body[0].styles?.reviewEachItemToggleColor?.value != "" ? layout?.reviewLayout?.body[0].styles?.reviewEachItemToggleColor?.value : themeColors?.reviewEachItemToggleColor?.value,
                        },
                      },
                    }}
                  />
                </Box>
                {itemWiseReview && (
                  <Box>
                    {reviewExists?.items?.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",

                          "@media (max-width: 600px)": {
                            flexDirection: "column",
                            alignItems: "flex-start",
                          },
                          alignItems: "center",
                          gap: "10px",
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <UniversalImage
                            src={
                              item?.photoURL
                              ? `${states.storeImagesBaseUrl}/${item.photoURL}`
                              : "/assets/placeholder.png"
                            }
                            alt={"Item Image"}
                            height={
                              layout?.reviewLayout?.body[0].styles?.reviewPageItemImageHeightWidth?.value != 0
                                ? layout?.reviewLayout?.body[0].styles?.reviewPageItemImageHeightWidth?.value
                                : themeColors?.reviewPageItemImageHeightWidth?.value
                            }
                            width={layout?.reviewLayout?.body[0].styles?.reviewPageItemImageHeightWidth?.value != 0
                              ? layout?.reviewLayout?.body[0].styles?.reviewPageItemImageHeightWidth?.value
                              : themeColors?.reviewPageItemImageHeightWidth?.value}
                            backgroundColor={layout?.reviewLayout?.body[0].styles?.reviewPageItemImageBackgroundColor?.value
                              ? layout?.reviewLayout?.body[0].styles?.reviewPageItemImageBackgroundColor?.value
                              : themeColors?.reviewPageItemImageBackgroundColor?.value}

                            borderRadius={
                              layout?.reviewLayout?.body[0].styles?.reviewPageItemImageBorderRadius?.value != 0
                                ? `${layout?.reviewLayout?.body[0].styles?.reviewPageItemImageBorderRadius?.value}px`
                                : `${themeColors?.reviewPageItemImageBorderRadius?.value}px`}
                          />
                          <Box>
                            <Typography sx={{ ...itemNameTextStyles }}>
                              {item?.qty} X
                              {capitalizeWords(item?.name)}
                            </Typography>
                            {item?.groups && item?.groups?.length > 0 && (
                              <>
                                {item?.selectedVariant && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...variantHeadingTextStyles
                                      }}
                                    >
                                      Variant:
                                    </Typography>
                                    <Typography sx={{ ...getSelectedVariantHeadingTextStyles }}>
                                      {item?.selectedVariant?.name}
                                    </Typography>
                                  </Box>
                                )}
                                <>
                                  {item?.groups?.map((sauce) => (
                                    <Typography
                                      key={index}
                                      variant="caption"
                                      sx={{
                                        display: "flex",
                                        gap: "2px",
                                        ...itemHeadingsStyles,
                                      }}
                                    >
                                      {sauce?.name} :
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          display: "flex",
                                          marginLeft: "5px",
                                          gap: "2px",
                                          ...itemDescriptionStyles
                                        }}
                                      >
                                        {sauce?.items?.map((item, index) => (
                                          <span key={index}>
                                            {item?.item}
                                            {index !== sauce.items.length - 1 &&
                                              ", "}
                                          </span>
                                        ))}
                                      </Typography>
                                    </Typography>
                                  ))}
                                </>
                              </>
                            )}
                            <Typography sx={{ ...itemNotesStyles }}>
                              {item?.notes}
                            </Typography>

                            <Box
                              sx={{
                                display: { xs: "block", sm: "none" },
                                mt: 1,
                                ml: -0.5,
                              }}
                            >
                              <Box>{renderStars(item.id, true, item.id)}</Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                          <Box>{renderStars(item.id, true, item.id)}</Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    mb: 2,
                    mt: 4,
                    backgroundColor: layout?.reviewLayout?.body[0].styles?.reviewPageBackgroundColor?.value || themeColors?.reviewPageBackgroundColor?.value,
                    '& .MuiInputBase-input': {
                      color:
                        layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentTextColor?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentTextColor?.value}`
                          : globalComponentStyles?.Text?.color?.value != ""
                            ? globalComponentStyles?.Text?.color?.value
                            : `${themeColors?.reviewPageAddCommentTextColor?.value}`
                    },
                    '& .MuiInputLabel-root': {
                      color:
                        layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentLabelTextStyle?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentLabelTextStyle?.value}`
                          : globalComponentStyles?.Text?.color?.value != ""
                            ? globalComponentStyles?.Text?.color?.value
                            : `${themeColors?.reviewPageAddCommentLabelTextStyle?.value}`,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value}`
                          : `${themeColors?.reviewPageAddCommentBorderColor?.value}`,
                      },
                      '&:hover fieldset': {
                        borderColor: layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value}`
                          : `${themeColors?.reviewPageAddCommentBorderColor?.value}`,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageAddCommentBorderColor?.value}`
                          : `${themeColors?.reviewPageAddCommentBorderColor?.value}`,
                      },
                    },
                  }}
                />
                <LoadingButton
                  onClick={() => {
                    if (!previewMode) {
                      handleSubmit()
                    }
                  }}
                  color="primary"
                  variant="contained"
                  // loading={isLoading}
                  disabled={!previewMode && (!allQuestionsRated || !reviewExists)}
                  sx={{
                    width: "100%",
                    height: "40px",
                    ...getSubmitButtonStyles,
                    '&:hover': {
                      backgroundColor:
                        layout?.reviewLayout?.body[0].styles?.reviewPageSubmitButtonBackgroundColor?.value !== ""
                          ? layout?.reviewLayout?.body[0].styles?.reviewPageSubmitButtonBackgroundColor?.value
                          : globalComponentStyles?.Button?.fontStyle?.value != ""
                            ? globalComponentStyles?.Button?.fontStyle?.value
                            : themeColors?.reviewPageSubmitButtonBackgroundColor?.value,
                      color:
                        layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextColor?.value !== ""
                          ? `${layout?.reviewLayout?.body[0].styles?.reviewPageSubmitTextColor?.value}`
                          : globalComponentStyles?.Button?.color?.value != ""
                            ? globalComponentStyles?.Button?.color?.value
                            : `${themeColors?.reviewPageSubmitTextColor?.value}`
                    }
                  }}
                >
                  Submit
                </LoadingButton>
              </Box>
            </>
          }
        </>
      )}
    </Container>
  );
}