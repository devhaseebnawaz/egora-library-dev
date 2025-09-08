import React, { useMemo } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { Icon } from "@iconify/react";
import arrowRightIcon from "@iconify-icons/mdi/arrow-right";
import deleteIcon from "@iconify-icons/mdi/delete";
import plusIcon from "@iconify-icons/mdi/plus";
import closeIcon from "@iconify-icons/mdi/close";
import CartItems from "./CartItems";
import { fNumber } from "../../../utils/formatNumber";
import { calculateAndRoundTax } from "../../../utils/tax";
import {
  calculateSubTotal,
  isApplicable,
  calculateServiceFee,
  calculateFinalTotal,
} from "../../../utils/cart";
import { getScreenSizeCategory } from '../../../utils/fontsize';

const CartDrawer = ({
  open,
  onClose,
  themeColors,
  actions,
  prop,
  styles,
  states,
  layout,
  globalComponentStyles,
  previewMode = false
}) => {
  layout = layout?.json ? layout?.json : layout
  const getHeadingStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextColor
          ?.value
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.cartDrawerHeadingsTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerHeadingsTextSize?.value[getScreenSizeCategory()],

    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextFont?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.cartDrawerHeadingsTextFont?.value,
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerHeadingsTextWeight?.value,

    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerHeadingsTextStyle
          ?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.cartDrawerHeadingsTextStyle?.value,
  };

  const getSubHeadingStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSubHeadingsTextColor?.value
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.cartDrawerSubHeadingsTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSubHeadingsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSubHeadingsTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextFont
        ?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSubHeadingsTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.cartDrawerSubHeadingsTextFont?.value,

    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSubHeadingsTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSubHeadingsTextStyle?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSubHeadingsTextStyle?.value,
  };

  const getAddMoreItemButtonStyles = {
    width:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemHeightWidth?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemHeightWidth?.value
        : themeColors?.cartDrawerAddMoreItemHeightWidth?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemHeightWidth?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemHeightWidth?.value
        : themeColors?.cartDrawerAddMoreItemHeightWidth?.value,

    color: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemIconColor?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemIconColor?.value}`
      : `${themeColors?.cartDrawerAddMoreItemIconColor?.value}`,
  };

  const getDescriptionStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerDescriptionTextColor?.value
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.cartDrawerDescriptionTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerDescriptionTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerDescriptionTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextFont
        ?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerDescriptionTextFont?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.cartDrawerDescriptionTextFont?.value,

    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDescriptionTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerDescriptionTextStyle?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.cartDrawerDescriptionTextStyle?.value,
  };

  const getPriceTextStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextColor
          ?.value
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.cartDrawerPriceTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerPriceTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerPriceTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextFont
        ?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextFont
          ?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.cartDrawerPriceTextFont?.value,
    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerPriceTextStyle
          ?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.cartDrawerPriceTextStyle?.value,
  };

  const getTotalTextStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextColor
          ?.value
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : themeColors?.cartDrawerTotalTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextSize
        ?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextSize
          ?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerTotalTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerTotalTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextFont
        ?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextFont
          ?.value
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : themeColors?.cartDrawerTotalTextFont?.value,
    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerTotalTextStyle
          ?.value
        : globalComponentStyles?.Text?.fontStyle?.value != ""
          ? globalComponentStyles?.Text?.fontStyle?.value
          : themeColors?.cartDrawerTotalTextStyle?.value,
  };

  const getButtonStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonBackgroundColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerButtonBackgroundColor?.value
        : globalComponentStyles?.Button?.backgroundColor?.value != ""
          ? globalComponentStyles?.Button?.backgroundColor?.value
          : themeColors?.cartDrawerButtonBackgroundColor?.value,
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextColor
          ?.value
        : globalComponentStyles?.Button?.color?.value != ""
          ? globalComponentStyles?.Button?.color?.value
          : themeColors?.cartDrawerButtonTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Button?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerButtonTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerButtonTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextFont
        ?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextFont
          ?.value
        : globalComponentStyles?.Button?.fontFamily?.value != ""
          ? globalComponentStyles?.Button?.fontFamily?.value
          : themeColors?.cartDrawerButtonTextFont?.value,
    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextStyle
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonTextStyle
          ?.value
        : globalComponentStyles?.Button?.fontStyle?.value != ""
          ? globalComponentStyles?.Button?.fontStyle?.value
          : themeColors?.cartDrawerButtonTextStyle?.value,
    borderRadius:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonBorderRadius
        ?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerButtonBorderRadius
          ?.value
        : globalComponentStyles?.Button?.borderRadius?.value != 0
          ? globalComponentStyles?.Button?.borderRadius?.value
          : themeColors?.cartDrawerButtonBorderRadius?.value,
  };

  const getSecondaryButtonStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerSecondaryButtonBackgroundColor?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSecondaryButtonBackgroundColor?.value
        : globalComponentStyles?.Button?.secondaryBackgroundColor?.value != ""
          ? globalComponentStyles?.Button?.secondaryBackgroundColor?.value
          : themeColors?.cartDrawerSecondaryButtonBackgroundColor?.value,
    color:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerSecondaryButtonTextColor?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSecondaryButtonTextColor?.value
        : globalComponentStyles?.Button?.secondaryColor?.value != ""
          ? globalComponentStyles?.Button?.secondaryColor?.value
          : themeColors?.cartDrawerSecondaryButtonTextColor?.value,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerSecondaryButtonTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSecondaryButtonTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Button?.secondarySize?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Button?.secondarySize?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSecondaryButtonTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSecondaryButtonTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSecondaryButtonTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSecondaryButtonTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerSecondaryButtonTextFont?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSecondaryButtonTextFont?.value
        : globalComponentStyles?.Button?.secondaryFontFamily?.value != ""
          ? globalComponentStyles?.Button?.secondaryFontFamily?.value
          : themeColors?.cartDrawerSecondaryButtonTextFont?.value,
    fontStyle:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerSecondaryButtonTextStyle?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerSecondaryButtonTextStyle?.value
        : globalComponentStyles?.Button?.secondaryFontWeight?.value != ""
          ? globalComponentStyles?.Button?.secondaryFontWeight?.value
          : themeColors?.cartDrawerSecondaryButtonTextStyle?.value,
  };

  const getIconButtonStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles
        ?.cartDrawerIconButtonBackgroundColor?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerIconButtonBackgroundColor?.value
        : globalComponentStyles?.IconButton?.backgroundColor?.value != ""
          ? globalComponentStyles?.IconButton?.backgroundColor?.value
          : themeColors?.cartDrawerIconButtonBackgroundColor?.value,
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonColor
          ?.value
        : globalComponentStyles?.IconButton?.color?.value != ""
          ? globalComponentStyles?.IconButton?.color?.value
          : themeColors?.cartDrawerIconButtonColor?.value,
    width:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonSize
        ?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonSize
          ?.value
        : globalComponentStyles?.IconButton?.size?.value != 0
          ? globalComponentStyles?.IconButton?.size?.value
          : themeColors?.cartDrawerIconButtonSize?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonSize
        ?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonSize
          ?.value
        : globalComponentStyles?.IconButton?.size?.value != 0
          ? globalComponentStyles?.IconButton?.size?.value
          : themeColors?.cartDrawerIconButtonSize?.value,
    borderRadius:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIconButtonBorderRadius
        ?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles
          ?.cartDrawerIconButtonBorderRadius?.value
        : globalComponentStyles?.IconButton?.borderRadius?.value != 0
          ? globalComponentStyles?.IconButton?.borderRadius?.value
          : themeColors?.cartDrawerIconButtonBorderRadius?.value,
  };

  const getDividerStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDividerColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDividerColor
          ?.value
        : globalComponentStyles?.Divider?.color?.value != ""
          ? globalComponentStyles?.Divider?.color?.value
          : themeColors?.cartDrawerDividerColor?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDividerHeight
        ?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDividerHeight
          ?.value
        : globalComponentStyles?.Divider?.height?.value != 0
          ? globalComponentStyles?.Divider?.height?.value
          : themeColors?.cartDrawerDividerHeight?.value,
  };

  const getDrawerStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBackgroundColor
        ?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBackgroundColor
          ?.value
        : globalComponentStyles?.Drawer?.backgroundColor?.value != ""
          ? globalComponentStyles?.Drawer?.backgroundColor?.value
          : themeColors?.cartDrawerBackgroundColor?.value,
    borderTopLeftRadius:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBorderRadius?.value !=
        0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBorderRadius
          ?.value
        : globalComponentStyles?.Drawer?.borderRadius?.value != 0
          ? globalComponentStyles?.Drawer?.borderRadius?.value
          : themeColors?.cartDrawerBorderRadius?.value,
    borderBottomLeftRadius:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBorderRadius?.value !=
        0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerBorderRadius
          ?.value
        : globalComponentStyles?.Drawer?.borderRadius?.value != 0
          ? globalComponentStyles?.Drawer?.borderRadius?.value
          : themeColors?.cartDrawerBorderRadius?.value,
  };

  const getAddMoreItemTextStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerAddMoreItemTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerAddMoreItemTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerAddMoreItemTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextFont?.value != ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.cartDrawerAddMoreItemTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerAddMoreItemTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerAddMoreItemTextStyle?.value}`,
  };

  ///////

  const getItemPriceStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerSummaryItemPriceTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSummaryItemPriceTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSummaryItemPriceTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextFont?.value != ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.cartDrawerSummaryItemPriceTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemPriceTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerSummaryItemPriceTextStyle?.value}`,
  };

  const getItemIncreaseButtonStyles = {
    width:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemHeightWidth?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemHeightWidth?.value
        : themeColors?.cartDrawerIncreaseItemHeightWidth?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemHeightWidth?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemHeightWidth?.value
        : themeColors?.cartDrawerIncreaseItemHeightWidth?.value,

    color: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemIconColor?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerIncreaseItemIconColor?.value}`
      : `${themeColors?.cartDrawerIncreaseItemIconColor?.value}`,
  };

  const getItemDecreaseButtonStyles = {
    width:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemHeightWidth?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemHeightWidth?.value
        : themeColors?.cartDrawerDecreaseItemHeightWidth?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemHeightWidth?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemHeightWidth?.value
        : themeColors?.cartDrawerDecreaseItemHeightWidth?.value,

    color: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemIconColor?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerDecreaseItemIconColor?.value}`
      : `${themeColors?.cartDrawerDecreaseItemIconColor?.value}`,
  };

  const getItemDescriptionStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerSummaryItemDescriptionTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSummaryItemDescriptionTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSummaryItemDescriptionTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextFont?.value != ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.cartDrawerSummaryItemDescriptionTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemDescriptionTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerSummaryItemDescriptionTextStyle?.value}`,
  };

  const getItemHeadingStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerSummaryItemHeadingsTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSummaryItemHeadingsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSummaryItemHeadingsTextWeight?.value,
    fontFamily:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextFont?.value != ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.cartDrawerSummaryItemHeadingsTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemHeadingsTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerSummaryItemHeadingsTextStyle?.value}`,
  };

  const getItemNameStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerSummaryItemNameTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerSummaryItemNameTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerSummaryItemNameTextWeight?.value,

    fontFamily: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextFont?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextFont?.value}`
      : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.cartDrawerSummaryItemNameTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemNameTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerSummaryItemNameTextStyle?.value}`,
  };

  const getImageStyles = {
    width:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageHeightWidth?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageHeightWidth?.value
        : themeColors?.cartDrawerSummaryItemImageHeightWidth?.value,
    height:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageHeightWidth?.value != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageHeightWidth?.value
        : themeColors?.cartDrawerSummaryItemImageHeightWidth?.value,

    backgroundColor: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageBackgroundColor?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageBackgroundColor?.value}`
      : `${themeColors?.cartDrawerSummaryItemImageBackgroundColor?.value}`,

    borderRadius: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageBorderRadius?.value != 0
      ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerSummaryItemImageBorderRadius?.value
      : themeColors?.cartDrawerSummaryItemImageBorderRadius?.value,
  };

  const getItemQtyStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerItemQtyTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerItemQtyTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerItemQtyTextWeight?.value,

    fontFamily: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextFont?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextFont?.value}`
      : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.cartDrawerItemQtyTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerItemQtyTextStyle?.value}`,
  };

  const getItemNotesStyles = {
    color:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.cartDrawerItemNotesTextColor?.value}`,
    fontSize:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.cartDrawerItemNotesTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextWeight?.value != ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.cartDrawerItemNotesTextWeight?.value,

    fontFamily: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextFont?.value != ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextFont?.value}`
      : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.cartDrawerItemNotesTextFont?.value}`,

    fontStyle: layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextStyle?.value !== ""
      ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemNotesTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.cartDrawerItemNotesTextStyle?.value}`,
  };

  const getItemQtyButtonStyles = {
    backgroundColor:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyButtonBackgroundColor?.value !== ""
        ? `${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyButtonBackgroundColor?.value}`
        : globalComponentStyles?.Button?.fontFamily?.value !== ""
          ? globalComponentStyles?.Button?.fontFamily?.value
          : themeColors?.cartDrawerItemQtyButtonBackgroundColor?.value,
    borderRadius:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyBorderRadius?.value !== ""
        ? layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyBorderRadius?.value
        : globalComponentStyles?.Button?.borderRadius?.value !== ""
          ? globalComponentStyles?.Button?.borderRadius?.value
          : themeColors?.cartDrawerItemQtyBorderRadius?.value,
    border:
      layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyBorderColor?.value !== ""
        ? `2px solid ${layout?.cartDrawerLayout?.body[0].styles?.cartDrawerItemQtyBorderColor?.value}`
        : `2px solid  ${themeColors?.cartDrawerItemQtyBorderColor?.value}`,
  };

  const cardItems = states.cardItems?.items ?? [];
  const { orderType, franchise } = states ?? {};
  const { serviceFeesObject, configurations, storeTaxOnCash, platformFees, deliveryFees } = franchise ?? {};
  const {
    isServiceFeesApplicableOnStore,
    isTaxApplicableOnStore,
    isPlatformFeeApplicableOnStore,
    isDeliveryFeeApplicableOnStore
  } = configurations ?? {};
  const taxRate = isTaxApplicableOnStore ? storeTaxOnCash / 100 : 0;

  let discount = 0;
  let paymentOption = "cash";
  let subTotal = calculateSubTotal(cardItems);
  const taxAmount = calculateAndRoundTax(subTotal, taxRate, discount);

  const serviceFee = useMemo(
    () =>
      cardItems?.length > 0 &&
        isServiceFeesApplicableOnStore &&
        isApplicable(serviceFeesObject?.[orderType]?.cash?.applicable)
        ? calculateServiceFee(
          states,
          orderType,
          paymentOption,
          subTotal,
          discount
        )
        : 0,
    [cardItems, subTotal, taxAmount]
  );
  const totalCartQuantity = useMemo(() => {
    return cardItems?.reduce((acc, item) => acc + item.qty, 0) || 0;
  }, [cardItems]);
  let selectedTip = 0;

  const renderServiceFee = () => {
    if (
      isServiceFeesApplicableOnStore &&
      isApplicable(serviceFeesObject?.[orderType]?.cash?.applicable) &&
      serviceFee > 0
    ) {
      return (
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ ...getPriceTextStyles }}>Service Fee</Typography>
          <Typography sx={{ ...getPriceTextStyles }}>
            Rs. {fNumber(serviceFee)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const content = (
    <Box style={{ position: "relative", height: "100%", ...getDrawerStyles }}>
      {totalCartQuantity > 0 && <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Typography
          sx={{ ...getHeadingStyles }}
        >
          Your Cart
        </Typography>

        <IconButton onClick={onClose} style={getIconButtonStyles}>
          <Icon icon={closeIcon} width={18} height={18} />
        </IconButton>
      </Box>}

      {totalCartQuantity === 0 ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/cartIcon.svg"
            alt="Bag Icon"
            width={100}
            height={100}
          />
          <Typography
            style={{ marginTop: 16, ...getSubHeadingStyles }}
          >
            Your Cart is Empty
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginTop: 8, marginBottom: 16, maxWidth: 240 }}
            sx={{ ...getDescriptionStyles }}
          >
            Looks like you haven’t added anything to your cart yet. Start
            exploring and shop your favorite items!
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              if (!previewMode) {
                onClose()
              }
            }}
            style={{
              textTransform: "none",
              paddingLeft: 24,
              paddingRight: 24,
              ...getSecondaryButtonStyles,
            }}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          {cardItems?.map((cartItem, index) => (
            <CartItems
              previewMode={previewMode}
              themeColors={themeColors}
              globalComponentStyles={globalComponentStyles}
              layout={layout}
              key={index}
              cartItem={cartItem}
              actions={actions}
              index={index}
              showDeleteIndex={states.showDeleteIndex}
              setShowDeleteIndex={states.setShowDeleteIndex}
              handleRemoveFromCart={actions.handleRemoveFromCart}
              handleMenuItemClick={actions.handleMenuItemClick}
              states={states}
              getItemPriceStyles={getItemPriceStyles}
              getItemIncreaseButtonStyles={getItemIncreaseButtonStyles}
              getItemDecreaseButtonStyles={getItemDecreaseButtonStyles}
              getItemDescriptionStyles={getItemDescriptionStyles}
              getItemHeadingStyles={getItemHeadingStyles}
              getItemNameStyles={getItemNameStyles}
              getImageStyles={getImageStyles}
              getItemQtyStyles={getItemQtyStyles}
              getItemQtyButtonStyles={getItemQtyButtonStyles}
              getItemNotesStyles={getItemNotesStyles}
            />
          ))}

          <Divider style={{ margin: "16px 0", ...getDividerStyles }} />

          <Button
            fullWidth
            disableRipple
            disableElevation
            onClick={() => {
              if (!previewMode) {
                onClose()
              }
            }}
            startIcon={
              <Icon
                icon="mdi:plus"

                style={{ marginRight: 4, ...getAddMoreItemButtonStyles }}
              />
            }
            style={{
              textTransform: "none",
              justifyContent: "flex-start",
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 8,
              backgroundColor: "transparent",
              ...getAddMoreItemTextStyles,
            }}
          >
            Add more items
          </Button>

          <Divider style={{ margin: "16px 0", ...getDividerStyles }} />

          <Box style={{ marginBottom: 8 }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ ...getPriceTextStyles }}>
                Sub Total
              </Typography>
              <Typography sx={{ ...getPriceTextStyles }}>
                Rs. {fNumber(calculateSubTotal(cardItems))}
              </Typography>
            </Box>
            {isPlatformFeeApplicableOnStore && (
              <Box
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ ...getPriceTextStyles }}>
                  Platform Fee
                </Typography>
                <Typography sx={{ ...getPriceTextStyles }}>
                  Rs. {platformFees}
                </Typography>
              </Box>
            )}
            {renderServiceFee()}
            {isDeliveryFeeApplicableOnStore && orderType === "storeDelivery" && (
              <Box
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ ...getPriceTextStyles }}>
                  Delivery Fee
                </Typography>
                <Typography sx={{ ...getPriceTextStyles }}>
                  Rs. {deliveryFees}
                </Typography>
              </Box>
            )}

            {isTaxApplicableOnStore && (
              <Box
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography sx={{ ...getPriceTextStyles }}>Tax </Typography>
                <Typography sx={{ ...getPriceTextStyles }}>
                  {" "}
                  Rs. {taxAmount ? fNumber(taxAmount) : 0}
                </Typography>
              </Box>
            )}
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Typography sx={{ ...getTotalTextStyles }}>
                Grand Total
              </Typography>
              <Typography sx={{ ...getTotalTextStyles }}>
                Rs.{" "}
                {fNumber(
                  (
                    Number(
                      calculateFinalTotal(cardItems, selectedTip, discount)
                    ) +
                    Number(taxAmount) +
                    Number(serviceFee) +
                    (isPlatformFeeApplicableOnStore
                      ? Number(platformFees)
                      : 0) +
                    ((isDeliveryFeeApplicableOnStore && orderType === "storeDelivery")
                      ? Number(deliveryFees)
                      : 0)
                  ).toFixed(2)
                )}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (!previewMode) {
                actions.naviagateCheckout();
              }
            }}
            endIcon={<Icon icon={arrowRightIcon} width={20} height={20} />}
            style={{
              textTransform: "none",
              marginTop: 16,
              paddingTop: 12,
              paddingBottom: 12,
              justifyContent: "space-between",
              paddingLeft: 16,
              paddingRight: 16,
              ...getButtonStyles,
            }}
          >
            Checkout
          </Button>
        </>
      )}
    </Box>
  )

  return previewMode ? (
    <Box
      style={{
        width: "50%",
        margin: "0 auto",
        padding: 16,
        boxSizing: "border-box",
        border: '2px solid #f0f0f0',
        ...getDrawerStyles,
      }}
    >{content}</Box>
  ) : (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            width: "100%",
            maxWidth: 400,
            padding: 16,
            ...getDrawerStyles,
          },
        }}
      >
        {content}
      </Drawer>

    </>
  );

};

export default CartDrawer;
