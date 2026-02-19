import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  Button,
  Card,
  Stack,
  DialogTitle,
  CardContent,
  DialogActions,
  DialogContent,
  Grid,
  Divider,
  useMediaQuery,
  MenuItem
} from '@mui/material';
import Iconify from '../iconify';
import FormProvider, { RHFTextField } from "../../hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Variant from '../options/Variant';
import Group from '../options/Group';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { getFontSize, getScreenSizeCategory } from '../../../utils/fontsize';
import { fNumber } from "../../../utils/formatNumber";
import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';
import CustomPopover , {usePopover} from '../../custom-popover';


export default function ItemDetailModal({
  themeColors,
  styles,
  actions,
  states,
  onClose,
  // item,
  setItem,
  previewMode = false,
  globalComponentStyles,
  layout
}) {
 layout = layout?.json ? layout?.json : layout
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md")); 
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); 

  const getHeadingStyles = {
    color:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.ItemDetailModalHeadingsTextColor?.value}`,
    fontSize:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.ItemDetailModalHeadingsTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextWeight?.value != ""
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.ItemDetailModalHeadingsTextWeight?.value,

    fontFamily: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextFont?.value != ""
      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextFont?.value}`
      : globalComponentStyles?.Text?.fontFamily?.value != ""
        ? globalComponentStyles?.Text?.fontFamily?.value
        : `${themeColors?.ItemDetailModalHeadingsTextFont?.value}`,

    fontStyle: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextStyle?.value !== ""
      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalHeadingsTextStyle?.value}`
      : globalComponentStyles?.Text?.fontStyle?.value != ""
        ? globalComponentStyles?.Text?.fontStyle?.value
        : `${themeColors?.ItemDetailModalHeadingsTextStyle?.value}`,
  };

  const getDescriptionStyles = {
    color:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.ItemDetailModalDescriptionTextColor?.value}`,
    fontSize:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.ItemDetailModalDescriptionTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextWeight?.value != ""
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.ItemDetailModalDescriptionTextWeight?.value,
    fontFamily:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextFont?.value != ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.ItemDetailModalDescriptionTextFont?.value}`,

    fontStyle: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextStyle?.value !== ""
      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.ItemDetailModalDescriptionTextStyle?.value}`,
  };

  const getAddToCartEnabledStyles = {
    color:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartEnabledTextColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartEnabledTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.ItemDetailModalAddToCartEnabledTextColor?.value}`,

    backgroundColor:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartEnabledBackgroundColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartEnabledBackgroundColor?.value}`
        : globalComponentStyles?.Button?.backgroundColor?.value != ""
          ? globalComponentStyles?.Button?.backgroundColor?.value
          : `${themeColors?.ItemDetailModalAddToCartEnabledBackgroundColor?.value}`,

  };


  const getAddedQuantityStyles = {
    color:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.ItemDetailModalAddedQtyTextColor?.value}`,
    fontSize:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.ItemDetailModalAddedQtyTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextWeight?.value != ""
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.ItemDetailModalAddedQtyTextWeight?.value,
    fontFamily:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextFont?.value != ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.ItemDetailModalAddedQtyTextFont?.value}`,

    fontStyle: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextStyle?.value !== ""
      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddedQtyTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.ItemDetailModalAddedQtyTextStyle?.value}`,
  };

  const getAddToCartDisabledStyles = {
    color:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartDisabledTextColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartDisabledTextColor?.value}`
        : globalComponentStyles?.Text?.color?.value != ""
          ? globalComponentStyles?.Text?.color?.value
          : `${themeColors?.ItemDetailModalAddToCartDisabledTextColor?.value}`,
    backgroundColor:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartDisabledBackgroundColor?.value !== ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartDisabledBackgroundColor?.value}`
        : globalComponentStyles?.Button?.backgroundColor?.value != ""
          ? globalComponentStyles?.Button?.backgroundColor?.value
          : `${themeColors?.ItemDetailModalAddToCartDisabledBackgroundColor?.value}`,

  };

  const getAddToCartStyles = {
    fontSize:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextSize?.value[getScreenSizeCategory()] != 0
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextSize?.value[getScreenSizeCategory()]
        : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
          ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
          : themeColors?.ItemDetailModalAddToCartTextSize?.value[getScreenSizeCategory()],
    fontWeight:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextWeight?.value != ""
        ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextWeight?.value
        : globalComponentStyles?.Text?.fontWeight?.value != ""
          ? globalComponentStyles?.Text?.fontWeight?.value
          : themeColors?.ItemDetailModalAddToCartTextWeight?.value,
    fontFamily:
      layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextFont?.value != ""
        ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextFont?.value}`
        : globalComponentStyles?.Text?.fontFamily?.value != ""
          ? globalComponentStyles?.Text?.fontFamily?.value
          : `${themeColors?.ItemDetailModalAddToCartTextFont?.value}`,

    fontStyle: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextStyle?.value !== ""
      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartTextStyle?.value}`
      : globalComponentStyles?.Text?.fontWeight?.value != ""
        ? globalComponentStyles?.Text?.fontWeight?.value
        : `${themeColors?.ItemDetailModalAddToCartTextStyle?.value}`,
  };

  const getItemDetailImageStyle = () => {
    const screen = getScreenSizeCategory();

    let size =
      layout?.itemDetailModalLayout?.body?.[0]?.styles?.ItemDetailModalImageHeightWidth?.value?.[screen] != 0
        ? layout?.itemDetailModalLayout?.body?.[0]?.styles?.ItemDetailModalImageHeightWidth?.value?.[screen]
          : themeColors?.ItemDetailModalImageHeightWidth?.value?.[screen];

    size = size > 500 ? 500 : size;

    const borderRadius =
      layout?.itemDetailModalLayout?.body?.[0]?.styles?.ItemDetailModalImageBorderRadius?.value !== ""
        ? layout?.itemDetailModalLayout?.body?.[0]?.styles?.ItemDetailModalImageBorderRadius?.value
          : themeColors?.ItemDetailModalImageBorderRadius?.value;

    return {
      maxWidth: size,
      maxHeight: size,
      borderRadius,
    };
  };

  const methods = useForm();
  const { selectedVenue, choiceGroups, isItemEdit } = states ?? {}
  const { isOnlineForStore } = selectedVenue ?? {}
  const [filteredChoiceGroups, setFilteredChoiceGroups] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState({ items: [] });
  const [quantity, setQuantity] = useState(isItemEdit ? states.itemForDetailedModal.qty : 1);
  const [notes, setNotes] = useState(states.itemForDetailedModal?.notes ? states.itemForDetailedModal?.notes : "");
  const { copy } = useCopyToClipboard();
  const sharePopover = usePopover();

  // Share functions
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

const socialButtons = [
  { title: 'Copy Link', icon: 'mdi:link-variant', bgColor: '#4A90E2', hoverColor: '#357ABD', type: 'copy' },
  { title: 'Facebook', icon: 'mdi:facebook', bgColor: '#1877F2', hoverColor: '#166FE5', type: 'facebook' },
  { title: 'WhatsApp', icon: 'mdi:whatsapp', bgColor: '#25D366', hoverColor: '#20BA5A', type: 'whatsapp' },
  { title: 'Twitter', icon: 'mdi:twitter', bgColor: '#1DA1F2', hoverColor: '#0D8BD9', type: 'twitter' },
  { title: 'LinkedIn', icon: 'mdi:linkedin', bgColor: '#0077B5', hoverColor: '#006399', type: 'linkedin' },
];

const getButtonStyles = (bgColor, hoverColor) => ({
  width: 36,
  height: 32,
  backgroundColor: bgColor,
  color: '#fff',
  borderRadius: '8px',
  '&:hover': { backgroundColor: hoverColor },
});

const handleShare = (type) => {
  const currentUrl = encodeURIComponent(getCurrentUrl()); 
  const itemName = encodeURIComponent(states.itemForDetailedModal?.name);

  switch (type) {
    case 'copy':
      copy(getCurrentUrl());
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`, '_blank', 'width=600,height=400');
      break;
    case 'whatsapp':
      window.open(`https://wa.me/?text=${itemName}%20${currentUrl}`, '_blank');
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${currentUrl}&text=${itemName}`, '_blank', 'width=600,height=400');
      break;
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`, '_blank', 'width=600,height=400');
      break;
    default:
      break;
  }

  sharePopover.onClose();
};
  const [selectedVariant, setSelectedVariant] = useState(
    isItemEdit ?
      states.itemForDetailedModal.variants
        ? states.itemForDetailedModal.variants.find((i) => i.id == states.itemForDetailedModal?.selectedVariant?.id)
        : ""
      :
      states.itemForDetailedModal.variants
        ? states.itemForDetailedModal.variants.find((i) => i.defaultVariant == true)
        : ""
  );

  const hasSetInitialSauces = useRef(false);

  useEffect(() => {

    if (isItemEdit) {
      if (
        states.itemForDetailedModal?.hasVariant &&
        selectedVariant &&
        states.itemForDetailedModal?.associateChoiceGroupWithPriceVariant
      ) {
        const selectedVariantChoiceGroupIds = selectedVariant.choiceGroup || [];

        const filteredGroups = choiceGroups
          .map((choiceGroup) => {
            if (selectedVariantChoiceGroupIds.includes(choiceGroup.id)) {
              return JSON.parse(JSON.stringify(choiceGroup));
            }
            return null;
          })
          .filter(Boolean);

        setFilteredChoiceGroups(filteredGroups);
      } else if (states.itemForDetailedModal?.choiceGroup && choiceGroups) {
        const filteredGroups = choiceGroups
          .filter((choiceGroup) => states.itemForDetailedModal.choiceGroup.includes(choiceGroup.id))
          .map((group) => JSON.parse(JSON.stringify(group)));

        setFilteredChoiceGroups(filteredGroups);
      }
      if (!hasSetInitialSauces.current && states.itemForDetailedModal?.groups) {
        const initialSelectedSauces = states.itemForDetailedModal.groups;
        setSelectedSauces({ items: initialSelectedSauces });
        hasSetInitialSauces.current = true;
      }

    }

    else {
      if (
        states.itemForDetailedModal?.hasVariant &&
        selectedVariant &&
        states.itemForDetailedModal?.associateChoiceGroupWithPriceVariant
      ) {
        const selectedVariantChoiceGroupIds = selectedVariant.choiceGroup || [];
        const filteredGroups = choiceGroups
          .map((choiceGroup) => {
            if (selectedVariantChoiceGroupIds.includes(choiceGroup.id)) {
              return JSON.parse(JSON.stringify(choiceGroup));
            }
            return null;
          })
          .filter(Boolean);

        setFilteredChoiceGroups(filteredGroups);
      } else if (states.itemForDetailedModal?.choiceGroup && choiceGroups) {
        const filteredGroups = choiceGroups
          .filter((choiceGroup) => states.itemForDetailedModal.choiceGroup.includes(choiceGroup.id))
          .map((group) => JSON.parse(JSON.stringify(group)));

        setFilteredChoiceGroups(filteredGroups);
      }

    }

  }, [choiceGroups, states.itemForDetailedModal, selectedVariant]);

  const calculateTotalPrice = () => {
    const basePrice = selectedVariant
      ? parseFloat(selectedVariant.price)
      : parseFloat(states.itemForDetailedModal?.price);
    const addOnPrices = (states.itemForDetailedModal?.addOns || []).reduce((total, addon) => {
      const addonPrice = parseFloat(addon.price.replace("Rs. ", ""));
      return total + addonPrice;
    }, 0);

    let saucePrices = 0;
    if (selectedSauces?.items?.length > 0) {
      saucePrices = selectedSauces.items
        .map((sauce) => sauce.items)
        .flat()
        .reduce((total, item) => total + parseFloat(item.price), 0);
    }
    const calTotalPrice = (basePrice + addOnPrices + saucePrices) * quantity;
    return `Rs. ${fNumber(calTotalPrice)}`;
  };


  const toggleSauce = (elem, sauce) => {

    let updatedItems = selectedSauces.items.map((item) => ({
      ...item,
      items: [...item.items],
    }));

    const itemIndex = updatedItems.findIndex((item) => item.id === elem.id);

    if (itemIndex !== -1) {
      const sauceIndex = updatedItems[itemIndex].items.findIndex(
        (selected) => selected.id === sauce.id
      );

      if (sauceIndex !== -1) {
        updatedItems[itemIndex].items.splice(sauceIndex, 1);
      } else {
        if (updatedItems[itemIndex].items.length < elem?.quantity) {
          updatedItems[itemIndex].items.push({ ...sauce, price: sauce.price });
        } else {
          updatedItems[itemIndex].items.shift()
          updatedItems[itemIndex].items.push({ ...sauce, price: sauce.price });
        }
      }

      if (updatedItems[itemIndex].items.length === 0) {
        updatedItems.splice(itemIndex, 1);
      }
    } else {
      updatedItems.push({
        ...elem,
        items: [{ ...sauce, price: sauce.price }],
      });
    }

    const isEmpty = updatedItems.length === 0;
    setSelectedSauces(isEmpty ? { items: [] } : { items: updatedItems });
  };

  const toggleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedSauces({ items: [] });
  };


  function generateRandomHexString(length) {
    let result = "";
    const characters = "0123456789abcdef";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleAddItemToCart = async (item, quantity, notes) => {
    let price = 0;

    if (selectedSauces?.items.length > 0) {
      price = selectedSauces.items.reduce((sum, elem) => {
        const elemTotal = elem.items
          ? elem.items.reduce((innerSum, item) => {
            const itemPrice = Number(item.price);
            return innerSum + itemPrice;
          }, 0)
          : 0;
        return sum + elemTotal;
      }, 0);

      price = Math.round(price).toFixed(0);
    }

    try {
      const newItem = {
        ...item,
        ...(item.hasVariant ? { selectedVariant: selectedVariant } : {}),
        isPrepared: false,
        isComplimentary: false,
        isVoidItem: false,
        cartItemId: isItemEdit ? item?.cartItemId : generateRandomHexString(24),
        price: item.hasVariant
          ? selectedVariant.price
          : item.price,
        priceBeforeCompliment: Number(item.hasVariant ? selectedVariant.price : item.price) + Number(price),
        priceWithChoiceGroup: Number(item.hasVariant ? selectedVariant.price : item.price) + Number(price),
      };

      if (isItemEdit) {
        await actions.handleUpdateToCart(newItem, selectedSauces?.items, quantity, notes);
      } else {
        await actions.handleAddToCart(newItem, selectedSauces?.items, quantity, notes);
      }
    } catch (error) {
      console.log("error is", error)
    }
  };


  const isRequiredGroupSelected = (groupId) => {
    const selectedGroup = selectedSauces.items.find((item) => item.id === groupId);
    return (
      selectedGroup && selectedGroup.items.length >= selectedGroup.quantity
    );
  };

  const areAllRequiredGroupsSelected = filteredChoiceGroups?.every((group) => !group.required || isRequiredGroupSelected(group.id));

  const content = (
    <Box
      style={{
        display: 'flex',
        height: previewMode ? '70vh' : '90vh',
        backgroundColor: themeColors?.ItemDetailModalBackgroundColor
          || styles?.ItemDetailModalBackgroundColor
          || '#fff',
        position: 'relative'
      }}
    >

      {/* <Box style={{
        ...(previewMode
          ? {
            position: 'absolute',
            right: '0px',
            top: '0px',
          }
          : {

          }),

      }}>
        <IconButton
          onClick={() => {
            if (!previewMode) {
              actions.handleOpenCard();
              isItemEdit && actions?.handleItemEditClose();
            }
          }}
          style={{
            backgroundColor: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value,
            color: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconColor?.value,
            width: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value,
            height: layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value,
            ...(!previewMode
              ? {
                position: 'absolute',
                right: '20px',
                top: '20px',
              }
              : {
                margin: "0 auto",
              }),


            zIndex: 9999,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#000'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#121212'}
        >
          <Iconify icon="mdi:close" width={20} height={20} />
        </IconButton>
      </Box> */}

       {!mdDown && (
        <Box
          style={{
            flex: 0.42,
            // backgroundColor: themeColors?.ItemDetailModalImageDivBackgroundColor
            //   || styles?.ItemDetailModalImageDivBackgroundColor
            //   || '#f4f4f4',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            margin: 20,
          }}
        >
          <Box
            component="img"
            src={states.itemForDetailedModal?.photoURL
              ? `${states.storeImagesBaseUrl}/${states.itemForDetailedModal.photoURL}`
              : '/assets/placeholder.png'}
            alt={states.itemForDetailedModal?.name || "Menu Item"}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/placeholder.png';
            }}
            style={{
              objectFit: 'contain',
              ...getItemDetailImageStyle()
            }}
          />
        </Box>

      )}

      {/* <Box style={{ width: '1px', backgroundColor: '#e0e0e0' }} /> */}

      <Box
        style={{
          flex: mdDown ? 1 : 0.58,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderLeft: mdDown ? 'none' : '1px solid #dee2e6',
          
        }}
      >
          <Box
    style={{
      padding: smDown ? 10 : 20,
      overflowY: 'auto',
      flexGrow: 1,
      paddingRight: smDown ? 10 : 20,
    }}
  >

        {/* Title and Description */}
        <Box
          style={{
            display: 'flex',
            alignItems: mdDown ? "flex-start" :'center',
            justifyContent: 'space-between',
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ ...getHeadingStyles }}>
            {states.itemForDetailedModal.name}
          </Typography>
          <Box style={{
            ...(previewMode
              ? {
                // position: 'absolute',
                // right: '0px',
                // top: '0px',
                 display: 'flex',
                  gap: '8px',
              }
              : {
                display: 'flex',
                  gap: '8px',
              }),

          }}>
            {/* Share Button */}
              <IconButton
               onClick={(e) => {
                  if (!previewMode) {
                    sharePopover.onOpen(e);
                  }
                }}
                style={{
                  backgroundColor:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value !== ""
                      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value}`
                      : globalComponentStyles?.Icon?.color?.value != ""
                        ? globalComponentStyles?.Icon?.color?.value
                        : `${themeColors?.ItemDetailModalShareIconBackgroundColor?.value}`,
                  color:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconColor?.value !== ""
                      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconColor?.value}`
                      : globalComponentStyles?.Icon?.color?.value != ""
                        ? globalComponentStyles?.Icon?.color?.value
                        : `${themeColors?.ItemDetailModalShareIconColor?.value}`,
                  width:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareHeightWidth?.value != ""
                      ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ""
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.ItemDetailModalShareHeightWidth?.value,
                  height:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareHeightWidth?.value != ""
                      ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ""
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.ItemDetailModalShareHeightWidth?.value,
                  zIndex: 9999,
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value !== ""
                  ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value}`
                  : globalComponentStyles?.Icon?.color?.value != ""
                    ? globalComponentStyles?.Icon?.color?.value
                    : `${themeColors?.ItemDetailModalShareIconBackgroundColor?.value}`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value !== ""
                  ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalShareIconBackgroundColor?.value}`
                  : globalComponentStyles?.Icon?.color?.value != ""
                    ? globalComponentStyles?.Icon?.color?.value
                    : `${themeColors?.ItemDetailModalShareIconBackgroundColor?.value}`}
                title="Share"
              >
                <Iconify icon="mdi:share-variant" width={20} height={20} />
              </IconButton>

              {/* Share Popover Menu */}
               <CustomPopover
                open={sharePopover.open}
                onClose={sharePopover.onClose}
                arrow="top-center"
                PaperProps={{
                  sx: {
                    backgroundColor: 'none',
                    boxShadow: 'none',
                  },
                }}
               >
                <Stack direction="column" spacing={1.5}>
                  {socialButtons.map((btn) => (
                    <IconButton
                      key={btn.title}
                      onClick={() => handleShare(btn.type)}
                      sx={getButtonStyles(btn.bgColor, btn.hoverColor)}
                      title={btn.title}
                    >
                      <Iconify icon={btn.icon} width={24} height={24} />
                    </IconButton>
                  ))}
                </Stack>
             </CustomPopover>
                 <IconButton
                onClick={() => {
                  if (!previewMode) {
                    actions.handleOpenCard(null);
                    isItemEdit && actions?.handleItemEditClose();
                  }
                }}
                style={{
                  backgroundColor:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value !== ""
                      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value}`
                      : globalComponentStyles?.Icon?.color?.value != ""
                        ? globalComponentStyles?.Icon?.color?.value
                        : `${themeColors?.ItemDetailModalCloseIconBackgroundColor?.value}`,
                  color:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconColor?.value !== ""
                      ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconColor?.value}`
                      : globalComponentStyles?.Icon?.color?.value != ""
                        ? globalComponentStyles?.Icon?.color?.value
                        : `${themeColors?.ItemDetailModalCloseIconColor?.value}`,
                  width:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value != ""
                      ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ""
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.ItemDetailModalCloseHeightWidth?.value,
                  height:
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value != ""
                      ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseHeightWidth?.value
                      : globalComponentStyles?.Icon?.size?.value != ""
                        ? globalComponentStyles?.Icon?.size?.value
                        : themeColors?.ItemDetailModalCloseHeightWidth?.value,
                  zIndex: 9999,
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value !== ""
                  ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value}`
                  : globalComponentStyles?.Icon?.color?.value != ""
                    ? globalComponentStyles?.Icon?.color?.value
                    : `${themeColors?.ItemDetailModalCloseIconBackgroundColor?.value}`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value !== ""
                  ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalCloseIconBackgroundColor?.value}`
                  : globalComponentStyles?.Icon?.color?.value != ""
                    ? globalComponentStyles?.Icon?.color?.value
                    : `${themeColors?.ItemDetailModalCloseIconBackgroundColor?.value}`}
                title="Close"
              >
                <Iconify icon="mdi:close" width={20} height={20} />
              </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" color="text.secondary" gutterBottom style={{ marginBottom: 15 , ...getHeadingStyles}} >
          Rs. {states.itemForDetailedModal.price}
        </Typography>
        <Typography color="gray" style={{ marginBottom: 20, ...getDescriptionStyles }}  >
          {states.itemForDetailedModal.description || ''}
        </Typography>

         {/* Mobile Image (below description, only on mdDown) */}
      {mdDown && (
        <Box
          style={{
            marginBottom: 20,
            with:"100%",
             display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            component="img"
            src={states.itemForDetailedModal?.photoURL
              ? `${states.storeImagesBaseUrl}/${states.itemForDetailedModal.photoURL}`
              : '/assets/placeholder.png'}
            alt={states.itemForDetailedModal?.name || "Menu Item"}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/placeholder.png';
            }}
            style={{
              objectFit: 'contain',
              ...getItemDetailImageStyle()
            }}
          />
        </Box>
      )}


        <CardContent sx={{ padding: "0" }}>
          <FormProvider methods={methods}>
            <Stack spacing={1}>
              {states.itemForDetailedModal.hasVariant && (
                <Variant
                  themeColors={themeColors}
                  layout={layout}
                  getDescriptionStyles={getDescriptionStyles}
                  getHeadingStyles={getHeadingStyles}
                  variants={states.itemForDetailedModal.variants}
                  hanldeSelectOption={toggleVariantSelect}
                  selectedVariant={selectedVariant}
                />
              )}
              <Divider color={layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDividerColor?.value} />
              {filteredChoiceGroups.map((cg, index) => (
                <Group
                  themeColors={themeColors}
                  layout={layout}
                  getDescriptionStyles={getDescriptionStyles}
                  getHeadingStyles={getHeadingStyles}
                  key={index}
                  choiceGroup={cg}
                  hanldeSelectOption={toggleSauce}
                  selectedSauces={selectedSauces}
                  selectedVariant={selectedVariant}
                />
              ))}
              <Stack direction="row" justifyContent="left">
                <RHFTextField
                  sx={{ mt: 3 }}
                  name="description"
                  label="Kitchen Notes"
                  multiline
                  rows={2}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                />
              </Stack>
            </Stack>
          </FormProvider>
        </CardContent>

        </Box>


        <Box
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #eee',
            padding: smDown ? 10 : 20,
            gap: smDown ? 10 : 16,
          }}
        >
          <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              style={{
                minWidth: smDown ? 30 :
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconHeightWidth?.value != 0 ?
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconHeightWidth?.value :
                    themeColors?.ItemDetailModalSubtractIconHeightWidth?.value
                ,
                height: smDown ? 30 :
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconHeightWidth?.value != 0 ?
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconHeightWidth?.value :
                    themeColors?.ItemDetailModalSubtractIconHeightWidth?.value,
                borderRadius: smDown ? 8 :
                  (layout?.itemDetailModalLayout?.body[0].styles?.IItemDetailModalSubtractIconBorderRadius?.value != 0 ?
                    `${layout?.itemDetailModalLayout?.body[0].styles?.IItemDetailModalSubtractIconBorderRadius?.value}px` :
                    `${themeColors?.IItemDetailModalSubtractIconBorderRadius?.value}px`),
                backgroundColor:
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconBackColor?.value !== ""
                    ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconBackColor?.value}`
                    : `${themeColors?.ItemDetailModalSubtractIconBackColor?.value}`,
                color:
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconColor?.value !== ""
                    ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSubtractIconColor?.value}`
                    : `${themeColors?.ItemDetailModalSubtractIconColor?.value}`,
                fontWeight: 'bold',
                fontSize: smDown ? 16 : 20,
              }}
            >
              –
            </Button>
            <Typography fontWeight="bold" sx={{
             ...getAddedQuantityStyles
            }}>{quantity}</Typography>
            <Button
              onClick={() => setQuantity((prev) => prev + 1)}
              style={{
                minWidth: smDown ? 30 :
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconHeightWidth?.value != 0 ?
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconHeightWidth?.value :
                    themeColors?.ItemDetailModalAddIconHeightWidth?.value,
                height: smDown ? 30 :
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconHeightWidth?.value != 0 ?
                    layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconHeightWidth?.value :
                    themeColors?.ItemDetailModalAddIconHeightWidth?.value,
                borderRadius: smDown ? 8 :
                  (layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconBorderRadius?.value != "" ?
                    `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconBorderRadius?.value}px` :
                    `${themeColors?.ItemDetailModalAddIconBorderRadius?.value}px`),
                backgroundColor:
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconBackgroundColor?.value !== ""
                    ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconBackgroundColor?.value}`
                    : `${themeColors?.ItemDetailModalAddIconBackgroundColor?.value}`,
                color:
                  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconColor?.value !== ""
                    ? `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddIconColor?.value}`
                    : `${themeColors?.ItemDetailModalAddIconColor?.value}`,
                fontWeight: 'bold',
                fontSize: smDown ? 16 : 20,
              }}
            >
              +
            </Button>
          </Box>

          <Button
            fullWidth
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: states.loadingForAddUpdateItemCart ? 'center' : 'space-between',
              alignItems: 'center',
              borderRadius:  `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalAddToCartButtonBorderRadius?.value}px`,
              padding: smDown ? '12px' :'12px 24px',
              fontWeight: 'bold',
              fontSize: smDown ? 12 : 16,
              backgroundColor: areAllRequiredGroupsSelected ? getAddToCartEnabledStyles.backgroundColor : getAddToCartDisabledStyles.backgroundColor,
              color: areAllRequiredGroupsSelected ? getAddToCartEnabledStyles.color : getAddToCartDisabledStyles.color,
              ...getAddToCartStyles
            }}
            disabled={!isOnlineForStore || !areAllRequiredGroupsSelected}
            onClick={() =>
              handleAddItemToCart(states.itemForDetailedModal, quantity, notes)}
          >
            {states.loadingForAddUpdateItemCart ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
                <>
                  <span>{calculateTotalPrice()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isItemEdit ? "Update cart" : "Add to Cart"}
                  </span>
                </>
            )}
          </Button>

        </Box>

      </Box>
    </Box>
  );


  return previewMode ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: '90%',
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: 24,
          padding: "32px 24px 24px",
          border: "2px solid #e0e0e0",
        }}

      >{content}</Box>
    </Box>
  ) : (
    <Dialog open={states.openCard} onClose={() => {
      actions.handleOpenCard();
      states.setItemForDetailedModal(null);
      isItemEdit && actions?.handleItemEditClose();
    }} maxWidth="lg" fullWidth>
      {content}
    </Dialog>
  );
}
