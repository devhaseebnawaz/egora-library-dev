/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import { Add, Check, Remove } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  buildRetailCartItem,
  getRetailApplicableChoiceGroups,
  getRetailChoiceOptionsTotal,
  getRetailDefaultVariant,
  getRetailEntityId,
  getRetailPrice,
  isRetailTrue,
  money,
  styleLength,
  styleValue,
  validateRetailAddToCart,
} from "./retailShared";

const clone = (value) => JSON.parse(JSON.stringify(value));

export default function RetailProductPurchasePanel({
  rawProduct,
  choiceGroups = [],
  detailStyles = {},
  disabled = false,
  onAddToCart,
}) {
  const muiTheme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectionError, setSelectionError] = useState("");
  const [addToCartStatus, setAddToCartStatus] = useState("idle");

  const product = rawProduct || {};
  const hasVariant = isRetailTrue(product?.hasVariant);
  const variants = Array.isArray(product?.variants) ? product.variants : [];

  useEffect(() => {
    setQuantity(1);
    setSelectionError("");
    setAddToCartStatus("idle");
  }, [getRetailEntityId(product)]);

  useEffect(() => {
    if (!hasVariant) {
      setSelectedVariant(null);
      return;
    }

    setSelectedVariant(getRetailDefaultVariant(product));
  }, [product, hasVariant]);

  const applicableChoiceGroups = useMemo(
    () =>
      getRetailApplicableChoiceGroups(product, choiceGroups, selectedVariant),
    [product, choiceGroups, selectedVariant]
  );

  useEffect(() => {
    setSelectedGroups([]);
    setSelectionError("");
  }, [applicableChoiceGroups]);

  const selectedOptionsTotal = getRetailChoiceOptionsTotal(selectedGroups);
  const unitPrice = getRetailPrice(hasVariant ? selectedVariant?.price : product.price);
  const totalPrice = (unitPrice + selectedOptionsTotal) * quantity;

  const color = (key, fallback) =>
    styleValue(detailStyles, `RetailItemDetail${key}`, fallback);
  const heading = color("HeadingColor", muiTheme.palette.text.primary);
  const muted = color("MutedTextColor", muiTheme.palette.text.secondary);
  const borderRadius = styleLength(
    detailStyles,
    "RetailItemDetailButtonBorderRadius",
    `${muiTheme.shape.borderRadius}px`
  );
  const quantitySx = {
    bgcolor: color("QuantityButtonBackgroundColor", muiTheme.palette.background.paper),
    color: color("QuantityIconColor", muiTheme.palette.text.primary),
    borderRadius: "inherit",
  };
  const addButtonSx = {
    py: 1.75,
    minHeight: 52,
    borderRadius,
    bgcolor: color("AddButtonBackgroundColor", muiTheme.palette.primary.main),
    color: color("AddButtonTextColor", muiTheme.palette.primary.contrastText),
    "&:hover": {
      bgcolor: color("AddButtonBackgroundColor", muiTheme.palette.primary.dark),
      filter: "brightness(0.95)",
    },
    "&.Mui-disabled":
      addToCartStatus === "idle"
        ? {}
        : {
            bgcolor:
              addToCartStatus === "success"
                ? "success.main"
                : color("AddButtonBackgroundColor", muiTheme.palette.primary.main),
            color:
              addToCartStatus === "success"
                ? "success.contrastText"
                : color("AddButtonTextColor", muiTheme.palette.primary.contrastText),
          },
  };
  const optionSx = (active) => ({
    justifyContent: "space-between",
    textAlign: "left",
    gap: 2,
    px: 1.75,
    py: 1.5,
    borderRadius,
    borderColor: color("QuantityButtonBorderColor", muiTheme.palette.divider),
    bgcolor: active
      ? color("AddButtonBackgroundColor", muiTheme.palette.primary.main)
      : "transparent",
    color: active
      ? color("AddButtonTextColor", muiTheme.palette.primary.contrastText)
      : color("TextColor", muiTheme.palette.text.primary),
    "&:hover": {
      borderColor: color("AddButtonBackgroundColor", muiTheme.palette.primary.main),
      bgcolor: active
        ? color("AddButtonBackgroundColor", muiTheme.palette.primary.dark)
        : "action.hover",
    },
  });

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedGroups([]);
    setSelectionError("");
  };

  const toggleChoice = (group, choice) => {
    const groupId = getRetailEntityId(group);
    const choiceId = getRetailEntityId(choice);
    const maximum = Math.max(1, getRetailPrice(group?.quantity || 1));

    setSelectedGroups((previousGroups) => {
      const groups = clone(previousGroups);
      const groupIndex = groups.findIndex((entry) => getRetailEntityId(entry) === groupId);

      if (groupIndex === -1) {
        return [{ ...clone(group), items: [clone(choice)] }, ...groups];
      }

      const selectedGroup = groups[groupIndex];
      const selectedIndex = selectedGroup.items.findIndex(
        (item) => getRetailEntityId(item) === choiceId
      );

      if (selectedIndex >= 0) {
        selectedGroup.items.splice(selectedIndex, 1);
        if (!selectedGroup.items.length) groups.splice(groupIndex, 1);
        return groups;
      }

      if (selectedGroup.items.length >= maximum) {
        selectedGroup.items.shift();
      }
      selectedGroup.items.push(clone(choice));
      return groups;
    });
    setSelectionError("");
  };

  const addToCart = async () => {
    if (disabled || addToCartStatus === "loading" || addToCartStatus === "success") {
      return;
    }

    const validation = validateRetailAddToCart({
      hasVariant,
      selectedVariant,
      selectedGroups,
      applicableChoiceGroups,
    });

    if (!validation.ok) {
      setSelectionError(validation.error);
      return;
    }

    setSelectionError("");
    setAddToCartStatus("loading");

    try {
      const cartItem = buildRetailCartItem(product, {
        selectedVariant,
        selectedGroups,
        quantity,
        optionsTotal: selectedOptionsTotal,
      });
      const response = await onAddToCart?.(cartItem, selectedGroups, quantity);

      if (response === false) {
        throw new Error("add failed");
      }

      if (
        response?.status &&
        response.status !== 201 &&
        response.status !== 200
      ) {
        throw new Error("add failed");
      }

      setAddToCartStatus("success");
      window.setTimeout(() => setAddToCartStatus("idle"), 1800);
    } catch {
      setAddToCartStatus("idle");
      setSelectionError("We could not add this item to the cart. Please try again.");
    }
  };

  const getAddToCartButtonContent = () => {
    if (addToCartStatus === "loading") {
      return <CircularProgress color="inherit" size={18} />;
    }

    if (addToCartStatus === "success") {
      return <Check />;
    }

    return `Add to cart · ${money(totalPrice)}`;
  };

  return (
    <Stack spacing={2.5}>
      <Typography
        variant="h5"
        sx={{ color: color("PriceColor", muiTheme.palette.text.primary) }}
      >
        {money(unitPrice)}
      </Typography>
      {hasVariant && (
        <Stack component="section" spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1" component="h2" sx={{ color: heading }}>
              Choose a variant
            </Typography>
            <Chip size="small" label="Required" />
          </Stack>
          <Stack spacing={1}>
            {variants.map((variant) => {
              const active = getRetailEntityId(variant) === getRetailEntityId(selectedVariant);
              return (
                <Button
                  variant="outlined"
                  key={getRetailEntityId(variant) || variant.name}
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => handleVariantChange(variant)}
                  sx={optionSx(active)}
                >
                  <Box component="span" sx={{ overflowWrap: "anywhere" }}>{variant.name}</Box>
                  <Typography component="span" variant="body2" fontWeight={700} sx={{ whiteSpace: "nowrap" }}>
                    {money(variant.price)}
                  </Typography>
                </Button>
              );
            })}
          </Stack>
        </Stack>
      )}
      {applicableChoiceGroups.map((group) => {
        const selectedGroup = selectedGroups.find(
          (entry) => getRetailEntityId(entry) === getRetailEntityId(group)
        );
        const selectedItemIds = new Set((selectedGroup?.items || []).map(getRetailEntityId));
        const maximum = Math.max(1, getRetailPrice(group?.quantity || 1));
        return (
          <Stack component="section" spacing={1.5} key={getRetailEntityId(group)}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "start", sm: "center" }}
              spacing={1}
            >
              <Typography variant="subtitle1" component="h2" sx={{ color: heading }}>
                {group.name}
              </Typography>
              <Typography variant="caption" sx={{ color: muted }}>
                Select up to {maximum}
                {isRetailTrue(group.required) ? " · Required" : " · Optional"}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {(group.items || []).map((choice) => {
                const active = selectedItemIds.has(getRetailEntityId(choice));
                return (
                  <Button
                    variant="outlined"
                    key={getRetailEntityId(choice) || choice.item}
                    aria-pressed={active}
                    disabled={disabled}
                    onClick={() => toggleChoice(group, choice)}
                    sx={optionSx(active)}
                  >
                    <Box component="span" sx={{ overflowWrap: "anywhere" }}>
                      {choice.item || choice.name}
                    </Box>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight={700}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {getRetailPrice(choice.price) > 0 ? `+ ${money(choice.price)}` : "Included"}
                    </Typography>
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: muted }}>Quantity</Typography>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: "fit-content",
            border: 1,
            borderColor: color("QuantityButtonBorderColor", muiTheme.palette.divider),
            borderRadius,
          }}
        >
          <IconButton
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={disabled || quantity <= 1}
            aria-label="Decrease quantity"
            sx={quantitySx}
          >
            <Remove />
          </IconButton>
          <Typography sx={{ minWidth: 40, textAlign: "center" }}>{quantity}</Typography>
          <IconButton
            onClick={() => setQuantity(quantity + 1)}
            disabled={disabled}
            aria-label="Increase quantity"
            sx={quantitySx}
          >
            <Add />
          </IconButton>
        </Stack>
      </Stack>
      {selectionError && <Alert severity="error">{selectionError}</Alert>}
      <Button
        variant="contained"
        onClick={addToCart}
        disabled={disabled || addToCartStatus === "loading" || addToCartStatus === "success"}
        aria-busy={addToCartStatus === "loading"}
        sx={addButtonSx}
      >
        {getAddToCartButtonContent()}
      </Button>
    </Stack>
  );
}
