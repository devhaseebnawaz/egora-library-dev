/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Collapse, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close, Search } from "@mui/icons-material";
import { getRetailProductGridCategories, propItems, propValue, resolveComponentStyles, styleLength, styleValue } from "./retailShared";

export default function RetailSearch({ actions, layout, prop, states, styles: componentStyles, themeColors }) {
  const theme = useTheme();
  const styles = resolveComponentStyles(componentStyles, themeColors);
  const [open, setOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const inputRef = useRef(null);
  const layoutCategories = getRetailProductGridCategories(layout);
  const propCategories = propItems(prop, "categories");
  const categories = layoutCategories.length ? layoutCategories : propCategories;
  const query = states?.query ?? localQuery;
  const normalizedQuery = String(query).trim().toLowerCase();
  const displayedCategories = categories.filter((category) => String(category?.name || category?.title || category).toLowerCase().includes(normalizedQuery));
  const placeholder = propValue(prop, "SearchBarBackgroundText", "Search our store...");
  const color = styleValue(styles, "SearchBarTextColor", theme.palette.text.secondary);
  const outline = styleValue(styles, "SearchBarOutlineColor", theme.palette.divider);
  const radius = styleLength(styles, "SearchBarBorderRadius", theme.shape.borderRadius);
  const iconSx = { fontSize: styleLength(styles, "SearchBarIconSize", 22), color: styleValue(styles, "SearchBarIconColor", theme.palette.text.primary), background: styleValue(styles, "SearchBarIconBackgroundColor", "transparent") };
  const updateQuery = (value) => { setLocalQuery(value); actions?.handleSearch?.(value); };
  const goToProducts = () => {
    setOpen(false);
    document.getElementById("retail-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const openSearch = () => setOpen(true);
    window.addEventListener("retail:open-search", openSearch);
    return () => window.removeEventListener("retail:open-search", openSearch);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Box component="section" aria-label="Store search" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} sx={{ px: { xs: 2, md: 5 }, py: 2, background: styleValue(styles, "SearchBarBackgroundColor", theme.palette.background.paper) }}>
      <Button fullWidth variant="outlined" aria-expanded={open} startIcon={<Search sx={iconSx} />} onClick={() => setOpen((current) => !current)} sx={{ justifyContent: "flex-start", px: 2, py: 1.5, color, borderColor: outline, borderRadius: radius, textTransform: "none", "&:hover": { borderColor: outline } }}>{placeholder}</Button>
      <Collapse in={open} unmountOnExit>
        <Paper variant="outlined" sx={{ mt: 1.5, p: { xs: 2, md: 3 }, borderColor: outline, borderRadius: radius, color, bgcolor: "background.paper" }}>
          <Box component="form" onSubmit={(event) => { event.preventDefault(); goToProducts(); }}>
            <TextField fullWidth inputRef={inputRef} value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={placeholder} inputProps={{ "aria-label": "Search products" }} InputProps={{
              startAdornment: <InputAdornment position="start"><Search sx={iconSx} /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><IconButton aria-label="Close search" onClick={() => setOpen(false)}><Close sx={iconSx} /></IconButton></InputAdornment>,
            }} sx={{ "& .MuiInputBase-root": { color, borderRadius: radius }, "& .MuiOutlinedInput-notchedOutline": { borderColor: outline } }} />
            <Typography variant="overline" component="p" sx={{ mt: 3, mb: 1 }}>{normalizedQuery ? "Suggestions" : "Main menu"}</Typography>
            <Stack alignItems="flex-start" spacing={0.5}>
              {displayedCategories.map((category, index) => (
                <Button key={category?.id || category?._id || `${category?.name || category}-${index}`} onClick={() => { updateQuery(""); actions?.handleCategoryClick?.(category); goToProducts(); }} sx={{ color, textTransform: "none" }}>{category?.name || category?.title || category}</Button>
              ))}
            </Stack>
            {normalizedQuery && <Button type="submit" variant="contained" sx={{ mt: 3 }}>Search for “{String(query).trim()}”</Button>}
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}
